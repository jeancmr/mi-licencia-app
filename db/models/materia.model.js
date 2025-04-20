const { Model, DataTypes, Sequelize } = require('sequelize');

const MATERIA_TABLE = 'materias';

const MateriasSchema = {
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
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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

class Materia extends Model {
  static associate(models) {
    this.hasMany(models.Clase, {
      as: 'clases',
      foreignKey: 'materia_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MATERIA_TABLE,
      modelName: 'Materia',
      timestamps: false,
    };
  }
}

module.exports = {
  MATERIA_TABLE,
  MateriasSchema,
  Materia,
};
