import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' });
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
          url: `${baseUrl}/privacy-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        }
      ],
    }
  };
}

export default function Privacy() {
  const t = useTranslations('privacy');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.intro.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.intro.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.noCollect.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.noCollect.content')}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            {t('sections.noCollect.list').split('|').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.howItWorks.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.howItWorks.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.technical.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.technical.content')}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            {t('sections.technical.list').split('|').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('sections.updates.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('sections.updates.content')}
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