import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171B1F] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-gray-800">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-14 h-10 bg-white rounded p-1 shrink-0 shadow-xs border border-gray-200">
                <Image
                  src="/images/brand/bbd_auto_logo.jpg"
                  alt="BBD Auto Official Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-gray-100 transition-colors">
                BBD <span className="text-[#C91F26]">AUTOS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Vehicles · Industrial · Agro-Allied Equipment
            </p>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Quality commercial vehicles, heavy-duty trucks, industrial tyres, batteries and fleet solutions across Nigeria.
            </p>
            <p className="text-[11px] text-[#C91F26] font-bold tracking-widest uppercase">
              DRIVING PERFORMANCE. DELIVERING TRUST.
            </p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/tyres" className="hover:text-white transition-colors">
                  Tyres
                </Link>
              </li>
              <li>
                <Link href="/trucks" className="hover:text-white transition-colors">
                  Trucks
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-white transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/request-quote" className="hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C91F26] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  20 Babayanju, Oshodi, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C91F26] shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs leading-relaxed">
                  <a href="mailto:Sales@bbdautosng.com" className="hover:text-white transition-colors">
                    Sales@bbdautosng.com
                  </a>
                  <a href="mailto:Info@bbdautosng.com" className="hover:text-white transition-colors">
                    Info@bbdautosng.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C91F26] shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs leading-relaxed">
                  <a href="tel:+2349039546124" className="hover:text-white transition-colors font-semibold">
                    09039546124 / +234 903 954 6124
                  </a>
                  <a href="tel:+2349162030930" className="hover:text-white transition-colors text-gray-400">
                    +234 916 203 0930
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} BBD Autos. All rights reserved.</p>

          <p className="text-xs text-gray-400 flex items-center gap-1.5 order-last md:order-none">
            <span>Designed &amp; Developed by</span>
            <span className="text-white font-semibold tracking-wide hover:text-[#C91F26] transition-colors">
              Quotients Digital Horizon Ltd
            </span>
          </p>

          <div className="flex items-center space-x-6 text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
