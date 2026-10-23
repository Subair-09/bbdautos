import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Commercial Vehicles & SUVs in Nigeria | BBD Autos',
  description:
    'Discover executive SUVs, passenger vans, and commercial pickups in Nigeria from Chery, Changan, Jetour, Soueast, and Tata at BBD Autos.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/vehicles',
  },
  openGraph: {
    title: 'Commercial Vehicles & SUVs in Nigeria | BBD Autos',
    description:
      'Discover executive SUVs, passenger vans, and commercial pickups in Nigeria from Chery, Changan, Jetour, Soueast, and Tata at BBD Autos.',
    url: 'https://www.bbdautosng.com/vehicles',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function VehiclesPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading vehicles...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="vehicles" />
    </Suspense>
  );
}
