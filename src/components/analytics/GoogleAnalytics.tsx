'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export function GoogleAnalytics({ ga_id }: { ga_id: string }) {
  // 添加调试信息
  useEffect(() => {
    
  }, [ga_id])

  if (!ga_id) {
    console.warn('Google Analytics ID is missing')
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
        strategy="afterInteractive"
        onLoad={() => {
          
        }}
        onError={(e) => {
          console.error('Google Analytics script failed to load', e)
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga_id}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
} 