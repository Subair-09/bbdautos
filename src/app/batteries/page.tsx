import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Automotive & Commercial Batteries in Nigeria | BBD Autos',
  description:
    'High-performance sealed maintenance-free commercial and automotive starting batteries from Solite, Rocket, Bosch, Sebang, Runall, and EverStart at BBD Autos Nigeria.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/batteries',
  },
  openGraph: {
    title: 'Automotive & Commercial Batteries in Nigeria | BBD Autos',
    description:
      'High-performance sealed maintenance-free commercial and automotive starting batteries from Solite, Rocket, Bosch, Sebang, Runall, and EverStart at BBD Autos Nigeria.',
    url: 'https://www.bbdautosng.com/batteries',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function BatteriesPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading batteries...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="batteries" />
    </Suspense>
  );
}
