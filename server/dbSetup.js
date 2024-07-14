const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

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
    if (err) throw err;
    console.log('Users table created or already exists');
  });
  db.query(createVideosTable, (err, result) => {
    if (err) throw err;
    console.log('Videos table created or already exists');
  });
  db.query(createStoryIdeasTable, (err, result) => {
    if (err) throw err;
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
    if (err) throw err;
    console.log('Initial story ideas inserted or already exist');
  });

  db.end();
});
