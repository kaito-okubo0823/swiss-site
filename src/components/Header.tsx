import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default async function Header() {
  const t = await getTranslations('Nav');

  return (
    <header className="fixed top-0 w-full z-50 bg-bg/60 backdrop-blur-xl border-b border-gold/15">
      <nav className="max-w-7xl mx-auto px-5 md:px-8 py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="font-serif text-base sm:text-xl font-semibold tracking-widest text-text flex items-center gap-2">
          Alpine <span className="text-gold italic">·</span> Kitchen
        </Link>

        <ul className="hidden lg:flex gap-9 list-none">
          <li><Link href="/about" className="nav-link">{t('about')}</Link></li>
          <li><Link href="/menu" className="nav-link">{t('menu')}</Link></li>
          <li><Link href="/gallery" className="nav-link">{t('gallery')}</Link></li>
          <li><Link href="/access" className="nav-link">{t('access')}</Link></li>
          <li><Link href="/events" className="nav-link">{t('events')}</Link></li>
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/reservation"
            className="hidden sm:inline-block bg-gold text-bg px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all"
          >
            {t('reserve')}
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
