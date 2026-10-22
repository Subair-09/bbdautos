'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PlusCircle, Search, Trash2, CheckCircle2, XCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { Product, ProductCategory } from '@/types';

interface Props {
  initialProducts: Product[];
}

export default function AdminProductsClient({ initialProducts }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categoryFilter, setCategoryFilter] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inName = p.name.toLowerCase().includes(q);
      const inBrand = p.brand.toLowerCase().includes(q);
      if (!inName && !inBrand) return false;
    }
    return true;
  });

  const togglePublished = async (product: Product) => {
    const updatedStatus = !product.published;
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: updatedStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, published: updatedStatus } : p))
        );
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleInStock = async (product: Product) => {
    const updatedStatus = !product.inStock;
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: updatedStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: updatedStatus } : p))
        );
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171B1F]">
            Product Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage catalogue items, publish states, technical specifications, and stock status
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-4 py-2 rounded text-xs font-semibold transition-colors shadow-2xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E3E4E6] shadow-2xs">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'trucks', 'tyres', 'batteries', 'vehicles'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded text-xs font-semibold capitalize transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#171B1F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E3E4E6] rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600">
                <th className="py-3 px-5">Product</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Brand</th>
                <th className="py-3 px-5 text-center">In Stock</th>
                <th className="py-3 px-5 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FDFDFD] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-50 border border-gray-200 rounded p-1 shrink-0 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#171B1F]">{p.name}</p>
                        <p className="text-xs text-gray-400">
                          {p.specifications['Size'] || p.specifications['Model'] || ''}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 capitalize text-gray-600 font-medium">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-5 text-gray-800 font-semibold">
                    {p.brand}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <button
                      onClick={() => toggleInStock(p)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        p.inStock
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      {p.inStock ? 'Available' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <button
                      onClick={() => togglePublished(p)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border cursor-pointer transition-colors ${
                        p.published
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {p.published ? 'Published' : 'Archived'}
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <Link
                      href={`/products/${p.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-[#C91F26] inline-block"
                      title="View on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 inline-block"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-bold text-[#171B1F]">Delete Product?</h4>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this product from the inventory database?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deletingId === deleteConfirmId}
                className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === deleteConfirmId ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
