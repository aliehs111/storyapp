import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';
import KenzoImage from '../assets/KENZO.jpeg'; // Ensure the path and extension are correct
import KohjiImage from '../assets/KOHJI.jpeg'; // Ensure the path and extension are correct

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch videos from the backend
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos'); // Update this URL based on your backend setup
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
    <div className="dark:bg-gray-900 dark:text-white py-24 sm:py-20">
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10 bg-white dark:bg-gray-900 lg:max-w-4xl lg:mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Welcome to StoryApp for Kenzo and Kohji!
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
              You can read them a book or just tell them a story about your life, about your day or any topic you would like to share with them! They will get an alert on their end once you post your video! If you have just been invited to their story app, please register and upload your first video! If you have already registered, please sign in anytime and as many times as you like and share a story or a thought with them.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img src={KenzoImage} alt="Story time with Kenzo" className="w-full h-full object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img src={KohjiImage} alt="Reading together with Kohji" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {videos.map((video) => (
          <article key={video.id} className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt={video.title}
                src={video.thumbnailUrl}
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover cursor-pointer"
                onClick={() => handleVideoClick(video)}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime={video.datetime} className="text-gray-500 dark:text-gray-400">
                  {video.date}
                </time>
                <a
                  href={video.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {video.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600">
                  <a href={video.href}>
                    <span className="absolute inset-0" />
                    {video.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{video.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt={video.author.name} src={video.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-100" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    <a href={video.author.href}>
                      <span className="absolute inset-0" />
                      {video.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{video.author.role}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <button className="text-white" onClick={closeVideoModal}>Close</button>
            <video controls className="mt-4 w-full h-auto">
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
