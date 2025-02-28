'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { locales } from '@/i18n/locales'

export function AlternateLinks() {
  const pathname = usePathname()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://randomgroup.org'

  // 获取不带语言前缀的路径
  const getPathWithoutLocale = (path: string) => {
    const localePattern = Object.keys(locales)
      .map(l => l.replace('-', '\\-'))
      .join('|')
    
    const regex = new RegExp(`^/(${localePattern})(?:/|$)(.*)`)
    const match = path.match(regex)
    
    if (match) {
      const [, , rest] = match
      return rest || '/'
    }
    
    return path
  }

  const pathWithoutLocale = getPathWithoutLocale(pathname)
  
  // 生成语言链接
  const createLanguageLink = (lang: string) => {
    const cleanPath = pathWithoutLocale === '/' 
      ? '' 
      : pathWithoutLocale.replace(/^\/+|\/+$/g, '')
    
    if (lang === 'en') {
      return cleanPath ? `/${cleanPath}` : '/'
    } else {
      return cleanPath ? `/${lang}/${cleanPath}` : `/${lang}`
    }
  }

  useEffect(() => {
    // 更新语言替代链接
    const updateAlternates = () => {
      // 移除已存在的语言替代链接
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())

      // 添加新的语言替代链接
      Object.keys(locales).forEach(lang => {
        const link = document.createElement('link')
        link.rel = 'alternate'
        link.hreflang = lang
        link.href = `${baseUrl}${createLanguageLink(lang)}`
        document.head.appendChild(link)
      })
    }

    // 首次渲染和路由变化时更新
    updateAlternates()
  }, [pathname, baseUrl]) // 当 pathname 或 baseUrl 变化时重新执行

  return null // 不需要渲染任何内容，因为我们直接操作 DOM
} 