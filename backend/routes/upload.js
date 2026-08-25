const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Use memory storage — works on both local AND Vercel (no persistent disk)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Invalid file type'));
  }
});

// ── Protected upload (admin images etc.) ──────────────────────────────────────
router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  // Return base64 data URL (works without a persistent filesystem)
  const mimeType = req.file.mimetype;
  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64}`;
  res.json({ url: dataUrl });
});

// ── Public upload (resumes from career form) ─────────────────────────────────
router.post('/public', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  // Return base64 data URL (works without a persistent filesystem)
  const mimeType = req.file.mimetype;
  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64}`;
  res.json({ url: dataUrl });
});

module.exports = router;