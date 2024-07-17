import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage to determine login status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout');
      localStorage.removeItem('token');
      setShowModal(false); // Close the modal after successful logout
      setIsLoggedIn(false); // Update login status
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <nav className="bg-blue-600 p-4">
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
          {!isLoggedIn && (
            <>
              <li><Link to="/login" className="text-white hover:text-gray-200">Login</Link></li>
              <li><Link to="/register" className="text-white hover:text-gray-200">Register</Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li><Link to="/upload" className="text-white hover:text-gray-200">Upload</Link></li>
              <li><Link to="/videos" className="text-white hover:text-gray-200">Videos</Link></li>
              <li><button onClick={openModal} className="text-white hover:text-gray-200">Logout</button></li>
            </>
          )}
          {/* <li><button onClick={toggleDarkMode} className="text-white hover:text-gray-200">Toggle Dark Mode</button></li> */}
        </ul>
      </nav>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
            <p className="text-black dark:text-white">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">No</button>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
