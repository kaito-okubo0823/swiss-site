import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';
import MenuList from '@/components/MenuList';

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Menu');

  return (
    <section className="px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHead tag={t('tag')} title={t('title')} desc={t('desc')} />
        <MenuList />
      </div>
    </section>
  );
}
