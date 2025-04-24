const express = require('express');
const MateriasService = require('./../services/materia.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createMateriaSchema,
  updateMateriaSchema,
  getMateriaSchema,
} = require('../schemas/materia.schema');
const router = express.Router();
const service = new MateriasService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getMateriaSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const materia = await service.findOne(id);
    res.json(materia);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createMateriaSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newMateria = await service.create(body);
    res.status(201).json(newMateria);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getMateriaSchema, 'params'),
  validatorHandler(updateMateriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedMateria = await service.update(id, body);
      res.json(updatedMateria);
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
