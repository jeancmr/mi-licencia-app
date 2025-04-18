const Joi = require('joi');

const id = Joi.number().integer();
const estudianteId = Joi.number().integer();
const claseId = Joi.number().integer();
const fechaInscripcion = Joi.date().iso();

const createEnrollmentSchema = Joi.object({
  estudianteId: estudianteId.required(),
  claseId: claseId.required(),
  fechaInscripcion: fechaInscripcion.default(new Date()),
});

const updateEnrollmentSchema = Joi.object({
  estudianteId,
  claseId,
  fechaInscripcion,
});

const getEnrollmentSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
  getEnrollmentSchema,
};
