const AsistenciasService = require('../services/asistencia.service');
const service = new AsistenciasService();

async function createAttendance(req, res, next) {
  try {
    const data = req.body;
    const newAttendance = await service.create(data);
    res.status(201).json(newAttendance);
  } catch (error) {
    next(error);
  }
}

async function getAttendances(req, res, next) {
  try {
    const attendances = await service.find();
    res.json(attendances);
  } catch (error) {
    next(error);
  }
}

async function getAttendance(req, res, next) {
  try {
    const { id } = req.params;
    const attendance = await service.findOne(id);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
}

async function getProfessorAttendance(req, res, next) {
  try {
    const { id } = req.params;
    const attendances = await service.findByProfessor(id);
    res.json(attendances);
  } catch (error) {
    next(error);
  }
}

async function updateAttendance(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedAttendance = await service.update(id, body);
    res.json(updatedAttendance);
  } catch (error) {
    next(error);
  }
}

async function deleteAttendance(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createBulkAttendance(req, res, next) {
  try {
    const { claseId, asistencias } = req.body;

    if (!claseId || !Array.isArray(asistencias)) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    const newAttendances = await service.createBulk(claseId, asistencias);
    res.status(201).json(newAttendances);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAttendance,
  getAttendances,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  getProfessorAttendance,
  createBulkAttendance,
};
