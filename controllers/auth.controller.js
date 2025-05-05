const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const UsersService = require('./../services/usuario.service');
const service = new UsersService();
const { createAccessToken, verifyAccessToken } = require('../libs/jwt');

const register = async (req, res, next) => {
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
};

const login = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;
    const user = await service.findOneByEmail(correo);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatched = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatched) throw boom.unauthorized('Contraseña incorrecta');
    // if (!isMatched) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = await createAccessToken({ id: user.id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({
      message: 'Usuario logueado correctamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        identificacion: user.identificacion,
        rol: user.rol,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res) => {
  const user = await service.findOne(req.user.id);

  if (!user) throw boom.notFound('Usuario no encontrado');
  res.status(200).json({
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    identificacion: user.identificacion,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) throw boom.unauthorized('No token. Unauthorized');

  const decoded = await verifyAccessToken(token);
  const userFound = await service.findOne(decoded.id);
  if (!userFound) throw boom.notFound('Usuario no encontrado');

  res.status(200).json({
    message: 'Token verificado correctamente',
    user: {
      id: userFound.id,
      nombre: userFound.nombre,
      correo: userFound.correo,
      identificacion: userFound.identificacion,
      rol: userFound.rol,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    },
  });
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Usuario deslogueado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  profile,
  logout,
  verifyToken,
};
