import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/users/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Profile not found');
      }
    };

    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/videos/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideos(response.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Videos not found');
      }
    };

    fetchProfile();
    fetchVideos();
  }, [id]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  if (error) {
    return <div className="text-center text-white">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{profile.username}</h2>
          <img
            alt={profile.username}
            src={profile.profile_picture || 'https://via.placeholder.com/150'}
            className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-gray-800 md:h-56 md:w-56 mx-auto mt-6"
          />
          <div className="mt-6 text-lg leading-8 text-gray-400">
            {profile.answer_one && (
              <p>{profile.username} likes {profile.answer_one}</p>
            )}
            {profile.answer_two && (
              <p>And is most happy when {profile.answer_two}</p>
            )}
            {profile.answer_three && (
              <p>For {profile.username}, stories are {profile.answer_three}</p>
            )}
            {profile.answer_four && (
              <p>And some favorite books are {profile.answer_four}</p>
            )}
            {profile.answer_five && (
              <p>In {profile.username}'s opinion the world is {profile.answer_five}</p>
            )}
            {profile.answer_six && (
              <p>And favorite foods are {profile.answer_six}</p>
            )}
          </div>
        </div>
        <div className="mt-10 mx-auto max-w-2xl">
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {videos.length > 0 ? (
              videos.map(video => (
                <div
                  key={video.id}
                  className="bg-gray-800 p-4 rounded-lg cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <img
                    alt={video.title}
                    src={video.thumbnail_path || 'https://via.placeholder.com/150'}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h4 className="mt-2 text-lg font-semibold text-white">{video.title}</h4>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-400">No videos found</p>
            )}
          </div>
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <button className="text-white" onClick={closeVideoModal}>Close</button>
            <video controls className="mt-4 w-full h-auto">
              <source src={selectedVideo.file_path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;


