import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { locales } from '@/i18n/locales';
import type { Metadata, Viewport } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import './globals.css';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

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

// 生成静态参数
export function generateStaticParams() {
  return Object.keys(locales).map((locale) => ({ locale }));
}

// 生成元数据
export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  if (!Object.keys(locales).includes(locale)) notFound();
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://randomgroup.org';
  
  // 获取当前路径
  const headersList = headers();
  const originalPathname = headersList.get('x-original-pathname') || '';
  
  // 移除语言前缀获取原始路径
  const getPathWithoutLocale = (path: string) => {
    const localePattern = Object.keys(locales)
      .map(l => l.replace('-', '\\-'))
      .join('|');
    
    const regex = new RegExp(`^/(${localePattern})(?:/|$)(.*)`);
    const match = path.match(regex);
    
    if (match) {
      const [, matchedLocale, rest] = match;
      return rest || '/';
    }
    
    return path.replace(/^\/+/, '') || '/';
  };

  const pathnameWithoutLocale = getPathWithoutLocale(originalPathname);

  // 清理路径，移除开头和结尾的斜杠
  const cleanPath = pathnameWithoutLocale === '/' 
    ? '' 
    : pathnameWithoutLocale.replace(/^\/+|\/+$/g, '');

  // 构建规范链接
  const currentUrl = locale === 'en'
    ? `${baseUrl}${cleanPath ? `/${cleanPath}` : ''}`
    : `${baseUrl}/${locale}${cleanPath ? `/${cleanPath}` : ''}`;

  // 构建语言替代链接
  const languageAlternates = Object.keys(locales).reduce((acc, lang) => {
    const url = lang === 'en'
      ? `${baseUrl}${cleanPath ? `/${cleanPath}` : ''}`
      : `${baseUrl}/${lang}${cleanPath ? `/${cleanPath}` : ''}`;
    return { ...acc, [lang]: url };
  }, {});

  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: currentUrl,
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
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: currentUrl,
      languages: languageAlternates
    },
    authors: [{ name: t('authorName'), url: `${baseUrl}/about` }],
    category: t('category'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!Object.keys(locales).includes(locale)) notFound();
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
} 