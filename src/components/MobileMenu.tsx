'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu() {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navItems = [
    { href: '/about', label: t('about') },
    { href: '/menu', label: t('menu') },
    { href: '/gallery', label: t('gallery') },
    { href: '/access', label: t('access') },
    { href: '/events', label: t('events') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <>
      <button
        className="lg:hidden text-text text-2xl w-10 h-10 flex items-center justify-center"
        onClick={() => setOpen(true)}
        aria-label="Menu"
      >
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-out drawer */}
      <aside
        style={{ backgroundColor: '#0e0e0e' }}
        className={`fixed top-0 right-0 bottom-0 h-full w-[85%] max-w-sm z-50 transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ヘッダー */}
        <div
          style={{ backgroundColor: '#161616' }}
          className="flex justify-between items-center px-6 py-5 border-b border-gold/30 flex-shrink-0"
        >
          <span className="font-serif text-lg text-gold tracking-wider">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-text text-3xl leading-none w-10 h-10 flex items-center justify-center hover:text-gold transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* メニュー本体 */}
        <nav
          style={{ backgroundColor: '#0e0e0e' }}
          className="flex-1 overflow-y-auto"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-gold/15">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-6 py-5 text-text text-base tracking-[0.18em] uppercase font-medium hover:bg-gold/10 hover:text-gold active:bg-gold/20 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-gold text-sm">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* フッター */}
        <div
          style={{ backgroundColor: '#161616' }}
          className="px-6 py-5 border-t border-gold/30 space-y-4 flex-shrink-0"
        >
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
          <Link
            href="/reservation"
            onClick={() => setOpen(false)}
            className="block w-full bg-gold text-bg text-center py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors"
          >
            {t('reserve')}
          </Link>
        </div>
      </aside>
    </>
  );
}
