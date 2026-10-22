'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Check, ChevronRight, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { useQuoteBasket } from '@/context/QuoteBasketContext';
import ProductCard from '@/components/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const { addItem } = useQuoteBasket();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [justAdded, setJustAdded] = useState(false);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleManualQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
    }
  };

  const handleAddToQuote = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const handleRequestQuote = () => {
    addItem(product, quantity);
    router.push('/request-quote');
  };

  const categoryLabel = {
    tyres: 'Tyres',
    trucks: 'Trucks',
    batteries: 'Batteries',
    vehicles: 'Vehicles',
  }[product.category];

  return (
    <div className="bg-white min-h-screen py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching reference: Home > Tyres > Truck Tyre */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-8 overflow-x-auto pb-1">
          <Link href="/" className="hover:text-[#C91F26] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/products" className="hover:text-[#C91F26] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href={`/${product.category}`} className="hover:text-[#C91F26] transition-colors capitalize">
            {categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#171B1F] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left: Product Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] bg-white border border-[#E3E4E6] rounded-lg p-3 sm:p-4 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-1.5"
                />
              </div>
            </div>

            {/* Thumbnail Gallery if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded border p-1 bg-white shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-[#C91F26] ring-1 ring-[#C91F26]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Quote Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C91F26] bg-[#FDF2F2] px-2.5 py-1 rounded inline-block mb-3">
                {product.brand} · {product.category.toUpperCase()}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171B1F] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                {product.brand} · {product.specifications['Size'] || product.specifications['Model'] || ''}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-[#6B7077] text-sm leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Key Specifications Box matching reference */}
            <div className="bg-[#FBFBFB] border border-[#E3E4E6] rounded-lg p-5 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#171B1F] border-b border-gray-200 pb-2">
                Key Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-gray-100 pb-1.5 last:border-b-0">
                    <span className="text-gray-400 text-xs">{key}</span>
                    <span className="font-semibold text-[#191B1F]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Actions */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#D0D3D6] rounded bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleManualQuantity}
                    className="w-16 h-10 text-center font-bold text-sm text-[#191B1F] focus:outline-none border-x border-[#D0D3D6]"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                <button
                  onClick={handleAddToQuote}
                  className={`flex-1 py-3.5 px-6 rounded font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#C91F26] hover:bg-[#A71920] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Quote</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleRequestQuote}
                  className="flex-1 py-3.5 px-6 rounded font-semibold text-sm uppercase tracking-wider border border-[#C91F26] text-[#C91F26] hover:bg-[#C91F26] hover:text-white flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Commercial Assurance */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Genuine factory specifications. Direct business quotation and nationwide distribution in Nigeria.
              </span>
            </div>
          </div>
        </div>

        {/* Restrained Product Overview Section matching reference */}
        <div className="border-t border-[#E3E4E6] pt-12 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-[#171B1F] mb-4">
              Product Overview
            </h2>
            <div className="prose prose-sm text-[#6B7077] leading-relaxed space-y-4">
              <p>{product.fullDescription}</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#E3E4E6] pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#171B1F]">
                Related Products
              </h2>
              <Link
                href="/products"
                className="text-xs font-semibold text-[#C91F26] hover:underline flex items-center gap-1"
              >
                <span>View all products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  primaryAction={rel.category === 'tyres' ? 'add' : 'quote'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
