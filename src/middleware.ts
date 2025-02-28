import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/locales';

// 创建中间件配置
const intlMiddleware = createMiddleware({
  // 配置所有支持的语言
  locales: Object.keys(locales),
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false
});

export default intlMiddleware;

// 匹配所有路由
export const config = {
  matcher: [
    // 匹配所有非静态/API路由
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 匹配带有语言前缀的路由
    '/(zh|zh-Hant|ko|ja|pt|es|de|fr|vi|ar|hu|nl|pl|it|sv|th)/:path*'
  ]
}; 