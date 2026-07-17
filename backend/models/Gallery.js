const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['office', 'customers', 'events', 'training', 'certificates', 'meetings', 'videos'], required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
