// server/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
  }, {
    timestamps: false // Disable timestamps
  });

  return User;
};
