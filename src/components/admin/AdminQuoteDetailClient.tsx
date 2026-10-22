'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Mail, Phone, Building, CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { QuoteRequest, QuoteStatus } from '@/types';

interface Props {
  initialQuote: QuoteRequest;
}

export default function AdminQuoteDetailClient({ initialQuote }: Props) {
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteRequest>(initialQuote);
  const [newStatus, setNewStatus] = useState<QuoteStatus>(initialQuote.status);
  const [noteText, setNoteText] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const statuses: QuoteStatus[] = [
    'New',
    'Under Review',
    'Quotation Sent',
    'Accepted',
    'Declined',
    'Closed',
  ];

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: statusNote.trim() ? `Status changed to ${newStatus}: ${statusNote.trim()}` : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update status');
      }

      setQuote(data.quote);
      setStatusNote('');
      setFeedback({ type: 'success', message: `RFQ status successfully updated to ${newStatus}.` });
      router.refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Update failed' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsUpdating(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: noteText.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to add note');
      }

      setQuote(data.quote);
      setNoteText('');
      setFeedback({ type: 'success', message: 'Internal note saved.' });
      router.refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save note' });
    } finally {
      setIsUpdating(false);
    }
  };

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
    <div className="space-y-8">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <Link
            href="/admin/quotes"
            className="text-xs text-gray-500 hover:text-[#C91F26] inline-flex items-center gap-1 font-semibold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All RFQs</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#171B1F] tracking-tight">
              {quote.id}
            </h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                quote.status
              )}`}
            >
              {quote.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Submitted on{' '}
            {new Date(quote.createdAt).toLocaleString('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Grid: Details + Items (Left 8 cols), Actions + Notes (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer & Company Details */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F] border-b pb-3">
              Customer & Entity Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <span className="text-gray-400 font-medium w-28 shrink-0">Client Name:</span>
                <span className="font-bold text-[#171B1F]">{quote.fullName}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <a href={`mailto:${quote.email}`} className="text-[#C91F26] hover:underline">
                  {quote.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <a href={`tel:${quote.phone}`} className="font-medium text-[#171B1F]">
                  {quote.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span>{quote.companyName || 'Not specified'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-gray-400 font-medium w-28 shrink-0">Business Type:</span>
                <span>{quote.businessType || 'General Commercial'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C91F26] shrink-0 mt-0.5" />
                <span className="font-semibold text-gray-800">{quote.deliveryLocation}</span>
              </div>
            </div>

            {quote.additionalNotes && (
              <div className="mt-4 pt-4 border-t border-gray-100 bg-[#FBFBFB] p-3 rounded">
                <p className="text-xs font-semibold text-gray-600 mb-1">
                  Customer Notes & Requirements:
                </p>
                <p className="text-xs text-gray-800 whitespace-pre-wrap">
                  {quote.additionalNotes}
                </p>
              </div>
            )}
          </div>

          {/* Requested Products Table */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-gray-200">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F]">
                Requested Items ({quote.items.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600">
                    <th className="py-3 px-5">Product</th>
                    <th className="py-3 px-5">Category / Brand</th>
                    <th className="py-3 px-5 text-center w-28">Quantity</th>
                    <th className="py-3 px-5 text-right w-24">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quote.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#FDFDFD]">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-gray-50 border border-gray-200 rounded p-1 shrink-0 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-[#171B1F]">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.specificationSummary}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        <span className="capitalize">{item.category}</span> · {item.brand}
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span className="inline-block bg-[#171B1F] text-white px-3 py-1 rounded font-bold text-xs">
                          {item.quantity} units
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Link
                          href={`/products/${item.slug}`}
                          target="_blank"
                          className="text-xs text-[#C91F26] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Status Workflow & Internal Notes (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Update Card */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F] border-b pb-2">
              Update RFQ Status
            </h3>

            <form onSubmit={handleStatusUpdate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Change Status To:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as QuoteStatus)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white font-medium focus:outline-none focus:border-[#C91F26]"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Status Change Note (Optional):
                </label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Sent proforma invoice via email"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-2.5 px-4 rounded bg-[#C91F26] hover:bg-[#A71920] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isUpdating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Save Status</span>
                )}
              </button>
            </form>
          </div>

          {/* Internal Notes Card */}
          <div className="bg-white border border-[#E3E4E6] rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#171B1F] border-b pb-2">
              Internal Team Notes
            </h3>

            {/* Note log */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {(!quote.internalNotes || quote.internalNotes.length === 0) ? (
                <p className="text-xs text-gray-400 italic">No notes recorded yet.</p>
              ) : (
                quote.internalNotes.map((note, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-2.5 rounded text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-gray-500">
                      <span className="font-bold text-[#171B1F]">{note.author}</span>
                      <span>
                        {new Date(note.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700">{note.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="pt-2 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add follow-up note..."
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C91F26]"
              />
              <button
                type="submit"
                disabled={isUpdating || !noteText.trim()}
                className="bg-[#171B1F] hover:bg-[#C91F26] text-white p-2 rounded transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
