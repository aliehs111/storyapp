// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Navbar from './components/Navbar';
import AllVideos from './components/AllVideos';
import './styles.css'; // Import styles

function App() {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/videos" element={<AllVideos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
