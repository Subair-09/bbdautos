import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';

export const revalidate = 0;

export default function TyresPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading tyres...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="tyres" />
    </Suspense>
  );
}
