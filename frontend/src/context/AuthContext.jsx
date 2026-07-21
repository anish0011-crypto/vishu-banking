import { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const res = await api.get('/admin/verify');
          setAdmin(res.data.admin);
        } catch (error) {
          localStorage.removeItem('adminToken');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem('adminToken', token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};