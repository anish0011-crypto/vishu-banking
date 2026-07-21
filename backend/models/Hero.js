const mongoose = require('mongoose');

const ctaSchema = new mongoose.Schema({
  label: String,
  url: String,
  icon: String, // 'call', 'whatsapp', 'apply'
  style: String // 'primary', 'secondary', 'outline'
});

const heroSchema = new mongoose.Schema({
  heading: { type: String, required: true, default: 'Hello, Welcome to Vishwajeet Banking Point' },
  description: { type: String, default: 'We provide all types of banking services and work opportunities in marketing.' },
  heroImage: { type: String },
  aboutCardContent: {
    title: { type: String, default: 'Vishwajeet Banking Point' },
    contactNumber: { type: String, default: '9506562637' },
    email: { type: String, default: 'vishwajeetbankingpoint@gmail.com' },
    gstNumber: { type: String, default: '09EMHPR1060Q1ZD' },
    points: [{ type: String }]
  },
  ctaButtons: [ctaSchema],
  backgroundImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);