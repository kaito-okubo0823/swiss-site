import { NextResponse } from 'next/server';

/**
 * AIチャットエンドポイント
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY - Claude API キー (任意)
 *   OPENAI_API_KEY    - OpenAI API キー (任意)
 *
 * どちらも未設定の場合はキーワードマッチによるモック応答。
 */

type ChatRequest = {
  message: string;
  locale: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
};

const SYSTEM_PROMPT = `あなたはチューリッヒのレストラン「Alpine Kitchen」のデジタルアシスタントです。

店舗情報:
- 住所: Bahnhofstrasse 42, 8001 Zürich
- 電話: +41 44 123 45 67
- 営業時間: 月-土 11:30-23:00、日曜定休
- 料理: モダンスイス料理 (CHF 40-90)
- アクセス: チューリッヒ中央駅から徒歩3分、トラム4・11・13号 Paradeplatz

ユーザーの言語に合わせて回答してください (DE/FR/IT/EN)。
予約はサイトの予約フォームへ案内してください。
複雑な質問は電話番号 +41 44 123 45 67 へ案内してください。
回答は簡潔に2-3文以内で。`;

export async function POST(request: Request) {
  try {
    const { message, locale, history = [] }: ChatRequest = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // Anthropic Claude (優先)
    if (anthropicKey) {
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const client = new Anthropic({ apiKey: anthropicKey });

      const response = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        system: `${SYSTEM_PROMPT}\n\n現在のユーザー言語: ${locale}`,
        messages: [
          ...history.map((h) => ({ role: h.role === 'user' ? ('user' as const) : ('assistant' as const), content: h.content })),
          { role: 'user' as const, content: message },
        ],
      });

      const reply = response.content
        .filter((c) => c.type === 'text')
        .map((c) => (c as { type: 'text'; text: string }).text)
        .join('');

      return NextResponse.json({ reply, mode: 'claude' });
    }

    // OpenAI fallback
    if (openaiKey) {
      const OpenAI = (await import('openai')).default;
      const client = new OpenAI({ apiKey: openaiKey });

      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 300,
        messages: [
          { role: 'system', content: `${SYSTEM_PROMPT}\n\n現在のユーザー言語: ${locale}` },
          ...history.map((h) => ({ role: h.role, content: h.content })),
          { role: 'user', content: message },
        ],
      });

      return NextResponse.json({
        reply: response.choices[0]?.message?.content || '',
        mode: 'openai',
      });
    }

    // モックモード
    return NextResponse.json({ reply: getMockReply(message, locale), mode: 'mock' });
  } catch (e) {
    console.error('Chat error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function getMockReply(message: string, locale: string): string {
  const lower = message.toLowerCase();
  const replies: Record<string, Record<string, string>> = {
    hours: {
      de: 'Wir sind Mo–Sa von 11:30 bis 23:00 Uhr geöffnet. Sonntags geschlossen. 🕐',
      fr: 'Nous sommes ouverts du lundi au samedi de 11h30 à 23h00. Fermé le dimanche. 🕐',
      it: 'Siamo aperti dal lunedì al sabato dalle 11:30 alle 23:00. Domenica chiusi. 🕐',
      en: 'We are open Mon-Sat from 11:30 AM to 11:00 PM. Closed on Sundays. 🕐',
    },
    reserve: {
      de: 'Sie können einen Tisch direkt online reservieren. 📅',
      fr: 'Vous pouvez réserver une table directement en ligne. 📅',
      it: 'Puoi prenotare un tavolo online. 📅',
      en: 'You can reserve a table directly online. 📅',
    },
    menu: {
      de: 'Unsere Karte wechselt mit den Jahreszeiten. 🍽️',
      fr: 'Notre carte change avec les saisons. 🍽️',
      it: 'Il nostro menu cambia con le stagioni. 🍽️',
      en: 'Our menu changes with the seasons. 🍽️',
    },
    access: {
      de: 'Bahnhofstrasse 42, 8001 Zürich. 3 Min. zu Fuss vom Hauptbahnhof. 📍',
      fr: 'Bahnhofstrasse 42, 8001 Zurich. 3 min à pied de la gare. 📍',
      it: 'Bahnhofstrasse 42, 8001 Zurigo. 3 min a piedi dalla stazione. 📍',
      en: 'Bahnhofstrasse 42, 8001 Zurich. 3 min walk from the main station. 📍',
    },
    default: {
      de: 'Für komplexere Fragen rufen Sie uns bitte an: +41 44 123 45 67 📞',
      fr: 'Pour des questions plus complexes, appelez-nous au +41 44 123 45 67 📞',
      it: 'Per domande più complesse, chiamaci al +41 44 123 45 67 📞',
      en: 'For complex questions, please call us at +41 44 123 45 67 📞',
    },
  };

  let key = 'default';
  if (/zeit|hour|open|orari|horaire|öffnung|aperto/.test(lower)) key = 'hours';
  else if (/reserv|prenot/.test(lower)) key = 'reserve';
  else if (/menu|karte|carte|cibo|food/.test(lower)) key = 'menu';
  else if (/anfahrt|access|come|comment|where|dove|wo/.test(lower)) key = 'access';

  const lang = ['de', 'fr', 'it', 'en'].includes(locale) ? locale : 'en';
  return replies[key][lang];
}
