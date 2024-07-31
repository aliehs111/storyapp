// server/config/database.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

console.log('Using database configuration:', process.env.JAWSDB_URL ? 'JAWSDB_URL' : 'Local MySQL');

const sequelize = new Sequelize(process.env.JAWSDB_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;



