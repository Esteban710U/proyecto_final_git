const pool = require('../config/database');
const Program = require('../models/Program');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM programs ORDER BY puntaje_minimo DESC');
  return rows.map((r) => new Program(r));
}

async function findEligible(puntaje) {
  const [rows] = await pool.query(
    'SELECT * FROM programs WHERE puntaje_minimo <= ? ORDER BY puntaje_minimo DESC',
    [puntaje]
  );
  return rows.map((r) => new Program(r));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM programs WHERE id = ?', [id]);
  return rows[0] ? new Program(rows[0]) : null;
}

module.exports = { findAll, findEligible, findById };
