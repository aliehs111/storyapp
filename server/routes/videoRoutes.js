const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { Video, User } = require('../models');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();
const path = require('path');
const videoQueue = require('./jobs/videoQueue'); // Path to your Bull queue job

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Define storage for multer using local temporary storage
const upload = multer({ dest: 'uploads/' });

// POST /api/videos/upload
router.post('/upload', authenticateJWT, upload.single('video'), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    console.log('req.user in upload route:', req.user);

    // Define input and output paths for conversion
    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${Date.now()}-${req.file.originalname.split('.')[0]}.mp4`);

    // Add video processing job to the queue
    videoQueue.add({
      inputPath,
      outputPath,
      userId: req.user.id,
      title,
      description,
    });

    // Respond immediately to the client
    res.json({ message: 'Video upload initiated and processing job added to the queue' });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video', details: error.message });
  }
});

// GET /api/videos - Fetch all videos with associated user data
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const { user_id } = req.query;
    const whereClause = user_id ? { user_id } : {};
    const videos = await Video.findAll({
      where: whereClause,
      include: {
        model: User,
        attributes: ['username', 'profile_picture'],
      },
    });
    console.log('Fetched videos:', videos);
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos', details: error.message });
  }
});

// DELETE /api/videos/:id - Delete a video by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);

    if (!video) {
      console.log('Video not found');
      return res.status(404).json({ error: 'Video not found' });
    }

    console.log('Video found:', video);
    console.log('Request user ID:', req.user.id);
    console.log('Video user ID:', video.user_id);

    if (video.user_id !== req.user.id) {
      console.log('User not authorized to delete this video');
      return res.status(403).json({ error: 'You are not authorized to delete this video' });
    }

    await video.destroy();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Failed to delete video', details: error.message });
  }
});

// GET /api/users - Fetch all users
router.get('/users', authenticateJWT, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// GET /api/videos/user/:userId - Fetch videos by user ID
router.get('/user/:userId', authenticateJWT, async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.findAll({
      where: { user_id: userId },
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

// Route to get total size of videos
router.get('/data/size', authenticateJWT, async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.findAll({ attributes: ['file_path'] });

    // Sum up the sizes of all videos from Cloudinary
    let totalSize = 0;
    for (const video of videos) {
      const filePath = video.file_path;
      const urlSegments = filePath.split('/');
      const publicIdWithExtension = urlSegments[urlSegments.length - 1]; // Get the last segment of the URL
      const publicId = `storyapp/${publicIdWithExtension.split('.')[0]}`; // Add folder prefix and remove the file extension

      console.log('Fetching size for public ID:', publicId); // Debug log

      try {
        const result = await cloudinary.api.resource(publicId, { resource_type: 'video' });
        totalSize += result.bytes;
      } catch (cloudinaryError) {
        console.error('Cloudinary error fetching resource:', cloudinaryError.message);
      }
    }

    res.json({ totalSize });
  } catch (error) {
    console.error('Error fetching total video size:', error.message);
    res.status(500).json({ error: 'Failed to fetch total video size', details: error.message });
  }
});

module.exports = router;


