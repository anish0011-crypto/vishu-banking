const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, enum: ['account', 'aeps', 'insurance', 'money-transfer', 'retailer-id', 'pan-card', 'freelancer', 'training', 'commission', 'security', 'general', 'fastag', 'aadhaar', 'recharge', 'bill-payment', 'loan', 'credit-card', 'business', 'computer'], default: 'general' }
});

module.exports = mongoose.model('FAQ', faqSchema);
