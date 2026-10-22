'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, ShoppingBag } from 'lucide-react';
import { useQuoteBasket } from '@/context/QuoteBasketContext';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, lastAddedName, clearLastAdded } = useQuoteBasket();

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Tyres', href: '/tyres' },
    { label: 'Trucks & Vehicles', href: '/trucks' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/products' && pathname === '/products') return true;
    if (href === '/tyres' && pathname === '/tyres') return true;
    if (href === '/trucks' && (pathname === '/trucks' || pathname === '/vehicles')) return true;
    if (href === '/about' && pathname === '/about') return true;
    if (href === '/contact' && pathname === '/contact') return true;
    return false;
  };

  return (
    <>
      {/* Toast Alert for Added Item */}
      {lastAddedName && (
        <div className="fixed top-20 right-6 z-50 bg-[#171B1F] text-white px-5 py-3.5 rounded shadow-xl border border-gray-700 flex items-center gap-3 animate-fade-in text-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Added <strong>{lastAddedName}</strong> to Quote Basket
          </span>
          <Link
            href="/quote"
            className="text-[#C91F26] hover:underline font-semibold ml-2 inline-flex items-center gap-1"
            onClick={clearLastAdded}
          >
            View Basket &rarr;
          </Link>
          <button
            onClick={clearLastAdded}
            className="text-gray-400 hover:text-white ml-1 text-base leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white border-b border-[#E3E4E6] transition-all">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
            <div className="relative w-11 h-8 shrink-0">
              <Image
                src="/images/brand/bbd_auto_logo.jpg"
                alt="BBD Auto Official Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-[#171B1F] leading-none">
                BBD <span className="text-[#C91F26]">AUTOS</span>
              </span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5 hidden sm:block">
                Vehicles · Industrial · Agro
              </span>
            </div>
          </Link>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-150 py-1 border-b-2 ${
                    active
                      ? 'text-[#C91F26] border-[#C91F26] font-semibold'
                      : 'text-[#191B1F] hover:text-[#C91F26] border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Basket & Request Quote CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/quote"
              className="relative p-2.5 text-[#171B1F] hover:text-[#C91F26] hover:bg-[#F5F5F5] rounded-full transition-colors"
              title="Quote Basket"
              aria-label="Quote Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#C91F26] rounded-full min-w-[18px] h-[18px]">
                  {totalCount}
                </span>
              )}
            </Link>

            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-5 py-2.5 rounded font-medium text-sm transition-colors shadow-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu & Basket Trigger */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/quote"
              className="relative p-2 text-[#171B1F]"
              aria-label="Quote Basket"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#C91F26] rounded-full min-w-[18px] h-[18px]">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171B1F] hover:text-[#C91F26] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E3E4E6] px-5 py-4 space-y-3">
            <nav className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-base ${
                    isActive(link.href)
                      ? 'bg-[#FDF2F2] text-[#C91F26] font-semibold'
                      : 'text-[#191B1F] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-base text-[#191B1F] hover:bg-[#F5F5F5] flex items-center justify-between"
              >
                <span>Quote Basket</span>
                {totalCount > 0 && (
                  <span className="bg-[#C91F26] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {totalCount} items
                  </span>
                )}
              </Link>
            </nav>

            <div className="pt-2 border-t border-[#E3E4E6]">
              <Link
                href="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-5 py-3 rounded font-medium text-sm transition-colors shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
