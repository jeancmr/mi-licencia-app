const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
const {
  createEnrollmentSchema,
  getEnrollmentSchema,
  updateEnrollmentSchema,
} = require('../schemas/inscripcion.schema');
const {
  createEnrollment,
  getEnrollments,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getStudentEnrollments,
} = require('../controllers/inscripciones.controller');

const router = express.Router();

router.get('/', authRequired, getEnrollments);

router.get(
  '/estudiante/:id',
  authRequired,
  validatorHandler(getEnrollmentSchema, 'params'),
  getStudentEnrollments
);

router.get('/:id', authRequired, validatorHandler(getEnrollmentSchema, 'params'), getEnrollment);

router.post('/', authRequired, validatorHandler(createEnrollmentSchema, 'body'), createEnrollment);

router.patch(
  '/:id',
  authRequired,
  validatorHandler(getEnrollmentSchema, 'params'),
  validatorHandler(updateEnrollmentSchema, 'body'),
  updateEnrollment
);

router.delete('/:id', authRequired, deleteEnrollment);

module.exports = router;
