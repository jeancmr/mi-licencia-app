const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class EnrollmentsService {
  constructor() {}

  async create(data) {
    const newEnrollment = await models.Inscripcion.create(data);
    return newEnrollment;
  }

  async find() {
    const enrollments = await models.Inscripcion.findAll({
      include: [
        {
          association: 'estudiante',
          attributes: ['nombre', 'identificacion'],
        },
      ],
    });
    return enrollments;
  }

  async findOne(id) {
    const enrollment = await models.Inscripcion.findByPk(id);
    if (!enrollment) {
      throw boom.notFound('Enrollment not found');
    }
    return enrollment;
  }

  async update(id, changes) {
    const enrollment = await this.findOne(id);
    const updatedEnrollment = await enrollment.update(changes);
    return updatedEnrollment;
  }

  async delete(id) {
    const enrollment = await this.findOne(id);
    await enrollment.destroy();
    return { id };
  }
}

module.exports = EnrollmentsService;
