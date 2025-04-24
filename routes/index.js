const express = require('express');
const usuariosRouter = require('./usuarios.routes');
const materiasRouter = require('./materias.routes');
const clasesRouter = require('./clases.routes');
const inscripcionesRouter = require('./inscripciones.routes');
const asistenciaRouter = require('./asistencias.routes');
const authRouter = require('./auth.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/', authRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/materias', materiasRouter);
  router.use('/clases', clasesRouter);
  router.use('/inscripciones', inscripcionesRouter);
  router.use('/asistencias', asistenciaRouter);
}

module.exports = routerApi;
