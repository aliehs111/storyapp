// server/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_picture: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('viewer', 'uploader', 'both'),
      defaultValue: 'viewer'
    }
  });

  return User;
};
