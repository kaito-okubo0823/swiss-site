import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://alpinekitchen.ch';

const pages = ['', '/about', '/menu', '/reservation', '/access', '/gallery', '/events', '/contact', '/impressum', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  pages.forEach((page) => {
    routing.locales.forEach((locale) => {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      });
    });
  });

  return entries;
}
