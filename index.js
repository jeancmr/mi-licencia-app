const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./libs/sequelize');
const routerApi = require('./routes/index');
const { errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { config } = require('./config/config');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173', config.frontendUrl];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
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
