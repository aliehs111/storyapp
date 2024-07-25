const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { User } = require('../models');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const secret = process.env.JWT_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures',
    format: async (req, file) => 'jpeg',
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({ storage: storage });

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Update Profile Route (protected route)
router.put('/profile/:id', authenticateJWT, upload.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'artwork_picture', maxCount: 1 }]), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.error('User ID is required but is missing or undefined'); // Log the error
      return res.status(400).json({ error: 'User ID is required' });
    }

    const { username, email, answer_one, answer_two, answer_three, answer_four, answer_five, answer_six } = req.body;
    const profilePictureUrl = req.files['profile_picture'] ? req.files['profile_picture'][0].path : null;
    const artworkPictureUrl = req.files['artwork_picture'] ? req.files['artwork_picture'][0].path : null;

    // Log the received values for debugging
    console.log('ID:', id);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Profile Picture URL:', profilePictureUrl);
    console.log('Artwork Picture URL:', artworkPictureUrl);
    console.log('Answer One:', answer_one);
    console.log('Answer Two:', answer_two);
    console.log('Answer Three:', answer_three);
    console.log('Answer Four:', answer_four);
    console.log('Answer Five:', answer_five);
    console.log('Answer Six:', answer_six);

    let updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (profilePictureUrl) updateData.profile_picture = profilePictureUrl;
    if (artworkPictureUrl) updateData.artwork_picture = artworkPictureUrl;
    if (answer_one) updateData.answer_one = answer_one;
    if (answer_two) updateData.answer_two = answer_two;
    if (answer_three) updateData.answer_three = answer_three;
    if (answer_four) updateData.answer_four = answer_four;
    if (answer_five) updateData.answer_five = answer_five;
    if (answer_six) updateData.answer_six = answer_six;

    console.log('Update Data:', updateData);

    const [updated] = await User.update(updateData, { where: { id } });

    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.findByPk(id);

    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get User Profile by ID (protected route)
router.get('/profile/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: [
        'id', 'username', 'email', 'profile_picture', 'role', 
        'answer_one', 'answer_two', 'answer_three', 'answer_four', 
        'answer_five', 'answer_six'
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;


