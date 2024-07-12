// client/src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css'; // Ensure this import is correct and points to your styles

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Story App for Kenzo and Kohji!</h1>
      <h2 className="text-1xl font-bold mb-2">A place for sharing stories with Kenzo and Kohji!</h2>
      <h2 className="text-1xl font-bold mb-2">You can read them a book or just tell them a story about your life, about your day or any topic you'd like to share with them.</h2>
      <h3 className="text-l font-bold mb-1">If you have just been invited to their story app, please register and upload your first video! If you've already registered, please sign in anytime and as many times as you like and share a story or a thought with them!</h3>

      <div className="scene grid gap-4">
        {videos.map((video) => (
          <div key={video.id} className="shelf border p-4 rounded-lg shadow-lg">
            <div className="face front flex space-x-4">
              <a href="#" className="photocard" onClick={(e) => e.preventDefault()}>
                <img src={video.thumbnail_path} alt={video.title} className="rounded-lg shadow-md" />
              </a>
              <div className="video-details">
                <p className="font-bold">{video.title}</p>
                <p>{video.description}</p>
                <p>Uploaded by: {video.User.username}</p>
                {video.User.profile_picture && <img src={video.User.profile_picture} alt="Profile" className="rounded-full w-16 h-16" />}
                <p>Date: {new Date(video.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
