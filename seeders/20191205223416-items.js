'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 

      return queryInterface.bulkInsert('items', [
        {
        title: 'wallet',
        description: 'red gucci',
        date: '2019-12-05',
        contact: 'paul@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 1,
        userId: 1
      },
        {
        title: 'phone',
        description: 'black iphone',
        date: '2019-12-05',
        contact: 'paul@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 1,
        userId: 1
      },
        {
        title: 'fanny pack',
        description: 'green',
        date: '2019-12-05',
        contact: 'paul@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 1,
        userId: 1
      },
        {
        title: 'watch',
        description: 'gold rolex',
        date: '2019-12-05',
        contact: 'david@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 2,
        userId: 2
      },
        {
        title: 'wallet',
        description: 'brown gucci',
        date: '2019-12-05',
        contact: 'david@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 2,
        userId: 2
      },
        {
        title: 'phone',
        description: 'black samsung',
        date: '2019-12-05',
        contact: 'david@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 2,
        userId: 2
      },
        {
        title: 'wallet',
        description: 'pink coach',
        date: '2019-12-05',
        contact: 'jawed@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 3,
        userId: 3
      },
        {
        title: 'hat',
        description: 'black',
        date: '2019-12-05',
        contact: 'jawed@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 3,
        userId: 3
      },
        {
        title: 'wallet',
        description: 'red',
        date: '2019-12-05',
        contact: 'jawed@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 3,
        userId: 3
      },
        {
        title: 'phone',
        description: 'rose gold iphone',
        date: '2019-12-05',
        contact: 'michelle@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 4,
        userId: 4
      },
        {
        title: 'wallet',
        description: 'purple',
        date: '2019-12-05',
        contact: 'michelle@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 4,
        userId: 4
      },
        {
        title: 'watch',
        description: 'blue',
        date: '2019-12-05',
        contact: 'michelle@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 4,
        userId: 4
      },
        {
        title: 'wallet',
        description: 'white coach',
        date: '2019-12-05',
        contact: 'kamlesh@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 5,
        userId: 5
      },
        {
        title: 'phone',
        description: 'space grey iphone',
        date: '2019-12-05',
        contact: 'kamlesh@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 5,
        userId: 5
      },
        {
        title: 'watch',
        description: 'red apple watch',
        date: '2019-12-05',
        contact: 'kamlesh@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        eventId: 5,
        userId: 5
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
