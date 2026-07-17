const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');
const applicationRoutes = require('./routes/applications');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/applications', applicationRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
