module.exports = (sequelize, DataTypes) => {
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
    artwork_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer_one: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer_two: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer_three: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer_four: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer_five: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer_six: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('viewer', 'uploader', 'both'),
      defaultValue: 'viewer',
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Video, {
      foreignKey: 'user_id',
      as: 'videos',
    });
  };

  return User;
};
