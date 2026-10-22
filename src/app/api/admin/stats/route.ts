import { NextResponse } from 'next/server';
import { getProducts, getQuotes } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const products = getProducts();
  const quotes = getQuotes();

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.published).length;
  const totalQuotes = quotes.length;
  const newQuotes = quotes.filter((q) => q.status === 'New').length;
  const recentQuotes = quotes.slice(0, 5);

  return NextResponse.json({
    success: true,
    stats: {
      totalProducts,
      publishedProducts,
      totalQuotes,
      newQuotes,
      recentQuotes,
    },
  });
}
