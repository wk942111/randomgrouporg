import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { locales } from '@/i18n/locales';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Random Group Generator - Free Online Team Grouping Tool',
  description: 'Free online random group generator for teams, students, and projects. Create balanced groups instantly with our easy-to-use tool.',
  keywords: 'random group generator, team generator, group maker, random team creator, classroom group organizer, project team generator',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  const locale = params?.locale || 'en';
  const dir = locales[locale as keyof typeof locales]?.dir || 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
