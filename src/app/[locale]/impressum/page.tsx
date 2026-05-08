import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Footer');

  return (
    <section className="px-8 py-20 bg-bg-2 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <SectionHead tag="LEGAL" title={t('impressum')} />

        <div className="space-y-6 text-text-dim">
          <div>
            <h3 className="font-serif text-gold text-lg mb-2">Betreiber</h3>
            <p>Alpine Kitchen GmbH<br />Bahnhofstrasse 42<br />8001 Zürich, Schweiz</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">Kontakt</h3>
            <p>Telefon: +41 44 123 45 67<br />Email: info@alpinekitchen.ch</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">Handelsregister</h3>
            <p>UID: CHE-123.456.789<br />Handelsregister Kanton Zürich</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">MwSt-Nummer</h3>
            <p>CHE-123.456.789 MWST</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">Vertretungsberechtigt</h3>
            <p>Stefan Brunner, Geschäftsführer</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">Haftungsausschluss</h3>
            <p className="text-sm">
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
              Zuverlässigkeit und Vollständigkeit der Informationen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
