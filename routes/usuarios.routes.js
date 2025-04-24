const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const {
  getUsers,
  getStudents,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/', getUsers);
router.get('/estudiantes', getStudents);
router.get('/:id', validatorHandler(getUserSchema, 'params'), getUser);
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);
router.delete('/:id', deleteUser);

module.exports = router;
