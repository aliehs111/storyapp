// server/models/StoryIdea.js
module.exports = (sequelize, DataTypes) => {
  const StoryIdea = sequelize.define('StoryIdea', {
    idea: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return StoryIdea;
};
