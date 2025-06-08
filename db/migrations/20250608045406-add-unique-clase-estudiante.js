'use strict';

const { ASISTENCIA_TABLE } = require('../models/asistencia.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint(ASISTENCIA_TABLE, {
      fields: ['clase_id', 'estudiante_id'],
      type: 'unique',
      name: 'unique_clase_estudiante',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(ASISTENCIA_TABLE, 'unique_clase_estudiante');
  },
};
