import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, MapPin } from 'lucide-react';
import { getProducts } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

export default function HomePage() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION A: HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#FBFBFB] border-b border-[#F0F0F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C91F26]" />
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                  TYRES · TRUCKS · <span className="text-[#C91F26]">COMMERCIAL VEHICLES</span>
                </p>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12]">
                <span className="text-[#171B1F] block">The Right Vehicles.</span>
                <span className="text-[#C91F26] block">The Right Partners.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#6B7077] leading-relaxed max-w-xl">
                Quality tyres, reliable trucks and premium vehicles for businesses across Nigeria. We supply what you need, when you need it.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#C91F26] hover:bg-[#A71920] text-white px-7 py-3.5 rounded font-semibold text-sm transition-all shadow-sm group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/request-quote"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F5F5F5] text-[#171B1F] border border-[#D0D3D6] px-7 py-3.5 rounded font-semibold text-sm transition-all shadow-2xs"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Right Column: Reference Red Heavy-Duty Truck */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] max-w-[620px] transition-transform duration-500 hover:scale-[1.01]">
                <Image
                  src="/images/hero/red_heavy_truck_hd.jpg"
                  alt="BBD Autos Red Heavy-Duty Commercial Truck"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: BUSINESS BENEFITS STRIP */}
      <section className="bg-[#171B1F] text-white py-8 border-y border-gray-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4 md:px-8 first:pl-0">
              <div className="p-2.5 rounded-full bg-[#22272D] text-[#C91F26] shrink-0 border border-gray-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Quality Products</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                  Trusted brands and premium quality.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-4 pt-6 md:pt-0 md:px-8">
              <div className="p-2.5 rounded-full bg-[#22272D] text-[#C91F26] shrink-0 border border-gray-800">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Business Supply</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                  For fleets, businesses and organisations.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-4 pt-6 md:pt-0 md:px-8 last:pr-0">
              <div className="p-2.5 rounded-full bg-[#22272D] text-[#C91F26] shrink-0 border border-gray-800">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Nationwide Enquiries</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                  Serving customers across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: PRODUCT CATEGORIES */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow & Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#F0F0F0] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-0.5 bg-[#C91F26]" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  EXPLORE OUR PRODUCTS
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#171B1F] tracking-tight">
                Explore Our Products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C91F26] hover:text-[#A71920] group"
            >
              <span>View all products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tyres Card */}
            <div className="bg-white border border-[#E3E4E6] rounded-lg overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="relative aspect-[16/10] bg-[#F8F9FA] p-4 border-b border-[#F0F0F0]">
                <Image
                  src="/images/categories/tyres_stack_hd.jpg"
                  alt="Durable commercial tyres"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#171B1F] mb-2">Tyres</h3>
                  <p className="text-sm text-[#6B7077] leading-relaxed mb-6">
                    Durable tyres for all types of vehicles and heavy-duty use.
                  </p>
                </div>
                <Link
                  href="/tyres"
                  className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded border border-[#E3E4E6] text-xs font-semibold text-[#171B1F] hover:border-[#C91F26] hover:text-[#C91F26] transition-colors"
                >
                  <span>Browse category</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C91F26]" />
                </Link>
              </div>
            </div>

            {/* Trucks Card */}
            <div className="bg-white border border-[#E3E4E6] rounded-lg overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="relative aspect-[16/10] bg-[#F8F9FA] p-4 border-b border-[#F0F0F0]">
                <Image
                  src="/images/categories/trucks_hd.jpg"
                  alt="Reliable heavy-duty commercial trucks"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#171B1F] mb-2">Trucks</h3>
                  <p className="text-sm text-[#6B7077] leading-relaxed mb-6">
                    Reliable trucks for your logistics, construction and transport needs.
                  </p>
                </div>
                <Link
                  href="/trucks"
                  className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded border border-[#E3E4E6] text-xs font-semibold text-[#171B1F] hover:border-[#C91F26] hover:text-[#C91F26] transition-colors"
                >
                  <span>Browse category</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C91F26]" />
                </Link>
              </div>
            </div>

            {/* Vehicles Card */}
            <div className="bg-white border border-[#E3E4E6] rounded-lg overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="relative aspect-[16/10] bg-[#F8F9FA] p-4 border-b border-[#F0F0F0]">
                <Image
                  src="/images/categories/vehicles_pair_hd.jpg"
                  alt="Quality commercial and passenger vehicles"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#171B1F] mb-2">Vehicles</h3>
                  <p className="text-sm text-[#6B7077] leading-relaxed mb-6">
                    Quality cars and commercial vehicles for your business and personal use.
                  </p>
                </div>
                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded border border-[#E3E4E6] text-xs font-semibold text-[#171B1F] hover:border-[#C91F26] hover:text-[#C91F26] transition-colors"
                >
                  <span>Browse category</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C91F26]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: FEATURED PRODUCTS */}
      <section className="py-16 lg:py-20 bg-[#FBFBFB] border-t border-[#F0F0F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow & Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAEAEA] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-0.5 bg-[#C91F26]" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  FEATURED PRODUCTS
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#171B1F] tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C91F26] hover:text-[#A71920] group"
            >
              <span>View all products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                primaryAction={idx === 0 ? 'add' : 'quote'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: BULK QUOTATION CTA */}
      <section className="relative bg-[#171B1F] text-white overflow-hidden py-16 lg:py-20 border-t border-gray-800">
        {/* Tyre Tread Photographic Background */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-30 md:opacity-50 pointer-events-none">
          <Image
            src="/images/bulk_cta_tyre_hd.jpg"
            alt="Deep truck tyre tread macro background"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171B1F] via-[#171B1F]/80 to-transparent" />
        </div>

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Need a Bulk Supply Quote?
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Get in touch with our team for the best deals on tyres, trucks and vehicles.
            </p>
            <div className="pt-2">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2.5 bg-[#C91F26] hover:bg-[#A71920] text-white px-7 py-3.5 rounded font-semibold text-sm transition-all shadow-md group"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
