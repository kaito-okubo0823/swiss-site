'use client';

import { useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=85',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=85',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85',
  'https://images.unsplash.com/photo-1574484184081-afea8a62f9ab?w=900&q=85',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=85',
  'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=85',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&q=85',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85',
];

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(src)}
            className="aspect-square bg-cover bg-center cursor-pointer overflow-hidden hover:scale-105 transition-transform group relative"
            style={{ backgroundImage: `url('${src}')` }}
            aria-label={`Bild ${i + 1}`}
          >
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-gold text-2xl">⊕</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-text text-3xl hover:text-gold"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
