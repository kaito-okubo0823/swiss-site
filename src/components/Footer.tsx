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
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-dim hover:bg-gold hover:text-bg hover:border-gold transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-dim hover:bg-gold hover:text-bg hover:border-gold transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" aria-label="TripAdvisor" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-dim hover:bg-gold hover:text-bg hover:border-gold transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.953 2.122a5.4 5.4 0 0 0 3.7 9.331 5.387 5.387 0 0 0 4.078-1.86l1.872 2.039 1.873-2.039a5.382 5.382 0 0 0 4.077 1.857 5.4 5.4 0 0 0 3.702-9.327l1.952-2.123h-4.36a13.594 13.594 0 0 0-7.842-2.353zm0 1.886c1.89 0 3.722.39 5.412 1.105-2.86 1.193-5.408 3.83-5.41 7.025-.002-3.196-2.553-5.834-5.413-7.024a13.93 13.93 0 0 1 5.41-1.106zM5.65 8.41a3.518 3.518 0 0 1 3.522 3.518A3.518 3.518 0 0 1 5.65 15.45a3.516 3.516 0 0 1-3.518-3.518A3.517 3.517 0 0 1 5.65 8.41zm12.708 0a3.518 3.518 0 0 1 3.518 3.518 3.518 3.518 0 0 1-3.518 3.518 3.518 3.518 0 0 1-3.522-3.518A3.518 3.518 0 0 1 18.36 8.41z"/>
              </svg>
            </a>
            <a href="#" aria-label="Google" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-dim hover:bg-gold hover:text-bg hover:border-gold transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            </a>
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
