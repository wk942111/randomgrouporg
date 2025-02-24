import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/locales';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: Object.keys(locales),
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false
});

export async function middleware(request: NextRequest) {
  // 先处理国际化
  const response = await intlMiddleware(request);
  
  // 如果有重定向,直接返回
  if(response.status !== 200) {
    return response;
  }
  
  // 添加原始路径到 header
  const originalPathname = request.nextUrl.pathname;
  response.headers.set('x-original-pathname', originalPathname);
  
  return response;
}

// 匹配所有公共路由，但排除特定路径
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 