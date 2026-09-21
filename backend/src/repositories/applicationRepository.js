const pool = require('../config/database');
const Application = require('../models/Application');

const SELECT_BASE = `
  SELECT a.*, p.nombre AS programa_nombre, p.universidad AS universidad
  FROM applications a
  JOIN programs p ON p.id = a.program_id
`;

async function findByUser(userId) {
  const [rows] = await pool.query(
    `${SELECT_BASE} WHERE a.user_id = ? ORDER BY a.fecha_inscripcion DESC`,
    [userId]
  );
  return rows.map((r) => new Application(r));
}

async function findActiveByUser(userId) {
  const [rows] = await pool.query(
    `${SELECT_BASE} WHERE a.user_id = ? AND a.estado != 'cancelado' ORDER BY a.fecha_inscripcion DESC LIMIT 1`,
    [userId]
  );
  return rows[0] ? new Application(rows[0]) : null;
}

async function create({ user_id, program_id }) {
  const [result] = await pool.query(
    'INSERT INTO applications (user_id, program_id, estado) VALUES (?, ?, ?)',
    [user_id, program_id, 'inscrito']
  );
  const [rows] = await pool.query(`${SELECT_BASE} WHERE a.id = ?`, [result.insertId]);
  return new Application(rows[0]);
}

module.exports = { findByUser, findActiveByUser, create };
