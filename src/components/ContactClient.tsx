'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Mail, MessageSquare, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Bulk Supply Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Bulk Supply Enquiry',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Tyre Accent Graphic matching reference Panel 6 */}
        <div className="relative mb-12 pb-6 border-b border-[#F0F0F0] overflow-hidden">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-[#C91F26]" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                CONTACT
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171B1F] tracking-tight">
              Get in Touch with BBD Autos
            </h1>
            <p className="text-sm sm:text-base text-[#6B7077] mt-1">
              We're here to help. Reach out to our commercial desk for automotive enquiries, quotations and fleet supply across Nigeria.
            </p>
          </div>

          {/* Right tyre tread graphic overlay */}
          <div className="hidden lg:block absolute right-0 top-0 w-72 h-36 opacity-30 pointer-events-none">
            <Image
              src="/images/bulk_cta_tyre_hd.jpg"
              alt="Automotive Tyre Accent"
              fill
              className="object-cover object-right rounded-bl-3xl"
            />
          </div>
        </div>

        {/* 2-Column Layout matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-[#171B1F] mb-4">
              Contact Information
            </h2>

            {/* Office Location */}
            <div className="flex items-start gap-4 p-5 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA]">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#C91F26] flex items-center justify-center shrink-0 border border-red-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#171B1F]">Office Location</h4>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                  20 Babayanju, Oshodi, Lagos, Nigeria
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Serving fleet operators, commercial transporters, and construction sites nationwide across Nigeria.
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-start gap-4 p-5 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA]">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#C91F26] flex items-center justify-center shrink-0 border border-red-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#171B1F]">Email Us</h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Send us a message and our commercial desk will respond immediately.
                </p>
                <div className="flex flex-col gap-1 text-xs font-semibold text-[#171B1F] mt-1.5">
                  <a href="mailto:Sales@bbdautosng.com" className="hover:text-[#C91F26] transition-colors">
                    Sales@bbdautosng.com
                  </a>
                  <a href="mailto:Info@bbdautosng.com" className="hover:text-[#C91F26] transition-colors">
                    Info@bbdautosng.com
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Enquiries / Phone */}
            <div className="flex items-start gap-4 p-5 rounded-lg border border-[#E3E4E6] bg-[#FAFAFA]">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#C91F26] flex items-center justify-center shrink-0 border border-red-100">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#171B1F]">Direct Phone & WhatsApp</h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Connect with our commercial desk for immediate product verification, price quotes, and delivery tracking.
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+2349039546124"
                      className="text-xs font-bold text-[#171B1F] hover:text-[#C91F26] transition-colors"
                    >
                      09039546124 / +234 903 954 6124
                    </a>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <a
                      href="tel:+2349162030930"
                      className="text-xs font-bold text-[#171B1F] hover:text-[#C91F26] transition-colors"
                    >
                      +234 916 203 0930
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                      href="https://wa.me/2349162030930"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#C91F26] hover:underline"
                    >
                      Chat on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-5 rounded-lg border border-gray-100 bg-white text-xs text-gray-500 space-y-1">
              <p className="font-bold text-gray-700">Commercial Hours</p>
              <p>Monday - Friday: 8:00 AM – 6:00 PM (WAT)</p>
              <p>Saturday: 9:00 AM – 2:00 PM</p>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E3E4E6] rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-[#171B1F] mb-6">
                Send Us a Message
              </h2>

              {success ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-emerald-900 text-lg">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out. A representative from BBD Autos will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-block mt-3 text-xs font-semibold text-[#C91F26] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

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
                      placeholder="Enter your name"
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
                        placeholder="Enter your email"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234..."
                        className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded bg-white focus:outline-none focus:border-[#C91F26]"
                    >
                      <option value="Bulk Supply Enquiry">Bulk Supply Enquiry</option>
                      <option value="Tyre Distribution Inquiry">Tyre Distribution Inquiry</option>
                      <option value="Truck Fleet Procurement">Truck Fleet Procurement</option>
                      <option value="Commercial Vehicle Specification">Commercial Vehicle Specification</option>
                      <option value="Partnership / Dealership">Partnership / Dealership</option>
                      <option value="Other Enquiries">Other Enquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Message <span className="text-[#C91F26]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#D0D3D6] rounded focus:outline-none focus:border-[#C91F26] focus:ring-1 focus:ring-[#C91F26]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded bg-[#C91F26] hover:bg-[#A71920] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
