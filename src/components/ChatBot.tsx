'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Msg = { type: 'bot' | 'user'; text: string };

export default function ChatBot() {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ type: 'bot', text: t('welcome') }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    setMessages([{ type: 'bot', text: t('welcome') }]);
  }, [t]);

  const ask = async (topic: 'hours' | 'reserve' | 'menu' | 'access') => {
    const userText = t(`q_${topic}` as 'q_hours' | 'q_reserve' | 'q_menu' | 'q_access');
    setMessages((m) => [...m, { type: 'user', text: userText }]);
    setThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, locale }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { type: 'bot', text: data.reply || t(`a_${topic}` as 'a_hours' | 'a_reserve' | 'a_menu' | 'a_access') }]);
    } catch {
      // fallback
      setMessages((m) => [...m, { type: 'bot', text: t(`a_${topic}` as 'a_hours' | 'a_reserve' | 'a_menu' | 'a_access') }]);
    } finally {
      setThinking(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { type: 'user', text }]);
    setInput('');
    setThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locale }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { type: 'bot', text: data.reply || t('a_default') }]);
    } catch {
      setMessages((m) => [...m, { type: 'bot', text: t('a_default') }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold text-bg text-2xl shadow-[0_8px_24px_rgba(201,169,97,0.4)] z-[150] hover:scale-110 transition-transform"
        aria-label="Chat"
      >
        {open ? '×' : '💬'}
      </button>

      <div
        className={`fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] bg-bg-2 border border-gold-dark z-[150] flex-col shadow-2xl transition-all duration-300 ${
          open ? 'flex animate-fade-up' : 'hidden'
        }`}
      >
        <div className="p-4 bg-bg-3 border-b border-border">
          <h4 className="font-serif text-gold text-base font-medium">{t('title')}</h4>
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {t('status')}
          </div>
        </div>

        <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 chat-scroll">
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

          {thinking && (
            <div className="bg-bg-3 self-start rounded-xl rounded-bl-sm px-3.5 py-2.5 text-sm">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              </span>
            </div>
          )}

          {messages.length === 1 && !thinking && (
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
            disabled={thinking}
            className="bg-gold text-bg px-4 py-2 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}
