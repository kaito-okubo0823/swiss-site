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
  const tAbout = await getTranslations('About');
  const tMenu = await getTranslations('Menu');
  const tGallery = await getTranslations('Gallery');
  const tNav = await getTranslations('Nav');
  const tEvents = await getTranslations('Events');

  return (
    <>
      {/* ===== ヒーロー ===== */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(14,14,14,0.5) 0%, rgba(14,14,14,0.85) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85')`,
          }}
        />

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

      {/* ===== About プレビュー ===== */}
      <section className="px-8 py-32 bg-bg-2">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85')" }}>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold pointer-events-none" />
          </div>
          <div>
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
              {tAbout('tag')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium leading-tight mt-4 mb-6">
              {tAbout('title')}
            </h2>
            <p className="text-text-dim mb-4">{tAbout('p1')}</p>
            <p className="text-text-dim mb-8">{tAbout('p2')}</p>
            <Link
              href="/about"
              className="inline-block text-gold border-b border-gold pb-1 text-sm tracking-[0.15em] uppercase hover:text-gold-light hover:border-gold-light transition-colors"
            >
              {tNav('about')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Menu プレビュー ===== */}
      <section className="px-8 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
              {tMenu('tag')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium mt-4 mb-4">
              {tMenu('title')}
            </h2>
            <p className="text-text-dim max-w-xl mx-auto">{tMenu('desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto mb-12">
            {[
              { name: 'Bündner Gerstensuppe', desc: 'Traditionelle Suppe mit Bergkäse', price: 'CHF 14' },
              { name: 'Zürcher Geschnetzeltes', desc: 'Klassisch mit Rösti und Champignons', price: 'CHF 42' },
              { name: 'Älplermagronen', desc: 'Pasta · Bergkartoffeln · Sbrinz', price: 'CHF 32' },
              { name: 'Engadiner Nusstorte', desc: 'Hausgemacht · mit Vanilleeis', price: 'CHF 14' },
            ].map((item) => (
              <div key={item.name} className="border-b border-dashed border-gold/20 pb-5">
                <div className="flex justify-between items-baseline gap-4 mb-2">
                  <span className="font-serif text-lg font-medium">{item.name}</span>
                  <span className="font-serif text-lg text-gold whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-text-dim text-sm italic">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/menu"
              className="inline-block border border-gold text-gold px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-bg transition-all"
            >
              {tNav('menu')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Gallery プレビュー ===== */}
      <section className="px-8 py-32 bg-bg-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
              {tGallery('tag')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium mt-4">
              {tGallery('title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
              'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80',
              'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80',
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square bg-cover bg-center hover:scale-105 transition-transform"
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-block border border-gold text-gold px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-bg transition-all"
            >
              {tNav('gallery')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Events プレビュー ===== */}
      <section className="px-8 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
              {tEvents('tag')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium mt-4">
              {tEvents('title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', date: tEvents('e1_date'), title: tEvents('e1_title'), desc: tEvents('e1_desc') },
              { img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80', date: tEvents('e2_date'), title: tEvents('e2_title'), desc: tEvents('e2_desc') },
              { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80', date: tEvents('e3_date'), title: tEvents('e3_title'), desc: tEvents('e3_desc') },
            ].map((ev, i) => (
              <article key={i} className="bg-bg-2 border border-border overflow-hidden hover:border-gold-dark transition-colors">
                <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url('${ev.img}')` }} />
                <div className="p-6">
                  <div className="text-gold text-[0.7rem] tracking-[0.18em] uppercase mb-2">{ev.date}</div>
                  <h3 className="font-serif text-lg font-medium mb-2">{ev.title}</h3>
                  <p className="text-text-dim text-sm">{ev.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block border border-gold text-gold px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-bg transition-all"
            >
              {tNav('events')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 予約CTA ===== */}
      <section
        className="relative px-8 py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(14,14,14,0.85), rgba(14,14,14,0.85)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
            {tNav('reserve')}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium mt-4 mb-6">
            {t('cta_reserve')}
          </h2>
          <p className="text-text-dim mb-10">
            +41 44 123 45 67 · Bahnhofstrasse 42, 8001 Zürich
          </p>
          <Link
            href="/reservation"
            className="inline-block px-10 py-4 bg-gold text-bg text-xs font-semibold tracking-[0.2em] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all"
          >
            {t('cta_reserve')}
          </Link>
        </div>
      </section>
    </>
  );
}
