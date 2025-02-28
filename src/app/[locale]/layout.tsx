import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { locales } from '@/i18n/locales';
import type { Metadata, Viewport } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { CanonicalUrl } from '@/components/common/CanonicalUrl';
import { AlternateLinks } from '@/components/common/AlternateLinks';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// 强制使用动态渲染
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale }, params }: Props): Promise<Metadata> {
  // 验证语言环境
  if (!Object.keys(locales).includes(locale)) notFound();
  
  // 设置请求语言环境
  unstable_setRequestLocale(locale);

  // 获取翻译
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://randomgroup.org';
  
  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      siteName: t('siteName'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      creator: '@randomgroup',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ 
      name: t('authorName'), 
      url: locale === 'en' 
        ? `${baseUrl}/about`
        : `${baseUrl}/${locale}/about`
    }],
    category: t('category'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // 验证语言环境
  if (!Object.keys(locales).includes(locale)) notFound();
  
  // 设置请求语言环境
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <CanonicalUrl />
        <AlternateLinks />
        {/* 添加调试信息 */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* 在生产环境中输出调试信息到控制台 */}
            <Script id="debug-info" strategy="beforeInteractive">
              {`
                
              `}
            </Script>
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID || ''} />
          </>
        )}
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 