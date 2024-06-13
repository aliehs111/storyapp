// videoRoutes.js
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { Video } = require('../models');

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Define storage for multer using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'storyapp',
    resource_type: 'video',
    format: async (req, file) => 'mp4', // Adjust this if needed
    public_id: (req, file) => file.originalname.split('.')[0], // Use original file name without extension
  },
});

const upload = multer({ storage: storage });

// POST /api/videos/upload
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    console.log('Received fields:', req.body);
    console.log('Received file:', req.file);

    const { originalname, mimetype, size } = req.file;
    const { userId, bookId, title, description } = req.body;

    const video = await Video.create({
      user_id: userId,
      book_id: bookId,
      title: title,
      description: description,
      file_path: req.file.path,
      thumbnail_path: req.file.filename, // Assuming you want to save the filename as a thumbnail path
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video', details: error.message });
  }
});

module.exports = router;
