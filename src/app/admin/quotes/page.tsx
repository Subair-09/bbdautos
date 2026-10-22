import React from 'react';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getQuotes } from '@/lib/db';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminQuotesClient from '@/components/admin/AdminQuotesClient';

export const revalidate = 0;

export default function AdminQuotesPage() {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }

  const quotes = getQuotes();

  return (
    <AdminLayout>
      <AdminQuotesClient initialQuotes={quotes} />
    </AdminLayout>
  );
}
