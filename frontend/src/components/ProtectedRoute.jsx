import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';

export default function ProtectedRoute({ children }) {
  const { user, token, cargando } = useAuth();

  if (cargando) {
    return <div className="pantalla-carga">Cargando...</div>;
  }
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
}
