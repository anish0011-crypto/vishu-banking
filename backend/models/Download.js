const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'doc', 'xlsx', 'image', 'other'], default: 'pdf' },
  category: { type: String, enum: ['forms', 'brochure', 'commission', 'training', 'terms'], default: 'forms' }
});

module.exports = mongoose.model('Download', downloadSchema);
