const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/Admin');
const Hero = require('./models/Hero');
const Service = require('./models/Service');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Admin.findOne({ username: 'admin' });
    if (!existing) {
      const admin = new Admin({ username: 'admin', password: 'admin123' });
      await admin.save();
      console.log('✅ Default admin created successfully!');
    }

    const hero = await Hero.findOne();
    if (!hero) {
      const newHero = new Hero({
        heading: 'Hello, Welcome to Vishwajeet Banking Point',
        description: 'We provide all types of banking services and work opportunities in marketing.',
        aboutCardContent: {
          title: 'Vishwajeet Banking Point',
          contactNumber: '9506562637',
          email: 'vishwajeetbankingpoint@gmail.com',
          gstNumber: '09EMHPR1060Q1ZD',
          points: [
            'Manager @ Airtel Payments Bank',
            'Business Development @ Google Pay',
            'Distributor @ RapiPay Fintech'
          ]
        }
      });
      await newHero.save();
      console.log('✅ Default Hero content created!');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        { title: 'Airtel Payments Bank', description: 'AEPS, Account opening, Mini Branch, Fast Tag, Insurance...' },
        { title: 'Google Pay Business', description: 'BDE (Business Development Executive), Freelancer...' }
      ]);
      console.log('✅ Default Services created!');
    }

    console.log('Done!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding:', err.message);
    process.exit(1);
  }
}

seedAdmin();
