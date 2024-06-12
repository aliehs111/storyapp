// server/models/Video.js
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    file_path: {
      type: DataTypes.STRING
    },
    thumbnail_path: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Video;
};
