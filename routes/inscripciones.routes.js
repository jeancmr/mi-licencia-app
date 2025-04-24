const express = require('express');
const EnrollmentsService = require('./../services/inscripcion.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createEnrollmentSchema,
  getEnrollmentSchema,
  updateEnrollmentSchema,
} = require('../schemas/inscripcion.schema');
const service = new EnrollmentsService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const enrollments = await service.find();

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getEnrollmentSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const enrollment = await service.findOne(id);
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createEnrollmentSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newEnrollment = await service.create(body);
    res.status(201).json(newEnrollment);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getEnrollmentSchema, 'params'),
  validatorHandler(updateEnrollmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedEnrollment = await service.update(id, body);
      res.json(updatedEnrollment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
