const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createClaseSchema,
  updateClaseSchema,
  getClaseSchema,
} = require('../schemas/clase.schema.js');
const {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
} = require('../controllers/clases.controller.js');

const router = express.Router();

router.get('/', getClasses);

router.get('/:id', validatorHandler(getClaseSchema, 'params'), getClass);

router.post('/', validatorHandler(createClaseSchema, 'body'), createClass);

router.patch(
  '/:id',
  validatorHandler(getClaseSchema, 'params'),
  validatorHandler(updateClaseSchema, 'body'),
  updateClass
);

router.delete('/:id', deleteClass);

module.exports = router;
