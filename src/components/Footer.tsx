import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');
  const tHours = await getTranslations('Hours');

  return (
    <footer className="bg-[#080808] border-t border-border pt-12 md:pt-20 px-5 sm:px-8 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">

        <div>
          <h4 className="font-serif text-gold text-base font-medium tracking-wider mb-5">Alpine Kitchen</h4>
          <p className="text-text-dim text-sm">
            Schweizer Küche, neu interpretiert.<br />Seit 1987 in Zürich.
          </p>
          <div className="flex gap-3 mt-4">
            {['Instagram', 'Facebook', 'TripAdvisor', 'Google'].map((s) => (
              <a key={s} href="#" aria-label={s}
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-dim hover:bg-gold hover:text-bg hover:border-gold transition-all">
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-gold text-base font-medium tracking-wider mb-5">{tNav('contact')}</h4>
          <p className="text-text-dim text-sm mb-2">Bahnhofstrasse 42<br />8001 Zürich</p>
          <a href="tel:+41441234567" className="text-text-dim text-sm hover:text-gold block mb-2">+41 44 123 45 67</a>
          <a href="mailto:reservation@alpinekitchen.ch" className="text-text-dim text-sm hover:text-gold block">
            reservation@alpinekitchen.ch
          </a>
        </div>

        <div>
          <h4 className="font-serif text-gold text-base font-medium tracking-wider mb-5">{tHours('weekdays')}</h4>
          <p className="text-text-dim text-sm">{tHours('weekdays')}: {tHours('open')}</p>
          <p className="text-text-dim text-sm">{tHours('sunday')}: {tHours('closed')}</p>
        </div>

        <div>
          <h4 className="font-serif text-gold text-base font-medium tracking-wider mb-5">{t('newsletter_title')}</h4>
          <p className="text-text-dim text-sm mb-3">{t('newsletter_desc')}</p>
          <input
            type="email"
            placeholder="ihre@email.ch"
            className="w-full bg-bg border border-border text-text px-3 py-3 mb-3 text-sm focus:outline-none focus:border-gold"
          />
          <button className="w-full bg-gold text-bg py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:opacity-90 transition-all">
            {t('subscribe')}
          </button>
        </div>
      </div>

      <div className="border-t border-border pt-6 max-w-7xl mx-auto flex justify-between flex-wrap gap-4 text-text-mute text-xs">
        <div>© 2025 Alpine Kitchen GmbH. {t('rights')}.</div>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-gold">{t('impressum')}</Link>
          <Link href="/privacy" className="hover:text-gold">{t('privacy')}</Link>
          <Link href="/" className="hover:text-gold">{t('terms')}</Link>
        </div>
      </div>
    </footer>
  );
}
