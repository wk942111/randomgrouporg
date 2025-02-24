'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/locales';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className={`appearance-none bg-white border rounded-md px-4 py-2 pr-8 ${
          isPending ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isPending}
        aria-label={t('languageSwitcher.label')}
      >
        {Object.entries(locales).map(([code, { name }]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
} 