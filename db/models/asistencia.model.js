const { Model, DataTypes, Sequelize } = require('sequelize');

const ASISTENCIA_TABLE = 'asistencias';

const AsistenciaSchema = {
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
  asistio: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  fechaRegistro: {
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

class Asistencia extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: 'estudiante',
      foreignKey: 'estudianteId',
    });

    this.belongsTo(models.Clase, {
      as: 'clase',
      foreignKey: 'claseId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASISTENCIA_TABLE,
      modelName: 'Asistencia',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['clase_id', 'estudiante_id'],
          name: 'unique_clase_estudiante',
        },
      ],
    };
  }
}

module.exports = {
  ASISTENCIA_TABLE,
  AsistenciaSchema,
  Asistencia,
};
