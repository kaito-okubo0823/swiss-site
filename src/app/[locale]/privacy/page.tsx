import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHead from '@/components/SectionHead';

export default async function PrivacyPage({
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
        <SectionHead tag="LEGAL" title={t('privacy')} />

        <div className="space-y-6 text-text-dim">
          <p className="text-sm italic">Stand: November 2025 — gemäss neuem Schweizer Datenschutzgesetz (nFADP / nDSG)</p>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">1. Verantwortlicher</h3>
            <p>Alpine Kitchen GmbH, Bahnhofstrasse 42, 8001 Zürich</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">2. Erhobene Daten</h3>
            <p>Wir erheben personenbezogene Daten ausschliesslich, wenn Sie diese freiwillig angeben (Reservation, Kontaktformular, Newsletter).</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">3. Verwendung der Daten</h3>
            <p>Ihre Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">4. Cookies</h3>
            <p>Wir verwenden technisch notwendige Cookies sowie — nach Ihrer Zustimmung — Analyse-Cookies (Google Analytics 4).</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">5. Ihre Rechte</h3>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung sowie Widerspruch. Kontaktieren Sie uns: privacy@alpinekitchen.ch</p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-2">6. SSL-Verschlüsselung</h3>
            <p>Alle Datenübertragungen erfolgen verschlüsselt über HTTPS.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
