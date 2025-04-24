const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createMateriaSchema,
  updateMateriaSchema,
  getMateriaSchema,
} = require('../schemas/materia.schema');
const {
  getMaterias,
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
} = require('../controllers/materias.controller');

const router = express.Router();

router.get('/', getMaterias);
router.get('/:id', validatorHandler(getMateriaSchema, 'params'), getMateria);
router.post('/', validatorHandler(createMateriaSchema, 'body'), createMateria);
router.patch(
  '/:id',
  validatorHandler(getMateriaSchema, 'params'),
  validatorHandler(updateMateriaSchema, 'body'),
  updateMateria
);
router.delete('/:id', deleteMateria);

module.exports = router;
