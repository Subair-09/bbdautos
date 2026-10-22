import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BBD Autos Nigeria',
  description: 'Privacy Policy for BBD Autos commercial automotive dealership.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-[#171B1F] mb-6">
          Privacy Policy
        </h1>
        <div className="prose prose-sm text-gray-600 space-y-5 leading-relaxed">
          <p>
            At BBD Autos, we respect your privacy and are committed to safeguarding personal and business data submitted through our quotation systems and digital channels.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">1. Information We Collect</h3>
          <p>
            When you request a quotation or contact us, we collect company names, contact names, email addresses, telephone numbers, delivery destinations, and commercial equipment requirements.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">2. How We Use Your Information</h3>
          <p>
            Submitted information is strictly utilized to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generate customized commercial quotations and pricing schedules</li>
            <li>Coordinate transport and delivery logistics within Nigeria</li>
            <li>Respond to customer service and technical product enquiries</li>
            <li>Comply with legitimate Nigerian commercial trading standards</li>
          </ul>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">3. Data Confidentiality</h3>
          <p>
            We do not sell, lease, or distribute customer commercial data to third-party marketing firms. Customer data is handled strictly by our internal sales and operations personnel.
          </p>

          <h3 className="text-base font-bold text-[#171B1F] pt-2">4. Contact</h3>
          <p>
            For any enquiries regarding this privacy policy or your stored quotation requests, please contact our team at Info@bbdautosng.com or sales@bbdautosng.com.
          </p>
        </div>
      </div>
    </div>
  );
}
