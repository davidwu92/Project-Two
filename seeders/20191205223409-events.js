'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


     
      return queryInterface.bulkInsert('events', [
        {
        title: 'edc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'coachella',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'lollapalooza',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'burning man',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'tomorrowland',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'rolling loud',
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
