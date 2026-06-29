import { createContext, useState, useEffect, useContext } from 'react';
import api, { setAuthToken } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Karena menggunakan memory, saat refresh otomatis logout
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken(null);
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      setAuthToken(response.data.token);
      setIsAuthenticated(true);
      
      // Ambil data user dari verify
      const verifyRes = await api.get('/auth/verify');
      setUser(verifyRes.data.user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
