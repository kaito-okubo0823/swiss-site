import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <section className="px-8 py-20 bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85')" }}>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold pointer-events-none" />
          </div>

          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-7">
              {t('heading')}
            </h2>
            <p className="text-text-dim mb-4">{t('p1')}</p>
            <p className="text-text-dim mb-4">{t('p2')}</p>
            <p className="text-text-dim mb-4">{t('p3')}</p>
            <p className="font-serif italic text-gold text-lg mt-8">— {t('signature')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
