import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BBD Autos Nigeria',
  description: 'Terms and Conditions of commercial automotive supply and quotation for BBD Autos.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-[#171B1F] mb-6">
          Terms & Conditions
        </h1>
        <div className="prose prose-sm text-gray-600 space-y-5 leading-relaxed">
          <p>
            Welcome to BBD Autos. By browsing our product catalogue or submitting requests for quotations (RFQs), you agree to comply with and be bound by the following terms.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">1. Request for Quotations (RFQ)</h3>
          <p>
            Items selected in the online Quote Basket and submitted via RFQ constitute an invitation to treat and do not represent a final binding purchase contract. Formal proforma invoices with verified stock availability and transport logistics will be issued following review.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">2. Product Specifications</h3>
          <p>
            All tyre dimensions, load ratings, speed indices, truck engine ratings, and vehicle capacities provided on this site are indicative factory standards. Final technical compliance should be confirmed upon quotation issuance.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">3. Pricing & Currency</h3>
          <p>
            Quoted prices are provided in Nigerian Naira (NGN) or United States Dollars (USD) as appropriate for institutional procurement. Prices are subject to prevailing foreign exchange fluctuations and verified customs clearing charges.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">4. Commercial Delivery</h3>
          <p>
            Delivery schedules and logistics depot dispatch across Nigeria will be agreed upon during commercial contract finalisation.
          </p>
        </div>
      </div>
    </div>
  );
}
