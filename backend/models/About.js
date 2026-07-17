const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: { type: String, default: 'About Vishwajeet Banking Point' },
  name: { type: String, default: 'Vishwajeet Raj' },
  contact: { type: String, default: '9506562637' },
  email: { type: String, default: 'vishwajeetbankingpoint@gmail.com' },
  gstNumber: { type: String, default: '09EMHPR1060Q1ZD' },
  description: { type: String, default: 'MANAGER at Airtel Payments Bank behalf of RBI with experience in leveraging consultative selling strategies that build relationships across all target markets. Deep knowledge of marketing campaign development and implementation of training programs for new hires.' },
  mission: { type: String, default: 'To provide accessible, reliable, and innovative banking services to every individual and business.' },
  vision: { type: String, default: 'To become the most trusted fintech partner in the region, empowering millions with financial freedom.' },
  whyChooseUs: [{ type: String }],
  roles: [{ type: String }],
  profileImage: { type: String, default: 'https://www.vishwajeetbanking.in/static/media/Vishwajeet.cd2645a1adccc400b219.jpg' }
});

module.exports = mongoose.model('About', aboutSchema);
