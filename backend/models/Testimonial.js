const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 5, min: 1, max: 5 }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
