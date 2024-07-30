import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token')); // Added token state
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setIsAuthenticated(!!storedToken);
    setToken(storedToken); // Set token from localStorage
    setUserId(storedUserId);

    if (storedToken && storedUserId) {
      axios.get(`${process.env.REACT_APP_API_URL}/users/profile/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    setIsAuthenticated(true);
    setToken(token); // Set token on login
    setUserId(id);

    axios.get(`${process.env.REACT_APP_API_URL}/users/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setToken(null); // Clear token on logout
    setUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

