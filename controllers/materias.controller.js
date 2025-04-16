const MateriasService = require('../services/materia.service');
const service = new MateriasService();

async function createMateria(req, res, next) {
  try {
    const data = req.body;
    const newMateria = await service.create(data);
    res.status(201).json(newMateria);
  } catch (error) {
    next(error);
  }
}

async function getMaterias(req, res, next) {
  try {
    const materias = await service.find();
    res.json(materias);
  } catch (error) {
    next(error);
  }
}

async function getMateria(req, res, next) {
  try {
    const { id } = req.params;
    const materia = await service.findOne(id);
    res.json(materia);
  } catch (error) {
    next(error);
  }
}

async function updateMateria(req, res, next) {
  try {
    const { id } = req.params;
    const changes = req.body;
    const materia = await service.update(id, changes);
    res.json(materia);
  } catch (error) {
    next(error);
  }
}

async function deleteMateria(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMateria,
  getMaterias,
  getMateria,
  updateMateria,
  deleteMateria,
};
