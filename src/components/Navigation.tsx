'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function Navigation() {
  const t = useTranslations('common');

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-text-primary hover:text-primary transition-colors font-bold">
            {t('nav.home')}
          </Link>
          <div className="flex space-x-8">
            <Link href="/about" className="text-text-primary hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/legal" className="text-text-secondary hover:text-primary transition-colors">
              {t('nav.legal')}
            </Link>
            <Link href="/terms" className="text-text-secondary hover:text-primary transition-colors">
              {t('nav.terms')}
            </Link>
            <Link href="/privacy" className="text-text-secondary hover:text-primary transition-colors">
              {t('nav.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 