const ClasesService = require('../services/clase.service');
const service = new ClasesService();

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const newUser = await service.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const clase = await service.findOne(id);
    res.json(clase);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const changes = req.body;
    const clase = await service.update(id, changes);
    res.json(clase);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
