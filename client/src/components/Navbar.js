// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
        <li><Link to="/login" className="text-white hover:text-gray-200">Login</Link></li>
        <li><Link to="/register" className="text-white hover:text-gray-200">Register</Link></li>
        <li><Link to="/upload" className="text-white hover:text-gray-200">Upload</Link></li>
        <li><Link to="/videos" className="text-white hover:text-gray-200">Videos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

