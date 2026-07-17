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

// Submit contact message (public)
router.post('/contact', async (req, res) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();
    res.json({ msg: 'Message sent successfully' });
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
