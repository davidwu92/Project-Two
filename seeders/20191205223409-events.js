'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


     
      return queryInterface.bulkInsert('events', [
        {
        title: 'comic-con',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'uci Library',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'class 1045',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'burning man',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        title: 'central park new york  ',
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
