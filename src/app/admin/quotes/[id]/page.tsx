import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getQuoteById } from '@/lib/db';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminQuoteDetailClient from '@/components/admin/AdminQuoteDetailClient';

export const revalidate = 0;

interface Props {
  params: {
    id: string;
  };
}

export default function AdminQuoteDetailPage({ params }: Props) {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }

  const quote = getQuoteById(params.id);
  if (!quote) {
    notFound();
  }

  return (
    <AdminLayout>
      <AdminQuoteDetailClient initialQuote={quote} />
    </AdminLayout>
  );
}
