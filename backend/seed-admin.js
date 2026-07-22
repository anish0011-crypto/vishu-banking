const mongoose = require('mongoose');

const Admin = require('./models/Admin');
const Hero = require('./models/Hero');
const Service = require('./models/Service');
const About = require('./models/About');
const Settings = require('./models/Settings');
const TeamMember = require('./models/TeamMember');

async function seedDatabase() {
  try {
    // 1. Seed Admin
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new Admin({ username: 'admin', password: 'admin123' });
      await admin.save();
      console.log('✅ Default admin created successfully!');
    } else {
      console.log('ℹ️ Admin already exists');
    }

    // 2. Seed Hero
    const existingHero = await Hero.findOne();
    if (!existingHero) {
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
    } else {
      console.log('ℹ️ Hero already exists');
    }

    // 3. Migrate and Seed Services
    const services = await Service.find();
    console.log(`Checking migrations for ${services.length} services...`);
    for (const s of services) {
      let modified = false;
      // If the document has a 'name' field but no 'title'
      if (s.name && !s.title) {
        s.title = s.name;
        modified = true;
      }
      // If the document has an 'imageUrl' field but no 'logoImage'
      if (s.imageUrl && !s.logoImage) {
        s.logoImage = s.imageUrl;
        modified = true;
      }
      if (modified) {
        await s.save();
        console.log(`✅ Migrated service ID ${s._id}: "${s.title}"`);
      }
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        { title: 'Airtel Payments Bank', description: 'AEPS, Account opening, Mini Branch, Fast Tag, Insurance...' },
        { title: 'Google Pay Business', description: 'BDE (Business Development Executive), Freelancer...' }
      ]);
      console.log('✅ Default Services created!');
    } else {
      console.log('ℹ️ Services check completed');
    }

    // 4. Migrate and Seed Team Members
    const members = await TeamMember.find();
    console.log(`Checking migrations for ${members.length} team members...`);
    for (const m of members) {
      let modified = false;
      // If has 'role' but no 'designation'
      if (m.role && !m.designation) {
        m.designation = m.role;
        modified = true;
      }
      // If has 'image' but no 'profilePhoto'
      if (m.image && !m.profilePhoto) {
        m.profilePhoto = m.image;
        modified = true;
      }
      // If has nested 'socialLinks' but flat social properties are not set
      if (m.socialLinks) {
        if (m.socialLinks.linkedin && !m.linkedin) {
          m.linkedin = m.socialLinks.linkedin;
          modified = true;
        }
        if (m.socialLinks.facebook && !m.facebook) {
          m.facebook = m.socialLinks.facebook;
          modified = true;
        }
        if (m.socialLinks.instagram && !m.instagram) {
          m.instagram = m.socialLinks.instagram;
          modified = true;
        }
      }
      if (modified) {
        await m.save();
        console.log(`✅ Migrated team member ID ${m._id}: "${m.name}"`);
      }
    }

    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany([
        { name: 'Vishwajeet Raj', designation: 'CEO & Founder', experience: '7+ Years' }
      ]);
      console.log('✅ Default Team Members created!');
    } else {
      console.log('ℹ️ Team check completed');
    }

    // 5. Seed About
    const existingAbout = await About.findOne();
    if (!existingAbout) {
      const newAbout = new About({
        title: 'About Vishwajeet Banking Point',
        description: 'We are your trusted partner in banking services, providing top-notch assistance for AEPS, Google Pay Business onboarding, Airtel Payments Bank account opening, and other financial needs.',
        companyInformation: 'Vishwajeet Banking Point has been serving customers with excellence in digital financial solutions.',
        achievements: ['5000+ Happy Customers', 'Airtel Payments Bank Partner'],
        experience: '7+ Years Experience',
        featureCards: [
          { title: 'Secure Transactions', icon: 'Shield' },
          { title: 'Fast Processing', icon: 'Zap' }
        ]
      });
      await newAbout.save();
      console.log('✅ Default About content created!');
    } else {
      console.log('ℹ️ About content already exists');
    }

    // 6. Seed Settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      const newSettings = new Settings({
        websiteName: 'Vishwajeet Banking Point',
        contactNumber: '9506562637',
        whatsapp: '9506562637',
        email: 'vishwajeetbankingpoint@gmail.com',
        address: 'Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326',
        footerText: '© 2026 Vishwajeet Banking Point Private Limited.'
      });
      await newSettings.save();
      console.log('✅ Default Settings created!');
    } else {
      console.log('ℹ️ Settings already exist');
    }

    console.log('🎉 Seeding checks, migrations and operations completed successfully!');
  } catch (err) {
    console.error('❌ Error during seeding database:', err.message);
  }
}

// Standalone execution wrapper
if (require.main === module) {
  require('dotenv').config();
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB for seeding...');
      await seedDatabase();
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Connection error during standalone seeding:', err.message);
      process.exit(1);
    });
}

module.exports = seedDatabase;
