// Inserta los programas académicos de ejemplo (escala de puntaje 0-100)
const pool = require('../config/database');

const programas = [
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

async function seed() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT COUNT(*) as total FROM programs');
    if (rows[0].total === 0) {
      for (const p of programas) {
        await connection.query(
          'INSERT INTO programs (nombre, facultad, universidad, puntaje_minimo, cupos) VALUES (?, ?, ?, ?, ?)',
          [p.nombre, p.facultad, 'Universidad de Antioquia', p.puntaje_minimo, p.cupos]
        );
      }
      console.log('Programas insertados.');
    } else {
      console.log('Los programas ya existían, no se duplicaron.');
    }
  } finally {
    connection.release();
    process.exit(0);
  }
}

seed().catch((err) => {
  console.error('Error insertando datos de ejemplo:', err.message);
  process.exit(1);
});
