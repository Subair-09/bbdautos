import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Users, MapPin, Wrench, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About BBD Autos | Trucks, Vehicles & Fleet Solutions in Nigeria',
  description:
    'Built on Trust. Focused on Your Business. Learn about BBD Autos, Nigeria’s trusted supplier of commercial trucks, vehicles, industrial tyres, and batteries.',
  alternates: {
    canonical: 'https://www.bbdautosng.com/about',
  },
  openGraph: {
    title: 'About BBD Autos | Commercial Vehicles & Tyres in Nigeria',
    description:
      'Built on Trust. Focused on Your Business. Learn about BBD Autos, Nigeria’s trusted supplier of commercial trucks, vehicles, industrial tyres, and batteries.',
    url: 'https://www.bbdautosng.com/about',
    siteName: 'BBD Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function AboutPage() {
  const whoWeServe = [
    {
      title: 'Fleet & Logistics Operators',
      desc: 'High-mileage tyres, haulage tractors, and scheduled commercial delivery support.',
    },
    {
      title: 'Construction & Civil Works',
      desc: 'Heavy-duty tippers, dumpers, site utility pickups, and reinforced off-road radial tyres.',
    },
    {
      title: 'Interstate Transport Businesses',
      desc: 'Reliable 15-seater passenger commuter vans and long-distance coach tyres.',
    },
    {
      title: 'Corporate Organisations',
      desc: 'Executive 4x4 SUVs, administrative fleet vehicles, and routine operational units.',
    },
    {
      title: 'Regional Automotive Dealers',
      desc: 'Wholesale container-load tyre shipments and multi-unit truck consignments.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION matching reference Panel 5 */}
      <section className="bg-gradient-to-b from-white to-[#FBFBFB] py-14 lg:py-20 border-b border-[#F0F0F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-5 h-0.5 bg-[#C91F26]" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  ABOUT US
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171B1F] tracking-tight leading-tight">
                Built for movement. <br />
                <span className="text-[#C91F26]">Built for trust.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#6B7077] leading-relaxed max-w-xl">
                BBD Autos is an emerging automotive company built from a vision that began in 2019 and was brought to life on 28 January 2026. We specialize in the sales, sourcing and distribution of vehicles, automotive spare parts, tyres, batteries, rims, accessories and industrial equipment across Nigeria.
              </p>

              <div className="pt-2">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-7 py-3.5 rounded font-semibold text-sm transition-all shadow-sm"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Truck & Tyre Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] bg-[#FAFAFA] border border-[#E3E4E6] rounded-xl p-4 overflow-hidden shadow-2xs">
                <Image
                  src="/images/hero/red_heavy_truck_hd.jpg"
                  alt="BBD Autos Commercial Transport Fleet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 DRIVE VALUES matching official company profile */}
      <section className="py-16 bg-white border-b border-[#F0F0F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C91F26] mb-1 block">
              OUR CORE VALUES
            </span>
            <h2 className="text-3xl font-extrabold text-[#171B1F] tracking-tight">
              DRIVE <span className="text-gray-400 font-normal text-xl">— Our values in five words</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA] text-center hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#C91F26] text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                D
              </div>
              <h3 className="font-bold text-base text-[#171B1F]">Dependability</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Consistency in product delivery and trustworthy supply chain schedules.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA] text-center hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#C91F26] text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                R
              </div>
              <h3 className="font-bold text-base text-[#171B1F]">Reliability</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Proven vehicles, heavy trucks, and tyres that endure harsh operational roads.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA] text-center hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#C91F26] text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                I
              </div>
              <h3 className="font-bold text-base text-[#171B1F]">Integrity</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Honest specifications, genuine components, and transparent business ethics.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA] text-center hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#C91F26] text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                V
              </div>
              <h3 className="font-bold text-base text-[#171B1F]">Value</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Competitive corporate pricing that reduces your fleet’s cost per kilometre.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA] text-center hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#C91F26] text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                E
              </div>
              <h3 className="font-bold text-base text-[#171B1F]">Excellence</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                After-sales maintenance, expert advice, and uncompromising standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION & SOURCING APPROACH */}
      <section className="py-16 lg:py-20 bg-[#FBFBFB]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-5 h-0.5 bg-[#C91F26]" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  OUR MISSION
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#171B1F] tracking-tight">
                Empowering Nigerian Commercial Transport
              </h2>
              <div className="prose text-sm text-[#6B7077] space-y-4 leading-relaxed">
                <p>
                  To be Nigeria's most trusted automotive partner, delivering quality products and exceptional service that keeps businesses moving. We bridge the gap between world-class automotive manufacturing and Nigerian road realities.
                </p>
                <p>
                  Our tyre inventory is selected specifically for high heat resistance, puncture protection, and prolonged tread life on interstate expressways and mixed-terrain industrial sites. Our trucks and commercial vehicles are chosen for structural strength, powertrain reliability, and low total cost of ownership.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  'Strict quality vetting on all tyre compounds and radial casings',
                  'Chassis reinforcement suited for heavy payload commercial transport',
                  'Reliable parts availability and straightforward fleet quotations',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-[#191B1F] font-medium">
                    <CheckCircle className="w-4 h-4 text-[#C91F26] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-white border border-[#E3E4E6] rounded-xl overflow-hidden shadow-2xs">
                <Image
                  src="/images/categories/tyres_stack_hd.jpg"
                  alt="BBD Autos commercial tyre warehouse and distribution"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 bg-white border-t border-[#F0F0F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C91F26] mb-2 block">
              ENTERPRISE & COMMERCIAL CLIENTS
            </span>
            <h2 className="text-3xl font-extrabold text-[#171B1F] tracking-tight">
              Who We Serve
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              From individual owner-operators to nationwide industrial conglomerates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoWeServe.map((client, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA] hover:border-gray-300 transition-colors"
              >
                <div className="w-8 h-8 rounded bg-white text-[#C91F26] border border-gray-200 flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-[#171B1F] mb-2">
                  {client.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {client.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFIED CORPORATE CLIENTS matching Page 12 of company profile */}
      <section className="py-16 bg-[#FAFAFA] border-t border-[#F0F0F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C91F26] mb-1 block">
              OUR CUSTOMERS
            </span>
            <h2 className="text-3xl font-extrabold text-[#171B1F] tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Proud partners and suppliers to premier manufacturing, FMCG, packaging, and commercial conglomerates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {[
              { name: 'Planet Bottling Company (PBC)', src: '/images/clients/planet_bottling_company.jpg' },
              { name: 'Hello Products', src: '/images/clients/hello_products.png' },
              { name: 'Euro Global Foods and Distilleries', src: '/images/clients/euro_global_foods.jpg' },
              { name: 'Euromega Atlantic Nigeria', src: '/images/clients/euromega_atlantic.jpg' },
              { name: 'Studio Press Packaging (SPN)', src: '/images/clients/studio_press_packaging.jpg' },
              { name: 'TGI Group (Tropical General Investments)', src: '/images/clients/tgi_group.jpg' },
            ].map((client, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E3E4E6] rounded-xl p-4 sm:p-5 h-28 sm:h-32 lg:h-36 flex items-center justify-center hover:border-gray-400 hover:shadow-md transition-all group"
                title={client.name}
              >
                <div className="relative w-full h-full max-h-20 sm:max-h-24 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#171B1F] text-white py-14">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-3">
            Ready to Equip Your Fleet?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
            Speak with our commercial sales engineers today or request a bulk quotation tailored to your requirements.
          </p>
          <Link
            href="/request-quote"
            className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-8 py-3.5 rounded font-semibold text-sm transition-colors shadow-sm"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
