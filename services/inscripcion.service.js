const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class EnrollmentsService {
  constructor() {}

  async create(data) {
    const { claseId } = data;
    await this.isClassFull(claseId);
    await this.isAlreadyEnrolled(data);

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

  async isAlreadyEnrolled(data) {
    const { estudianteId, claseId } = data;
    const studentClass = await models.Inscripcion.findOne({
      where: {
        estudianteId,
        claseId,
      },
    });
    if (studentClass) throw boom.conflict('Ya se encuentra inscrito a la clase');
  }

  async isClassFull(claseId) {
    const numRegistered = await models.Inscripcion.count({
      where: { claseId },
    });
    const classInfo = await models.Clase.findByPk(claseId);

    if (!classInfo) {
      throw boom.notFound('Class not found');
    }
    if (numRegistered >= classInfo.cuposMaximos) {
      throw boom.conflict('Class has reached its maximum capacity');
    }
  }
}

module.exports = EnrollmentsService;
