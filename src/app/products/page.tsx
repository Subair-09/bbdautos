import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ProductCatalogueClient from '@/components/ProductCatalogueClient';

export const revalidate = 60;

export default function ProductsPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading catalogue...</div>}>
      <ProductCatalogueClient initialProducts={products} initialCategory="all" />
    </Suspense>
  );
}
