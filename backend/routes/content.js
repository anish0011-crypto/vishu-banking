const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const Stats = require('../models/Stats');
const Partner = require('../models/Partner');
const Gallery = require('../models/Gallery');
const FAQ = require('../models/FAQ');
const Blog = require('../models/Blog');
const Download = require('../models/Download');

// Initialize default content ONLY if the DB is empty (runs once on first start)
const initDefaultContent = async () => {
  // If Hero already exists, skip seeding to preserve admin's changes
  const existing = await Hero.findOne();
  if (existing) {
    console.log('Content already exists, skipping seed.');
    return;
  }

  console.log('No content found — seeding default data...');

  // Hero Section
  await new Hero({
    greeting: 'Welcome to',
    title: 'Vishwajeet Banking Point',
    subtitle: 'Banking Services | Financial Solutions | Business Opportunities',
    tagline: 'Trusted Banking Partner Since 2023',
    image: 'https://www.vishwajeetbanking.in/static/media/man.d5b282324f3664052562.png'
  }).save();

  // About Section
  await new About({
    title: 'About Vishwajeet Banking Point',
    name: 'Vishwajeet Raj',
    contact: '9506562637',
    email: 'vishwajeetbankingpoint@gmail.com',
    gstNumber: '09EMHPR1060Q1ZD',
    description: 'MANAGER at Airtel Payments Bank behalf of RBI with experience in leveraging consultative selling strategies that build relationships across all target markets. Deep knowledge of marketing campaign development and implementation of training programs for new hires.',
    mission: 'To provide accessible, reliable, and innovative banking services to every individual and business.',
    vision: 'To become the most trusted fintech partner in the region, empowering millions with financial freedom.',
    whyChooseUs: [
      'RBI Authorized Banking Partners',
      'Trusted Fintech Services',
      'Experienced Team',
      'Fast Customer Support',
      'Secure Transactions'
    ],
    roles: [
      'Manager @ Airtel Payments Bank',
      'Business Development Executive @ Google Pay Business',
      'Distributor @ RapiPay Fintech Pvt. Ltd',
      'Distributor @ Relipay Fintech Pvt. Ltd',
      'Distributor @ PhonePe Business Pvt. Ltd'
    ],
    profileImage: 'https://www.vishwajeetbanking.in/static/media/Vishwajeet.cd2645a1adccc400b219.jpg'
  }).save();

  // Stats
  await new Stats({
    happyCustomers: 5000,
    teamMembers: 10,
    yearsExperience: 7,
    bankingServices: 20,
    retailPartners: 500,
    customerSupport: '24×7'
  }).save();

  // Services
  await Service.insertMany([
    { name: 'AEPS', description: 'Aadhaar Enabled Payment System for easy cash withdrawal and balance inquiry.', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', benefits: ['No card needed', '24x7 availability', 'Secure transactions'], documentsRequired: ['Aadhaar Card'], isFeatured: true, category: 'aeps' },
    { name: 'Micro ATM', description: 'Mini ATM service for small businesses and retailers.', imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', benefits: ['Low cost', 'Easy to use', 'High commission'], documentsRequired: ['Shop Proof', 'Aadhaar'], isFeatured: true, category: 'micro-atm' },
    { name: 'Money Transfer', description: 'Instant money transfer to any bank account in India.', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', benefits: ['Instant transfer', 'Low charges', 'Secure'], documentsRequired: ['Account details'], isFeatured: true, category: 'money-transfer' },
    { name: 'PAN Card', description: 'PAN card application and correction services.', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', benefits: ['Fast processing', 'Doorstep service', 'Easy application'], documentsRequired: ['Aadhaar', 'Photo'], isFeatured: true, category: 'pan-card' },
    { name: 'Insurance', description: 'Life, health, and vehicle insurance services.', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400', benefits: ['Multiple plans', 'Affordable premiums', 'Quick claims'], documentsRequired: ['ID proof', 'Address proof'], isFeatured: true, category: 'insurance' },
    { name: 'FASTag', description: 'Fastag for toll booth payments across India.', imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400', benefits: ['Cashless toll', 'No waiting', 'Easy recharge'], documentsRequired: ['RC'], isFeatured: true, category: 'fastag' },
    { name: 'Account Opening', description: 'Open bank accounts instantly with Aadhaar.', imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d7?w=400', benefits: ['Instant account', 'Zero balance', 'Debit card'], documentsRequired: ['Aadhaar', 'PAN'], isFeatured: true, category: 'account' },
    { name: 'Aadhaar Services', description: 'Aadhaar update, enrollment, and print services.', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575cc?w=400', benefits: ['Doorstep service', 'Fast processing', 'Easy'], documentsRequired: ['Old Aadhaar'], isFeatured: false, category: 'aadhaar' },
    { name: 'Retailer ID', description: 'Become a retail partner and earn high commission.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', benefits: ['High commission', 'Training support', 'Marketing'], documentsRequired: ['Shop proof', 'ID'], isFeatured: false, category: 'business' },
    { name: 'Merchant QR', description: 'Accept payments via QR code.', imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400', benefits: ['No charges', 'Instant settlement', 'Easy'], documentsRequired: ['Shop proof'], isFeatured: false, category: 'business' },
    { name: 'Sound Box', description: 'Payment confirmation soundbox for shops.', imageUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400', benefits: ['Instant alert', 'Clear voice', 'Portable'], documentsRequired: ['Shop proof'], isFeatured: false, category: 'business' },
    { name: 'Recharge', description: 'Mobile, DTH, and data card recharge.', imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', benefits: ['All operators', 'Instant recharge', 'Commission'], documentsRequired: [], isFeatured: false, category: 'recharge' },
    { name: 'Bill Payment', description: 'Electricity, water, and other bill payments.', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', benefits: ['All bills', 'On time payment', 'Easy'], documentsRequired: [], isFeatured: false, category: 'bill-payment' },
    { name: 'Loan Assistance', description: 'Personal and business loan assistance.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38e71?w=400', benefits: ['Low interest', 'Quick approval', 'Less paperwork'], documentsRequired: ['ID', 'Income'], isFeatured: false, category: 'loan' },
    { name: 'Credit Card', description: 'Credit card application and services.', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', benefits: ['Rewards', 'Easy EMI', 'High limit'], documentsRequired: ['ID', 'Income'], isFeatured: false, category: 'credit-card' },
    { name: 'Business Registration', description: 'Company, GST, and trademark registration.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', benefits: ['Fast processing', 'Expert support', 'Legal'], documentsRequired: ['ID', 'Address'], isFeatured: false, category: 'business' },
    { name: 'Computer Services', description: 'Windows installation, antivirus, and hardware services.', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', benefits: ['Expert technicians', 'On-site service', 'Warranty'], documentsRequired: [], isFeatured: false, category: 'computer' }
  ]);

  // Partners
  await Partner.insertMany([
    { name: 'Airtel Payments Bank', logo: 'https://www.vishwajeetbanking.in/static/media/airtel.png', description: 'India\'s first payments bank with full banking license.', benefits: ['Zero balance account', 'Debit card', 'Insurance'], eligibility: ['Aadhaar required', 'Indian resident'], registrationProcess: ['Visit our office', 'Submit documents', 'Get activated'] },
    { name: 'Google Pay Business', logo: 'https://www.vishwajeetbanking.in/static/media/gpay.png', description: 'India\'s leading UPI payment platform.', benefits: ['Instant settlements', 'No charges', 'QR payments'], eligibility: ['Shop required', 'Bank account'], registrationProcess: ['Contact us', 'Submit proof', 'Get QR'] },
    { name: 'PhonePe Business', logo: 'https://www.vishwajeetbanking.in/static/media/phonepe.png', description: 'Trusted UPI payment service provider.', benefits: ['Soundbox', 'QR code', 'High commission'], eligibility: ['Shop required', 'Bank account'], registrationProcess: ['Apply now', 'Documents', 'Activate'] },
    { name: 'RapiPay', logo: 'https://www.vishwajeetbanking.in/static/media/rapipay.png', description: 'Leading AEPS and micro ATM service provider.', benefits: ['High commission', '24x7 support', 'Fast transactions'], eligibility: ['Retailer', 'Shop proof'], registrationProcess: ['Contact BDE', 'Submit docs', 'Get ID'] },
    { name: 'ReliPay', logo: 'https://www.vishwajeetbanking.in/static/media/relipay.png', description: 'Complete fintech services platform.', benefits: ['All services', 'High commission', 'Training'], eligibility: ['Retailer', 'Distributor'], registrationProcess: ['Apply online', 'Submit docs', 'Start earning'] },
    { name: 'Jio Digital Life', logo: 'https://www.vishwajeetbanking.in/static/media/jio.png', description: 'Digital services from Jio.', benefits: ['Retailer ID', 'SIM services', 'Recharge'], eligibility: ['Shop', 'ID proof'], registrationProcess: ['Visit office', 'Apply', 'Activate'] }
  ]);

  // Team
  await TeamMember.insertMany([
    { name: 'Vishwajeet Raj', experience: '7+ Years', role: 'CEO & Founder', image: 'https://www.vishwajeetbanking.in/static/media/Vishwajeet.cd2645a1adccc400b219.jpg', socialLinks: { linkedin: '#', facebook: '#', instagram: '#' } },
    { name: 'Shashi Prakash Singh', experience: '5+ Years', role: 'Team Leader', image: 'https://www.vishwajeetbanking.in/static/media/shashi.9e7cbe23768d03a7617b.jpg', socialLinks: { linkedin: '#', facebook: '#' } },
    { name: 'Vivekanand', experience: '6+ Years', role: 'Team Leader', image: 'https://www.vishwajeetbanking.in/static/media/vivek.2cd45c2fef8dd3d6bec1.jpg', socialLinks: { facebook: '#' } },
    { name: 'Rajat Raj', experience: '5+ Years', role: 'Digital Marketing', image: 'https://www.vishwajeetbanking.in/static/media/kundan.75e8fcfa4e365443c6ca.jpg', socialLinks: { instagram: '#' } },
    { name: 'Ramji Gupta', experience: '7+ Years', role: 'Accountant', image: 'https://www.vishwajeetbanking.in/static/media/yash%20jpg.d4dc0b72050f47d126ab.jpg', socialLinks: {} },
    { name: 'Ritik Kumar Gupta', experience: '4+ Years', role: 'Assistant Accountant', image: 'https://www.vishwajeetbanking.in/static/media/ritik%20gupta%20jpg.ff762a2b0eefebc4552d.jpg', socialLinks: {} },
    { name: 'Vinay Kumar Singh', experience: '4+ Years', role: 'Area Sales Manager', image: 'https://www.vishwajeetbanking.in/static/media/vinay.c4216d2b52816dba6b3d.jpg', socialLinks: { linkedin: '#' } },
    { name: 'Ramu Verma', experience: '5+ Years', role: 'Promoter', image: 'https://www.vishwajeetbanking.in/static/media/ramu%20verma%20jpg.da093cbe2ad3707ce9f2.jpg', socialLinks: {} },
    { name: 'Satyam Gupta', experience: '2+ Years', role: 'BDE', image: 'https://www.vishwajeetbanking.in/static/media/satyam%20jpg.fbec419fc8f5e2d2cfad.jpg', socialLinks: {} },
    { name: 'Rohit Gupta', experience: '2+ Years', role: 'BDE', image: 'https://www.vishwajeetbanking.in/static/media/rohit.3378299f9b258e942f64.jpg', socialLinks: {} },
    { name: 'Akash Kasaudhan', experience: '2+ Years', role: 'Service BDE', image: 'https://www.vishwajeetbanking.in/static/media/akash.b8a09663ea53531f4330.jpg', socialLinks: {} }
  ]);

  // Testimonials
  await Testimonial.insertMany([
    { name: 'Avinash Kumar Gupta', text: 'This company has an awesome team and dedicated staff. I am very impressed by their vision, hard work, outstanding performance, and wonderful teammates. Their reputation is well-earned.', image: 'https://www.vishwajeetbanking.in/static/media/avi.707509ef61ee47c0a972.jpg', rating: 5 },
    { name: 'Arpita Gupta', text: 'It\'s a rare thing to discover a bank that genuinely cares about the people. Vishwajeet banking point serves all kinds of banking services. They always showed me kindness, respect and a friendly smile. I can\'t recommend them enough for all your banking needs. You won\'t be disappointed.', image: 'https://www.vishwajeetbanking.in/static/media/arpita.20c6b95aef29e910bb9e.jpg', rating: 5 },
    { name: 'Dr. Shushil', text: 'Vishwajeet banking point has a wonderful staff of kind and helpful people. Their locations are very clean, comfortable, friendly and beautiful. This includes them at him branch at (city). If only every other business were to conduct the same level of customer service. The world would be a much friendlier one.', image: 'https://www.vishwajeetbanking.in/static/media/susil%20dr.899e76cd686571f36d5b.jpg', rating: 5 }
  ]);

  // Gallery
  await Gallery.insertMany([
    { title: 'Office Interior', category: 'office', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', description: 'Our main office' },
    { title: 'Team Meeting', category: 'meetings', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', description: 'Weekly team meeting' },
    { title: 'Training Session', category: 'training', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600', description: 'New retailer training' },
    { title: 'Customer Meet', category: 'customers', imageUrl: 'https://images.unsplash.com/photo-1528605248640-b0125d127222?w=600', description: 'Customer appreciation event' },
    { title: 'Award Ceremony', category: 'events', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', description: 'Best retailer award' },
    { title: 'Certificate', category: 'certificates', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=600', description: 'Partner certification' }
  ]);

  // FAQs
  await FAQ.insertMany([
    { question: 'What is AEPS?', answer: 'AEPS stands for Aadhaar Enabled Payment System. It allows you to withdraw cash, check balance, and transfer money using your Aadhaar card and fingerprint.', category: 'aeps' },
    { question: 'How to become a retailer?', answer: 'To become a retailer, you need to contact our team, submit your shop proof, ID, and complete the registration process.', category: 'retailer-id' },
    { question: 'How to join as BDE?', answer: 'You can apply for BDE position through our career page or contact our HR team. We provide training and attractive incentives.', category: 'freelancer' },
    { question: 'How much investment required?', answer: 'Minimum investment is required depending on the service you want to start. Contact our team for detailed information.', category: 'general' },
    { question: 'Is training free?', answer: 'Yes, we provide free training to all our retailers and partners to help them succeed.', category: 'training' },
    { question: 'How to open a bank account?', answer: 'You can open an instant bank account with Aadhaar and PAN card. Visit our office or contact our team for assistance.', category: 'account' },
    { question: 'What documents are required for PAN card?', answer: 'Aadhaar card, passport size photo, and address proof are required for PAN card application.', category: 'pan-card' },
    { question: 'Is my money safe?', answer: 'Yes, all our services are authorized by RBI and our partners are regulated financial institutions.', category: 'security' },
    { question: 'How much commission do retailers get?', answer: 'Commission rates vary by service. We offer industry-leading commission rates to all our partners.', category: 'commission' },
    { question: 'What is FASTag?', answer: 'FASTag is an electronic toll collection system that allows you to pay tolls without stopping at the booth.', category: 'fastag' }
  ]);

  // Blogs
  await Blog.insertMany([
    { title: 'Complete Guide to AEPS', slug: 'complete-guide-to-aeps', excerpt: 'Learn everything about Aadhaar Enabled Payment System.', content: 'AEPS is a revolutionary payment system...', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600', category: 'Aadhaar Services', tags: ['AEPS', 'Banking', 'Digital India'], author: 'Vishwajeet Raj' },
    { title: 'How to Earn from Banking Services', slug: 'how-to-earn-from-banking-services', excerpt: 'Discover ways to earn high income as a banking retailer.', content: 'Becoming a banking retailer is a great way...', imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d7?w=600', category: 'Business', tags: ['Retailer', 'Commission', 'Business'], author: 'Rajat Raj' },
    { title: 'Benefits of FASTag', slug: 'benefits-of-fastag', excerpt: 'Why you should get FASTag for your vehicle.', content: 'FASTag saves you time and money...', imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600', category: 'Services', tags: ['FASTag', 'Toll', 'Travel'], author: 'Team Vishwajeet' }
  ]);

  // Downloads
  await Download.insertMany([
    { title: 'Retailer Application Form', description: 'Download and fill the retailer application form.', fileUrl: '#', fileType: 'pdf', category: 'forms' },
    { title: 'Company Brochure', description: 'Our complete company profile and services.', fileUrl: '#', fileType: 'pdf', category: 'brochure' },
    { title: 'Commission Chart', description: 'Latest commission rates for all services.', fileUrl: '#', fileType: 'pdf', category: 'commission' },
    { title: 'Training Manual', description: 'Complete training guide for retailers.', fileUrl: '#', fileType: 'pdf', category: 'training' },
    { title: 'Terms & Conditions', description: 'Our service terms and conditions.', fileUrl: '#', fileType: 'pdf', category: 'terms' }
  ]);
};

// Safe call: runs after MongoDB connects, never crashes the server
mongoose.connection.once('open', () => {
  initDefaultContent().catch(err => console.error('Seed error:', err.message));
});

// Get all content (public)
router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    const about = await About.findOne();
    const stats = await Stats.findOne();
    const services = await Service.find();
    const partners = await Partner.find();
    const team = await TeamMember.find();
    const testimonials = await Testimonial.find();
    const gallery = await Gallery.find();
    const faqs = await FAQ.find();
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(6);
    const downloads = await Download.find();

    res.json({ hero, about, stats, services, partners, team, testimonials, gallery, faqs, blogs, downloads });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update content (protected)
router.put('/', auth, async (req, res) => {
  try {
    const { hero, about, stats, services, partners, team, testimonials, gallery, faqs, blogs, downloads } = req.body;

    if (hero) await Hero.findOneAndUpdate({}, hero, { new: true, upsert: true });
    if (about) await About.findOneAndUpdate({}, about, { new: true, upsert: true });
    if (stats) await Stats.findOneAndUpdate({}, stats, { new: true, upsert: true });
    
    if (services) { await Service.deleteMany({}); await Service.insertMany(services); }
    if (partners) { await Partner.deleteMany({}); await Partner.insertMany(partners); }
    if (team) { await TeamMember.deleteMany({}); await TeamMember.insertMany(team); }
    if (testimonials) { await Testimonial.deleteMany({}); await Testimonial.insertMany(testimonials); }
    if (gallery) { await Gallery.deleteMany({}); await Gallery.insertMany(gallery); }
    if (faqs) { await FAQ.deleteMany({}); await FAQ.insertMany(faqs); }
    if (blogs) { await Blog.deleteMany({}); await Blog.insertMany(blogs); }
    if (downloads) { await Download.deleteMany({}); await Download.insertMany(downloads); }

    const updatedContent = {
      hero: await Hero.findOne(),
      about: await About.findOne(),
      stats: await Stats.findOne(),
      services: await Service.find(),
      partners: await Partner.find(),
      team: await TeamMember.find(),
      testimonials: await Testimonial.find(),
      gallery: await Gallery.find(),
      faqs: await FAQ.find(),
      blogs: await Blog.find().sort({ createdAt: -1 }).limit(6),
      downloads: await Download.find()
    };

    res.json(updatedContent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Individual endpoints
router.get('/stats', async (req, res) => res.json(await Stats.findOne()));
router.get('/partners', async (req, res) => res.json(await Partner.find()));
router.get('/gallery', async (req, res) => res.json(await Gallery.find()));
router.get('/faqs', async (req, res) => res.json(await FAQ.find()));
router.get('/blogs', async (req, res) => res.json(await Blog.find().sort({ createdAt: -1 })));
router.get('/blogs/:slug', async (req, res) => res.json(await Blog.findOne({ slug: req.params.slug })));
router.get('/downloads', async (req, res) => res.json(await Download.find()));

module.exports = router;
