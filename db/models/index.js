const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Materia, MateriasSchema } = require('./materia.model');
const { Clase, ClaseSchema } = require('./clase.model');
const { Inscripcion, InscripcionSchema } = require('./inscripcion.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Materia.init(MateriasSchema, Materia.config(sequelize));
  Clase.init(ClaseSchema, Clase.config(sequelize));
  Inscripcion.init(InscripcionSchema, Inscripcion.config(sequelize));
}

module.exports = setupModels;
