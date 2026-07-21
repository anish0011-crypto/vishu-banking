const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  websiteName: { type: String, default: 'Vishwajeet Banking Point' },
  logo: { type: String },
  favicon: { type: String },
  contactNumber: { type: String, default: '9506562637' },
  whatsapp: { type: String, default: '9506562637' },
  email: { type: String, default: 'vishwajeetbankingpoint@gmail.com' },
  address: { type: String, default: 'Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326' },
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  googleMapUrl: { type: String },
  footerText: { type: String, default: '© 2026 Vishwajeet Banking Point Private Limited.' },
  
  // Theme settings embedded
  primaryColor: { type: String, default: '#0ea5e9' },
  secondaryColor: { type: String, default: '#f59e0b' },
  buttonColor: { type: String, default: '#0284c7' },
  darkModeBg: { type: String, default: '#0f172a' },
  darkModeText: { type: String, default: '#e2e8f0' },
  fontFamily: { type: String, default: 'Inter' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);