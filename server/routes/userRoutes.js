const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login Route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Logged in successfully', user: req.user });
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Failed to logout' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

//Get all users
router.get('/users', (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

module.exports = router;

