// Ejecuta schema.sql contra el servidor MySQL configurado en .env
// IMPORTANTE: en XAMPP, abre el panel de control y presiona "Start" en el
// módulo MySQL antes de correr este comando.
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { db } = require('../config/credentials');

async function initDb() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  const connection = await mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    multipleStatements: true
  });

  try {
    await connection.query(sql);
    console.log('Base de datos y tablas creadas correctamente.');
  } finally {
    await connection.end();
  }
}

initDb().catch((err) => {
  console.error('Error inicializando la base de datos:', err.message);
  console.error('Verifica que el módulo MySQL de XAMPP esté iniciado (Start) y que el puerto sea 3306.');
  process.exit(1);
});
