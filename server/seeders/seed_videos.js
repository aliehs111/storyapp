'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Videos', [
      {
        user_id: 1,
        book_id: 1,
        title: 'Story Time 1',
        description: 'A great story for kids.',
        file_path: 'https://res.cloudinary.com/dkg4r1r1v/video/upload/v1718238745/storyapp/IMG_3281.mp4',
        thumbnail_path: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        book_id: 1,
        title: 'Story Time 2',
        description: 'Another great story for kids.',
        file_path: 'https://res.cloudinary.com/dkg4r1r1v/video/upload/v1718238745/storyapp/IMG_3281.mp4',
        thumbnail_path: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more videos as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Videos', null, {});
  }
};
