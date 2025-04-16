const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Materia, MateriasSchema } = require('./materia.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Materia.init(MateriasSchema, Materia.config(sequelize));
}

module.exports = setupModels;
