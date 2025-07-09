const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
const { updateUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const {
  getUsers,
  getStudents,
  getUser,
  updateUser,
  deleteUser,
  getProfessors,
} = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/', authRequired, getUsers);

router.get('/estudiantes', authRequired, getStudents);
router.get('/professors', authRequired, getProfessors);

router.get('/:id', authRequired, validatorHandler(getUserSchema, 'params'), getUser);

router.patch(
  '/:id',
  authRequired,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

router.delete('/:id', authRequired, deleteUser);

module.exports = router;
