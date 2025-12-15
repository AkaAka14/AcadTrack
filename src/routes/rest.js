const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { spawn } = require('child_process');
const Student = require('../models/Student');
const { uploadFromPath } = require('../services/cloudinary');
const path = require('path');

router.get('/health', (req, res) => res.json({ ok: true }));

router.get('/students', async (req, res) => {
  const students = await Student.find().limit(200);
  res.json(students);
});

router.post('/students', async (req, res) => {
  try {
    const s = new Student(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file uploaded' });
  try {
    const result = await uploadFromPath(req.file.path, { folder: 'acadtrack' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/recognize', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file uploaded' });

  const script = path.join(__dirname, '..', 'services', 'face_recognition.py');
  const imgPath = path.resolve(req.file.path);

  const py = spawn('python3', [script, imgPath]);

  let out = '';
  let err = '';
  py.stdout.on('data', (d) => (out += d.toString()));
  py.stderr.on('data', (d) => (err += d.toString()));

  py.on('close', (code) => {
    if (err) return res.status(500).json({ error: err, code });
    try {
      const parsed = JSON.parse(out);
      res.json(parsed);
    } catch (e) {
      res.status(500).json({ error: 'invalid response from recognition script', raw: out });
    }
  });
});

module.exports = router;
