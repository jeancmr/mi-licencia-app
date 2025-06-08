const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class AttendancesService {
  constructor() {}

  async create(data) {
    const newAttendance = await models.Asistencia.create(data);
    return newAttendance;
  }

  async find() {
    const attendances = await models.Asistencia.findAll();

    return attendances;
  }

  async findOne(id) {
    const attendance = await models.Asistencia.findByPk(id);
    if (!attendance) {
      throw boom.notFound('Asistencia not found');
    }
    return attendance;
  }

  async findByProfessor(profesorId) {
    const attendances = await models.Asistencia.findAll({
      include: [
        {
          model: models.Clase,
          as: 'clase',
          where: { profesorId },
          include: [
            {
              model: models.Materia,
              as: 'materia',
              attributes: ['nombre'],
            },
          ],
        },
        {
          model: models.Usuario,
          as: 'estudiante',
          attributes: ['id', 'nombre', 'correo', 'identificacion'],
        },
      ],
    });

    if (attendances.length === 0) {
      throw boom.notFound('No attendances found for this professor');
    }
    return attendances;
  }

  async update(id, changes) {
    const attendance = await this.findOne(id);
    const updatedAttendance = await attendance.update(changes);
    return updatedAttendance;
  }

  async delete(id) {
    const attendance = await this.findOne(id);
    await attendance.destroy();
    return { id };
  }

  async createBulk(claseId, asistencias) {
    const fecha = new Date().toISOString();

    const records = asistencias.map(({ estudianteId, asistio }) => ({
      claseId,
      estudianteId,
      asistio,
      fecha_inscripcion: fecha,
      created_at: fecha,
      updated_at: fecha,
    }));

    const newAttendances = await models.Asistencia.bulkCreate(records);
    return newAttendances;
  }
}

module.exports = AttendancesService;
