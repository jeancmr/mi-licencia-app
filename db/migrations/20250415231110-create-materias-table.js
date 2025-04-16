'use strict';

const { MateriasSchema, MATERIA_TABLE } = require('../models/materia.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(MATERIA_TABLE, MateriasSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MATERIA_TABLE);
  },
};
