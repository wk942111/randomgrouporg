# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# 安装依赖时可能需要 libc6-compat
# 参考: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

# 安装依赖阶段
FROM base AS deps
WORKDIR /app

# 设置 npm 镜像源（使用国内镜像加速）
RUN npm config set registry https://registry.npmmirror.com/

# 复制包管理文件
COPY package.json package-lock.json* ./

# 安装依赖
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 收集完全匿名的遥测数据
# 了解更多: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# 构建应用
RUN npm run build

# 生产运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TZ=Asia/Shanghai

# 安装时区数据
RUN apk add --no-cache tzdata

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public

# 自动利用输出跟踪来减小镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js 由 next build 从 standalone 输出创建
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"] 