const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  happyCustomers: { type: Number, default: 5000 },
  teamMembers: { type: Number, default: 10 },
  yearsExperience: { type: Number, default: 7 },
  bankingServices: { type: Number, default: 20 },
  retailPartners: { type: Number, default: 500 },
  customerSupport: { type: String, default: '24×7' }
});

module.exports = mongoose.model('Stats', statsSchema);
