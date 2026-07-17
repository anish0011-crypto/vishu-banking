const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  benefits: [{ type: String }],
  documentsRequired: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  category: { type: String, enum: ['aeps', 'micro-atm', 'money-transfer', 'pan-card', 'aadhaar', 'insurance', 'fastag', 'recharge', 'bill-payment', 'loan', 'credit-card', 'business', 'computer', 'account'], default: 'aeps' }
});

module.exports = mongoose.model('Service', serviceSchema);
