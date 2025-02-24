import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata.legal' });
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
          url: `${baseUrl}/legal-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        }
      ],
    }
  };
}

export default function Legal() {
  const t = useTranslations('legal');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('title')}</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('privacy.title')}</h2>
          <p className="mb-4 text-gray-600">
            {t('privacy.description')}
          </p>
          <Link
            href="/legal/privacy"
            className="text-blue-600 hover:text-blue-700"
          >
            {t('privacy.readMore')} →
          </Link>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('terms.title')}</h2>
          <p className="mb-4 text-gray-600">
            {t('terms.description')}
          </p>
          <Link
            href="/legal/terms"
            className="text-blue-600 hover:text-blue-700"
          >
            {t('terms.readMore')} →
          </Link>
        </div>
      </div>
    </div>
  );
}