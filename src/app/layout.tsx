import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { QuoteBasketProvider } from '@/context/QuoteBasketContext';

export const viewport: Viewport = {
  themeColor: '#171B1F',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bbdautosng.com'),
  title: {
    default: 'BBD Autos | Trucks, Vehicles & Tyres in Nigeria',
    template: '%s | BBD Autos',
  },
  description:
    'Explore trucks, vehicles and quality tyres from BBD Autos. Request a quotation for your automotive and commercial vehicle needs in Nigeria.',
  keywords: [
    'BBD Autos',
    'Trucks for sale in Nigeria',
    'Commercial vehicles in Nigeria',
    'Tyres in Nigeria',
    'Automotive batteries Nigeria',
    'Heavy-duty truck quotation',
    'Radial truck tyres 295/80R22.5',
    'Commercial fleet supplier Lagos',
    'BBD Autos Nigeria Oshodi',
  ],
  authors: [{ name: 'BBD Autos', url: 'https://www.bbdautosng.com' }],
  creator: 'BBD Autos',
  publisher: 'BBD Autos',
  applicationName: 'BBD Autos',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'BBD Autos | Trucks, Vehicles & Tyres in Nigeria',
    description:
      'Explore trucks, vehicles and quality tyres from BBD Autos. Request a quotation for your automotive and commercial vehicle needs in Nigeria.',
    url: 'https://www.bbdautosng.com/',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: 'https://www.bbdautosng.com/images/og-bbdautos.jpg',
        width: 1200,
        height: 630,
        alt: 'BBD Autos - Trucks, Vehicles, Batteries and Tyres in Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BBD Autos | Trucks, Vehicles & Tyres in Nigeria',
    description:
      'Explore trucks, vehicles and quality tyres from BBD Autos. Request a quotation for your automotive and commercial vehicle needs in Nigeria.',
    images: ['https://www.bbdautosng.com/images/og-bbdautos.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <JsonLd />
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
