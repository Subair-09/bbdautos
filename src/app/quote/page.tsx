'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import { useQuoteBasket } from '@/context/QuoteBasketContext';

export default function QuoteBasketPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearBasket } = useQuoteBasket();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleProceed = () => {
    if (items.length === 0) return;
    router.push('/request-quote');
  };

  return (
    <div className="bg-white min-h-screen py-10 lg:py-16">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#F0F0F0]">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171B1F] tracking-tight">
            Your Quote Basket
          </h1>
          <p className="text-sm sm:text-base text-[#6B7077] mt-1">
            Review the items you've selected and submit a request for quotation.
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="bg-[#FAFAFA] border border-dashed border-gray-300 rounded-xl p-12 text-center max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-[#171B1F] mb-2">
              Your quote basket is empty
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Explore our range of tyres, heavy-duty trucks and commercial vehicles to request a customized business quotation.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-6 py-3 rounded font-semibold text-sm transition-colors shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div>
            {/* Desktop Table View */}
            <div className="hidden sm:block border border-[#E3E4E6] rounded-lg overflow-hidden mb-8 shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-[#E3E4E6] text-xs font-bold uppercase tracking-wider text-gray-600">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6 text-center w-40">Quantity</th>
                    <th className="py-4 px-6 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E4E6]">
                  {items.map((item) => (
                    <tr key={item.productId} className="hover:bg-[#FDFDFD] transition-colors">
                      {/* Product Column */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 bg-[#FAFAFA] border border-gray-200 rounded p-1 shrink-0 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              className="font-bold text-[#171B1F] hover:text-[#C91F26] text-base transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.specificationSummary}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Quantity Selector */}
                      <td className="py-5 px-6 text-center">
                        <div className="inline-flex items-center border border-[#D0D3D6] rounded bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-sm font-bold text-[#191B1F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Delete Action */}
                      <td className="py-5 px-6 text-right">
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-gray-400 hover:text-[#C91F26] transition-colors rounded hover:bg-red-50"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 text-[#C91F26]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white border border-[#E3E4E6] rounded-lg p-4 flex gap-4 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 bg-[#FAFAFA] border border-gray-200 rounded p-1 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#171B1F]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.specificationSummary}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="inline-flex items-center border border-[#D0D3D6] rounded bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs text-[#C91F26] flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0F0F0]">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#C91F26] font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Browsing</span>
                </Link>

                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-xs text-gray-400 hover:text-red-600 underline"
                >
                  Clear Basket
                </button>
              </div>

              <button
                onClick={handleProceed}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-8 py-3.5 rounded font-semibold text-sm transition-colors shadow-sm"
              >
                <span>Proceed to Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-sm w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertCircle className="w-6 h-6" />
                <h4 className="font-bold text-[#171B1F]">Clear Quote Basket?</h4>
              </div>
              <p className="text-sm text-gray-600">
                Are you sure you want to remove all items from your quote basket?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearBasket();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-[#C91F26] text-white rounded hover:bg-[#A71920]"
                >
                  Yes, Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
