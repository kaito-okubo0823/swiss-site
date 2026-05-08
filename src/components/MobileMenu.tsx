'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

type NavItem = { href: string; label: string };

export default function MobileMenu({
  navItems,
  reserveLabel,
}: {
  navItems: NavItem[];
  reserveLabel: string;
}) {
  const [open, setOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

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
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-out drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-bg-2 z-50 transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-border">
          <span className="font-serif text-lg text-gold">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-text text-3xl leading-none w-10 h-10 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-text text-base tracking-[0.18em] uppercase hover:text-gold transition-colors py-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-border space-y-4">
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
          <Link
            href="/reservation"
            onClick={() => setOpen(false)}
            className="block w-full bg-gold text-bg text-center py-3 text-xs font-semibold tracking-[0.2em] uppercase"
          >
            {reserveLabel}
          </Link>
        </div>
      </aside>
    </>
  );
}
