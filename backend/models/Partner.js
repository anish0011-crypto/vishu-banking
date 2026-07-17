const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String },
  benefits: [{ type: String }],
  eligibility: [{ type: String }],
  registrationProcess: [{ type: String }]
});

module.exports = mongoose.model('Partner', partnerSchema);
