const { Resend } = require('resend');
const nodemailer = require('nodemailer');

let resendClient = null;

function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function createNodemailerTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL port 465 (works on Render, Vercel, AWS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000
  });
}

/**
 * Send email using:
 * 1. Brevo HTTP API (if BREVO_API_KEY set) - Can send to ANY email address without domain restriction
 * 2. Resend HTTP API (if RESEND_API_KEY set)
 * 3. Nodemailer SMTP on Port 465 SSL (if EMAIL_USER/EMAIL_PASS set)
 */
async function sendEmail({ to, subject, html, text }) {
  // ── 1. BREVO HTTP API ──────────────────────────────────────────────────────
  if (process.env.BREVO_API_KEY) {
    console.log(`📧 Sending email via Brevo HTTP API to: ${to}`);
    const senderEmail = process.env.EMAIL_USER || 'vishwajeetbankingpoint@gmail.com';
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Vishwajeet Banking Point', email: senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text || 'Vishwajeet Banking Point Notification'
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Brevo Error (${response.status}): ${data.message || JSON.stringify(data)}`);
    }
    return data;
  }

  // ── 2. RESEND HTTP API ─────────────────────────────────────────────────────
  const resend = getResendClient();
  if (resend) {
    const fromAddress = process.env.RESEND_FROM || 'Vishwajeet Banking Point <onboarding@resend.dev>';
    console.log(`📧 Sending email via Resend API to: ${to}`);
    const response = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
      text: text || 'Vishwajeet Banking Point Notification'
    });

    if (response.error) {
      throw new Error(`Resend Error: ${response.error.message}`);
    }
    return response;
  }

  // ── 3. NODEMAILER SMTP (PORT 465 SSL) ─────────────────────────────────────
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`📧 Sending email via Gmail Nodemailer (Port 465 SSL) to: ${to}`);
    const transporter = createNodemailerTransporter();
    const fromAddress = `"Vishwajeet Banking Point" <${process.env.EMAIL_USER}>`;

    return await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
      text: text || 'Vishwajeet Banking Point Notification'
    });
  }

  throw new Error('No email service configured. Set EMAIL_USER & EMAIL_PASS, BREVO_API_KEY, or RESEND_API_KEY in environment variables.');
}

module.exports = { sendEmail };
