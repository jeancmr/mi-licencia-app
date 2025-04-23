const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(50);
const correo = Joi.string().email();
const contrasena = Joi.string().min(6);
const identificacion = Joi.string().min(5).max(20);
const rol = Joi.string().valid('admin', 'estudiante', 'profesor');

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  correo: correo.required(),
  contrasena: contrasena.required(),
  identificacion: identificacion.required(),
  rol: rol.required(),
});
const loginUserSchema = Joi.object({
  correo: correo.required(),
  contrasena: contrasena.required(),
});

const updateUserSchema = Joi.object({
  nombre,
  correo,
  contrasena,
  identificacion,
  rol,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  getUserSchema,
};
