"use strict";

const DataTypes = require('sequelize').DataTypes;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'User',
      {
        email: {
          type: Sequelize.STRING(100),
          primaryKey: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        }
      }
    )
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('User');
  },
}