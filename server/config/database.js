// Load environment variables as early as possible
const dotenv = require('dotenv');
dotenv.config();

// Now import other modules or code that relies on these environment variables
const { Sequelize } = require('sequelize');

// Determine which database configuration to use
const isProduction = process.env.NODE_ENV === 'production';
const databaseConfig = isProduction ? process.env.JAWSDB_URL : {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

console.log('Using database configuration:', isProduction ? 'JAWSDB_URL' : 'Local MySQL');

// Initialize Sequelize instance based on environment
const sequelize = isProduction
  ? new Sequelize(databaseConfig)
  : new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
      host: databaseConfig.host,
      dialect: databaseConfig.dialect,
    });

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;





