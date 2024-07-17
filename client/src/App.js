import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Upload from './components/Upload';
import AllVideos from './components/AllVideos';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<ProtectedRoute />}>
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path="/videos" element={<ProtectedRoute />}>
          <Route path="/videos" element={<AllVideos />} />
        </Route>
      </Routes>
      </div>
    </Router>
  );
};

export default App;
