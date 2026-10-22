import { QuoteRequest, ContactMessage } from '@/types';

const NOTIFICATION_EMAIL = 'Info@bbdautosng.com, sales@bbdautosng.com';
const DEFAULT_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxbyuhknunsRoA1n_ivLw0IMVPTloo8a1hyVylWRzpGi-t3J7qT-b-ImSXJ2G4NebEdFg/exec';

export async function sendQuoteToGoogleAppsScript(quote: QuoteRequest): Promise<boolean> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  const payload = {
    type: 'quote_request',
    targetEmail: NOTIFICATION_EMAIL,
    rfqId: quote.id,
    submittedAt: quote.createdAt,
    fullName: quote.fullName,
    email: quote.email,
    phone: quote.phone,
    companyName: quote.companyName || 'Individual Buyer',
    businessType: quote.businessType || 'Not Specified',
    deliveryLocation: quote.deliveryLocation,
    additionalNotes: quote.additionalNotes || 'None',
    items: quote.items.map((item) => ({
      name: item.name,
      brand: item.brand,
      category: item.category,
      specificationSummary: item.specificationSummary,
      quantity: item.quantity,
    })),
  };

  console.log(`[Notification] Routing RFQ ${quote.id} to ${NOTIFICATION_EMAIL}`);

  if (!scriptUrl) {
    console.log(
      `[Notification] Notice: GOOGLE_SCRIPT_URL is not set. Payload prepared for ${NOTIFICATION_EMAIL}:`,
      JSON.stringify(payload, null, 2)
    );
    return true;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log(`[Notification] Google Apps Script responded with status: ${res.status}`);
    return res.ok;
  } catch (error) {
    console.error('[Notification] Error dispatching quote to Google Apps Script:', error);
    return false;
  }
}

export async function sendContactToGoogleAppsScript(message: ContactMessage): Promise<boolean> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  const payload = {
    type: 'contact_message',
    targetEmail: NOTIFICATION_EMAIL,
    messageId: message.id,
    submittedAt: message.createdAt,
    fullName: message.fullName,
    email: message.email,
    phone: message.phone || 'Not Provided',
    subject: message.subject || 'General Enquiry',
    message: message.message,
  };

  console.log(`[Notification] Routing Contact Message ${message.id} to ${NOTIFICATION_EMAIL}`);

  if (!scriptUrl) {
    return true;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.error('[Notification] Error dispatching contact message to Google Apps Script:', error);
    return false;
  }
}
