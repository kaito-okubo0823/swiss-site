'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu() {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);

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
  ];

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
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out drawer - コンパクト版 */}
      <aside
        style={{
          backgroundColor: '#0e0e0e',
          width: '78%',
          maxWidth: '20rem',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 50,
          display: open ? 'flex' : 'none',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
          maxHeight: '100dvh',
        }}
        className="lg:hidden"
      >
        {/* ヘッダー */}
        <div
          style={{
            backgroundColor: '#161616',
            flexShrink: 0,
            padding: '14px 20px',
            borderBottom: '1px solid rgba(201,169,97,0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#c9a961', fontSize: '15px', letterSpacing: '0.1em' }} className="font-serif">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{ color: '#f5f1e8', fontSize: '26px', lineHeight: 1, width: '32px', height: '32px' }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* メニュー本体 */}
        <nav style={{ backgroundColor: '#0e0e0e', flexShrink: 0 }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li
                key={item.href}
                style={{ borderBottom: '1px solid rgba(201,169,97,0.12)' }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '13px 20px',
                    color: '#f5f1e8',
                    fontSize: '13px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: '#c9a961', fontSize: '12px' }}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* フッター */}
        <div
          style={{
            backgroundColor: '#161616',
            flexShrink: 0,
            padding: '14px 20px',
            borderTop: '1px solid rgba(201,169,97,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LanguageSwitcher />
          </div>
          <Link
            href="/reservation"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#c9a961',
              color: '#0e0e0e',
              textAlign: 'center',
              padding: '11px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {t('reserve')}
          </Link>
        </div>
      </aside>
    </>
  );
}
