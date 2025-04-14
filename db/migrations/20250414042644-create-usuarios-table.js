'use strict';

const { UsuarioSchema, USUARIO_TABLE } = require('../models/usuario.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USUARIO_TABLE);
  },
};
