import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  School, 
  ClipboardList, 
  FileText, 
  DollarSign,
  X 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/eleves', icon: Users, label: 'Élèves' },
    { path: '/classes', icon: School, label: 'Classes' },
    { path: '/presences', icon: ClipboardList, label: 'Présences' },
    { path: '/notes', icon: FileText, label: 'Notes' },
    { path: '/paiements', icon: DollarSign, label: 'Paiements' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <School size={32} />
            <span>École</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;