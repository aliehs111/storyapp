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
  pool: {
    max: 5,    // Maximum number of connection in pool
    min: 0,    // Minimum number of connection in pool
    acquire: 30000, // Maximum time, in ms, that pool will try to get connection before throwing error
    idle: 10000  // Maximum time, in ms, that a connection can be idle before being released
  }
};

console.log('Using database configuration:', isProduction ? 'JAWSDB_URL' : 'Local MySQL');

// Initialize Sequelize instance based on environment
const sequelize = isProduction
  ? new Sequelize(databaseConfig, {
      pool: {
        max: 5,    // Maximum number of connections in pool
        min: 0,    // Minimum number of connections in pool
        acquire: 30000, // Maximum time, in ms, that pool will try to get connection before throwing error
        idle: 10000  // Maximum time, in ms, that a connection can be idle before being released
      }
    })
  : new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
      host: databaseConfig.host,
      dialect: databaseConfig.dialect,
      pool: {
        max: 5,    // Maximum number of connections in pool
        min: 0,    // Minimum number of connections in pool
        acquire: 30000, // Maximum time, in ms, that pool will try to get connection before throwing error
        idle: 10000  // Maximum time, in ms, that a connection can be idle before being released
      }
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





