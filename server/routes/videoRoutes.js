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
    format: async (req, file) => 'mp4',
    public_id: (req, file) => file.originalname.replace(/\s+/g, '_').split('.')[0],
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

    console.log('req.user in upload route:', req.user);

    const publicId = req.file.filename.replace(/\s+/g, '_').split('.')[0];
    console.log('Generated publicId:', publicId);

    // Generate thumbnail URL from the uploaded video
    const video = await Video.create({
      user_id: req.user.id,
      title,
      description,
      file_path: req.file.path,
      thumbnail_path: '', // Set initially to empty string
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Request Cloudinary to generate a thumbnail from the uploaded video
    const thumbnail_url = cloudinary.url(req.file.filename, {
      transformation: [
        { width: 300, height: 200, crop: 'thumb', gravity: 'center' },
      ],
      format: 'jpg',
      resource_type: 'video', // Change to video
      secure: true,
    });

    console.log('Thumbnail URL:', thumbnail_url);

    // Update video record with the generated thumbnail URL
    video.thumbnail_path = thumbnail_url;
    await video.save();

    res.json({ message: 'Video uploaded successfully', video });
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

