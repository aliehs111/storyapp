// server/models/Video.js
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    }
  });

  Video.associate = (models) => {
    Video.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Video.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Video;
};
