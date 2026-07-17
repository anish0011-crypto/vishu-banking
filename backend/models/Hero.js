const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  greeting: { type: String, default: 'Welcome to' },
  title: { type: String, default: 'Vishwajeet Banking Point' },
  subtitle: { type: String, default: 'Banking Services | Financial Solutions | Business Opportunities' },
  tagline: { type: String, default: 'Trusted Banking Partner Since 2023' },
  image: { type: String, default: 'https://www.vishwajeetbanking.in/static/media/man.d5b282324f3664052562.png' }
});

module.exports = mongoose.model('Hero', heroSchema);
