const jwt = require('jsonwebtoken');
const {
  config: { tokenSecret },
} = require('../config/config');
const boom = require('@hapi/boom');

const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw boom.unauthorized('No token. Unauthorized');

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) throw boom.unauthorized('Invalid token. Unauthorized');

    req.user = decoded;
    next();
  });
};

module.exports = authRequired;
