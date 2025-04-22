const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class ClasesService {
  constructor() {}

  async create(data) {
    const profesor = await models.Usuario.findByPk(data.profesorId);
    if (!profesor || profesor.rol !== 'profesor') throw boom.notFound('Profesor not found');

    await this.crossScheduleProfessor(data);
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

  async crossScheduleProfessor(data) {
    const { profesorId, fecha, horaInicio, horaFin } = data;

    const isConflict = await models.Clase.findOne({
      where: {
        profesorId,
        fecha,
        [Op.and]: [{ horaInicio: { [Op.lt]: horaFin } }, { horaFin: { [Op.gt]: horaInicio } }],
      },
    });

    if (isConflict) throw boom.conflict('El profesor ya tiene una clase programada en ese horario');
  }
}

module.exports = ClasesService;
