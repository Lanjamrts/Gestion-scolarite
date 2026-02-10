import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="navbar-title">Gestion de Scolarité</h1>
      </div>
      
      <div className="navbar-right">
        <button className="navbar-icon-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="navbar-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.nom} {user?.prenom}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        
        <button className="navbar-icon-btn" onClick={logout} title="Déconnexion">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;