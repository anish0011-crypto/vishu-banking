const nodemailer = require('nodemailer');

// Detect cloud/production environment (Render sets RENDER=true, also check NODE_ENV)
const IS_PRODUCTION = !!(process.env.RENDER || process.env.VERCEL || process.env.NODE_ENV === 'production');

let resendClient = null;
function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    try { resendClient = new (require('resend').Resend)(process.env.RESEND_API_KEY); } catch(e) {}
  }
  return resendClient;
}

/**
 * Send email using (in priority order):
 * LOCAL:      1. Gmail SMTP  2. SendGrid  3. Brevo  4. Resend
 * PRODUCTION: 1. SendGrid    2. Brevo     3. Resend
 * (Gmail SMTP is blocked on Render/Vercel free tier — skipped in production)
 */
async function sendEmail({ to, subject, html, text }) {
  const senderName = 'Vishwajeet Banking Point';
  const senderEmail = process.env.EMAIL_USER || 'vishwajeetbankingpoint@gmail.com';

  // ── Gmail SMTP — LOCAL ONLY (Render/Vercel blocks SMTP ports) ─────────────
  if (!IS_PRODUCTION && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`📧 [LOCAL] Sending email via Gmail SMTP to: ${to}`);
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        socketTimeout: 15000
      });
      const result = await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to, subject, html, text: text || 'Vishwajeet Banking Point Notification'
      });
      console.log(`✅ Gmail SMTP success: ${result.messageId}`);
      return result;
    } catch (gmailErr) {
      console.error(`⚠️ Gmail SMTP failed: ${gmailErr.message}. Trying SendGrid...`);
    }
  } else if (IS_PRODUCTION) {
    console.log(`🌐 [PRODUCTION] Skipping Gmail SMTP (SMTP blocked on cloud). Using SendGrid...`);
  }

  // ── SendGrid HTTP API — Works on all cloud platforms ──────────────────────
  if (process.env.SENDGRID_API_KEY) {
    console.log(`📧 Sending email via SendGrid to: ${to}`);
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: senderEmail, name: senderName },
        reply_to: { email: senderEmail, name: senderName },
        subject,
        content: [
          { type: 'text/plain', value: text || 'Vishwajeet Banking Point Notification' },
          { type: 'text/html', value: html }
        ],
        // Transactional email settings — improves inbox delivery
        mail_settings: {
          bypass_spam_management: { enable: true },
          bypass_bounce_management: { enable: true }
        },
        tracking_settings: {
          click_tracking: { enable: false },
          open_tracking: { enable: false },
          subscription_tracking: { enable: false }
        },
        categories: ['transactional']
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`❌ SendGrid failed (${response.status}): ${errBody}`);
      // If SendGrid fails, fall through to Brevo
    } else {
      console.log(`✅ SendGrid success! Status: ${response.status} → ${to}`);
      return { provider: 'sendgrid', status: response.status };
    }
  }


  // ── Brevo HTTP API — fallback ──────────────────────────────────────────────
  if (process.env.BREVO_API_KEY) {
    console.log(`📧 Sending email via Brevo to: ${to}`);
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
    if (!response.ok) {
      console.error(`❌ Brevo failed (${response.status}): ${data.message}`);
    } else {
      console.log(`✅ Brevo success! → ${to}`);
      return data;
    }
  }

  // ── Resend API — last fallback ─────────────────────────────────────────────
  const resend = getResendClient();
  if (resend) {
    const fromAddress = process.env.RESEND_FROM || `${senderName} <onboarding@resend.dev>`;
    console.log(`📧 Sending email via Resend to: ${to}`);
    const response = await resend.emails.send({ from: fromAddress, to, subject, html, text: text || '' });
    if (response.error) throw new Error(`Resend Error: ${response.error.message}`);
    console.log(`✅ Resend success! → ${to}`);
    return response;
  }

  throw new Error('No email provider worked. Please verify SendGrid sender at sendgrid.com → Settings → Sender Authentication.');
}

module.exports = { sendEmail };
