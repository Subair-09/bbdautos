import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Automotive & Commercial Products Catalogue | BBD Autos Nigeria',
  description:
    'Browse the full BBD Autos inventory: commercial haulage trucks, light commercial vehicles, radial tyres, and starting batteries in Nigeria. Filter by category, brand, and size.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/products',
  },
  openGraph: {
    title: 'Automotive & Commercial Products Catalogue | BBD Autos',
    description:
      'Browse the full BBD Autos inventory: commercial haulage trucks, light commercial vehicles, radial tyres, and starting batteries in Nigeria. Filter by category, brand, and size.',
    url: 'https://www.bbdautosng.com/products',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading catalogue...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="all" />
    </Suspense>
  );
}
