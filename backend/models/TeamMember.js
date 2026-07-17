const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  socialLinks: {
    linkedin: String,
    facebook: String,
    instagram: String,
    twitter: String
  }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
