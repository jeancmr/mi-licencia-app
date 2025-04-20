const Joi = require('joi');

const id = Joi.number().integer();
const estudianteId = Joi.number().integer();
const claseId = Joi.number().integer();
const asistio = Joi.boolean().default(false);
const fechaRegistro = Joi.date().iso();

const createAsistenciaSchema = Joi.object({
  estudianteId: estudianteId.required(),
  claseId: claseId.required(),
  asistio: asistio.default(false),
  fechaRegistro: fechaRegistro.default(new Date()),
});

const updateAsistenciaSchema = Joi.object({
  estudianteId,
  claseId,
  asistio,
  fechaRegistro,
});

const getAsistenciaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createAsistenciaSchema,
  updateAsistenciaSchema,
  getAsistenciaSchema,
};
