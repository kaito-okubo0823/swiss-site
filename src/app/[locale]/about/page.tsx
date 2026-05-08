import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return { title: t('title'), description: t('p1') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <section className="px-5 sm:px-8 py-12 md:py-20 bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] bg-cover bg-center max-w-md mx-auto lg:max-w-none w-full"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85')" }}>
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border border-gold pointer-events-none" />
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-5 md:mb-7">
              {t('heading')}
            </h2>
            <p className="text-text-dim mb-4 text-sm sm:text-base">{t('p1')}</p>
            <p className="text-text-dim mb-4 text-sm sm:text-base">{t('p2')}</p>
            <p className="text-text-dim mb-4 text-sm sm:text-base">{t('p3')}</p>
            <p className="font-serif italic text-gold text-base sm:text-lg mt-6 md:mt-8">— {t('signature')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
