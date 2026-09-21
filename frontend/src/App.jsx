import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import EstadoProceso from './pages/EstadoProceso';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/estado-proceso" element={<ProtectedRoute><EstadoProceso /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
