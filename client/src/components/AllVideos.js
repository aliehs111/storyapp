import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch videos from the backend
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage after login
        const response = await axios.get('http://localhost:3001/api/videos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched videos:', response.data); // Log fetched data
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">All Videos</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            All Story Videos for Kenzo and Kohji!
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {videos.map((video) => {
            console.log('Rendering video:', video);
            return (
              <div
                key={video.id}
                className="relative flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-800"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover cursor-pointer"
                    src={video.thumbnail_path}
                    alt={video.title}
                    onClick={() => handleVideoClick(video)}
                  />
                </div>
                <div className="flex-1 bg-gray-900 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {video.User?.username}
                    </p>
                    <a href="#" className="block mt-2">
                      <p className="text-xl font-semibold text-white">{video.title}</p>
                      <p className="mt-3 text-base text-gray-300">{video.description}</p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={video.user?.profile_picture || 'default-profile-pic-url'}
                        alt={video.user?.username}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{video.user?.username}</p>
                      <div className="flex space-x-1 text-sm text-gray-300">
                        <time dateTime={video.createdAt}>{new Date(video.createdAt).toLocaleDateString()}</time>
                        <span aria-hidden="true">&middot;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
    </div>
  );
};

export default AllVideos;

