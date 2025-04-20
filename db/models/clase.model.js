const { Model, DataTypes, Sequelize } = require('sequelize');
const { MATERIA_TABLE } = require('./materia.model');
const { USUARIO_TABLE } = require('./usuario.model');

const CLASE_TABLE = 'clases';

const ClaseSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  horaInicio: {
    allowNull: false,
    type: DataTypes.TIME,
    field: 'hora_inicio',
  },
  horaFin: {
    allowNull: false,
    type: DataTypes.TIME,
    field: 'hora_fin',
  },
  cuposMaximos: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 24,
  },
  aula: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  materiaId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'materia_id',
    references: {
      model: MATERIA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  profesorId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'profesor_id',
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Clase extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: 'profesor',
      foreignKey: 'profesorId',
    });
    this.belongsTo(models.Materia, {
      as: 'materia',
      foreignKey: 'materiaId',
    });
    // this.hasMany(models.Asistencia, {
    //   as: 'asistencias',
    //   foreignKey: 'claseId',
    // });
    this.belongsToMany(models.Usuario, {
      through: models.Inscripcion,
      foreignKey: 'claseId',
      otherKey: 'estudianteId',
      as: 'estudiantes',
    });
    this.belongsToMany(models.Usuario, {
      through: models.Asistencia,
      foreignKey: 'claseId',
      otherKey: 'estudianteId',
      as: 'asistencias',
    });
  }

  // toJSON() {
  //   const values = { ...this.get() };
  //   delete values.materia_id;
  //   delete values.profesor_id;
  //   return values;
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLASE_TABLE,
      modelName: 'Clase',
      timestamps: false,
    };
  }
}

module.exports = { CLASE_TABLE, ClaseSchema, Clase };
