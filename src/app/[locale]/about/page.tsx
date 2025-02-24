import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata.about' });
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
          url: `${baseUrl}/about-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        }
      ],
    }
  };
}

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>

      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('mission.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('mission.description')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{t('features.title')}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            <li>{t('features.list.grouping')}</li>
            <li>{t('features.list.interface')}</li>
            <li>{t('features.list.algorithm')}</li>
            <li>{t('features.list.export')}</li>
            <li>{t('features.list.security')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{t('contact.title')}</h2>
          <p className="mt-4 text-gray-600">
            {t('contact.description')}
          </p>
          <p className="mt-4 text-gray-600">
            Email: support@randomgroup.org
          </p>
        </section>
      </div>
    </div>
  );
} 