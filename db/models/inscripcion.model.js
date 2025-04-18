const { Model, DataTypes, Sequelize } = require('sequelize');

const INSCRIPCIONES_TABLE = 'inscripciones';

const InscripcionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  claseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'clase_id',
    references: {
      model: 'clases',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'estudiante_id',
    references: {
      model: 'usuarios',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  fechaInscripcion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_inscripcion',
    defaultValue: Sequelize.NOW,
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

class Inscripcion extends Model {
  static associate(models) {
    // Aquí puedes definir relaciones si las tienes más adelante
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSCRIPCIONES_TABLE,
      modelName: 'Inscripcion',
      timestamps: false,
    };
  }
}

module.exports = {
  INSCRIPCIONES_TABLE,
  InscripcionSchema,
  Inscripcion,
};
