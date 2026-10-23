import React from 'react';

export default function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.bbdautosng.com/#website',
    url: 'https://www.bbdautosng.com/',
    name: 'BBD Autos',
    alternateName: ['BBD Autos Nigeria', 'BBDAutos'],
    description:
      'Quality commercial trucks, vehicles, automotive batteries and industrial tyres across Nigeria.',
    publisher: {
      '@id': 'https://www.bbdautosng.com/#autodealer',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.bbdautosng.com/products?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-NG',
  };

  const autoDealerSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoDealer', 'LocalBusiness'],
    '@id': 'https://www.bbdautosng.com/#autodealer',
    name: 'BBD Autos',
    legalName: 'BBD Autos',
    alternateName: 'BBD Autos Nigeria',
    url: 'https://www.bbdautosng.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.bbdautosng.com/images/brand/bbd_auto_logo.png',
      width: 198,
      height: 101,
      caption: 'BBD Autos Logo',
    },
    image: 'https://www.bbdautosng.com/images/og-bbdautos.jpg',
    description:
      'BBD Autos is a premier automotive and commercial dealership in Nigeria supplying heavy-duty trucks, executive SUVs, commercial vehicles, industrial radial tyres, and starting batteries.',
    telephone: ['+2349039546124', '+2349162030930'],
    email: ['sales@bbdautosng.com', 'info@bbdautosng.com'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '20 Babayanju, Oshodi',
      addressLocality: 'Oshodi',
      addressRegion: 'Lagos State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.5568,
      longitude: 3.3496,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '16:00',
      },
    ],
    priceRange: '₦₦₦',
    currenciesAccepted: 'NGN',
    paymentAccepted: 'Bank Transfer, Commercial Invoice, Cheque',
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'BBD Autos Commercial Supply Catalog',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Commercial Trucks',
          description: 'Heavy-duty tippers, prime movers, 6x4 haulage, and light commercial trucks.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Commercial & Industrial Tyres',
          description: 'Heavy truck radial tyres (295/80R22.5, 12.00R20), solid forklift tyres, and passenger tyres.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Automotive & Commercial Batteries',
          description: 'Maintenance-free calcium starting batteries from Solite, Rocket, Bosch, Sebang, and EverStart.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Commercial Vehicles & SUVs',
          description: 'Executive passenger SUVs, double-cabin pickups, and multi-passenger commuter vans.',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealerSchema) }}
      />
    </>
  );
}
