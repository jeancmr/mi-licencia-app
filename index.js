const express = require('express');
const sequelize = require('./libs/sequelize');
const cors = require('cors');
const morgan = require('morgan');
const routerApi = require('./routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.path}`);
  next();
});

// Rutas
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Intentar conexión
sequelize
  .authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a PostgreSQL:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
