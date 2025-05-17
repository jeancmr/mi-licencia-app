'use strict';

const { USUARIO_TABLE } = require('../models/usuario.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(USUARIO_TABLE, 'rol', {
      type: Sequelize.ENUM('estudiante', 'profesor', 'admin'),
      allowNull: false,
      defaultValue: 'estudiante',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(USUARIO_TABLE, 'rol', {
      type: Sequelize.ENUM('estudiante', 'profesor', 'admin'),
      allowNull: false,
      defaultValue: null,
    });
  }
};
