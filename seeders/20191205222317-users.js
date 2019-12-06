'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [
        {
        username: 'paul',
        password: 'password',
        email: 'paul@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        username: 'david',
        password: 'password',
        email: 'david@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        username: 'jawed',
        password: 'password',
        email: 'jawed@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        username: 'michelle',
        password: 'password',
        email: 'michelle@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        username: 'kamlesh',
        password: 'password',
        email: 'kamlesh@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]);
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
