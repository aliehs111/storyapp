const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

console.log('Environment:', process.env.NODE_ENV);

let dbConfig;

// Determine the database configuration based on the environment
if (process.env.NODE_ENV === 'production') {
  // Parse JAWSDB_URL for production
  const dbUrl = new URL(process.env.JAWSDB_URL);
  dbConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // Remove the leading '/'
  };
} else {
  // Local development configuration
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

console.log('DB Config:', dbConfig);

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');

  // Create tables
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      profile_picture VARCHAR(255),
      role ENUM('viewer', 'uploader', 'both') DEFAULT 'viewer'
    );
  `;
  const createVideosTable = `
    CREATE TABLE IF NOT EXISTS videos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      file_path VARCHAR(255),
      thumbnail_path VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;
  const createStoryIdeasTable = `
    CREATE TABLE IF NOT EXISTS story_ideas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idea VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createUsersTable, (err, result) => {
    if (err) {
      console.error('Error creating Users table:', err);
      return;
    }
    console.log('Users table created or already exists');
  });

  db.query(createVideosTable, (err, result) => {
    if (err) {
      console.error('Error creating Videos table:', err);
      return;
    }
    console.log('Videos table created or already exists');
  });

  db.query(createStoryIdeasTable, (err, result) => {
    if (err) {
      console.error('Error creating Story Ideas table:', err);
      return;
    }
    console.log('Story Ideas table created or already exists');
  });

  // Insert initial story ideas
  const insertStoryIdeas = `
    INSERT INTO story_ideas (idea) VALUES
    ('How I first learned to read'),
    ('What my grandmother was like'),
    ('What life was like before children had iPads'),
    ('Things I did outside when I was a kid'),
    ('My favorite foods')
    ON DUPLICATE KEY UPDATE idea=VALUES(idea);
  `;
  db.query(insertStoryIdeas, (err, result) => {
    if (err) {
      console.error('Error inserting initial story ideas:', err);
      return;
    }
    console.log('Initial story ideas inserted or already exist');
  });

  db.end();
});
