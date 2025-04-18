const Joi = require('joi');

const id = Joi.number().integer();
const fecha = Joi.date().iso();
const horaInicio = Joi.string().regex(/^\d{2}:\d{2}:\d{2}$/);
const horaFin = Joi.string().regex(/^\d{2}:\d{2}:\d{2}$/);
const cuposMaximos = Joi.number().integer().min(1).max(24);
const aula = Joi.string().max(50);
const materiaId = Joi.number().integer();
const profesorId = Joi.number().integer();

const createClaseSchema = Joi.object({
  fecha: fecha.required(),
  horaInicio: horaInicio.required(),
  horaFin: horaFin.required(),
  cuposMaximos: cuposMaximos.default(24),
  aula: aula.required(),
  materiaId: materiaId.required(),
  profesorId: profesorId.required(),
});

const updateClaseSchema = Joi.object({
  fecha: fecha,
  horaInicio: horaInicio,
  horaFin: horaFin,
  cuposMaximos: cuposMaximos,
  aula: aula,
  materiaId: materiaId,
  profesorId: profesorId,
});

const getClaseSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createClaseSchema,
  updateClaseSchema,
  getClaseSchema,
};
