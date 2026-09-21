import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Dashboard() {
  const { user, actualizarPuntaje } = useAuth();

  // --- Puntaje del examen de admisión ---
  const [puntaje, setPuntaje] = useState(user?.puntaje_admision ?? '');
  const [mensajePuntaje, setMensajePuntaje] = useState('');
  const [errorPuntaje, setErrorPuntaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  const tienePuntaje = user?.puntaje_admision !== null && user?.puntaje_admision !== undefined;

  async function handleGuardarPuntaje(e) {
    e.preventDefault();
    setMensajePuntaje('');
    setErrorPuntaje('');
    setGuardando(true);
    try {
      await actualizarPuntaje(puntaje);
      setMensajePuntaje('¡Puntaje guardado correctamente!');
    } catch (err) {
      setErrorPuntaje(err.message);
    } finally {
      setGuardando(false);
    }
  }

  // --- Inscripción a un programa académico ---
  const [programas, setProgramas] = useState([]);
  const [inscripcionActual, setInscripcionActual] = useState(null);
  const [cargandoInscripcion, setCargandoInscripcion] = useState(true);
  const [errorInscripcion, setErrorInscripcion] = useState('');
  const [programaSeleccionado, setProgramaSeleccionado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function cargar() {
      setErrorInscripcion('');
      setCargandoInscripcion(true);
      try {
        const { data: estado } = await api.get('/applications/estado');
        setInscripcionActual(estado);

        if (tienePuntaje && !estado) {
          const { data: elegibles } = await api.get('/programs/elegibles');
          setProgramas(elegibles);
        }
      } catch (err) {
        setErrorInscripcion(err.message);
      } finally {
        setCargandoInscripcion(false);
      }
    }
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tienePuntaje, mensajePuntaje]);

  async function confirmarInscripcion() {
    setEnviando(true);
    setErrorInscripcion('');
    try {
      const { data } = await api.post('/applications', { program_id: programaSeleccionado.id });
      setInscripcionActual(data);
      setProgramaSeleccionado(null);
    } catch (err) {
      setErrorInscripcion(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <div className="welcome-banner">
        <h1>Bienvenido, {user?.nombre} </h1>
        <p>Este es tu panel de admisión a la Universidad de Antioquia.</p>
      </div>

      <Card title="Tu puntaje del examen de admisión">
        <form onSubmit={handleGuardarPuntaje} className="inline-form">
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={puntaje}
            onChange={(e) => setPuntaje(e.target.value)}
            placeholder="Ej: 68"
            required
          />
          <Button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : tienePuntaje ? 'Actualizar' : 'Guardar puntaje'}
          </Button>
        </form>
        {mensajePuntaje && <div className="alert alert-success">{mensajePuntaje}</div>}
        {errorPuntaje && <div className="alert alert-error">{errorPuntaje}</div>}
        {tienePuntaje && (
          <p className="puntaje-actual">
            Puntaje actual: <strong>{user.puntaje_admision}</strong> / 100
          </p>
        )}
      </Card>

      {/* Sección de inscripción, justo debajo del puntaje */}
      {!tienePuntaje ? (
        <Card title="Inscripción">
          <p>Registra tu puntaje del examen de admisión para ver las carreras disponibles.</p>
        </Card>
      ) : cargandoInscripcion ? (
        <p>Cargando información de inscripción...</p>
      ) : inscripcionActual ? (
        <Card title="Ya estás inscrito" className="tarjeta-exito">
          <p className="mensaje-exito">
            ✅ Estás inscrito en <strong>{inscripcionActual.programa_nombre}</strong>,{' '}
            {inscripcionActual.universidad}.
          </p>
          <p>
            Estado actual: <span className="badge">{inscripcionActual.estado}</span>
          </p>
          <Link to="/estado-proceso" className="btn btn-ghost">Ver estado del proceso</Link>
        </Card>
      ) : (
        <div>
          <div className="welcome-banner">
            <h2 style={{ margin: '0 0 6px' }}>Carreras disponibles para ti</h2>
            <p>
              Con tu puntaje de <strong>{user.puntaje_admision}</strong> puedes inscribirte a las
              siguientes carreras en la Universidad de Antioquia.
            </p>
          </div>

          {errorInscripcion && <div className="alert alert-error">{errorInscripcion}</div>}

          {programas.length === 0 ? (
            <Card>
              <p>Con tu puntaje actual no hay carreras disponibles. Puedes actualizar tu puntaje si presentaste una nueva prueba.</p>
            </Card>
          ) : (
            <div className="grid-cards">
              {programas.map((programa) => (
                <Card key={programa.id} title={programa.nombre} subtitle={programa.facultad}>
                  <p>Universidad: {programa.universidad}</p>
                  <p>Puntaje mínimo: {programa.puntaje_minimo}</p>
                  <p>Cupos: {programa.cupos}</p>
                  <Button onClick={() => setProgramaSeleccionado(programa)}>Inscribirme</Button>
                </Card>
              ))}
            </div>
          )}

          <Modal
            open={!!programaSeleccionado}
            title="Confirmar inscripción"
            onClose={() => setProgramaSeleccionado(null)}
          >
            {programaSeleccionado && (
              <div>
                <p>
                  Vas a inscribirte al programa <strong>{programaSeleccionado.nombre}</strong> en la
                  Universidad de Antioquia.
                </p>
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Correo:</strong> {user.email}</p>
                <p><strong>Puntaje:</strong> {user.puntaje_admision}</p>
                <div className="acciones-rapidas">
                  <Button onClick={confirmarInscripcion} disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Confirmar inscripción'}
                  </Button>
                  <Button variant="ghost" onClick={() => setProgramaSeleccionado(null)}>Cancelar</Button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}
