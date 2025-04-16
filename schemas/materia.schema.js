const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(10).max(200);
const codigo = Joi.string().min(2);

const createMateriaSchema = Joi.object({
  nombre: nombre.required(),
  descripcion: descripcion.required(),
  codigo: codigo.required(),
});

const updateMateriaSchema = Joi.object({
  nombre,
  descripcion,
  codigo,
});

const getMateriaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createMateriaSchema,
  updateMateriaSchema,
  getMateriaSchema,
};
