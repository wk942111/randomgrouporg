'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function CanonicalUrl() {
  const pathname = usePathname()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://randomgroup.org'
  const canonicalUrl = `${baseUrl}${pathname}`

  useEffect(() => {
    // 更新 canonical 标签
    const updateCanonical = () => {
      // 移除已存在的 canonical 标签
      const existingCanonical = document.querySelector('link[rel="canonical"]')
      if (existingCanonical) {
        existingCanonical.remove()
      }

      // 添加新的 canonical 标签
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = canonicalUrl
      document.head.appendChild(link)
    }

    // 首次渲染和路由变化时更新
    updateCanonical()
  }, [canonicalUrl]) // 当 canonicalUrl 变化时重新执行

  return null // 不需要渲染任何内容，因为我们直接操作 DOM
} 