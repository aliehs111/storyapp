// server/models/StoryIdea.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StoryIdea = sequelize.define('StoryIdea', {
    idea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return StoryIdea;
};
