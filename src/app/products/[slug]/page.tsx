import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/db';
import ProductDetailClient from '@/components/ProductDetailClient';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | BBD Autos',
    };
  }
  return {
    title: `${product.name} | BBD Autos Nigeria`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | BBD Autos`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = getProducts();
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={related}
    />
  );
}
