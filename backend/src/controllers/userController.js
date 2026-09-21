const userService = require('../services/userService');

async function me(req, res, next) {
  try {
    const perfil = await userService.getProfile(req.userId);
    res.json(perfil);
  } catch (err) {
    next(err);
  }
}

async function actualizarPuntaje(req, res, next) {
  try {
    const { puntaje } = req.body;
    const perfil = await userService.setPuntaje(req.userId, puntaje);
    res.json(perfil);
  } catch (err) {
    next(err);
  }
}

module.exports = { me, actualizarPuntaje };
