const express = require('express');
const AttendancesService = require('./../services/asistencia.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createAsistenciaSchema,
  getAsistenciaSchema,
  updateAsistenciaSchema,
} = require('../schemas/asistencia.schema');
const {
  getAttendances,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/asistencias.controller');
const service = new AttendancesService();
const router = express.Router();

router.get('/', getAttendances);

router.get('/:id', validatorHandler(getAsistenciaSchema, 'params'), getAttendance);

router.post('/', validatorHandler(createAsistenciaSchema, 'body'), createAttendance);

router.patch(
  '/:id',
  validatorHandler(getAsistenciaSchema, 'params'),
  validatorHandler(updateAsistenciaSchema, 'body'),
  updateAttendance
);

router.delete('/:id', deleteAttendance);

module.exports = router;
