'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ReservationForm() {
  const t = useTranslations('Reservation');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    try {
      await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const labelCls = "block text-[0.7rem] text-text-mute tracking-[0.18em] mb-2 uppercase font-medium";
  const inputCls = "w-full bg-bg border border-border text-text px-4 py-3 text-base focus:outline-none focus:border-gold transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-bg-3 p-8 md:p-12 border border-border space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>{t('date')}</label>
          <input name="date" type="date" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t('time')}</label>
          <select name="time" required className={inputCls}>
            {['11:30','12:00','12:30','13:00','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>{t('guests')}</label>
          <select name="guests" required className={inputCls}>
            {[1,2,3,4,5,6,7,'8+'].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{t('name')}</label>
          <input name="name" type="text" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t('email')}</label>
          <input name="email" type="email" required className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{t('phone')}</label>
          <input name="phone" type="tel" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t('occasion')}</label>
          <input name="occasion" type="text" className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>{t('notes')}</label>
        <textarea name="notes" rows={3} className={inputCls + " resize-y"} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold text-bg border border-gold py-4 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-transparent hover:text-gold transition-all mt-2 disabled:opacity-60"
      >
        {submitting ? '...' : t('submit')}
      </button>

      {submitted && (
        <div className="text-emerald-400 text-center text-sm mt-4 p-3 border border-emerald-400/30 bg-emerald-400/5">
          ✓ {t('success')}
        </div>
      )}
    </form>
  );
}
