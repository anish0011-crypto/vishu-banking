const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const seedDatabase = require('./seed-admin');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
