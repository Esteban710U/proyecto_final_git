const applicationService = require('../services/applicationService');

async function inscribirse(req, res, next) {
  try {
    const { program_id } = req.body;
    if (!program_id) {
      return res.status(400).json({ mensaje: 'Debes indicar el programa al que deseas inscribirte.' });
    }
    const inscripcion = await applicationService.inscribir(req.userId, program_id);
    res.status(201).json(inscripcion);
  } catch (err) {
    next(err);
  }
}

async function estado(req, res, next) {
  try {
    const actual = await applicationService.estadoActual(req.userId);
    res.json(actual);
  } catch (err) {
    next(err);
  }
}

async function historial(req, res, next) {
  try {
    const items = await applicationService.historial(req.userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

module.exports = { inscribirse, estado, historial };
