// server/models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('viewer', 'uploader', 'both'),
      defaultValue: 'viewer',
    },
  }, {
    timestamps: true,
  });

  // Define associations
  User.associate = (models) => {
    User.hasMany(models.Video, {
      foreignKey: 'user_id',
      as: 'videos'
    });
  };

  return User;
};
