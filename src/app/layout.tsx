import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteBasketProvider } from '@/context/QuoteBasketContext';

export const metadata: Metadata = {
  title: 'BBD Autos | Quality Tyres, Reliable Trucks & Commercial Vehicles Nigeria',
  description: 'BBD Autos supplies quality tyres, reliable heavy-duty trucks and premium commercial vehicles for businesses and fleet operators across Nigeria.',
  keywords: [
    'BBD Autos',
    'Tyres Nigeria',
    'Truck sales Nigeria',
    'Commercial vehicles Nigeria',
    'Heavy-duty truck quotation',
    'Bulk tyre supply Lagos Abuja',
    'Radial truck tyres 295/80R22.5',
    'Fleet vehicle supplier Nigeria'
  ],
  authors: [{ name: 'BBD Autos' }],
  metadataBase: new URL('https://bbdautos.com'),
  openGraph: {
    title: 'BBD Autos | Tyres, Trucks & Commercial Vehicles',
    description: 'The Right Vehicles. The Right Partners. Quality tyres, reliable trucks and premium vehicles for businesses across Nigeria.',
    url: 'https://bbdautos.com',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#191B1F]">
        <QuoteBasketProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </QuoteBasketProvider>
      </body>
    </html>
  );
}
