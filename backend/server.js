const express = require('express');
const cors = require('cors');
const { port } = require('./src/config/credentials');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const programRoutes = require('./src/routes/programRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Manejador de errores centralizado
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ mensaje: err.message || 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
