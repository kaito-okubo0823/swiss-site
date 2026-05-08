import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Access' });
  return { title: t('title'), description: t('transit_value') };
}

export default async function AccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Access');
  const tHours = await getTranslations('Hours');

  const rows = [
    { icon: '📍', label: t('address'), value: 'Bahnhofstrasse 42\n8001 Zürich, Schweiz' },
    { icon: '📞', label: t('phone'), value: '+41 44 123 45 67' },
    { icon: '✉️', label: 'Email', value: 'reservation@alpinekitchen.ch' },
    { icon: '🕐', label: t('hours'), value: `${tHours('weekdays')}: ${tHours('open')}\n${tHours('sunday')}: ${tHours('closed')}` },
    { icon: '🚉', label: t('transit'), value: t('transit_value') },
  ];

  return (
    <section className="px-8 py-20 bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl text-gold font-medium mb-6">Alpine Kitchen Zürich</h3>
            {rows.map((row, i) => (
              <div key={i} className="flex gap-4 py-4 border-b border-border">
                <div className="text-gold text-xl flex-shrink-0">{row.icon}</div>
                <div>
                  <div className="text-[0.7rem] text-text-mute tracking-[0.18em] uppercase mb-1">
                    {row.label}
                  </div>
                  <div className="text-text whitespace-pre-line text-sm">{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.8527826619253!2d8.539183876956891!3d47.37417077116857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08cc4a4937%3A0xeb34f23ec22d8ec1!2sBahnhofstrasse%2C%208001%20Z%C3%BCrich!5e0!3m2!1sde!2sch"
            className="w-full h-full min-h-[400px] border-0 grayscale-[40%] contrast-110"
            loading="lazy"
            title="Alpine Kitchen Map"
          />
        </div>
      </div>
    </section>
  );
}
