'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    try {
      await fetch('/api/contact', {
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
      className="max-w-2xl mx-auto bg-bg-3 p-6 sm:p-8 md:p-12 border border-border space-y-4 sm:space-y-5"
    >
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

      <div>
        <label className={labelCls}>{t('subject')}</label>
        <input name="subject" type="text" required className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>{t('message')}</label>
        <textarea name="message" rows={6} required className={inputCls + " resize-y"} />
      </div>

      {/* ハニーポット (botトラップ) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold text-bg border border-gold py-4 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-transparent hover:text-gold transition-all disabled:opacity-60"
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
