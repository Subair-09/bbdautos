'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, AlertCircle, ShoppingBag, Loader2 } from 'lucide-react';
import { useQuoteBasket } from '@/context/QuoteBasketContext';
import { QuoteRequest } from '@/types';

export default function RequestQuoteClient() {
  const { items, clearBasket } = useQuoteBasket();

  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    fullName: '',
    email: '',
    phone: '',
    deliveryLocation: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your quote basket is empty. Please add at least one product before submitting.');
      return;
    }

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    if (!formData.deliveryLocation.trim()) {
      setErrorMessage('Please provide your delivery location in Nigeria.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      setSubmittedQuote(data.quote);
      clearBasket();
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedQuote) {
    return (
      <div className="bg-white min-h-screen py-16">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFAFA] border border-[#E3E4E6] rounded-xl p-8 sm:p-12 text-center shadow-xs">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#C91F26] mb-1 block">
              RFQ SUBMITTED
            </span>
            <h1 className="text-3xl font-extrabold text-[#171B1F] tracking-tight mb-2">
              Quotation Request Received
            </h1>
            <p className="text-gray-600 text-sm max-w-lg mx-auto mb-6">
              Thank you, <strong>{submittedQuote.fullName}</strong>. Our commercial sales team will review your requirements and provide formal pricing.
            </p>

            {/* Reference Number Banner */}
            <div className="bg-white border border-[#E3E4E6] p-4 rounded-lg inline-block text-left mb-8 max-w-md w-full">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                <span>Quotation Reference:</span>
                <span className="text-emerald-700 font-bold">STATUS: {submittedQuote.status}</span>
              </div>
              <p className="text-2xl font-black text-[#171B1F] tracking-wider">
                {submittedQuote.id}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                A confirmation has been logged for delivery to: <strong>{submittedQuote.deliveryLocation}</strong>
              </p>
            </div>

            {/* Summary of items */}
            <div className="text-left bg-white border border-[#E3E4E6] rounded-lg p-5 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 border-b pb-2">
                Requested Items ({submittedQuote.items.length})
              </h4>
              <div className="space-y-3">
                {submittedQuote.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-[#171B1F]">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.specificationSummary}</p>
                    </div>
                    <span className="font-semibold text-gray-800 bg-[#F5F5F5] px-2.5 py-1 rounded text-xs">
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C91F26] hover:bg-[#A71920] text-white px-6 py-3 rounded font-semibold text-sm transition-colors"
              >
                <span>Browse More Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded font-semibold text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div className="bg-white min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header matching reference */}
        <div className="mb-10 pb-4 border-b border-[#F0F0F0]">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171B1F] tracking-tight">
            Request a Quote
          </h1>
          <p className="text-sm sm:text-base text-[#6B7077] mt-1">
            Fill in your details and our team will get back to you with the best price for your selected products.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#FAFAFA] border border-dashed border-gray-300 rounded-xl p-10 text-center max-w-lg mx-auto my-8">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#171B1F] mb-2">No Items in Basket</h3>
            <p className="text-sm text-gray-500 mb-6">
              Please choose tyres, trucks or vehicles from our catalogue before submitting a quotation.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#C91F26] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#A71920] transition-colors"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Form Details (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Company Information */}
                <div className="bg-white border border-[#E3E4E6] rounded-lg p-6 space-y-4 shadow-2xs">
                  <h3 className="font-bold text-base text-[#171B1F] border-b border-gray-100 pb-3">
                    Company Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company or organisation name (optional)"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded bg-white focus:outline-none focus:border-[#C91F26]"
                    >
                      <option value="">Select business type</option>
                      <option value="Fleet Logistics Operator">Fleet Logistics Operator</option>
                      <option value="Construction & Civil Works">Construction & Civil Works</option>
                      <option value="Mining & Quarry Operations">Mining & Quarry Operations</option>
                      <option value="Passenger Transport / Transit">Passenger Transport / Transit</option>
                      <option value="Automotive Retailer / Sub-Dealer">Automotive Retailer / Sub-Dealer</option>
                      <option value="Corporate Fleet">Corporate Fleet</option>
                      <option value="Government Agency / Parastatal">Government Agency / Parastatal</option>
                      <option value="Individual Commercial Owner">Individual Commercial Owner</option>
                    </select>
                  </div>
                </div>

                {/* 2. Contact Information */}
                <div className="bg-white border border-[#E3E4E6] rounded-lg p-6 space-y-4 shadow-2xs">
                  <h3 className="font-bold text-base text-[#171B1F] border-b border-gray-100 pb-3">
                    Contact Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#C91F26]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-[#C91F26]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-[#C91F26]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Delivery Information */}
                <div className="bg-white border border-[#E3E4E6] rounded-lg p-6 space-y-4 shadow-2xs">
                  <h3 className="font-bold text-base text-[#171B1F] border-b border-gray-100 pb-3">
                    Delivery Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Delivery Location in Nigeria <span className="text-[#C91F26]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      placeholder="e.g. Lagos, Abuja, Port Harcourt, Kano, or specific depot address"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Additional Requirements or Notes
                    </label>
                    <textarea
                      rows={3}
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Specify delivery timeline, custom tyre ply requirements, body configurations, etc."
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Submission (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#FAFAFA] border border-[#E3E4E6] rounded-lg p-6 sticky top-28 shadow-xs">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                    <h3 className="font-bold text-base text-[#171B1F]">
                      Selected Products ({items.length})
                    </h3>
                    <Link
                      href="/quote"
                      className="text-xs text-[#C91F26] hover:underline font-semibold"
                    >
                      Edit Basket
                    </Link>
                  </div>

                  {/* List of items */}
                  <div className="divide-y divide-gray-200 mb-6 max-h-[320px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.productId} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-white border border-gray-200 rounded p-1 shrink-0 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#171B1F] line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.specificationSummary}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold bg-white border border-gray-200 px-2.5 py-1 rounded">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notice */}
                  <div className="bg-white border border-gray-200 rounded p-3.5 text-xs text-gray-600 mb-6 space-y-1">
                    <p className="font-semibold text-[#171B1F]">
                      Transparent Business Quotation
                    </p>
                    <p>
                      Official pricing, transport options, and dispatch schedules will be delivered directly to your provided contact.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded bg-[#C91F26] hover:bg-[#A71920] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting RFQ...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    Your details are protected and only used to prepare your quotation.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
