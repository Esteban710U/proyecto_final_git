const programService = require('../services/programService');

async function listar(req, res, next) {
  try {
    const programas = await programService.listAll();
    res.json(programas);
  } catch (err) {
    next(err);
  }
}

async function elegibles(req, res, next) {
  try {
    const programas = await programService.listEligibleForUser(req.userId);
    res.json(programas);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, elegibles };
