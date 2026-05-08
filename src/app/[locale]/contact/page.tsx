import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return { title: t('title'), description: t('desc') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  return (
    <section className="px-5 sm:px-8 py-12 md:py-20 bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} desc={t('desc')} />
        <ContactForm />
      </div>
    </section>
  );
}
