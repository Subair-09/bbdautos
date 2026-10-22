/**
 * BBD AUTOS — Official Google Apps Script for Quotations & Contact Enquiries
 * 
 * Automatically sends incoming quotation requests and contact enquiries
 * directly to: Info@bbdautosng.com, sales@bbdautosng.com
 * 
 * SENDER DISPLAY: BBD Autos Contact Desk <nuddywale@gmail.com>
 * 
 * ============================================================================
 * HOW TO UPDATE / DEPLOY IN 30 SECONDS:
 * ============================================================================
 * 1. Open https://script.google.com
 * 2. Open your BBD Autos project.
 * 3. Delete everything in the code editor, and paste this ENTIRE file.
 * 4. Click the "Save" icon (disk icon).
 * 5. Click "Deploy" (top right) > "Manage deployments".
 * 6. Click the Pencil icon (Edit) on your Active deployment.
 * 7. In the "Version" dropdown, select "New version".
 * 8. Click the blue "Deploy" button.
 * ============================================================================
 */

const RECIPIENT_EMAIL = "Info@bbdautosng.com, sales@bbdautosng.com";

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data payload received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

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
  var rfqId = data.rfqId || data.id || "RFQ-" + new Date().getTime();
  var fullName = data.fullName || data.name || data.customerName || data.clientName || "Not Provided";
  var email = data.email || data.emailAddress || "Not Provided";
  var phone = data.phone || data.phoneNumber || data.tel || "Not Provided";
  var companyName = data.companyName || data.company || "Individual Buyer / Not Specified";
  var businessType = data.businessType || data.business || "Not Specified";
  var deliveryLocation = data.deliveryLocation || data.location || data.deliveryAddress || "Not Specified";
  var notes = data.additionalNotes || data.notes || data.message || "None";
  
  // Safely parse items
  var items = data.items || [];
  if (typeof items === "string") {
    try {
      items = JSON.parse(items);
    } catch(err) {
      items = [];
    }
  }

  // Build items table HTML
  var itemsHtml = "";
  var plainTextItems = "";

  if (items && items.length > 0) {
    itemsHtml = '<table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Arial,Helvetica,sans-serif;font-size:13px;border-color:#E3E4E6;">' +
      '<tr style="background:#171B1F;color:#ffffff;text-align:left;">' +
        '<th style="padding:10px 12px;">Product</th>' +
        '<th style="padding:10px 12px;">Category / Specifications</th>' +
        '<th style="padding:10px 12px;text-align:center;width:90px;">Quantity</th>' +
      '</tr>';

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemName = item.name || "Item";
      var itemSpecs = item.specificationSummary || item.brand || item.category || "-";
      var itemQty = item.quantity || 1;

      itemsHtml += '<tr style="background:' + (i % 2 === 0 ? '#FFFFFF' : '#F9FAFB') + ';">' +
        '<td style="padding:10px 12px;"><strong style="color:#171B1F;font-size:14px;">' + itemName + '</strong></td>' +
        '<td style="padding:10px 12px;color:#555555;">' + itemSpecs + '</td>' +
        '<td style="padding:10px 12px;text-align:center;font-weight:bold;font-size:14px;color:#C91F26;">' + itemQty + '</td>' +
      '</tr>';

      plainTextItems += "\n  • " + itemName + " - Qty: " + itemQty + " (" + itemSpecs + ")";
    }
    itemsHtml += '</table>';
  } else {
    itemsHtml = '<p style="color:#6B7077;font-style:italic;">No products specified.</p>';
    plainTextItems = "\n  (No specific items listed)";
  }

  var subject = "New BBD Autos Quote Request: " + rfqId + " - " + fullName;

  var htmlBody = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;padding:24px;border:1px solid #E3E4E6;border-radius:8px;background:#ffffff;">' +
    '<div style="border-bottom:3px solid #C91F26;padding-bottom:12px;margin-bottom:20px;">' +
      '<h2 style="margin:0;color:#171B1F;font-size:22px;letter-spacing:-0.5px;">BBD <span style="color:#C91F26;">AUTOS</span></h2>' +
      '<p style="margin:4px 0 0;color:#6B7077;font-size:13px;">Commercial Quotation Request &middot; Ref: <strong style="color:#171B1F;">' + rfqId + '</strong></p>' +
    '</div>' +

    '<h3 style="color:#171B1F;font-size:15px;margin-top:0;margin-bottom:12px;border-bottom:1px solid #EAEAEA;padding-bottom:6px;">Customer & Delivery Information</h3>' +
    '<table style="width:100%;font-size:13px;line-height:1.8;margin-bottom:20px;border-collapse:collapse;">' +
      '<tr>' +
        '<td style="width:140px;color:#6B7077;padding:6px 0;vertical-align:top;">Full Name:</td>' +
        '<td style="padding:6px 0;"><strong style="color:#171B1F;font-size:15px;">' + fullName + '</strong></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:6px 0;vertical-align:top;">Phone Number:</td>' +
        '<td style="padding:6px 0;"><strong style="color:#171B1F;font-size:14px;"><a href="tel:' + phone + '" style="color:#171B1F;text-decoration:none;">' + phone + '</a></strong></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:6px 0;vertical-align:top;">Email Address:</td>' +
        '<td style="padding:6px 0;"><a href="mailto:' + email + '" style="color:#C91F26;font-weight:bold;text-decoration:none;">' + email + '</a></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:6px 0;vertical-align:top;">Delivery Location:</td>' +
        '<td style="padding:6px 0;"><strong style="color:#C91F26;background:#FDF2F2;padding:3px 8px;border-radius:4px;display:inline-block;">' + deliveryLocation + '</strong></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:6px 0;vertical-align:top;">Company Name:</td>' +
        '<td style="padding:6px 0;color:#171B1F;font-weight:600;">' + companyName + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:6px 0;vertical-align:top;">Business Type:</td>' +
        '<td style="padding:6px 0;color:#171B1F;">' + businessType + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:6px 0;vertical-align:top;">Customer Notes:</td>' +
        '<td style="padding:6px 0;color:#333333;background:#F9FAFB;padding:10px;border-radius:4px;border:1px solid #E5E7EB;">' + notes + '</td>' +
      '</tr>' +
    '</table>' +

    '<h3 style="color:#171B1F;font-size:15px;margin-top:24px;margin-bottom:12px;border-bottom:1px solid #EAEAEA;padding-bottom:6px;">Requested Items (' + items.length + ')</h3>' +
    itemsHtml +

    '<div style="margin-top:24px;padding:14px;background:#F5F5F5;border-radius:6px;font-size:12px;color:#6B7077;text-align:center;line-height:1.5;">' +
      'Sent automatically from BBD Autos web quotation system to <strong>' + (data.targetEmail || RECIPIENT_EMAIL) + '</strong>.<br>' +
      'Click <strong>Reply</strong> in your email client to respond directly to <strong>' + fullName + '</strong> (' + email + ').' +
    '</div>' +
  '</div>';

  var plainTextBody = "====================================================\n" +
    "BBD AUTOS — NEW QUOTATION REQUEST\n" +
    "Reference: " + rfqId + "\n" +
    "====================================================\n\n" +
    "CUSTOMER & DELIVERY DETAILS:\n" +
    "----------------------------------------------------\n" +
    "Full Name:         " + fullName + "\n" +
    "Phone Number:      " + phone + "\n" +
    "Email Address:     " + email + "\n" +
    "Delivery Location: " + deliveryLocation + "\n" +
    "Company Name:      " + companyName + "\n" +
    "Business Type:     " + businessType + "\n" +
    "Customer Notes:    " + notes + "\n\n" +
    "REQUESTED ITEMS (" + items.length + "):\n" +
    "----------------------------------------------------" +
    plainTextItems + "\n\n" +
    "====================================================\n" +
    "Reply directly to this email to contact " + fullName + " (" + email + ")";

  var recipient = (data.targetEmail && data.targetEmail.indexOf("@") !== -1) ? data.targetEmail : RECIPIENT_EMAIL;

  GmailApp.sendEmail(recipient, subject, plainTextBody, {
    name: "BBD Autos Contact Desk",
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
      items.map(function(it){ return (it.name || "Item") + " (" + (it.quantity || 1) + ")"; }).join(", "),
      notes
    ]);
  } catch(e) {
    // Standalone script, no sheet attached
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success", rfqId: rfqId }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleContactMessage(data) {
  var fullName = data.fullName || data.name || "Not Provided";
  var email = data.email || data.emailAddress || "Not Provided";
  var phone = data.phone || data.phoneNumber || data.tel || "Not Provided";
  var subject = data.subject || "General Commercial Enquiry";
  var message = data.message || "No message body provided.";

  var emailSubject = "BBD Autos Contact Enquiry: " + subject + " - " + fullName;

  var htmlBody = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;padding:24px;border:1px solid #E3E4E6;border-radius:8px;background:#ffffff;">' +
    '<div style="border-bottom:3px solid #C91F26;padding-bottom:12px;margin-bottom:20px;">' +
      '<h2 style="margin:0;color:#171B1F;font-size:22px;letter-spacing:-0.5px;">BBD <span style="color:#C91F26;">AUTOS</span></h2>' +
      '<p style="margin:4px 0 0;color:#6B7077;font-size:13px;">Website Contact Form &middot; <strong style="color:#171B1F;">' + subject + '</strong></p>' +
    '</div>' +

    '<h3 style="color:#171B1F;font-size:15px;margin-top:0;margin-bottom:12px;border-bottom:1px solid #EAEAEA;padding-bottom:6px;">Sender Information</h3>' +
    '<table style="width:100%;font-size:13px;line-height:1.8;margin-bottom:20px;border-collapse:collapse;">' +
      '<tr>' +
        '<td style="width:130px;color:#6B7077;padding:4px 0;vertical-align:top;">Full Name:</td>' +
        '<td style="padding:4px 0;"><strong style="color:#171B1F;font-size:14px;">' + fullName + '</strong></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:4px 0;vertical-align:top;">Email Address:</td>' +
        '<td style="padding:4px 0;"><a href="mailto:' + email + '" style="color:#C91F26;font-weight:bold;text-decoration:none;">' + email + '</a></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:4px 0;vertical-align:top;">Phone Number:</td>' +
        '<td style="padding:4px 0;"><strong style="color:#171B1F;">' + phone + '</strong></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="color:#6B7077;padding:4px 0;vertical-align:top;">Subject:</td>' +
        '<td style="padding:4px 0;color:#171B1F;font-weight:600;">' + subject + '</td>' +
      '</tr>' +
    '</table>' +

    '<h3 style="color:#171B1F;font-size:15px;margin-top:0;margin-bottom:10px;border-bottom:1px solid #EAEAEA;padding-bottom:6px;">Message</h3>' +
    '<div style="background:#F9FAFB;padding:16px 18px;border-radius:6px;border:1px solid #E5E7EB;margin-bottom:20px;">' +
      '<p style="margin:0;color:#191B1F;font-size:14px;line-height:1.6;white-space:pre-wrap;">' + message + '</p>' +
    '</div>' +

    '<div style="margin-top:24px;padding:12px;background:#F5F5F5;border-radius:4px;font-size:11px;color:#6B7077;text-align:center;">' +
      'Submitted via BBD Autos contact form and routed to <strong>' + (data.targetEmail || RECIPIENT_EMAIL) + '</strong>.<br>' +
      'Click <strong>Reply</strong> in your email client to respond directly to <strong>' + fullName + '</strong> (' + email + ').' +
    '</div>' +
  '</div>';

  var plainTextContact = "====================================================\n" +
    "BBD AUTOS — NEW CONTACT ENQUIRY\n" +
    "Subject: " + subject + "\n" +
    "====================================================\n\n" +
    "SENDER INFORMATION:\n" +
    "----------------------------------------------------\n" +
    "Full Name:     " + fullName + "\n" +
    "Email Address: " + email + "\n" +
    "Phone Number:  " + phone + "\n" +
    "Subject:       " + subject + "\n\n" +
    "MESSAGE:\n" +
    "----------------------------------------------------\n" +
    message + "\n\n" +
    "====================================================\n" +
    "Reply directly to this email to contact " + fullName + " (" + email + ")";

  var recipient = (data.targetEmail && data.targetEmail.indexOf("@") !== -1) ? data.targetEmail : RECIPIENT_EMAIL;

  GmailApp.sendEmail(recipient, emailSubject, plainTextContact, {
    name: "BBD Autos Contact Desk",
    htmlBody: htmlBody,
    replyTo: email
  });

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
