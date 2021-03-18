'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // adds column firstName to table tests
    return queryInterface.addColumn('tests', 'firstName', Sequelize.STRING)
  },

  down: async (queryInterface, Sequelize) => {
  //removes the new column so that database can revert to its previous status
    return queryInterface.removeColumn('tests', 'firstName')
  }
};
