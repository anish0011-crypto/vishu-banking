const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
// Allow requests from any origin (frontend on Vercel, local dev, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Routes ────────────────────────────────────────────────────────────────────
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');
const applicationsRoutes = require('./routes/applications');

app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/applications', applicationsRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Vishwajeet Banking Point API' }));

// ── Connect to MongoDB ────────────────────────────────────────────────────────
const seedDatabase = require('./seed-admin');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// ── Start server (only in non-serverless env) ─────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
