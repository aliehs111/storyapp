// server/syncDb.js
const sequelize = require('./config/database');
const Video = require('./models/Video'); // Import the Video model
const User = require('./models/User'); // Import the User model

const syncDb = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDb();
