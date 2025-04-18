'use strict';

const { INSCRIPCIONES_TABLE, InscripcionSchema } = require('../models/inscripcion.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(INSCRIPCIONES_TABLE, InscripcionSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(INSCRIPCIONES_TABLE);
  },
};
