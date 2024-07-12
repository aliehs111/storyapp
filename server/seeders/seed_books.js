// server/seeders/20240112120000-seed-books.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Books', [
        {
          title: 'Sample Book',
          author: 'Author Name',
          cover_image_path: 'path/to/cover/image',
          is_story: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Another Book',
          author: 'Another Author',
          cover_image_path: 'path/to/cover/image2',
          is_story: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Books', null, {});
    }
  };
  