'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  const labelCls = "block text-[0.7rem] text-text-mute tracking-[0.18em] mb-2 uppercase font-medium";
  const inputCls = "w-full bg-bg border border-border text-text px-4 py-3 text-base focus:outline-none focus:border-gold transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-bg-3 p-8 md:p-12 border border-border space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{t('name')}</label>
          <input type="text" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t('email')}</label>
          <input type="email" required className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>{t('subject')}</label>
        <input type="text" required className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>{t('message')}</label>
        <textarea rows={6} required className={inputCls + " resize-y"} />
      </div>

      {/* ハニーポット (スパム対策) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button
        type="submit"
        className="w-full bg-gold text-bg border border-gold py-4 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-transparent hover:text-gold transition-all"
      >
        {t('submit')}
      </button>

      {submitted && (
        <div className="text-emerald-400 text-center text-sm mt-4 p-3 border border-emerald-400/30 bg-emerald-400/5">
          ✓ {t('success')}
        </div>
      )}
    </form>
  );
}
