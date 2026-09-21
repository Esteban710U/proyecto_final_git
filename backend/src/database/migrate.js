// Script de migración para bases de datos creadas con una versión anterior
// del proyecto (que tenía convocatorias, documentos y escala de puntaje 0-500).
// Ejecutar una sola vez con: npm run migrate
const pool = require('../config/database');

const programasNuevos = [
  { nombre: 'Medicina', facultad: 'Facultad de Medicina', puntaje_minimo: 92, cupos: 40 },
  { nombre: 'Ingeniería de Sistemas', facultad: 'Facultad de Ingeniería', puntaje_minimo: 75, cupos: 60 },
  { nombre: 'Ingeniería Civil', facultad: 'Facultad de Ingeniería', puntaje_minimo: 72, cupos: 50 },
  { nombre: 'Derecho', facultad: 'Facultad de Derecho y Ciencias Políticas', puntaje_minimo: 68, cupos: 55 },
  { nombre: 'Bacteriología', facultad: 'Escuela de Microbiología', puntaje_minimo: 68, cupos: 30 },
  { nombre: 'Psicología', facultad: 'Facultad de Ciencias Sociales', puntaje_minimo: 65, cupos: 45 },
  { nombre: 'Enfermería', facultad: 'Facultad de Enfermería', puntaje_minimo: 63, cupos: 40 },
  { nombre: 'Comunicación Social - Periodismo', facultad: 'Facultad de Comunicaciones', puntaje_minimo: 60, cupos: 35 },
  { nombre: 'Contaduría Pública', facultad: 'Facultad de Ciencias Económicas', puntaje_minimo: 58, cupos: 60 },
  { nombre: 'Administración de Empresas', facultad: 'Facultad de Ciencias Económicas', puntaje_minimo: 55, cupos: 60 }
];

async function columnaExiste(conn, tabla, columna) {
  const [rows] = await conn.query(
    `SELECT COUNT(*) AS total FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    [tabla, columna]
  );
  return rows[0].total > 0;
}

async function migrate() {
  const conn = await pool.getConnection();
  try {
    console.log('1) Actualizando programas a la escala de puntaje 0-100...');
    await conn.query('DELETE FROM programs');
    for (const p of programasNuevos) {
      await conn.query(
        'INSERT INTO programs (nombre, facultad, universidad, puntaje_minimo, cupos) VALUES (?, ?, ?, ?, ?)',
        [p.nombre, p.facultad, 'Universidad de Antioquia', p.puntaje_minimo, p.cupos]
      );
    }

    console.log('2) Reiniciando puntajes de usuarios que quedaron fuera de rango (0-100)...');
    await conn.query('UPDATE users SET puntaje_admision = NULL WHERE puntaje_admision > 100');

    if (await columnaExiste(conn, 'applications', 'call_id')) {
      console.log('3) Quitando la columna call_id de applications (ya no se usa)...');
      try {
        await conn.query('ALTER TABLE applications DROP FOREIGN KEY applications_ibfk_3');
      } catch (e) {
        // El nombre de la restricción puede variar o no existir; se ignora si falla.
      }
      await conn.query('ALTER TABLE applications DROP COLUMN call_id');
    }

    console.log('4) Eliminando tabla de documentos (ya no se usa)...');
    await conn.query('DROP TABLE IF EXISTS documents');

    console.log('5) Eliminando tabla de convocatorias (ya no se usa)...');
    await conn.query('DROP TABLE IF EXISTS calls');

    console.log('Migración completada correctamente. Vuelve a ingresar tu puntaje (0-100) en el dashboard.');
  } finally {
    conn.release();
    process.exit(0);
  }
}

migrate().catch((err) => {
  console.error('Error migrando la base de datos:', err.message);
  process.exit(1);
});
