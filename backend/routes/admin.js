const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    let admin = await Admin.findOne({ username });
    let isNewAdmin = false;

    // Auto-create default admin on first login if DB is empty
    if (!admin) {
      if (username === 'admin' && password === 'admin123') {
        admin = new Admin({ username, password });
        await admin.save();
        isNewAdmin = true;
      } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
    }

    // For existing admins, verify password via bcrypt
    if (!isNewAdmin) {
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { admin: { id: admin.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get admin (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
