'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('tests', [{
     testdata: 'testing. testing. testing',
     firstName: 'DeepBlue',
     createdAt: new Date(),
     updatedAt: new Date()
   }], {})
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('tests', {firstName: 'DeepBlue'});
  }
};
