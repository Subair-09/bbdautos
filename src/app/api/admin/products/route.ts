import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Product } from '@/types';

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const products = getProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, brand, category, subcategory, image, shortDescription, fullDescription, specifications } = body;

    if (!name || !brand || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, brand, and category are required.' },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}`;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug,
      name: name.trim(),
      brand: brand.trim(),
      category,
      subcategory: subcategory ? subcategory.trim() : undefined,
      image: image || '/images/hero/red_heavy_truck_hd.jpg',
      galleryImages: [image || '/images/hero/red_heavy_truck_hd.jpg'],
      shortDescription: shortDescription?.trim() || '',
      fullDescription: fullDescription?.trim() || shortDescription?.trim() || '',
      specifications: specifications || {},
      featured: false,
      inStock: true,
      published: true,
      createdAt: new Date().toISOString(),
    };

    saveProduct(newProduct);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
