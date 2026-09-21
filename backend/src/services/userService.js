const userRepository = require('../repositories/userRepository');

async function getProfile(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.status = 404;
    throw error;
  }
  return user.toPublicJSON();
}

async function setPuntaje(userId, puntaje) {
  const valor = Number(puntaje);
  if (Number.isNaN(valor) || valor < 0 || valor > 100) {
    const error = new Error('El puntaje debe ser un número entre 0 y 100.');
    error.status = 400;
    throw error;
  }
  const user = await userRepository.updatePuntaje(userId, valor);
  return user.toPublicJSON();
}

module.exports = { getProfile, setPuntaje };
