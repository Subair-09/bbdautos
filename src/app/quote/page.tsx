import React from 'react';
import type { Metadata } from 'next';
import QuoteBasketClient from '@/components/QuoteBasketClient';

export const metadata: Metadata = {
  title: 'Quote Basket | Selected Products | BBD Autos',
  description:
    'Review your selected commercial vehicles, trucks, tyres, and batteries before requesting an official BBD Autos quotation.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/quote',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function QuoteBasketPage() {
  return <QuoteBasketClient />;
}
