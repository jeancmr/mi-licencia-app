const jwt = require('jsonwebtoken');
const {
  config: { tokenSecret },
} = require('../config/config');

const createAccessToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, tokenSecret, { expiresIn: '15m' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = createAccessToken;
