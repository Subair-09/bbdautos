import { QuoteRequest, ContactMessage } from '@/types';

const NOTIFICATION_EMAIL = 'Info@bbdautosng.com, sales@bbdautosng.com';

export async function sendQuoteToGoogleAppsScript(quote: QuoteRequest): Promise<boolean> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  const payload = {
    type: 'quote_request',
    targetEmail: NOTIFICATION_EMAIL,
    rfqId: quote.id,
    submittedAt: quote.createdAt,
    fullName: quote.fullName,
    email: quote.email,
    phone: quote.phone,
    companyName: quote.companyName || 'N/A',
    businessType: quote.businessType || 'N/A',
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
      `[Notification] Notice: GOOGLE_SCRIPT_URL environment variable is not set. Payload prepared for ${NOTIFICATION_EMAIL}:`,
      JSON.stringify(payload, null, 2)
    );
    return true;
  }

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    console.log(`[Notification] Google Apps Script responded with status: ${res.status}`);
    return res.ok;
  } catch (error) {
    console.error('[Notification] Error dispatching to Google Apps Script:', error);
    // Don't fail the user submission if the external webhook encounters a temporary network issue
    return false;
  }
}

export async function sendContactToGoogleAppsScript(message: ContactMessage): Promise<boolean> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  const payload = {
    type: 'contact_message',
    targetEmail: NOTIFICATION_EMAIL,
    messageId: message.id,
    submittedAt: message.createdAt,
    fullName: message.fullName,
    email: message.email,
    phone: message.phone || 'N/A',
    subject: message.subject || 'General Enquiry',
    message: message.message,
  };

  console.log(`[Notification] Routing Contact Message ${message.id} to ${NOTIFICATION_EMAIL}`);

  if (!scriptUrl) {
    return true;
  }

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    return true;
  } catch (error) {
    console.error('[Notification] Error dispatching contact message to Google Apps Script:', error);
    return false;
  }
}
