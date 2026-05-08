export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Alpine Kitchen',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920',
    '@id': 'https://alpinekitchen.ch',
    url: 'https://alpinekitchen.ch',
    telephone: '+41-44-123-45-67',
    priceRange: 'CHF 40-90',
    servesCuisine: ['Swiss', 'Alpine', 'European'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstrasse 42',
      addressLocality: 'Zürich',
      postalCode: '8001',
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.3742,
      longitude: 8.5392,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:30',
        closes: '23:00',
      },
    ],
    acceptsReservations: 'True',
    sameAs: [
      'https://www.instagram.com/alpinekitchen',
      'https://www.facebook.com/alpinekitchen',
      'https://www.tripadvisor.com/alpinekitchen',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
