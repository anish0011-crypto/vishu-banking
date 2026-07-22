const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: String },
  description: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  email: { type: String },
  mobile: { type: String },
  profilePhoto: { type: String },
  coverImage: { type: String },
  orderIndex: { type: Number, default: 0 },
  role: { type: String },
  image: { type: String },
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String
  }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);