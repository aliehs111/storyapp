const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mysql = require('mysql2');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const { sequelize } = require('./models');

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log the configuration
console.log(cloudinary.config());

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());
// require('./config/passport')(passport);

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

// Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
