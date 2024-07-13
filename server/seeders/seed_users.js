'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'user222',
        email: 'user1@example222.com',
        password: 'password222', 
      },
      {
        id: 2,
        username: 'user333',
        email: 'user@example333.com',
        password: 'password333'
      },
      // Add more users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
