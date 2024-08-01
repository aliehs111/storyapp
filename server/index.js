const dotenv = require('dotenv');

// Load environment variables based on the environment
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: 'local.env' });
}

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const passport = require('./config/passport');
const sequelize = require('./config/database'); // Ensure this is your Sequelize instance
const userRoutes = require('./routes/userRoutes'); // Correct import of userRoutes
const videoRoutes = require('./routes/videoRoutes'); // Correct import of videoRoutes
const authRoutes = require('./routes/authRoutes'); // Correct import of authRoutes

const app = express();
const port = process.env.PORT || 3001;

console.log('Environment variables:');
console.log('JAWSDB_URL:', process.env.JAWSDB_URL);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Set this variable to either localhost or your production URL depending on the environment
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}));

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

// Serve static files from the React app build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Story App!');
});

// Connect to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
