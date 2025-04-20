const express = require('express');
const AttendancesService = require('./../services/asistencia.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createAsistenciaSchema,
  getAsistenciaSchema,
  updateAsistenciaSchema,
} = require('../schemas/asistencia.schema');
const service = new AttendancesService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const attendances = await service.find();
    console.log(attendances);

    res.json(attendances);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

router.get('/:id', validatorHandler(getAsistenciaSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await service.findOne(id);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createAsistenciaSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newAttendance = await service.create(body);
    res.status(201).json(newAttendance);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getAsistenciaSchema, 'params'),
  validatorHandler(updateAsistenciaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedAttendance = await service.update(id, body);
      res.json(updatedAttendance);
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
