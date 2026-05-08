import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Events' });
  return { title: t('title') };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Events');

  const events = [
    {
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85',
      date: t('e1_date'),
      title: t('e1_title'),
      desc: t('e1_desc'),
    },
    {
      img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=85',
      date: t('e2_date'),
      title: t('e2_title'),
      desc: t('e2_desc'),
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=85',
      date: t('e3_date'),
      title: t('e3_title'),
      desc: t('e3_desc'),
    },
  ];

  return (
    <section className="px-5 sm:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev, i) => (
            <article key={i} className="bg-bg-2 border border-border overflow-hidden hover:border-gold-dark hover:-translate-y-1 transition-all">
              <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url('${ev.img}')` }} />
              <div className="p-7">
                <div className="text-gold text-[0.7rem] tracking-[0.18em] uppercase mb-3">{ev.date}</div>
                <h3 className="font-serif text-xl font-medium mb-3">{ev.title}</h3>
                <p className="text-text-dim text-sm">{ev.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
