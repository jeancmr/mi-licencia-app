const express = require('express');
const usuariosRouter = require('./usuarios.router');
const materiasRouter = require('./materias.router');
const clasesRouter = require('./clases.router');
const inscripcionesRouter = require('./inscripciones.router');
const asistenciaRouter = require('./asistencias.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/usuarios', usuariosRouter);
  router.use('/materias', materiasRouter);
  router.use('/clases', clasesRouter);
  router.use('/inscripciones', inscripcionesRouter);
  router.use('/asistencias', asistenciaRouter);
}

module.exports = routerApi;
