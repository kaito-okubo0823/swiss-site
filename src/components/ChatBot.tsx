'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Msg = { type: 'bot' | 'user'; text: string };

export default function ChatBot() {
  const t = useTranslations('Chat');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ type: 'bot', text: t('welcome') }]);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  // 言語切替時に最初のメッセージを更新
  useEffect(() => {
    setMessages([{ type: 'bot', text: t('welcome') }]);
  }, [t]);

  const ask = (topic: 'hours' | 'reserve' | 'menu' | 'access') => {
    const userText = t(`q_${topic}` as 'q_hours' | 'q_reserve' | 'q_menu' | 'q_access');
    const botText = t(`a_${topic}` as 'a_hours' | 'a_reserve' | 'a_menu' | 'a_access');
    setMessages((m) => [...m, { type: 'user', text: userText }]);
    setTimeout(() => setMessages((m) => [...m, { type: 'bot', text: botText }]), 600);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { type: 'user', text }]);
    setInput('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply: string;
      if (/zeit|hour|open|orari|horaire|öffnung|aperto/.test(lower)) reply = t('a_hours');
      else if (/reserv|prenot/.test(lower)) reply = t('a_reserve');
      else if (/menu|karte|carte|cibo|food/.test(lower)) reply = t('a_menu');
      else if (/anfahrt|access|come|comment|where|dove|wo/.test(lower)) reply = t('a_access');
      else reply = t('a_default');
      setMessages((m) => [...m, { type: 'bot', text: reply }]);
    }, 700);
  };

  return (
    <>
      {/* フローティングボタン */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold text-bg text-2xl shadow-[0_8px_24px_rgba(201,169,97,0.4)] z-[150] hover:scale-110 transition-transform"
        aria-label="Chat"
      >
        {open ? '×' : '💬'}
      </button>

      {/* チャットウィンドウ */}
      <div
        className={`fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] bg-bg-2 border border-gold-dark z-[150] flex-col shadow-2xl transition-all duration-300 ${
          open ? 'flex animate-fade-up' : 'hidden'
        }`}
      >
        {/* ヘッダー */}
        <div className="p-4 bg-bg-3 border-b border-border">
          <h4 className="font-serif text-gold text-base font-medium">{t('title')}</h4>
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {t('status')}
          </div>
        </div>

        {/* メッセージ */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                m.type === 'bot'
                  ? 'bg-bg-3 self-start rounded-bl-sm'
                  : 'bg-gold-dark text-bg self-end rounded-br-sm'
              }`}
            >
              {m.text}
            </div>
          ))}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(['hours', 'reserve', 'menu', 'access'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  className="border border-gold-dark text-gold px-3 py-1.5 rounded-2xl text-xs hover:bg-gold hover:text-bg transition-colors"
                >
                  {t(`q_${q}` as 'q_hours' | 'q_reserve' | 'q_menu' | 'q_access')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 入力欄 */}
        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={t('placeholder')}
            className="flex-1 bg-bg border border-border text-text px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          <button
            onClick={send}
            className="bg-gold text-bg px-4 py-2 font-semibold hover:opacity-90 transition-opacity"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}
