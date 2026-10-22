import { NextRequest, NextResponse } from 'next/server';
import { createQuote, getQuotes } from '@/lib/db';
import { sendQuoteToGoogleAppsScript } from '@/lib/notifications';

export async function GET(request: NextRequest) {
  try {
    const quotes = getQuotes();
    return NextResponse.json({ success: true, quotes });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      deliveryLocation,
      companyName,
      businessType,
      additionalNotes,
      items,
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: 'A valid contact phone number is required.' },
        { status: 400 }
      );
    }

    if (!deliveryLocation || typeof deliveryLocation !== 'string' || !deliveryLocation.trim()) {
      return NextResponse.json(
        { success: false, error: 'Delivery location in Nigeria is required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please select at least one product for quotation.' },
        { status: 400 }
      );
    }

    // Sanitize and save
    const sanitizedItems = items.map((item) => ({
      productId: String(item.productId || ''),
      name: String(item.name || ''),
      brand: String(item.brand || ''),
      category: item.category,
      specificationSummary: String(item.specificationSummary || ''),
      image: String(item.image || ''),
      quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
      slug: String(item.slug || ''),
    }));

    const newQuote = createQuote({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      deliveryLocation: deliveryLocation.trim(),
      companyName: companyName ? companyName.trim() : undefined,
      businessType: businessType ? businessType.trim() : undefined,
      additionalNotes: additionalNotes ? additionalNotes.trim() : undefined,
      items: sanitizedItems,
    });

    // Dispatch notification to Google Apps Script (Info@bbdautosng.com, sales@bbdautosng.com)
    try {
      await sendQuoteToGoogleAppsScript(newQuote);
    } catch (notifyErr) {
      console.error('Google Apps Script notification error:', notifyErr);
    }

    return NextResponse.json({
      success: true,
      quote: newQuote,
      message: 'Quotation request submitted successfully.',
    });
  } catch (err: any) {
    console.error('Failed to process quote:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
