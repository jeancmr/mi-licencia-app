const InscripcionesService = require('../services/inscripcion.service');
const service = new InscripcionesService();

async function createEnrollment(req, res, next) {
  try {
    const data = req.body;
    const newEnrollment = await service.create(data);
    res.status(201).json(newEnrollment);
  } catch (error) {
    next(error);
  }
}

async function getEnrollments(req, res, next) {
  try {
    const enrollments = await service.find();
    res.json(enrollments);
  } catch (error) {
    next(error);
  }
}

async function getEnrollment(req, res, next) {
  try {
    const { id } = req.params;
    const enrollment = await service.findOne(id);
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
}

async function updateEnrollment(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedEnrollment = await service.update(id, body);
    res.json(updatedEnrollment);
  } catch (error) {
    next(error);
  }
}

async function deleteEnrollment(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEnrollment,
  getEnrollments,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
