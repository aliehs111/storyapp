import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token')); // Added token state
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setIsAuthenticated(!!storedToken);
    setToken(storedToken); // Set token from localStorage
    setUserId(storedUserId);
  }, []);

  const login = (token, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    setIsAuthenticated(true);
    setToken(token); // Set token on login
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setToken(null); // Clear token on logout
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
