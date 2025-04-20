const { Model, DataTypes, Sequelize } = require('sequelize');

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rol: {
    type: DataTypes.ENUM('estudiante', 'profesor', 'admin'),
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
    onUpdate: Sequelize.NOW,
  },
};

class Usuario extends Model {
  static associate(models) {
    this.hasMany(models.Clase, {
      as: 'clasesDictadas',
      foreignKey: 'profesorId',
    });

    this.belongsToMany(models.Clase, {
      through: models.Inscripcion,
      foreignKey: 'estudianteId',
      otherKey: 'claseId',
      as: 'clasesInscritas',
    });
    this.belongsToMany(models.Clase, {
      through: models.Asistencia,
      foreignKey: 'estudianteId',
      otherKey: 'claseId',
      as: 'asistencias',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false,
    };
  }
}

module.exports = {
  USUARIO_TABLE,
  UsuarioSchema,
  Usuario,
};
