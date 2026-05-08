'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: 'de' | 'fr' | 'it' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-1 text-xs tracking-wider">
      {routing.locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang)}
          className={`px-2 py-1.5 uppercase font-medium transition-colors ${
            locale === lang ? 'text-gold' : 'text-text-mute hover:text-gold-light'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
