'use strict';

const { CLASE_TABLE, ClaseSchema } = require('../models/clase.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CLASE_TABLE, ClaseSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CLASE_TABLE);
  },
};
