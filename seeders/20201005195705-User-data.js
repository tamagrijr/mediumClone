'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { firstName: 'Ali', lastName: 'Kim', email: 'alicia.mira.kim@gmail.com', hashedPassword: 'makeHashLater' },
      { firstName: 'Warren', lastName: 'Tamagri', email: 'wartam@memail.com', hashedPassword: 'makeHashLater' },
      { firstName: 'Clayton', lastName: 'Reinhardt', email: 'clayrein@hemail.com', hashedPassword: 'makeHashLater' },
      { firstName: 'Cindy', lastName: 'Spence', email: 'cinspen@lemail.com', hashedPassword: 'makeHashLater' },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
