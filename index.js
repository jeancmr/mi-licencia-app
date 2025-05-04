const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./libs/sequelize');
const routerApi = require('./routes/index');
const { errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));

// Rutas
routerApi(app);

// Middleware de manejo de errores
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a PostgreSQL:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
