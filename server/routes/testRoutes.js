// server/routes/testRoutes.js
const express = require('express');
const sequelize = require('../config/database');

const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: 'Database connection has been established successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to connect to the database:', details: error.message });
  }
});

module.exports = router;
