const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ClasesService {
  constructor() {}

  async create(data) {
    console.log('data clase service ', data);
    const profesor = await models.Usuario.findByPk(data.profesorId);
    if (!profesor || profesor.rol !== 'profesor') {
      throw boom.notFound('Profesor not found');
    }

    const newClase = await models.Clase.create(data);
    return newClase;
  }

  async find() {
    const clases = await models.Clase.findAll();

    return clases;
  }

  async findOne(id) {
    const clase = await models.Clase.findByPk(id);
    if (!clase) {
      throw boom.notFound('Clase not found');
    }
    return clase;
  }

  async update(id, changes) {
    const clase = await this.findOne(id);
    const updatedclase = await clase.update(changes);
    return updatedclase;
  }

  async delete(id) {
    const clase = await this.findOne(id);
    await clase.destroy();
    return { id };
  }
}

module.exports = ClasesService;
