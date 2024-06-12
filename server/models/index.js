// server/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const User = require('./User')(sequelize, DataTypes);
const Book = require('./Book')(sequelize, DataTypes);
const Video = require('./Video')(sequelize, DataTypes);
const StoryIdea = require('./StoryIdea')(sequelize, DataTypes);

// Define relationships if needed
Video.belongsTo(User, { foreignKey: 'user_id' });
Video.belongsTo(Book, { foreignKey: 'book_id' });

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  sequelize,
  User,
  Book,
  Video,
  StoryIdea,
};
