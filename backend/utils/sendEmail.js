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
 * 1. Nodemailer Gmail    — if EMAIL_USER/EMAIL_PASS set (PRIMARY - verified sender)
 * 2. SendGrid HTTP API   — if SENDGRID_API_KEY is set (fallback)
 * 3. Brevo HTTP API      — if BREVO_API_KEY is set (fallback)
 * 4. Resend HTTP API     — if RESEND_API_KEY is set (fallback)
 */
async function sendEmail({ to, subject, html, text }) {
  const senderName = 'Vishwajeet Banking Point';
  const senderEmail = process.env.EMAIL_USER || 'vishwajeetbankingpoint@gmail.com';

  // ── 1. NODEMAILER GMAIL SMTP (PRIMARY - uses verified Gmail app password) ──
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`📧 Sending email via Gmail Nodemailer to: ${to}`);
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 5000,   // 5s — fast fail on Render (SMTP blocked)
        socketTimeout: 8000
      });
      const result = await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to, subject, html, text: text || 'Vishwajeet Banking Point Notification'
      });
      console.log(`✅ Gmail SMTP success: ${result.messageId}`);
      return result;
    } catch (gmailErr) {
      console.error(`⚠️ Gmail SMTP failed: ${gmailErr.message}. Trying SendGrid fallback...`);
      // Fall through to SendGrid
    }
  }

  // ── 2. SENDGRID HTTP API (fallback) ───────────────────────────────────────
  if (process.env.SENDGRID_API_KEY) {
    console.log(`📧 Sending email via SendGrid HTTP API to: ${to}`);
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: senderEmail, name: senderName },
        subject,
        content: [
          { type: 'text/plain', value: text || 'Vishwajeet Banking Point Notification' },
          { type: 'text/html', value: html }
        ]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`❌ SendGrid failed (${response.status}): ${errBody}`);
      throw new Error(`SendGrid Error (${response.status}): ${errBody}`);
    }
    console.log(`✅ SendGrid success! Status: ${response.status} → ${to}`);
    return { provider: 'sendgrid', status: response.status };
  }

  // ── 3. BREVO HTTP API ──────────────────────────────────────────────────────
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

  // ── 4. RESEND HTTP API ─────────────────────────────────────────────────────
  const resend = getResendClient();
  if (resend) {
    const fromAddress = process.env.RESEND_FROM || `${senderName} <onboarding@resend.dev>`;
    console.log(`📧 Sending email via Resend API to: ${to}`);
    const response = await resend.emails.send({ from: fromAddress, to, subject, html, text: text || '' });
    if (response.error) throw new Error(`Resend Error: ${response.error.message}`);
    return response;
  }

  throw new Error('No email provider configured. Set EMAIL_USER/EMAIL_PASS, SENDGRID_API_KEY, BREVO_API_KEY, or RESEND_API_KEY.');
}

module.exports = { sendEmail };
