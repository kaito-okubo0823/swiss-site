import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Hero');
  const tHours = await getTranslations('Hours');

  return (
    <>
      {/* ヒーロー */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(14,14,14,0.5) 0%, rgba(14,14,14,0.85) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85')`,
          }}
        />

        {/* コンテンツ */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-medium mb-6">
            — {t('badge')} —
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] mb-7">
            {t('title')}
          </h1>
          <p className="text-text-dim max-w-2xl mx-auto mb-10 text-base md:text-lg">
            {t('lead')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/reservation"
              className="px-9 py-4 bg-gold text-bg text-xs font-semibold tracking-[0.2em] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all"
            >
              {t('cta_reserve')}
            </Link>
            <Link
              href="/menu"
              className="px-9 py-4 bg-transparent text-text text-xs font-semibold tracking-[0.2em] uppercase border border-text hover:bg-text hover:text-bg transition-all"
            >
              {t('cta_menu')}
            </Link>
          </div>
        </div>

        {/* 営業時間バナー */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-8 px-7 py-4 bg-black/70 backdrop-blur-sm border border-gold/20 z-10 text-xs tracking-wider flex-wrap justify-center">
          <span className="text-text-dim">
            <strong className="text-gold font-semibold">{tHours('weekdays')}</strong> {tHours('open')}
          </span>
          <span className="text-text-dim">
            <strong className="text-gold font-semibold">{tHours('sunday')}</strong> {tHours('closed')}
          </span>
          <span className="text-text-dim">📞 +41 44 123 45 67</span>
        </div>
      </section>

      {/* プレースホルダーセクション */}
      <section className="py-32 px-8 bg-bg-2">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-medium mb-4">
            COMING SOON
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            このページは Phase 2 で実装予定
          </h2>
          <p className="text-text-dim max-w-xl mx-auto">
            メニュー / 予約 / アクセス / ギャラリー / About / イベント / お問い合わせ
            ページを順次追加していきます。
          </p>
        </div>
      </section>
    </>
  );
}
