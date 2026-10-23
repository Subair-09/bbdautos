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
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://www.bbdautosng.com/products/${product.slug}`;
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `https://www.bbdautosng.com${product.image}`;

  return {
    title: `${product.name} | ${product.brand} in Nigeria | BBD Autos`,
    description: product.shortDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | BBD Autos Nigeria`,
      description: product.shortDescription,
      url: canonicalUrl,
      siteName: 'BBD Autos',
      locale: 'en_NG',
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | BBD Autos Nigeria`,
      description: product.shortDescription,
      images: [imageUrl],
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [
      product.image.startsWith('http')
        ? product.image
        : `https://www.bbdautosng.com${product.image}`,
    ],
    description: product.fullDescription || product.shortDescription,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `https://www.bbdautosng.com/products/${product.slug}`,
      priceCurrency: 'NGN',
      price: 'Contact for Quote',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'AutoDealer',
        name: 'BBD Autos',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.bbdautosng.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://www.bbdautosng.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        item: `https://www.bbdautosng.com/${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://www.bbdautosng.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={related}
      />
    </>
  );
}
