'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useQuoteBasket } from '@/context/QuoteBasketContext';

interface ProductCardProps {
  product: Product;
  primaryAction?: 'add' | 'quote';
}

export default function ProductCard({ product, primaryAction = 'add' }: ProductCardProps) {
  const router = useRouter();
  const { addItem, isInBasket } = useQuoteBasket();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    router.push('/request-quote');
  };

  // Format specifications for card display
  const specEntries = Object.entries(product.specifications).slice(0, 3);

  return (
    <div className="group bg-white border border-[#E3E4E6] rounded-lg overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-md transition-all duration-200">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block relative bg-white aspect-[4/3] p-3 overflow-hidden border-b border-[#F0F0F0]">
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product.inStock && (
          <span className="absolute top-3 left-3 bg-white/90 border border-gray-200 text-[#171B1F] text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
            {product.category.toUpperCase()}
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-lg text-[#171B1F] hover:text-[#C91F26] transition-colors leading-snug mb-3">
              {product.name}
            </h3>
          </Link>

          {/* Specifications Grid */}
          <div className="space-y-1.5 text-xs text-gray-600 mb-6 bg-[#F9F9F9] p-3 rounded border border-gray-100">
            <div className="flex justify-between border-b border-gray-200/60 pb-1">
              <span className="text-gray-400">Brand</span>
              <span className="font-medium text-[#191B1F]">{product.brand}</span>
            </div>
            {specEntries.map(([key, val]) => (
              <div key={key} className="flex justify-between border-b border-gray-200/60 last:border-b-0 pb-1 last:pb-0">
                <span className="text-gray-400">{key}</span>
                <span className="font-medium text-[#191B1F] truncate max-w-[150px]">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div>
          {primaryAction === 'add' ? (
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#C91F26] hover:bg-[#A71920] text-white shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Quote</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Quote</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleRequestQuote}
              className="w-full py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider border border-[#C91F26] text-[#C91F26] hover:bg-[#C91F26] hover:text-white flex items-center justify-center gap-2 transition-all duration-150"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
