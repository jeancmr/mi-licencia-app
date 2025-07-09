const UsersService = require('../services/usuario.service');
const service = new UsersService();

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const newUser = await service.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const users = await service.findStudents();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getProfessors = async (req, res, next) => {
  try {
    const users = await service.findProfessors();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await service.update(id, body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
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
  getStudents,
  getProfessors,
};
