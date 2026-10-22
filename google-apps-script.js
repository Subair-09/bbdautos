/**
 * BBD AUTOS — Google Apps Script for Quotations & Enquiries
 * 
 * Automatically sends incoming quotation requests and contact enquiries
 * directly to: Info@bbdautosng.com, sales@bbdautosng.com
 * 
 * HOW TO DEPLOY IN 2 MINUTES:
 * 1. Go to https://script.google.com (or in a new Google Sheet: Extensions > Apps Script)
 * 2. Delete any default code in Code.gs and paste this ENTIRE file into the editor.
 * 3. Click "Save" (disk icon).
 * 4. Click "Deploy" (blue button at top right) > "New deployment".
 * 5. Select type: "Web app".
 * 6. Under "Execute as": select "Me" (your Google account).
 * 7. Under "Who has access": select "Anyone" (so the BBD Autos website can post to it).
 * 8. Click "Deploy" and authorize the script.
 * 9. Copy the generated "Web App URL" (ends in /exec).
 * 10. Add it to your .env.local file in the bbdautos project:
 *     GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx_YR9NxMrBDtInLo-w6jqbp8R0lai5yXRgsU4L2-WK2jMyWjQAsx2YivBwCsAMtmZr7w/exec"
 */

const RECIPIENT_EMAIL = "Info@bbdautosng.com, sales@bbdautosng.com";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data payload received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var type = data.type || "quote_request";

    if (type === "contact_message") {
      return handleContactMessage(data);
    } else {
      return handleQuoteRequest(data);
    }
  } catch (error) {
    Logger.log("Error processing POST: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleQuoteRequest(data) {
  var rfqId = data.rfqId || "RFQ-" + new Date().getTime();
  var fullName = data.fullName || "N/A";
  var email = data.email || "N/A";
  var phone = data.phone || "N/A";
  var companyName = data.companyName || "N/A";
  var businessType = data.businessType || "N/A";
  var deliveryLocation = data.deliveryLocation || "N/A";
  var notes = data.additionalNotes || "None";
  var items = data.items || [];

  // Build items table HTML
  var itemsHtml = '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:13px;border-color:#E3E4E6;">' +
    '<tr style="background:#171B1F;color:#ffffff;text-align:left;">' +
      '<th>Product</th>' +
      '<th>Category / Specs</th>' +
      '<th style="text-align:center;">Quantity</th>' +
    '</tr>';

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    itemsHtml += '<tr style="background:' + (i % 2 === 0 ? '#FFFFFF' : '#F9FAFB') + ';">' +
      '<td><strong style="color:#171B1F;">' + (item.name || "Item") + '</strong></td>' +
      '<td style="color:#6B7077;">' + (item.specificationSummary || item.brand || item.category || "-") + '</td>' +
      '<td style="text-align:center;font-weight:bold;color:#C91F26;">' + item.quantity + '</td>' +
    '</tr>';
  }
  itemsHtml += '</table>';

  var subject = "🚨 New BBD Autos Quote Request: " + rfqId + " - " + fullName;

  var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;padding:24px;border:1px solid #E3E4E6;border-radius:8px;background:#ffffff;">' +
    '<div style="border-bottom:3px solid #C91F26;padding-bottom:12px;margin-bottom:20px;">' +
      '<h2 style="margin:0;color:#171B1F;font-size:22px;letter-spacing:-0.5px;">BBD <span style="color:#C91F26;">AUTOS</span></h2>' +
      '<p style="margin:4px 0 0;color:#6B7077;font-size:13px;">Commercial Quotation Request &middot; Ref: <strong style="color:#171B1F;">' + rfqId + '</strong></p>' +
    '</div>' +

    '<h3 style="color:#171B1F;font-size:15px;margin-top:0;border-bottom:1px solid #EAEAEA;padding-bottom:6px;">Customer & Delivery Information</h3>' +
    '<table style="width:100%;font-size:13px;line-height:1.7;margin-bottom:20px;">' +
      '<tr><td style="width:140px;color:#6B7077;">Full Name:</td><td><strong style="color:#171B1F;">' + fullName + '</strong></td></tr>' +
      '<tr><td style="color:#6B7077;">Email:</td><td><a href="mailto:' + email + '" style="color:#C91F26;font-weight:bold;">' + email + '</a></td></tr>' +
      '<tr><td style="color:#6B7077;">Phone:</td><td><strong style="color:#171B1F;">' + phone + '</strong></td></tr>' +
      '<tr><td style="color:#6B7077;">Company:</td><td>' + companyName + '</td></tr>' +
      '<tr><td style="color:#6B7077;">Business Type:</td><td>' + businessType + '</td></tr>' +
      '<tr><td style="color:#6B7077;">Delivery Location:</td><td><strong style="color:#171B1F;">' + deliveryLocation + '</strong></td></tr>' +
      '<tr><td style="color:#6B7077;">Customer Notes:</td><td style="color:#444;">' + notes + '</td></tr>' +
    '</table>' +

    '<h3 style="color:#171B1F;font-size:15px;border-bottom:1px solid #EAEAEA;padding-bottom:6px;">Requested Items (' + items.length + ')</h3>' +
    itemsHtml +

    '<div style="margin-top:24px;padding:12px;background:#F5F5F5;border-radius:4px;font-size:11px;color:#6B7077;text-align:center;">' +
      'Sent automatically from BBD Autos web quotation system to <strong>' + (data.targetEmail || RECIPIENT_EMAIL) + '</strong>.<br>' +
      'You can reply directly to this email to contact <strong>' + fullName + '</strong>.' +
    '</div>' +
  '</div>';

  var recipient = data.targetEmail || RECIPIENT_EMAIL;

  // Send email to Info@bbdautosng.com, sales@bbdautosng.com
  GmailApp.sendEmail(recipient, subject, "New Quote Request: " + rfqId + " from " + fullName + " (" + email + ", " + phone + ")", {
    htmlBody: htmlBody,
    replyTo: email
  });

  // Optional: If script is bounded to a Google Sheet, log the row
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      rfqId,
      fullName,
      email,
      phone,
      companyName,
      businessType,
      deliveryLocation,
      items.map(function(it){ return it.name + " (" + it.quantity + ")"; }).join(", "),
      notes
    ]);
  } catch(e) {
    // Standalone script, no sheet attached
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success", rfqId: rfqId }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleContactMessage(data) {
  var fullName = data.fullName || "N/A";
  var email = data.email || "N/A";
  var phone = data.phone || "N/A";
  var subject = data.subject || "General Commercial Enquiry";
  var message = data.message || "N/A";

  var emailSubject = "📬 BBD Autos Contact Message: " + subject + " - " + fullName;

  var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #E3E4E6;border-radius:8px;">' +
    '<h2 style="color:#171B1F;border-bottom:2px solid #C91F26;padding-bottom:8px;">BBD Autos Contact Form</h2>' +
    '<p><strong>From:</strong> ' + fullName + ' (' + email + ', ' + phone + ')</p>' +
    '<p><strong>Subject:</strong> ' + subject + '</p>' +
    '<div style="background:#F9FAFB;padding:16px;border-radius:6px;border:1px solid #E5E7EB;margin:16px 0;">' +
      '<p style="margin:0;white-space:pre-wrap;">' + message + '</p>' +
    '</div>' +
    '<p style="font-size:12px;color:#666;">Routed automatically to ' + (data.targetEmail || RECIPIENT_EMAIL) + '</p>' +
  '</div>';

  var recipient = data.targetEmail || RECIPIENT_EMAIL;

  GmailApp.sendEmail(recipient, emailSubject, message, {
    htmlBody: htmlBody,
    replyTo: email
  });

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
