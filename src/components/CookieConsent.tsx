'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
  const t = useTranslations('Cookie');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (type: 'essential' | 'all') => {
    localStorage.setItem('cookieConsent', type);
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto md:mx-0 md:left-6 bg-bg-3 border border-gold-dark p-6 z-[200] shadow-2xl animate-fade-up">
      <h4 className="font-serif text-gold text-base mb-2">🍪 {t('title')}</h4>
      <p className="text-text-dim text-sm mb-4">{t('desc')}</p>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => accept('essential')}
          className="flex-1 px-4 py-2.5 text-xs tracking-[0.15em] uppercase border border-border text-text-dim hover:text-text font-medium transition-colors"
        >
          {t('essential')}
        </button>
        <button
          onClick={() => accept('all')}
          className="flex-1 px-4 py-2.5 text-xs tracking-[0.15em] uppercase bg-gold border border-gold text-bg hover:opacity-90 font-medium transition-opacity"
        >
          {t('all')}
        </button>
      </div>
    </div>
  );
}
