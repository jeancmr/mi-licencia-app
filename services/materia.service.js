const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class MateriasService {
  constructor() {}

  async create(data) {
    const newMateria = await models.Materia.create(data);
    return newMateria;
  }

  async find() {
    const materias = await models.Materia.findAll();
    return materias;
  }

  async findOne(id) {
    const materia = await models.Materia.findByPk(id);
    if (!materia) {
      throw boom.notFound('Materia not found');
    }
    return materia;
  }

  async update(id, changes) {
    const materia = await this.findOne(id);
    const updatedMateria = await materia.update(changes);
    return updatedMateria;
  }

  async delete(id) {
    const materia = await this.findOne(id);
    await materia.destroy();
    return { id };
  }
}

module.exports = MateriasService;
