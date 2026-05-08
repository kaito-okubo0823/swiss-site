import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import CookieConsent from '@/components/CookieConsent';
import StructuredData from '@/components/StructuredData';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = 'https://alpinekitchen.ch';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Hero' });
  const tSite = await getTranslations({ locale, namespace: 'Site' });

  const title = `${tSite('name')} — Restaurant Zürich`;
  const description = t('lead');

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${tSite('name')}`,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: '/de',
        fr: '/fr',
        it: '/it',
        en: '/en',
        'x-default': '/de',
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      title,
      description,
      siteName: tSite('name'),
      locale: locale === 'de' ? 'de_CH' : locale === 'fr' ? 'fr_CH' : locale === 'it' ? 'it_CH' : 'en_US',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
          width: 1200,
          height: 630,
          alt: tSite('name'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg text-text font-sans antialiased">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatBot />
          <CookieConsent />
          <StructuredData />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
