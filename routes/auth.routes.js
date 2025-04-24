const express = require('express');
const UsersService = require('./../services/usuario.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { loginUserSchema, createUserSchema } = require('../schemas/usuario.schema');
const service = new UsersService();
const router = express.Router();
const bcrypt = require('bcrypt');
const createAccessToken = require('../libs/jwt');
const { authRequired } = require('../middlewares/validateToken');

router.get('/profile', authRequired, async (req, res) => {
  const user = await service.findOne(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.status(200).json({
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    identificacion: user.identificacion,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

router.post('/register', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.contrasena, 10);
    body.contrasena = hashedPassword;

    const newUser = await service.create(body);
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        correo: newUser.correo,
        identificacion: newUser.identificacion,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validatorHandler(loginUserSchema, 'body'), async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;
    const user = await service.findOneByEmail(correo);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatched = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatched) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = await createAccessToken({ id: user.id });
    res.cookie('token', token);

    res.status(200).json({
      message: 'Usuario logueado correctamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        identificacion: user.identificacion,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Usuario deslogueado correctamente' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
