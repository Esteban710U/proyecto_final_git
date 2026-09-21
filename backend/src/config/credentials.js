require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'proyecto_final'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'cambia_esta_clave_secreta',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  },
  port: process.env.PORT || 4000
};
