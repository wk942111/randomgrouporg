import { GroupGenerator } from '@/components/generator/GroupGenerator';
import { useTranslations } from 'next-intl';
import { AdContainer } from '@/components/ads/AdContainer';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 mix-blend-multiply" />
        </div>
        <div className="container relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight mb-6 animate-fade-in">
              {t('title')}
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-primary-600 mb-8 animate-fade-in">
              {t('description')}
            </p>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-12 animate-fade-in">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="section bg-neutral-50">
        <div className="container">
          <GroupGenerator />
        </div>
      </section>

      {/* Instructions Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">{t('instructions.title')}</h2>
          <p className="section-subtitle">{t('instructions.subtitle')}</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="feature-title">{t('instructions.step1.title')}</h3>
              <p className="feature-description">{t('instructions.step1.description')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="feature-title">{t('instructions.step2.title')}</h3>
              <p className="feature-description">{t('instructions.step2.description')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="feature-title">{t('instructions.step3.title')}</h3>
              <p className="feature-description">{t('instructions.step3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-neutral-50">
        <div className="container">
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="section-subtitle">{t('features.subtitle')}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="feature-card">
              <h3 className="feature-title">{t('features.education.title')}</h3>
              <p className="feature-description">{t('features.education.description')}</p>
            </div>

            <div className="feature-card">
              <h3 className="feature-title">{t('features.professional.title')}</h3>
              <p className="feature-description">{t('features.professional.description')}</p>
            </div>

            <div className="feature-card">
              <h3 className="feature-title">{t('features.events.title')}</h3>
              <p className="feature-description">{t('features.events.description')}</p>
            </div>

            <div className="feature-card">
              <h3 className="feature-title">{t('features.algorithm.title')}</h3>
              <p className="feature-description">{t('features.algorithm.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="section-subtitle">{t('faq.subtitle')}</p>

          <div className="max-w-3xl mx-auto divide-y divide-neutral-200">
            <div className="faq-item">
              <h3 className="faq-question">{t('faq.how.title')}</h3>
              <p className="faq-answer">{t('faq.how.answer')}</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">{t('faq.max.title')}</h3>
              <p className="faq-answer">{t('faq.max.answer')}</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">{t('faq.save.title')}</h3>
              <p className="faq-answer">{t('faq.save.answer')}</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">{t('faq.data.title')}</h3>
              <p className="faq-answer">{t('faq.data.answer')}</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">{t('faq.balance.title')}</h3>
              <p className="faq-answer">{t('faq.balance.answer')}</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">{t('faq.regenerate.title')}</h3>
              <p className="faq-answer">{t('faq.regenerate.answer')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 