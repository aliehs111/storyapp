import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token used for fetching videos:", token); // Log the token
        const response = await axios.get('http://localhost:3001/api/videos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const fetchDataSize = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/videos/data/size', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalSize(response.data.totalSize);
      } catch (error) {
        console.error('Error fetching data size:', error);
      }
    };

    fetchVideos();
    fetchDataSize();
  }, []);

  const formatSize = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const handleDeleteClick = (e, video) => {
    e.stopPropagation();
    setVideoToDelete(video);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token used for deleting video:", token); // Log the token
      await axios.delete(`http://localhost:3001/api/videos/${videoToDelete.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setVideos(videos.filter(video => video.id !== videoToDelete.id));
      setShowDeleteModal(false);
      setVideoToDelete(null);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">All Videos</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Enjoy a variety of stories and experiences shared by our community.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Total Data Size: {formatSize(totalSize)}
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
                    <img alt={video.User?.username} src={video.User?.profile_picture || 'default-profile-pic-url'} className="h-6 w-6 flex-none rounded-full bg-white/10" />
                    {video.User?.username}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  {video.title}
                </a>
              </h3>
              <div className="mt-2 flex justify-between">
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    onClick={(e) => handleDeleteClick(e, video)}
                  >
                    Delete
                  </button>
                  <a
                    href={video.file_path}
                    download
                    className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    Download
                  </a>
                </span>
              </div>
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
        {showDeleteModal && (
          <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Video
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this video? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={confirmDelete}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default AllVideos;



