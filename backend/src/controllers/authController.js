const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Nombre, correo y contraseña son obligatorios.' });
    }
    const resultado = await authService.register({ nombre, email, password });
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
    }
    const resultado = await authService.login({ email, password });
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
