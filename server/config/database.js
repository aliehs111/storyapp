const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

console.log('Using database configuration:', process.env.JAWSDB_URL ? 'JAWSDB_URL' : 'Local MySQL');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize({
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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




