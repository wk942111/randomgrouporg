'use client';

import { useTranslations } from 'next-intl';

export function LegalContent({ locale }: { locale: string }) {
  const t = useTranslations('legal');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.intro.title')}</h2>
          <p className="mt-4 text-gray-600">{t('sections.intro.content')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.documents.title')}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            <li>
              <a href="/legal/terms" className="text-primary-600 hover:text-primary-700">
                {t('sections.documents.terms')}
              </a>
            </li>
            <li>
              <a href="/legal/privacy" className="text-primary-600 hover:text-primary-700">
                {t('sections.documents.privacy')}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.contact.title')}</h2>
          <p className="mt-4 text-gray-600">{t('sections.contact.content')}</p>
          <p className="mt-4 text-gray-600">
            {t('lastUpdated', { date: new Date().toLocaleDateString() })}
          </p>
        </section>
      </div>
    </div>
  );
} 