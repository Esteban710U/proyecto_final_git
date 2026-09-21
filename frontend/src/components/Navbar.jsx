import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="navbar-brand"> Admisiones · Universidad de Antioquia</div>
      {user && (
        <div className="navbar-user">
          <span>{user.nombre}</span>
          <button className="btn btn-ghost" onClick={logout}>Cerrar sesión</button>
        </div>
      )}
    </header>
  );
}
