const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  review: { type: String, required: true },
  name: { type: String, required: true },
  customerPhoto: { type: String },
  rating: { type: Number, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);