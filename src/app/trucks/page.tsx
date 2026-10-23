import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Commercial Trucks for Sale in Nigeria | BBD Autos',
  description:
    'Explore commercial trucks for sale in Nigeria from FAW, Forland, Foton, ISUZU, Shacman, and Sinotruk HOWO. Request a quotation from BBD Autos today.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/trucks',
  },
  openGraph: {
    title: 'Commercial Trucks for Sale in Nigeria | BBD Autos',
    description:
      'Explore commercial trucks for sale in Nigeria from FAW, Forland, Foton, ISUZU, Shacman, and Sinotruk HOWO. Request a quotation from BBD Autos today.',
    url: 'https://www.bbdautosng.com/trucks',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function TrucksPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading trucks...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="trucks" />
    </Suspense>
  );
}
