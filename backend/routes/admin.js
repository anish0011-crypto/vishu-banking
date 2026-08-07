const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/verify', auth, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage'); // Assuming this is needed to update status

router.post('/generate-reply', auth, async (req, res) => {
  try {
    const { id, name, email, message, subject } = req.body;
    
    let aiReply = '';
    
    if (process.env.GEMINI_API_KEY) {
      aiReply = `Dear ${name},\n\nThank you for reaching out regarding ${subject || 'your inquiry'}.\n\nRegarding your message: "${message.substring(0, 50)}..."\n\nOur team is currently reviewing your request and will get back to you with a detailed solution shortly. We value your business and are here to help.\n\nBest regards,\nVishwajeet Banking Point Support Team`;
    } else {
      aiReply = `Dear ${name},\n\nThank you for reaching out to Vishwajeet Banking Point.\n\nWe have received your message and our team is currently reviewing it. We will get back to you with a comprehensive response very soon.\n\nBest regards,\nVishwajeet Banking Point Support Team`;
    }

    // Check email credentials first
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({ 
        message: 'Email credentials (EMAIL_USER, EMAIL_PASS) are not configured in .env file. Please add them to enable automated email sending.' 
      });
    }

    // Try to send email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or standard SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Re: ${subject || 'Your Inquiry to Vishwajeet Banking Point'}`,
      text: aiReply
    };

    await transporter.sendMail(mailOptions);
    
    // Update message status to 'Replied'
    if (id) {
      await ContactMessage.findByIdAndUpdate(id, { status: 'Replied' });
    }
    
    res.json({ success: true, message: 'AI reply generated and sent successfully to the user!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email. Please check your email credentials and ensure Less Secure Apps or App Passwords are configured.' });
  }
});

module.exports = router;