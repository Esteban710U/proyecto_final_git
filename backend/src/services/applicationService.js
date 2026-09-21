const applicationRepository = require('../repositories/applicationRepository');
const programRepository = require('../repositories/programRepository');
const userRepository = require('../repositories/userRepository');

async function inscribir(userId, programId) {
  const user = await userRepository.findById(userId);
  if (!user || user.puntaje_admision === null) {
    const error = new Error('Debes registrar tu puntaje de admisión antes de inscribirte.');
    error.status = 400;
    throw error;
  }

  const programa = await programRepository.findById(programId);
  if (!programa) {
    const error = new Error('El programa académico no existe.');
    error.status = 404;
    throw error;
  }

  if (Number(user.puntaje_admision) < Number(programa.puntaje_minimo)) {
    const error = new Error('Tu puntaje no alcanza el mínimo requerido para este programa.');
    error.status = 400;
    throw error;
  }

  const yaInscrito = await applicationRepository.findActiveByUser(userId);
  if (yaInscrito) {
    const error = new Error(`Ya tienes una inscripción activa a ${yaInscrito.programa_nombre}.`);
    error.status = 409;
    throw error;
  }

  return applicationRepository.create({ user_id: userId, program_id: programId });
}

async function estadoActual(userId) {
  return applicationRepository.findActiveByUser(userId);
}

async function historial(userId) {
  return applicationRepository.findByUser(userId);
}

module.exports = { inscribir, estadoActual, historial };
