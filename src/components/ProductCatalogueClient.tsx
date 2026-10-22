'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, X, RotateCcw, ChevronDown } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductCard from '@/components/ProductCard';

interface Props {
  initialProducts: Product[];
  initialCategory?: ProductCategory | 'all';
}

export default function ProductCatalogueClient({
  initialProducts,
  initialCategory = 'all',
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramCat = (searchParams.get('category') as ProductCategory) || initialCategory;
  const paramQuery = searchParams.get('q') || '';
  const paramBrand = searchParams.get('brand') || 'all';
  const paramSize = searchParams.get('size') || 'all';

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(paramCat);
  const [searchQuery, setSearchQuery] = useState(paramQuery);
  const [selectedBrand, setSelectedBrand] = useState(paramBrand);
  const [selectedSize, setSelectedSize] = useState(paramSize);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract available brands and sizes from products
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [initialProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.specifications['Size']) sizes.add(p.specifications['Size']);
      if (p.specifications['Model']) sizes.add(p.specifications['Model']);
    });
    return Array.from(sizes).sort();
  }, [initialProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }
      // Size / Model filter
      if (selectedSize !== 'all') {
        const hasSize = product.specifications['Size'] === selectedSize;
        const hasModel = product.specifications['Model'] === selectedSize;
        if (!hasSize && !hasModel) return false;
      }
      // Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(q);
        const inBrand = product.brand.toLowerCase().includes(q);
        const inCat = product.category.toLowerCase().includes(q);
        const inSub = (product.subcategory || '').toLowerCase().includes(q);
        const inDesc = product.shortDescription.toLowerCase().includes(q);
        const inSpecs = Object.values(product.specifications).some((val) =>
          val.toLowerCase().includes(q)
        );
        if (!inName && !inBrand && !inCat && !inSub && !inDesc && !inSpecs) {
          return false;
        }
      }
      return true;
    });
  }, [initialProducts, activeCategory, selectedBrand, selectedSize, searchQuery]);

  const handleCategoryChange = (cat: ProductCategory | 'all') => {
    setActiveCategory(cat);
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedSize('all');
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedSize !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-white min-h-screen py-10 lg:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-[#C91F26]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              OUR PRODUCTS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171B1F] tracking-tight">
            Product Catalogue
          </h1>
          <p className="text-sm sm:text-base text-[#6B7077] mt-1">
            Browse our range of tyres, trucks and vehicles. Use the filters to find what you need.
          </p>
        </div>

        {/* Search Bar matching reference */}
        <div className="mb-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center max-w-2xl bg-white border border-[#E3E4E6] rounded-md overflow-hidden focus-within:border-[#C91F26] focus-within:ring-1 focus-within:ring-[#C91F26] shadow-2xs"
          >
            <div className="pl-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, size, brand, or model..."
              className="flex-1 px-4 py-3 text-sm text-[#191B1F] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="bg-[#C91F26] hover:bg-[#A71920] text-white px-5 py-3 text-sm font-semibold transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Category Tabs: All, Tyres, Trucks, Vehicles */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none border-b border-[#F0F0F0]">
          {(['all', 'tyres', 'trucks', 'vehicles'] as const).map((cat) => {
            const active = activeCategory === cat;
            const labels = {
              all: 'All',
              tyres: 'Tyres',
              trucks: 'Trucks',
              vehicles: 'Vehicles',
            };
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#C91F26] text-white shadow-xs'
                    : 'bg-[#F5F5F5] text-[#191B1F] hover:bg-gray-200'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E3E4E6] rounded text-sm font-medium text-[#171B1F]"
          >
            <Filter className="w-4 h-4 text-[#C91F26]" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>
          <span className="text-xs text-gray-500 font-medium">
            {filteredProducts.length} results
          </span>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <aside
            className={`md:col-span-3 bg-white p-5 rounded-lg border border-[#E3E4E6] space-y-6 ${
              mobileFilterOpen ? 'block mb-6' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-[#171B1F] uppercase tracking-wider">
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#C91F26] hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            {/* Category Filter Checkboxes */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-2">
                {[
                  { id: 'tyres', label: 'Tyres' },
                  { id: 'trucks', label: 'Trucks' },
                  { id: 'vehicles', label: 'Vehicles' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-sm text-[#191B1F] cursor-pointer hover:text-[#C91F26]"
                  >
                    <input
                      type="radio"
                      name="sidebar-cat"
                      checked={activeCategory === item.id}
                      onChange={() => setActiveCategory(item.id as ProductCategory)}
                      className="accent-[#C91F26] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2.5 text-sm text-[#191B1F] cursor-pointer hover:text-[#C91F26]">
                  <input
                    type="radio"
                    name="sidebar-cat"
                    checked={activeCategory === 'all'}
                    onChange={() => setActiveCategory('all')}
                    className="accent-[#C91F26] w-4 h-4 cursor-pointer"
                  />
                  <span>All Categories</span>
                </label>
              </div>
            </div>

            {/* Brand Filter Dropdown */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Brand
              </label>
              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full appearance-none bg-[#FAFAFA] border border-[#E3E4E6] rounded px-3 py-2 text-sm text-[#191B1F] focus:outline-none focus:border-[#C91F26]"
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Size / Model Filter Dropdown */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Size / Specification
              </label>
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full appearance-none bg-[#FAFAFA] border border-[#E3E4E6] rounded px-3 py-2 text-sm text-[#191B1F] focus:outline-none focus:border-[#C91F26]"
                >
                  <option value="all">All Sizes & Models</option>
                  {availableSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Clear Filters Link */}
            {hasActiveFilters && (
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={handleClearFilters}
                  className="w-full py-2 text-xs font-medium text-gray-600 hover:text-[#C91F26] border border-dashed border-gray-300 rounded hover:border-[#C91F26] transition-colors"
                >
                  Clear all active filters
                </button>
              </div>
            )}
          </aside>

          {/* Right Product Grid Column */}
          <main className="md:col-span-9">
            {/* Results Header */}
            <div className="hidden md:flex items-center justify-between mb-6 pb-2 border-b border-gray-100 text-xs text-gray-500 font-medium">
              <span>
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
              {hasActiveFilters && (
                <span className="text-[#C91F26]">Filters applied</span>
              )}
            </div>

            {/* Empty Results State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FAFAFA] border border-dashed border-gray-300 rounded-lg p-12 text-center max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#171B1F] mb-1">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  We could not find any products matching your selected filters or search terms.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-5 py-2.5 rounded text-sm font-semibold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              /* Responsive Product Grid: 3 columns on desktop matching reference */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    primaryAction={product.category === 'tyres' ? 'add' : 'quote'}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
