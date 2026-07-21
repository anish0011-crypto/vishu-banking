const mongoose = require('mongoose');

const featureCardSchema = new mongoose.Schema({
  title: String,
  icon: String
});

const aboutSchema = new mongoose.Schema({
  title: { type: String, default: 'About Vishwajeet Banking Point' },
  description: { type: String },
  companyInformation: { type: String },
  achievements: [{ type: String }],
  experience: { type: String },
  featureCards: [featureCardSchema],
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);