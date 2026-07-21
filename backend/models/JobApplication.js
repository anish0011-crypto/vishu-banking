const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  pincode: { type: String },
  resumeUrl: { type: String, required: true },
  aboutYourself: { type: String },
  status: { type: String, enum: ['Pending', 'Shortlisted', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);