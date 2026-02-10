import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import './App.css';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Eleves from './pages/Eleves';
import EleveDetail from './pages/EleveDetail';
import Classes from './pages/Classes';
import ClasseDetail from './pages/ClasseDetail';
import Presences from './pages/Presences';
import Notes from './pages/Notes';
import Paiements from './pages/Paiements';

// Layout
import Layout from './components/layout/Layout';

// Composant de protection des routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuth();
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<Login />} />
          
          {/* Routes privées */}
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="eleves" element={<Eleves />} />
            <Route path="eleves/:id" element={<EleveDetail />} />
            <Route path="classes" element={<Classes />} />
            <Route path="classes/:id" element={<ClasseDetail />} />
            <Route path="presences" element={<Presences />} />
            <Route path="notes" element={<Notes />} />
            <Route path="paiements" element={<Paiements />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;