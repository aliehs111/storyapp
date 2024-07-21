const dotenv = require('dotenv');
dotenv.config(); // Ensure this is at the very top
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const mysql = require('mysql2');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Correct import of userRoutes
const videoRoutes = require('./routes/videoRoutes'); // Correct import of videoRoutes
const authRoutes = require('./routes/authRoutes'); // Correct import of authRoutes
require('./config/passport'); // Ensure this is required to initialize passport strategies

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}));

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

// Use authRoutes
app.use('/api/auth', authRoutes);

// Use videoRoutes
app.use('/api/videos', videoRoutes);

// Use userRoutes
app.use('/api/users', userRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Story App!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
