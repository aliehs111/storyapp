// server/index.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is required where it's needed
const mysql = require('mysql2'); // Use mysql2 for better promise support
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models'); // Ensure models are imported to sync with the database

dotenv.config();

const app = express();
const port = process.env.PORT || 5001; // Change to 5001 or any other port


// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define storage for multer using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'storyapp',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

// Passport.js setup
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use user routes
app.use('/api/users', userRoutes);

// Add more routes here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
