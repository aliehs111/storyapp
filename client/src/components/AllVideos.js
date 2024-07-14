import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch videos from the backend
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos/upload'); // Update this URL based on your backend setup
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
            Enjoy a variety of stories and experiences shared by our community.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              onClick={() => handleVideoClick(video)}
            >
              <img alt={video.title} src={video.thumbnail_path} className="absolute inset-0 -z-10 h-full w-full object-cover cursor-pointer" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={video.createdAt} className="mr-8">
                  {new Date(video.createdAt).toLocaleDateString()}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img alt={video.user.username} src={video.user.profile_picture || 'default-profile-pic-url'} className="h-6 w-6 flex-none rounded-full bg-white/10" />
                    {video.user.username}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  {video.title}
                </a>
              </h3>
            </article>
          ))}
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
