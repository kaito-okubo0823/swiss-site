import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';
import Gallery from '@/components/Gallery';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  return { title: t('title') };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Gallery');

  return (
    <section className="px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} />
        <Gallery />
      </div>
    </section>
  );
}
