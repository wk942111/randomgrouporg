# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 设置npm镜像和环境变量
RUN npm config set registry https://registry.npmmirror.com/
ENV NEXT_TELEMETRY_DISABLED=1

# 首先复制配置文件
COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY next.config.js ./

# 清理 npm 缓存并安装依赖
RUN npm cache clean --force && \
    npm install --production=false

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TZ=Asia/Shanghai

# 安装必要工具
RUN apk add --no-cache tzdata

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制构建产物和必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 设置权限
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"] 