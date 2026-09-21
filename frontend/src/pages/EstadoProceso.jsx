import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

export default function EstadoProceso() {
  const [inscripcion, setInscripcion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargar() {
      try {
        const { data } = await api.get('/applications/estado');
        setInscripcion(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) return <p>Cargando estado del proceso...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <div className="welcome-banner">
        <h1>Estado del proceso de admisión</h1>
      </div>

      {!inscripcion ? (
        <Card title="Aún no te has inscrito">
          <p>No tienes ninguna inscripción activa. Ve a la sección de Inscripción para elegir tu carrera.</p>
        </Card>
      ) : (
        <Card title={inscripcion.programa_nombre} subtitle={inscripcion.universidad}>
          <p>Estado: <span className="badge">{inscripcion.estado}</span></p>
          <p>Fecha de inscripción: {new Date(inscripcion.fecha_inscripcion).toLocaleString()}</p>
        </Card>
      )}
    </div>
  );
}
