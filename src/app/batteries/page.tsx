import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';

export const revalidate = 60;

export const metadata = {
  title: 'Commercial & Automotive Batteries | BBD Autos Nigeria',
  description:
    'Explore high-performance automotive, commercial truck, and industrial batteries from Solite, Rocket, Bosch, Sebang, Runall, and EverStart.',
};

export default function BatteriesPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading batteries...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="batteries" />
    </Suspense>
  );
}
