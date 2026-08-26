const nodemailer = require('nodemailer');

let resendClient = null;
function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    try { resendClient = new (require('resend').Resend)(process.env.RESEND_API_KEY); } catch(e) {}
  }
  return resendClient;
}

/**
 * Send email using (in priority order):
 * 1. SendGrid HTTP API   — if SENDGRID_API_KEY is set (works on Render free tier)
 * 2. Brevo HTTP API      — if BREVO_API_KEY is set (works on Render free tier)
 * 3. Resend HTTP API     — if RESEND_API_KEY is set (requires domain for non-owner emails)
 * 4. Nodemailer Gmail    — if EMAIL_USER/EMAIL_PASS set (blocked on Render free tier)
 */
async function sendEmail({ to, subject, html, text }) {
  const senderName = 'Vishwajeet Banking Point';
  const senderEmail = process.env.EMAIL_USER || 'vishwajeetbankingpoint@gmail.com';

  // ── 1. SENDGRID HTTP API (Best for Render free tier) ──────────────────────
  if (process.env.SENDGRID_API_KEY) {
    console.log(`📧 Sending email via SendGrid HTTP API to: ${to}`);
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: { email: senderEmail, name: senderName },
        to: [{ email: to }],
        subject,
        content: [
          { type: 'text/html', value: html },
          { type: 'text/plain', value: text || 'Vishwajeet Banking Point Notification' }
        ]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`SendGrid Error (${response.status}): ${errBody}`);
    }
    return { provider: 'sendgrid', status: response.status };
  }

  // ── 2. BREVO HTTP API ──────────────────────────────────────────────────────
  if (process.env.BREVO_API_KEY) {
    console.log(`📧 Sending email via Brevo HTTP API to: ${to}`);
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text || 'Vishwajeet Banking Point Notification'
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(`Brevo Error (${response.status}): ${data.message || JSON.stringify(data)}`);
    return data;
  }

  // ── 3. RESEND HTTP API ─────────────────────────────────────────────────────
  const resend = getResendClient();
  if (resend) {
    const fromAddress = process.env.RESEND_FROM || `${senderName} <onboarding@resend.dev>`;
    console.log(`📧 Sending email via Resend API to: ${to}`);
    const response = await resend.emails.send({ from: fromAddress, to, subject, html, text: text || '' });
    if (response.error) throw new Error(`Resend Error: ${response.error.message}`);
    return response;
  }

  // ── 4. NODEMAILER GMAIL SMTP (may be blocked on Render free tier) ─────────
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`📧 Sending email via Gmail Nodemailer to: ${to}`);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 15000,
      socketTimeout: 20000
    });
    return await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to, subject, html, text: text || 'Vishwajeet Banking Point Notification'
    });
  }

  throw new Error('No email provider configured. Set SENDGRID_API_KEY, BREVO_API_KEY, RESEND_API_KEY, or EMAIL_USER/EMAIL_PASS.');
}

module.exports = { sendEmail };
