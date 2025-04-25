const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
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

router.get('/', authRequired, getClasses);

router.get('/:id', authRequired, validatorHandler(getClaseSchema, 'params'), getClass);

router.post('/', authRequired, validatorHandler(createClaseSchema, 'body'), createClass);

router.patch(
  '/:id',
  authRequired,
  validatorHandler(getClaseSchema, 'params'),
  validatorHandler(updateClaseSchema, 'body'),
  updateClass
);

router.delete('/:id', authRequired, deleteClass);

module.exports = router;
