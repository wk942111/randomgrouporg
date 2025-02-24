import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata.terms' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://randomgroup.org';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: `${baseUrl}/terms-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        }
      ],
    }
  };
}

export default function Terms() {
  const t = useTranslations('terms');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.agreement.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.agreement.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.license.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.license.content')}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            {t('sections.license.restrictions').split('|').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.disclaimer.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.disclaimer.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.limitations.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.limitations.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.data.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.data.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.modifications.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.modifications.content')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.contact.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.contact.content')}
          </p>
          <p className="mt-4 text-gray-600">
            {t('lastUpdated', { date: new Date().toLocaleDateString() })}
          </p>
        </section>
      </div>
    </div>
  );
} 