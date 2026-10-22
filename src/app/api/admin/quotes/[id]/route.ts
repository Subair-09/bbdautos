import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById, updateQuoteStatus, addQuoteNote } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const quote = getQuoteById(params.id);
  if (!quote) {
    return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, quote });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { status, note } = body;

    let updated = getQuoteById(params.id);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }

    if (status) {
      updated = updateQuoteStatus(params.id, status, note);
    } else if (note) {
      updated = addQuoteNote(params.id, note);
    }

    return NextResponse.json({ success: true, quote: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
