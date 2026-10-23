import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tyres in Nigeria | Commercial, Radial & Industrial Tyres | BBD Autos',
  description:
    'Quality commercial truck radial tyres, solid industrial forklift tyres, and passenger tyres from Apollo, Bridgestone, CEAT, Michelin, BKT, and Maxxis at BBD Autos Nigeria.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/tyres',
  },
  openGraph: {
    title: 'Tyres in Nigeria | Commercial & Industrial Tyres | BBD Autos',
    description:
      'Quality commercial truck radial tyres, solid industrial forklift tyres, and passenger tyres from Apollo, Bridgestone, CEAT, Michelin, BKT, and Maxxis at BBD Autos Nigeria.',
    url: 'https://www.bbdautosng.com/tyres',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function TyresPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading tyres...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="tyres" />
    </Suspense>
  );
}
