import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarPerfil() {
      if (token) {
        try {
          const { data } = await api.get('/users/me');
          setUser(data);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setCargando(false);
    }
    cargarPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function registrar(nombre, email, password) {
    const { data } = await api.post('/auth/registro', { nombre, email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  async function actualizarPuntaje(puntaje) {
    const { data } = await api.put('/users/me/puntaje', { puntaje });
    setUser(data);
    return data;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, cargando, login, registrar, logout, actualizarPuntaje, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
