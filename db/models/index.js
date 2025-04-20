const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Materia, MateriasSchema } = require('./materia.model');
const { Clase, ClaseSchema } = require('./clase.model');
const { Inscripcion, InscripcionSchema } = require('./inscripcion.model');
const { Asistencia, AsistenciaSchema } = require('./asistencia.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Materia.init(MateriasSchema, Materia.config(sequelize));
  Clase.init(ClaseSchema, Clase.config(sequelize));
  Inscripcion.init(InscripcionSchema, Inscripcion.config(sequelize));
  Asistencia.init(AsistenciaSchema, Asistencia.config(sequelize));

  Usuario.associate(sequelize.models);
  Materia.associate(sequelize.models);
  Clase.associate(sequelize.models);
  Inscripcion.associate(sequelize.models);
  Asistencia.associate(sequelize.models);
}

module.exports = setupModels;
