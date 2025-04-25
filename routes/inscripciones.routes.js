const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
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
} = require('../controllers/inscripciones.controller');

const router = express.Router();

router.get('/', getEnrollments);

router.get('/:id', validatorHandler(getEnrollmentSchema, 'params'), getEnrollment);

router.post('/', validatorHandler(createEnrollmentSchema, 'body'), createEnrollment);

router.patch(
  '/:id',
  validatorHandler(getEnrollmentSchema, 'params'),
  validatorHandler(updateEnrollmentSchema, 'body'),
  updateEnrollment
);

router.delete('/:id', deleteEnrollment);

module.exports = router;
