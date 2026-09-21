const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/credentials');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No autenticado. Inicia sesión de nuevo.' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Sesión inválida o expirada.' });
  }
}

module.exports = authMiddleware;
