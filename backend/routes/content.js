const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Testimonial = require('../models/Testimonial');
const Settings = require('../models/Settings');
const JobApplication = require('../models/JobApplication');
const ContactMessage = require('../models/ContactMessage');

// ======== PUBLIC ROUTES (GET) ========

router.get('/services', async (req, res) => {
  try { res.json(await Service.find().sort({ orderIndex: 1, createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/services/:id', async (req, res) => {
  try { res.json(await Service.findById(req.params.id)); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/team', async (req, res) => {
  try { res.json(await TeamMember.find().sort({ orderIndex: 1, createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/team/:id', async (req, res) => {
  try { res.json(await TeamMember.findById(req.params.id)); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/hero', async (req, res) => {
  try { res.json(await Hero.findOne() || {}); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/about', async (req, res) => {
  try { res.json(await About.findOne() || {}); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/testimonials', async (req, res) => {
  try { res.json(await Testimonial.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/settings', async (req, res) => {
  try { res.json(await Settings.findOne() || {}); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// ======== PUBLIC FORMS (POST) ========

router.post('/career', async (req, res) => {
  try {
    const app = new JobApplication(req.body);
    await app.save();
    res.status(201).json(app);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.post('/contact', async (req, res) => {
  try {
    const msg = new ContactMessage(req.body);
    await msg.save();
    res.status(201).json(msg);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// ======== ADMIN ROUTES (PROTECTED) ========

// Services
router.post('/services', auth, async (req, res) => {
  try { res.status(201).json(await new Service(req.body).save()); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.put('/services/:id', auth, async (req, res) => {
  try { res.json(await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete('/services/:id', auth, async (req, res) => {
  try { await Service.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// Team
router.post('/team', auth, async (req, res) => {
  try { res.status(201).json(await new TeamMember(req.body).save()); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.put('/team/:id', auth, async (req, res) => {
  try { res.json(await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete('/team/:id', auth, async (req, res) => {
  try { await TeamMember.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// Testimonials
router.post('/testimonials', auth, async (req, res) => {
  try { res.status(201).json(await new Testimonial(req.body).save()); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.put('/testimonials/:id', auth, async (req, res) => {
  try { res.json(await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete('/testimonials/:id', auth, async (req, res) => {
  try { await Testimonial.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// Hero & About (Singleton)
router.put('/hero', auth, async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) hero = new Hero(req.body);
    else Object.assign(hero, req.body);
    await hero.save();
    res.json(hero);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/about', auth, async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = new About(req.body);
    else Object.assign(about, req.body);
    await about.save();
    res.json(about);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/settings', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings(req.body);
    else Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Job Applications & Contacts
router.get('/applications', auth, async (req, res) => {
  try { res.json(await JobApplication.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
router.put('/applications/:id', auth, async (req, res) => {
  try { res.json(await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete('/applications/:id', auth, async (req, res) => {
  try { await JobApplication.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/contact', auth, async (req, res) => {
  try { res.json(await ContactMessage.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
router.put('/contact/:id', auth, async (req, res) => {
  try { res.json(await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete('/contact/:id', auth, async (req, res) => {
  try { await ContactMessage.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// Dashboard Stats
router.get('/stats', auth, async (req, res) => {
  try {
    const servicesCount = await Service.countDocuments();
    const teamCount = await TeamMember.countDocuments();
    const testimonialsCount = await Testimonial.countDocuments();
    const appsCount = await JobApplication.countDocuments();
    const messagesCount = await ContactMessage.countDocuments();
    res.json({
      services: servicesCount,
      team: teamCount,
      testimonials: testimonialsCount,
      applications: appsCount,
      messages: messagesCount
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;