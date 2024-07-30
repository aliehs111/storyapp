// src/App.js
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
import AllProfiles from './components/AllProfiles';
import StoryTopics from './components/StoryTopics';
import Footer from './components/Footer'; // Import Footer component

const App = () => {
  return (
    <Router>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/upload" element={<Upload />} />
              <Route path="/videos" element={<AllVideos />} />
              <Route path="/meet" element={<Meet />} />
              <Route path="/profile/:id" element={<ProfilePage />} /> {/* Add profile route */}
              <Route path="/profile" element={<ProfileForm />} /> {/* Add profile route*/}
              <Route path="/storytellers" element={<AllProfiles />} /> 
              <Route path="/storytopics" element={<StoryTopics />} />
            </Route>
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
