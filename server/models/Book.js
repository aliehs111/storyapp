// server/models/Book.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_story: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
  });

  Book.associate = (models) => {
    Book.hasMany(models.Video, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Book;
};
