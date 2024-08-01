// Load environment variables as early as possible
const dotenv = require('dotenv');
dotenv.config();

// Now import other modules or code that relies on these environment variables
const { Sequelize } = require('sequelize');

// Your other code follows...
console.log('Using database configuration:', process.env.JAWSDB_URL ? 'JAWSDB_URL' : 'Local MySQL');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;




