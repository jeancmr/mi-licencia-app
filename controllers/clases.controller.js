const ClasesService = require('../services/clase.service');
const service = new ClasesService();

async function createClass(req, res, next) {
  try {
    const data = req.body;
    const newClass = await service.create(data);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
}

async function getClasses(req, res, next) {
  try {
    const classes = await service.find();
    res.json(classes);
  } catch (error) {
    next(error);
  }
}

async function getClass(req, res, next) {
  try {
    const { id } = req.params;
    const classFound = await service.findOne(id);
    res.json(classFound);
  } catch (error) {
    next(error);
  }
}

async function updateClass(req, res, next) {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedClass = await service.update(id, changes);
    res.json(updatedClass);
  } catch (error) {
    next(error);
  }
}

async function deleteClass(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
};
