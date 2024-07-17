const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { Video, User } = require('../models');
const authenticateJWT = require('../middlewares/authMiddleware');
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
    format: async (req, file) => 'mp4', // Adjust if you want to allow different formats
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage: storage });

// POST /api/videos/upload
router.post('/upload', authenticateJWT, upload.single('video'), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const video = await Video.create({
      user_id: req.user.id, // Extracted user ID from authenticated user
      title: title,
      description: description,
      file_path: req.file.path,
      thumbnail_path: req.file.filename,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video', details: error.message });
  }
});

// GET /api/videos - Fetch all videos with associated user data
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const videos = await Video.findAll({
      include: {
        model: User,
        attributes: ['username', 'profile_picture'],
      },
    });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos', details: error.message });
  }
});

module.exports = router;
