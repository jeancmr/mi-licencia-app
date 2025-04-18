const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Materia, MateriasSchema } = require('./materia.model');
const { Clase, ClaseSchema } = require('./clase.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Materia.init(MateriasSchema, Materia.config(sequelize));
  Clase.init(ClaseSchema, Clase.config(sequelize));
}

module.exports = setupModels;
