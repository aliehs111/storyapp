import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
        {!isAuthenticated && <li><Link to="/login" className="text-white hover:text-gray-200">Login</Link></li>}
        {!isAuthenticated && <li><Link to="/register" className="text-white hover:text-gray-200">Register</Link></li>}
        {isAuthenticated && <li><Link to="/upload" className="text-white hover:text-gray-200">Upload</Link></li>}
        {isAuthenticated && <li><Link to="/videos" className="text-white hover:text-gray-200">Videos</Link></li>}
        {isAuthenticated && <li><Link to="/meet" className="text-white hover:text-gray-200">Kenzo & Kohji</Link></li>}
        {isAuthenticated && <li><button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button></li>}
        {/* <li><button onClick={toggleDarkMode} className="text-white hover:text-gray-200">Toggle Dark Mode</button></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
