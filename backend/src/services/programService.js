const programRepository = require('../repositories/programRepository');
const userRepository = require('../repositories/userRepository');

async function listAll() {
  return programRepository.findAll();
}

async function listEligibleForUser(userId) {
  const user = await userRepository.findById(userId);
  if (!user || user.puntaje_admision === null || user.puntaje_admision === undefined) {
    const error = new Error('Primero debes registrar tu puntaje del examen de admisión.');
    error.status = 400;
    throw error;
  }
  return programRepository.findEligible(user.puntaje_admision);
}

module.exports = { listAll, listEligibleForUser };
