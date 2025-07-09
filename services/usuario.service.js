const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const newUser = await models.Usuario.create(data);
    return newUser;
  }

  async find() {
    const users = await models.Usuario.findAll();
    return users;
  }
  async findStudents() {
    const students = await models.Usuario.findAll({
      where: {
        rol: 'estudiante',
      },
      include: ['clasesInscritas'],
    });
    return students;
  }

  async findProfessors() {
    const professors = await models.Usuario.findAll({
      where: {
        rol: 'profesor',
      },
      // include: ['clasesInscritas'],
    });
    return professors;
  }

  async findOne(id) {
    const user = await models.Usuario.findByPk(id);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    return user;
  }
  async findOneByEmail(correo) {
    const user = await models.Usuario.findOne({
      where: {
        correo,
      },
    });
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
