import React from 'react';
import type { Metadata } from 'next';
import RequestQuoteClient from '@/components/RequestQuoteClient';

export const metadata: Metadata = {
  title: 'Request a Quotation | Commercial Fleet & Vehicles Supply | BBD Autos',
  description:
    'Submit an official quotation request for commercial trucks, passenger vehicles, industrial tyres, or batteries. Receive commercial pricing and delivery timelines across Nigeria.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/request-quote',
  },
  openGraph: {
    title: 'Request a Quotation | BBD Autos Nigeria',
    description:
      'Submit an official quotation request for commercial trucks, passenger vehicles, industrial tyres, or batteries. Receive commercial pricing and delivery timelines across Nigeria.',
    url: 'https://www.bbdautosng.com/request-quote',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RequestQuotePage() {
  return <RequestQuoteClient />;
}
