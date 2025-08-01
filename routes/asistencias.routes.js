const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
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
  getProfessorAttendance,
  createBulkAttendance,
} = require('../controllers/asistencias.controller');
const router = express.Router();

router.get('/', authRequired, getAttendances);

router.get('/:id', authRequired, validatorHandler(getAsistenciaSchema, 'params'), getAttendance);

router.get(
  '/profesor/:id',
  authRequired,
  validatorHandler(getAsistenciaSchema, 'params'),
  getProfessorAttendance
);

router.post('/', authRequired, validatorHandler(createAsistenciaSchema, 'body'), createAttendance);

router.post('/registro-multiple', authRequired, createBulkAttendance);

router.patch(
  '/:id',
  authRequired,
  validatorHandler(getAsistenciaSchema, 'params'),
  validatorHandler(updateAsistenciaSchema, 'body'),
  updateAttendance
);

router.delete('/:id', authRequired, deleteAttendance);

module.exports = router;
