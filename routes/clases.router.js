const express = require('express');
const ClasesService = require('./../services/clase.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createClaseSchema,
  updateClaseSchema,
  getClaseSchema,
} = require('../schemas/clase.schema.js');
const router = express.Router();
const service = new ClasesService();

router.get('/', async (req, res, next) => {
  try {
    const clases = await service.find();

    res.json(clases);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getClaseSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const clase = await service.findOne(id);
    res.json(clase);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createClaseSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newclase = await service.create(body);
    res.status(201).json(newclase);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getClaseSchema, 'params'),
  validatorHandler(updateClaseSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedclase = await service.update(id, body);
      res.json(updatedclase);
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
