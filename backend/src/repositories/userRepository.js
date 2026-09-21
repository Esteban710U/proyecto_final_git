const pool = require('../config/database');
const User = require('../models/User');

async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] ? new User(rows[0]) : null;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] ? new User(rows[0]) : null;
}

async function create({ nombre, email, password_hash }) {
  const [result] = await pool.query(
    'INSERT INTO users (nombre, email, password_hash) VALUES (?, ?, ?)',
    [nombre, email, password_hash]
  );
  return findById(result.insertId);
}

async function updatePuntaje(id, puntaje) {
  await pool.query('UPDATE users SET puntaje_admision = ? WHERE id = ?', [puntaje, id]);
  return findById(id);
}

module.exports = { findByEmail, findById, create, updatePuntaje };
