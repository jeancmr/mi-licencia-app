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
} = require('../controllers/asistencias.controller');
const router = express.Router();

router.get('/', authRequired, getAttendances);

router.get('/:id', authRequired, validatorHandler(getAsistenciaSchema, 'params'), getAttendance);

router.post('/', authRequired, validatorHandler(createAsistenciaSchema, 'body'), createAttendance);

router.patch(
  '/:id',
  authRequired,
  validatorHandler(getAsistenciaSchema, 'params'),
  validatorHandler(updateAsistenciaSchema, 'body'),
  updateAttendance
);

router.delete('/:id', authRequired, deleteAttendance);

module.exports = router;
