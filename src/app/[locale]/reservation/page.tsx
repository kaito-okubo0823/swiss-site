import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';
import ReservationForm from '@/components/ReservationForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Reservation' });
  return {
    title: t('title'),
    description: t('desc'),
  };
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Reservation');

  return (
    <section className="px-8 py-20 bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} desc={t('desc')} />
        <ReservationForm />
      </div>
    </section>
  );
}
