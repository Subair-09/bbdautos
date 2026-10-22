'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Eye, Clock } from 'lucide-react';
import { QuoteRequest, QuoteStatus } from '@/types';

interface Props {
  initialQuotes: QuoteRequest[];
}

export default function AdminQuotesClient({ initialQuotes }: Props) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [activeStatus, setActiveStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses: ('All' | QuoteStatus)[] = [
    'All',
    'New',
    'Under Review',
    'Quotation Sent',
    'Accepted',
    'Declined',
    'Closed',
  ];

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      if (activeStatus !== 'All' && q.status !== activeStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inId = q.id.toLowerCase().includes(query);
        const inName = q.fullName.toLowerCase().includes(query);
        const inEmail = q.email.toLowerCase().includes(query);
        const inCompany = (q.companyName || '').toLowerCase().includes(query);
        const inLoc = q.deliveryLocation.toLowerCase().includes(query);
        if (!inId && !inName && !inEmail && !inCompany && !inLoc) {
          return false;
        }
      }
      return true;
    });
  }, [quotes, activeStatus, searchQuery]);

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
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171B1F]">
            Quotation Requests (RFQs)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage incoming quotations, update processing status and review client specifications
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E3E4E6] shadow-2xs">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {statuses.map((st) => {
            const active = activeStatus === st;
            return (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#C91F26] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, company..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
          />
        </div>
      </div>

      {/* RFQ Table */}
      <div className="bg-white border border-[#E3E4E6] rounded-xl overflow-hidden shadow-2xs">
        {filteredQuotes.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">
            No quotation requests found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600">
                  <th className="py-3 px-5">Reference</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Client / Entity</th>
                  <th className="py-3 px-5">Location</th>
                  <th className="py-3 px-5 text-center">Items</th>
                  <th className="py-3 px-5 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#FDFDFD] transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-[#171B1F]">
                      <Link href={`/admin/quotes/${q.id}`} className="hover:text-[#C91F26]">
                        {q.id}
                      </Link>
                    </td>
                    <td className="py-4 px-5 text-gray-500 text-xs">
                      {new Date(q.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-5">
                      <p className="font-bold text-[#171B1F]">{q.fullName}</p>
                      <p className="text-xs text-gray-500">{q.companyName || q.phone}</p>
                    </td>
                    <td className="py-4 px-5 text-gray-600">
                      {q.deliveryLocation}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="font-semibold bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {q.items.length} items
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          q.status
                        )}`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        href={`/admin/quotes/${q.id}`}
                        className="inline-flex items-center gap-1 bg-[#171B1F] hover:bg-[#C91F26] text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
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
  );
}
