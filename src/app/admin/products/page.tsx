import React from 'react';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getProducts } from '@/lib/db';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProductsClient from '@/components/admin/AdminProductsClient';

export const revalidate = 0;

export default function AdminProductsPage() {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }

  const products = getProducts();

  return (
    <AdminLayout>
      <AdminProductsClient initialProducts={products} />
    </AdminLayout>
  );
}
