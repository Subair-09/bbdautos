import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-white min-h-[65vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto space-y-5">
        <span className="text-6xl font-black text-[#C91F26]">404</span>
        <h1 className="text-2xl font-extrabold text-[#171B1F]">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          The requested page could not be found or may have been moved. Explore our product catalogue or return to the homepage.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-5 py-2.5 rounded font-semibold text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded font-semibold text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
