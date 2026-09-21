import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Inicio', icon: '' },
  { to: '/estado-proceso', label: 'Estado del proceso', icon: '' }
];

export default function Sidebar() {
  return (
    <nav className="sidebar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="sidebar-icon">{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
