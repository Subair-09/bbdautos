import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { getProducts, getQuotes } from '@/lib/db';
import AdminLayout from '@/components/admin/AdminLayout';
import { Package, FileText, Clock, PlusCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default function AdminOverviewPage() {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }

  const products = getProducts();
  const quotes = getQuotes();

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.published).length;
  const totalQuotes = quotes.length;
  const newQuotes = quotes.filter((q) => q.status === 'New').length;
  const recentQuotes = quotes.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Quotation Sent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Declined':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171B1F]">
              Dashboard Overview
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Live database metrics for BBD Autos Nigeria commercial operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-4 py-2 rounded text-xs font-semibold transition-colors shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* 4 Real Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Products */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Total Inventory
              </p>
              <p className="text-3xl font-extrabold text-[#171B1F] mt-1">
                {totalProducts}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Tyres, trucks & vehicles
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-50 text-[#C91F26] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Published Products */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Active in Catalogue
              </p>
              <p className="text-3xl font-extrabold text-emerald-700 mt-1">
                {publishedProducts}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Live on public website
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Total RFQs */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Total Quotations
              </p>
              <p className="text-3xl font-extrabold text-[#171B1F] mt-1">
                {totalQuotes}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Customer RFQ records
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* New RFQs */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Pending Review
              </p>
              <p className="text-3xl font-extrabold text-[#C91F26] mt-1">
                {newQuotes}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Awaiting sales action
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Quotation Requests Table */}
        <div className="bg-white border border-[#E3E4E6] rounded-xl overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-[#171B1F]">
                Recent Quotation Requests
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Latest customer enquiries submitted through the quotation basket
              </p>
            </div>
            <Link
              href="/admin/quotes"
              className="text-xs font-semibold text-[#C91F26] hover:underline flex items-center gap-1"
            >
              <span>View all RFQs ({totalQuotes})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No quotation requests submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600">
                    <th className="py-3 px-5">Reference</th>
                    <th className="py-3 px-5">Client / Company</th>
                    <th className="py-3 px-5">Location</th>
                    <th className="py-3 px-5 text-center">Items</th>
                    <th className="py-3 px-5 text-center">Status</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-[#FDFDFD]">
                      <td className="py-3.5 px-5 font-mono font-bold text-[#171B1F]">
                        {q.id}
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-[#171B1F]">{q.fullName}</p>
                        <p className="text-xs text-gray-500">{q.companyName || q.email}</p>
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        {q.deliveryLocation}
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span className="font-semibold bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {q.items.length} items
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                            q.status
                          )}`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Link
                          href={`/admin/quotes/${q.id}`}
                          className="text-xs font-semibold text-[#C91F26] hover:underline"
                        >
                          Manage &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
