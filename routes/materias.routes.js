const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
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

router.get('/', authRequired, getMaterias);

router.get('/:id', authRequired, validatorHandler(getMateriaSchema, 'params'), getMateria);

router.post('/', authRequired, validatorHandler(createMateriaSchema, 'body'), createMateria);

router.patch(
  '/:id',
  authRequired,
  validatorHandler(getMateriaSchema, 'params'),
  validatorHandler(updateMateriaSchema, 'body'),
  updateMateria
);

router.delete('/:id', authRequired, deleteMateria);

module.exports = router;
