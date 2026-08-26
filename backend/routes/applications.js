const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobApplication = require('../models/JobApplication');
const ContactMessage = require('../models/ContactMessage');
const { sendEmail } = require('../utils/sendEmail');

// ─── Submit job application (public) ───────────────────────────────────────────
router.post('/jobs', async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();

    const { name, email, mobile, address, pincode, resumeUrl, aboutYourself } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'vishwajeetbankingpoint@gmail.com';
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Send emails BEFORE responding (Crucial for Vercel/Serverless execution)
    if (process.env.BREVO_API_KEY || process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
      const emailPromises = [];

      // ── 1. Admin Notification ────────────────────────────────────────
      const adminHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0369a1 100%); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #bae6fd; margin: 6px 0 0; font-size: 13px; }
    .badge { display: inline-block; background: #16a34a; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-top: 10px; letter-spacing: 1px; text-transform: uppercase; }
    .body { padding: 36px 40px; }
    .section-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
    .info-row { display: flex; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 140px; min-width: 140px; padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; background: #f1f5f9; text-transform: uppercase; }
    .info-value { padding: 14px 18px; font-size: 14px; color: #1e293b; flex: 1; word-break: break-word; }
    .message-box { background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 28px; }
    .message-box p { margin: 0; font-size: 14px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
    a { color: #0369a1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📋 New Job Application</h1>
      <p>Vishwajeet Banking Point — Job Application Received</p>
      <span class="badge">New Applicant</span>
    </div>
    <div class="body">
      <div class="section-title">Applicant Details</div>
      <div class="info-grid">
        <div class="info-row"><div class="info-label">👤 Name</div><div class="info-value">${name || '—'}</div></div>
        <div class="info-row"><div class="info-label">📧 Email</div><div class="info-value">${email ? `<a href="mailto:${email}">${email}</a>` : '—'}</div></div>
        <div class="info-row"><div class="info-label">📞 Mobile</div><div class="info-value">${mobile ? `<a href="tel:${mobile}">${mobile}</a>` : '—'}</div></div>
        <div class="info-row"><div class="info-label">🏠 Address</div><div class="info-value">${address || '—'}</div></div>
        <div class="info-row"><div class="info-label">📮 Pincode</div><div class="info-value">${pincode || '—'}</div></div>
        <div class="info-row"><div class="info-label">📄 Resume</div><div class="info-value">${resumeUrl ? `<a href="${resumeUrl}" target="_blank">View Resume</a>` : '—'}</div></div>
        <div class="info-row"><div class="info-label">🕐 Submitted</div><div class="info-value">${submittedAt} (IST)</div></div>
      </div>
      <div class="section-title">About the Applicant</div>
      <div class="message-box"><p>${aboutYourself || '—'}</p></div>
    </div>
    <div class="footer">
      <p>Automated notification from <strong>Vishwajeet Banking Point</strong> careers portal.</p>
    </div>
  </div>
</body>
</html>`;

      emailPromises.push(
        sendEmail({
          to: adminEmail,
          subject: `📋 New Job Application — ${name || 'Unknown Applicant'}`,
          html: adminHtml
        }).then(() => console.log('✅ Admin job notification sent to:', adminEmail))
          .catch(err => console.error('❌ Admin job email error:', err.message))
      );

      // ── 2. Applicant Confirmation ────────────────────────────────────
      if (email && email.includes('@')) {
        const applicantHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0369a1 100%); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #bae6fd; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 16px; color: #1e293b; margin-bottom: 20px; line-height: 1.6; }
    .section-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
    .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
    .info-row { display: flex; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 140px; min-width: 140px; padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; background: #f1f5f9; text-transform: uppercase; }
    .info-value { padding: 14px 18px; font-size: 14px; color: #1e293b; flex: 1; word-break: break-word; }
    .message-box { background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 28px; }
    .message-box p { margin: 0; font-size: 14px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; }
    .note { background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 16px 20px; margin-bottom: 28px; font-size: 13px; color: #92400e; line-height: 1.6; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
    a { color: #0369a1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✅ Application Received</h1>
      <p>Thank you for applying at Vishwajeet Banking Point</p>
    </div>
    <div class="body">
      <p class="greeting">Dear <strong>${name || 'Applicant'}</strong>,<br/>
        Thank you for applying at <strong>Vishwajeet Banking Point</strong>. We have successfully received your job application and our HR team will review it shortly. We will contact you if your profile matches our requirements.
      </p>
      <div class="section-title">Your Application Details</div>
      <div class="info-grid">
        <div class="info-row"><div class="info-label">👤 Name</div><div class="info-value">${name || '—'}</div></div>
        <div class="info-row"><div class="info-label">📧 Email</div><div class="info-value">${email || '—'}</div></div>
        <div class="info-row"><div class="info-label">📞 Mobile</div><div class="info-value">${mobile || '—'}</div></div>
        <div class="info-row"><div class="info-label">🏠 Address</div><div class="info-value">${address || '—'}</div></div>
        <div class="info-row"><div class="info-label">📮 Pincode</div><div class="info-value">${pincode || '—'}</div></div>
        <div class="info-row"><div class="info-label">📄 Resume</div><div class="info-value">${resumeUrl ? `<a href="${resumeUrl}" target="_blank">View Submitted Resume</a>` : '—'}</div></div>
        <div class="info-row"><div class="info-label">🕐 Submitted</div><div class="info-value">${submittedAt} (IST)</div></div>
      </div>
      <div class="section-title">About Yourself (as submitted)</div>
      <div class="message-box"><p>${aboutYourself || '—'}</p></div>
      <div class="note">
        📋 <strong>Please keep this email</strong> as a record of your application. Our HR team will reach out to you at this email address or on your mobile number if shortlisted.
      </div>
    </div>
    <div class="footer">
      <p>Automated confirmation from <strong>Vishwajeet Banking Point</strong> careers portal.</p>
      <p style="margin-top:6px;">© ${new Date().getFullYear()} Vishwajeet Banking Point. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

        emailPromises.push(
          sendEmail({
            to: email,
            subject: `✅ Application Received — Vishwajeet Banking Point`,
            html: applicantHtml
          }).then(() => console.log('✅ Applicant confirmation sent to:', email))
            .catch(err => console.error('❌ Applicant confirmation email error:', err.message))
        );
      }

      // Wait for emails to finish sending before closing response
      await Promise.allSettled(emailPromises);
    }

    return res.json({ msg: 'Application submitted successfully' });
  } catch (err) {
    console.error('Job application submission error:', err.message);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ─── Submit contact message (public) ───────────────────────────────────────────
router.post('/contact', async (req, res) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();

    const { name, email, mobile, subject, message: userMessage } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'vishwajeetbankingpoint@gmail.com';
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Send emails BEFORE responding (Crucial for Vercel/Serverless execution)
    if (process.env.BREVO_API_KEY || process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
      const emailPromises = [];

      // ── 1. Admin Notification ────────────────────────────────────────
      const adminHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0369a1 100%); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #bae6fd; margin: 6px 0 0; font-size: 13px; }
    .badge { display: inline-block; background: #ef4444; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-top: 10px; letter-spacing: 1px; text-transform: uppercase; }
    .body { padding: 36px 40px; }
    .section-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
    .info-row { display: flex; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 130px; min-width: 130px; padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; background: #f1f5f9; text-transform: uppercase; }
    .info-value { padding: 14px 18px; font-size: 14px; color: #1e293b; flex: 1; word-break: break-word; }
    .message-box { background: #f0f9ff; border-left: 4px solid #0369a1; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 28px; }
    .message-box p { margin: 0; font-size: 14px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
    a { color: #0369a1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📬 New Contact Message</h1>
      <p>Vishwajeet Banking Point — Contact Form Submission</p>
      <span class="badge">New Message</span>
    </div>
    <div class="body">
      <div class="section-title">Contact Details</div>
      <div class="info-grid">
        <div class="info-row"><div class="info-label">👤 Name</div><div class="info-value">${name || '—'}</div></div>
        <div class="info-row"><div class="info-label">📧 Email</div><div class="info-value">${email ? `<a href="mailto:${email}">${email}</a>` : '—'}</div></div>
        <div class="info-row"><div class="info-label">📞 Mobile</div><div class="info-value">${mobile ? `<a href="tel:${mobile}">${mobile}</a>` : '—'}</div></div>
        <div class="info-row"><div class="info-label">📌 Subject</div><div class="info-value">${subject || '—'}</div></div>
        <div class="info-row"><div class="info-label">🕐 Submitted</div><div class="info-value">${submittedAt} (IST)</div></div>
      </div>
      <div class="section-title">Message</div>
      <div class="message-box"><p>${userMessage || '—'}</p></div>
    </div>
    <div class="footer">
      <p>Automated notification from <strong>Vishwajeet Banking Point</strong> contact form.</p>
    </div>
  </div>
</body>
</html>`;

      emailPromises.push(
        sendEmail({
          to: adminEmail,
          subject: `📬 New Contact: ${name || 'User'} — ${subject || 'General Inquiry'}`,
          html: adminHtml
        }).then(() => console.log('✅ Admin contact notification sent to:', adminEmail))
          .catch(err => console.error('❌ Admin contact email error:', err.message))
      );

      // ── 2. User Auto-Reply ───────────────────────────────────────────
      if (email && email.includes('@')) {
        const userReplyHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0369a1 100%); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #bae6fd; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 16px; color: #1e293b; margin-bottom: 20px; line-height: 1.6; }
    .section-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
    .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
    .info-row { display: flex; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 130px; min-width: 130px; padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; background: #f1f5f9; text-transform: uppercase; }
    .info-value { padding: 14px 18px; font-size: 14px; color: #1e293b; flex: 1; word-break: break-word; }
    .message-box { background: #f0f9ff; border-left: 4px solid #0369a1; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 28px; }
    .message-box p { margin: 0; font-size: 14px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; }
    .note { background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 16px 20px; margin-bottom: 28px; font-size: 13px; color: #92400e; line-height: 1.6; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
    a { color: #0369a1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✅ Message Received</h1>
      <p>Thank you for contacting Vishwajeet Banking Point</p>
    </div>
    <div class="body">
      <p class="greeting">Dear <strong>${name || 'Valued Customer'}</strong>,<br/>
        Thank you for reaching out to us. We have successfully received your message and our team will respond to you shortly.
      </p>
      <div class="section-title">Your Submission Details</div>
      <div class="info-grid">
        <div class="info-row"><div class="info-label">👤 Name</div><div class="info-value">${name || '—'}</div></div>
        <div class="info-row"><div class="info-label">📧 Email</div><div class="info-value">${email || '—'}</div></div>
        <div class="info-row"><div class="info-label">📞 Mobile</div><div class="info-value">${mobile || '—'}</div></div>
        <div class="info-row"><div class="info-label">📌 Subject</div><div class="info-value">${subject || '—'}</div></div>
        <div class="info-row"><div class="info-label">🕐 Submitted</div><div class="info-value">${submittedAt} (IST)</div></div>
      </div>
      <div class="section-title">Your Message</div>
      <div class="message-box"><p>${userMessage || '—'}</p></div>
      <div class="note">
        📋 <strong>Please keep this email</strong> as a record of your submission. If you need to follow up, you can reply to this email or contact us directly.
      </div>
    </div>
    <div class="footer">
      <p>Automated confirmation from <strong>Vishwajeet Banking Point</strong>.</p>
      <p style="margin-top:6px;">© ${new Date().getFullYear()} Vishwajeet Banking Point. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

        emailPromises.push(
          sendEmail({
            to: email,
            subject: `✅ We received your message — ${subject || 'Your Inquiry to Vishwajeet Banking Point'}`,
            html: userReplyHtml
          }).then(async () => {
            console.log('✅ User auto-reply sent to:', email);
            await ContactMessage.findByIdAndUpdate(message._id, { status: 'Replied' });
          }).catch(err => console.error('❌ User auto-reply email error:', err.message))
        );
      }

      // Wait for emails to finish sending before closing response
      await Promise.allSettled(emailPromises);
    }

    return res.json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact message submission error:', err.message);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ─── Get job applications (protected) ──────────────────────────────────────────
router.get('/jobs', auth, async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── Get contact messages (protected) ──────────────────────────────────────────
router.get('/contact', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
