const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
const { loginUserSchema, createUserSchema } = require('../schemas/usuario.schema');
const { register, login, profile, logout } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/profile', authRequired, profile);

router.post('/register', validatorHandler(createUserSchema, 'body'), register);

router.post('/login', validatorHandler(loginUserSchema, 'body'), login);

router.post('/logout', logout);

module.exports = router;
