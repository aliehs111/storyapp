import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Upload from './components/Upload';
import AllVideos from './components/AllVideos';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Meet from './components/Meet';
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component
import ProfileForm from './components/ProfileForm';

const App = () => {
  return (
    <Router>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/videos" element={<AllVideos />} />
            <Route path="/meet" element={<Meet />} />
            <Route path="/profile/:username" element={<ProfilePage />} /> {/* Add profile route */}
            <Route path="/profile" element={<ProfileForm />} /> {/* Add profile route*/}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
