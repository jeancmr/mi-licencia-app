const { Usuario, UsuarioSchema } = require('./usuario.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));

  Usuario.associate(sequelize.models);
}

module.exports = setupModels;
