const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobApplication = require('../models/JobApplication');
const ContactMessage = require('../models/ContactMessage');

// Submit job application (public)
router.post('/jobs', async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();
    res.json({ msg: 'Application submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const nodemailer = require('nodemailer');

// Submit contact message (public)
router.post('/contact', async (req, res) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();
    
    // Respond to user immediately
    res.json({ msg: 'Message sent successfully' });

    // Send auto-reply in the background
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const { name, email, message: userMessage, subject } = req.body;
        
        let aiReply = '';
        if (process.env.GEMINI_API_KEY) {
          aiReply = `Dear ${name},\n\nThank you for reaching out regarding ${subject || 'your inquiry'}.\n\nRegarding your message: "${userMessage.substring(0, 50)}..."\n\nOur team is currently reviewing your request and will get back to you with a detailed solution shortly. We value your business and are here to help.\n\nBest regards,\nVishwajeet Banking Point Support Team`;
        } else {
          aiReply = `Dear ${name},\n\nThank you for reaching out to Vishwajeet Banking Point.\n\nWe have received your message and our team is currently reviewing it. We will get back to you with a comprehensive response very soon.\n\nBest regards,\nVishwajeet Banking Point Support Team`;
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
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
        
        // Update status to Replied
        message.status = 'Replied';
        await message.save();
      }
    } catch (emailErr) {
      console.error('Failed to send auto-reply email:', emailErr.message);
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get job applications (protected)
router.get('/jobs', auth, async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get contact messages (protected)
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
