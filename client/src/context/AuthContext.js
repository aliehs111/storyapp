import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setIsAuthenticated(!!storedToken);
    setToken(storedToken); 
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
          logout(); // Log out the user if the profile fetch fails
        });
    }
  }, []);

  const checkTokenExpiration = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log('Token has expired');
        logout(); // Log out if token is expired
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration(); // Check expiration on load
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token]);

  const login = (token, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    setIsAuthenticated(true);
    setToken(token); 
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
    setToken(null); 
    setUserId(null);
    setUser(null);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
