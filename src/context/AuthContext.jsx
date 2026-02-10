import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulation de connexion
  const login = (email, password) => {
    // Validation simple (simulation)
    if (email && password) {
      const userData = {
        id: 1,
        email: email,
        nom: 'Administrateur',
        prenom: 'Système',
        role: 'admin'
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, message: 'Connexion réussie' };
    }
    return { success: false, message: 'Email ou mot de passe incorrect' };
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Vérifier si l'utilisateur est connecté au chargement
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};