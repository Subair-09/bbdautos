'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { ArrowLeft, Plus, Trash2, AlertCircle, Loader2, Check } from 'lucide-react';
import { ProductCategory } from '@/types';

export default function AdminNewProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'tyres' as ProductCategory,
    subcategory: '',
    image: '/images/products/commercial_truck_tyre.jpg',
    shortDescription: '',
    fullDescription: '',
  });

  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: 'Size', value: '' },
    { key: 'Type', value: 'Radial' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const imagePresets = [
    { label: 'Commercial Truck Tyre (Radial)', path: '/images/products/commercial_truck_tyre.jpg' },
    { label: 'Red Heavy-Duty Truck (6x4)', path: '/images/hero/red_heavy_truck_hd.jpg' },
    { label: 'Executive 4x4 SUV', path: '/images/products/white_suv.jpg' },
    { label: '15-Seater Commercial Van', path: '/images/products/commercial_van.jpg' },
    { label: 'Tyres Stack Arrangement', path: '/images/categories/tyres_stack_hd.jpg' },
    { label: 'Utility Pickup & SUV Pair', path: '/images/categories/vehicles_pair_hd.jpg' },
  ];

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    setSpecs((prev) => {
      const copy = [...prev];
      copy[index][field] = val;
      return copy;
    });
  };

  const addSpecRow = () => {
    setSpecs((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeSpecRow = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (cat: ProductCategory) => {
    setFormData((prev) => ({ ...prev, category: cat }));
    if (cat === 'tyres') {
      setSpecs([
        { key: 'Size', value: '' },
        { key: 'Type', value: 'Radial' },
        { key: 'Load Index', value: '152/148' },
        { key: 'Speed Rating', value: 'M' },
      ]);
    } else if (cat === 'trucks') {
      setSpecs([
        { key: 'Model', value: '6x4 Cargo' },
        { key: 'Engine Power', value: '380 HP' },
        { key: 'Payload Capacity', value: '30 Tonnes' },
        { key: 'Transmission', value: '10-Speed Manual' },
      ]);
    } else if (cat === 'batteries') {
      setSpecs([
        { key: 'Voltage / Capacity', value: '12V 100Ah' },
        { key: 'Cold Cranking Amps (CCA)', value: '850+ CCA' },
        { key: 'Technology', value: 'Sealed Maintenance-Free (SMF)' },
        { key: 'Warranty', value: '12 Months' },
      ]);
    } else {
      setSpecs([
        { key: 'Model', value: '4x4 Executive' },
        { key: 'Vehicle Type', value: 'Full-Size SUV' },
        { key: 'Engine', value: 'V6 Turbo Diesel' },
        { key: 'Seating Capacity', value: '7 Passengers' },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.brand.trim()) {
      setErrorMessage('Please provide both product name and brand.');
      return;
    }

    const specificationsObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specificationsObj[s.key.trim()] = s.value.trim();
      }
    });

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          specifications: specificationsObj,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Creation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-gray-200">
          <Link
            href="/admin/products"
            className="text-xs text-gray-500 hover:text-[#C91F26] inline-flex items-center gap-1 font-semibold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#171B1F]">
            Add New Product
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Create an automotive item for public catalogue and quotation basket
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Info */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F] border-b pb-2">
              Product Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Name <span className="text-[#C91F26]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Heavy-Duty Radial Truck Tyre"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Brand <span className="text-[#C91F26]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Premium Brand / Bridgestone / Sinotruk"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category <span className="text-[#C91F26]">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded bg-white font-medium focus:outline-none focus:border-[#C91F26]"
                >
                  <option value="trucks">Trucks</option>
                  <option value="tyres">Tyres</option>
                  <option value="batteries">Batteries</option>
                  <option value="vehicles">Vehicles</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subcategory / Class
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="e.g. Long-Haul Highway / Heavy Dump / Executive"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief single-sentence commercial summary"
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Technical Description
              </label>
              <textarea
                rows={3}
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Detailed commercial specifications, compound details, warranty and vehicle suitability..."
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
              />
            </div>
          </div>

          {/* Section 2: Image Selection */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F] border-b pb-2">
              Product Photography Asset
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Select from High-Resolution Asset Presets:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {imagePresets.map((preset) => {
                  const selected = formData.image === preset.path;
                  return (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.path })}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                        selected
                          ? 'border-[#C91F26] bg-[#FDF2F2] ring-1 ring-[#C91F26]'
                          : 'border-gray-200 hover:border-gray-300 bg-[#FAFAFA]'
                      }`}
                    >
                      <div className="relative w-10 h-10 bg-white rounded border border-gray-200 shrink-0 overflow-hidden">
                        <Image
                          src={preset.path}
                          alt={preset.label}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-gray-800 line-clamp-2">
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Or Custom Image Path:
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/..."
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
              />
            </div>
          </div>

          {/* Section 3: Technical Specifications */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F]">
                Key Specifications
              </h3>
              <button
                type="button"
                onClick={addSpecRow}
                className="text-xs font-semibold text-[#C91F26] hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Specification</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {specs.map((row, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={row.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Attribute (e.g. Size)"
                    className="w-1/3 px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
                  />
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 295/80R22.5)"
                    className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecRow(idx)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded bg-[#C91F26] hover:bg-[#A71920] text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-2xs disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
