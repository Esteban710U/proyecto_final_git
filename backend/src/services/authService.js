const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { jwt: jwtConfig } = require('../config/credentials');

async function register({ nombre, email, password }) {
  const existente = await userRepository.findByEmail(email);
  if (existente) {
    const error = new Error('Ya existe una cuenta registrada con ese correo.');
    error.status = 409;
    throw error;
  }
  const password_hash = await bcrypt.hash(password, 10);
  const user = await userRepository.create({ nombre, email, password_hash });
  return buildAuthResponse(user);
}

async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('Correo o contraseña incorrectos.');
    error.status = 401;
    throw error;
  }
  const passwordValida = await bcrypt.compare(password, user.password_hash);
  if (!passwordValida) {
    const error = new Error('Correo o contraseña incorrectos.');
    error.status = 401;
    throw error;
  }
  return buildAuthResponse(user);
}

function buildAuthResponse(user) {
  const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return { token, user: user.toPublicJSON() };
}

module.exports = { register, login };
