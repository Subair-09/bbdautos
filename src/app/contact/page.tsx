import React from 'react';
import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact BBD Autos | Dealership in Oshodi, Lagos, Nigeria',
  description:
    'Contact BBD Autos for vehicle orders, commercial truck sales, tyre distribution, and fleet procurement in Nigeria. Office: 20 Babayanju, Oshodi, Lagos.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/contact',
  },
  openGraph: {
    title: 'Contact BBD Autos | Dealership in Oshodi, Lagos, Nigeria',
    description:
      'Contact BBD Autos for vehicle orders, commercial truck sales, tyre distribution, and fleet procurement in Nigeria. Office: 20 Babayanju, Oshodi, Lagos.',
    url: 'https://www.bbdautosng.com/contact',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: 'https://www.bbdautosng.com/images/og-bbdautos.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact BBD Autos Lagos Nigeria',
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
