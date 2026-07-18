const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin already exists. No action taken.');
      console.log('Default credentials: username=admin | password=admin123');
      await mongoose.disconnect();
      return;
    }

    // Create the default admin (pre-save hook will hash the password)
    const admin = new Admin({ username: 'admin', password: 'admin123' });
    await admin.save();

    console.log('✅ Default admin created successfully!');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
    process.exit(1);
  }
}

seedAdmin();
