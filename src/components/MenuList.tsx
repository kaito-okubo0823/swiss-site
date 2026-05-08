'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  cat: 'starter' | 'main' | 'dessert' | 'drink';
  allergens?: string[];
};

const items: MenuItem[] = [
  // Starters
  { cat: 'starter', name: 'Bündner Gerstensuppe', desc: 'Traditionelle Suppe mit Graubündner Bergkäse und geräuchertem Speck', price: 'CHF 14' },
  { cat: 'starter', name: 'Felchen-Carpaccio', desc: 'Hauchdünn geschnittener Zürichseefisch mit Zitronen-Olivenöl und frischen Kräutern', price: 'CHF 22', allergens: ['Glutenfrei'] },
  { cat: 'starter', name: 'Alpkäse-Salat', desc: 'Rucola, Birnen, Walnüsse und 12 Monate gereifter Berner Alpkäse', price: 'CHF 18', allergens: ['Vegetarisch'] },
  { cat: 'starter', name: 'Bauern-Brot mit Aufstrichen', desc: 'Hausgebackenes Sauerteigbrot mit drei saisonalen Aufstrichen', price: 'CHF 12', allergens: ['Vegan'] },
  // Mains
  { cat: 'main', name: 'Zürcher Geschnetzeltes', desc: 'Kalbfleisch in Rahmsauce mit Champignons und Rösti — unser Klassiker', price: 'CHF 42' },
  { cat: 'main', name: 'Älplermagronen', desc: 'Hausgemachte Pasta mit Bergkartoffeln, Sbrinz und gebratenen Zwiebeln', price: 'CHF 32', allergens: ['Vegetarisch'] },
  { cat: 'main', name: 'Forelle aus dem Engadin', desc: 'Ganze gebratene Forelle mit Mandelbutter, Pellkartoffeln und Saisongemüse', price: 'CHF 48', allergens: ['Glutenfrei'] },
  { cat: 'main', name: 'Pilz-Risotto', desc: 'Cremiges Risotto mit Steinpilzen aus dem Tessin und Trüffel', price: 'CHF 36', allergens: ['Vegan'] },
  // Desserts
  { cat: 'dessert', name: 'Engadiner Nusstorte', desc: 'Hausgemacht nach Familienrezept, mit Vanilleeis', price: 'CHF 14' },
  { cat: 'dessert', name: 'Schoggi-Mousse', desc: 'Aus Schweizer 70% Bitterschokolade, mit Himbeeren', price: 'CHF 12', allergens: ['Vegetarisch'] },
  // Drinks
  { cat: 'drink', name: 'Heida „Visperterminen"', desc: 'Trockener Walliser Weisswein, mineralisch und elegant', price: 'CHF 12 / Glas' },
  { cat: 'drink', name: 'Pinot Noir Graubünden', desc: 'Aus 580 m Höhe, samtig und vollmundig', price: 'CHF 14 / Glas' },
];

const allergenColors: Record<string, string> = {
  'Vegetarisch': 'text-emerald-400 border-emerald-400/30',
  'Vegan': 'text-green-400 border-green-400/30',
  'Glutenfrei': 'text-amber-400 border-amber-400/30',
};

export default function MenuList() {
  const t = useTranslations('Menu');
  const [active, setActive] = useState<MenuItem['cat']>('starter');

  const tabs: { key: MenuItem['cat']; label: string }[] = [
    { key: 'starter', label: t('starters') },
    { key: 'main', label: t('mains') },
    { key: 'dessert', label: t('desserts') },
    { key: 'drink', label: t('drinks') },
  ];

  const filtered = items.filter((i) => i.cat === active);

  return (
    <>
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-6 py-2.5 text-xs tracking-[0.18em] uppercase font-medium border transition-all ${
              active === tab.key
                ? 'bg-gold text-bg border-gold'
                : 'bg-transparent text-text-dim border-border hover:text-gold hover:border-gold-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
        {filtered.map((item, i) => (
          <div key={i} className="border-b border-dashed border-gold/20 pb-6">
            <div className="flex justify-between items-baseline gap-4 mb-2">
              <span className="font-serif text-xl font-medium">{item.name}</span>
              <span className="font-serif text-xl text-gold whitespace-nowrap">{item.price}</span>
            </div>
            <p className="text-text-dim text-sm italic">{item.desc}</p>
            {item.allergens && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {item.allergens.map((a) => (
                  <span
                    key={a}
                    className={`text-[0.65rem] px-2 py-0.5 border rounded-full ${allergenColors[a] || 'text-text-mute border-border'}`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); alert('PDF wird heruntergeladen...'); }}
          className="inline-block border border-gold text-gold px-7 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-bg transition-all"
        >
          📄 {t('pdf')}
        </a>
      </div>
    </>
  );
}
