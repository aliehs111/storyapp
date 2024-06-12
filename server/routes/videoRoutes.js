// server/routes/videoRoutes.js
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { Video } = require('../models');
const router = express.Router();

// Set up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define storage for multer using cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'storyapp',
    resource_type: 'video',
    format: async (req, file) => 'mp4', // supports promises as well
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

// Upload video route
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const newVideo = await Video.create({
      user_id: req.user.id,
      book_id: req.body.book_id,
      title: req.body.title,
      description: req.body.description,
      file_path: req.file.path,
      thumbnail_path: req.file.thumbnail_url
    });
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

module.exports = router;
