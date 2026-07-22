const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  logoImage: { type: String },
  bannerImage: { type: String },
  knowMoreContent: { type: String },
  seoMetaTitle: { type: String },
  seoDescription: { type: String },
  orderIndex: { type: Number, default: 0 },
  name: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);