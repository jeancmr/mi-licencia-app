'use strict';

const { UsuarioSchema, USUARIO_TABLE } = require('../models/usuario.model');
const { MateriasSchema, MATERIA_TABLE } = require('../models/materia.model');
const { ClaseSchema, CLASE_TABLE } = require('../models/clase.model');
const { InscripcionSchema, INSCRIPCIONES_TABLE } = require('../models/inscripcion.model');
const { AsistenciaSchema, ASISTENCIA_TABLE } = require('../models/asistencia.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(MATERIA_TABLE, MateriasSchema);
    await queryInterface.createTable(CLASE_TABLE, ClaseSchema);
    await queryInterface.createTable(INSCRIPCIONES_TABLE, InscripcionSchema);
    await queryInterface.createTable(ASISTENCIA_TABLE, AsistenciaSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ASISTENCIA_TABLE);
    await queryInterface.dropTable(INSCRIPCIONES_TABLE);
    await queryInterface.dropTable(CLASE_TABLE);
    await queryInterface.dropTable(MATERIA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
  },
};
