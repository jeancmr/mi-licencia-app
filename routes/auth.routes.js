const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const authRequired = require('../middlewares/validateToken');
const { loginUserSchema, createUserSchema } = require('../schemas/usuario.schema');
const { register, login, profile, logout, verifyToken } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/profile', authRequired, profile);

router.post('/register', validatorHandler(createUserSchema, 'body'), register);

router.post('/login', validatorHandler(loginUserSchema, 'body'), login);

router.get('/verify', verifyToken);

router.post('/logout', logout);

module.exports = router;
