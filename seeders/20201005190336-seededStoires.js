'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Stoires', [
        {
        title: "The Little Brown Bear",
        body: "This bear was brown, and it was also.... little.",
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
          title: "The Large Brown Bear",
          body: "This bear was brown, and it was also.... large.",
          authorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Little Polar Bear",
          body: "This bear was polar, and it was also.... little.",
          authorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Large Polar Bear",
          body: "This bear was polar, and it was also.... large.",
          authorId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Stoires', null, {});

  }
};
