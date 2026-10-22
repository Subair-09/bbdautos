import { NextRequest, NextResponse } from 'next/server';
import { saveMessage, getMessages } from '@/lib/db';
import { sendContactToGoogleAppsScript } from '@/lib/notifications';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

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

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please enter a message with at least 5 characters.' },
        { status: 400 }
      );
    }

    let saved;
    try {
      saved = saveMessage({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? String(phone).trim() : undefined,
        subject: subject ? String(subject).trim() : 'General Commercial Enquiry',
        message: message.trim(),
      });
    } catch (saveErr) {
      console.warn('[Contact API] Local save fallback:', saveErr);
      saved = {
        id: `MSG-${Date.now()}`,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? String(phone).trim() : undefined,
        subject: subject ? String(subject).trim() : 'General Commercial Enquiry',
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'Unread' as const,
      };
    }

    // Dispatch notification to Google Apps Script (Info@bbdautosng.com, sales@bbdautosng.com)
    try {
      await sendContactToGoogleAppsScript(saved);
    } catch (notifyErr) {
      console.error('[Contact API] Google Apps Script contact dispatch error:', notifyErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: saved,
    });
  } catch (err: any) {
    console.error('[Contact API] Error handling contact submission:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to submit message. Please try again.' },
      { status: 500 }
    );
  }
}
