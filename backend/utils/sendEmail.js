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
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Send email using Resend (HTTPS API - works on Render) if RESEND_API_KEY is present,
 * otherwise fall back to Nodemailer SMTP.
 */
async function sendEmail({ to, subject, html, text }) {
  const resend = getResendClient();

  if (resend) {
    // Determine the 'from' address
    // Resend requires a verified domain or 'onboarding@resend.dev' for free tier testing
    const fromAddress = process.env.RESEND_FROM || 'Vishwajeet Banking Point <onboarding@resend.dev>';

    console.log(`📧 Sending email via Resend API to: ${to}`);
    const response = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
      text
    });

    if (response.error) {
      throw new Error(`Resend Error: ${response.error.message}`);
    }
    return response;
  }

  // Fallback: Nodemailer SMTP
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`📧 Sending email via Nodemailer SMTP to: ${to}`);
    const transporter = createNodemailerTransporter();
    const fromAddress = `"Vishwajeet Banking Point" <${process.env.EMAIL_USER}>`;

    return await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
      text
    });
  }

  throw new Error('No email credentials configured. Please set RESEND_API_KEY or EMAIL_USER & EMAIL_PASS in environment variables.');
}

module.exports = { sendEmail };
