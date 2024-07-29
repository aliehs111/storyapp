import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage after login
      console.log("Token used for upload:", token); // Add this line for debugging
      const response = await axios.post(
        "http://localhost:3001/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Video uploaded successfully", response.data);
      setSuccess("Video uploaded successfully");
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error uploading video:", error);
      setError(
        `Failed to upload video: ${
          error.response?.data?.details || error.message
        }`
      );
      setSuccess(null); // Clear any previous success message
      // Log the full error response for debugging
      console.log("Full error response:", error.response);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white flex min-h-full flex-1 flex-col justify-center px-4 py-6 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Upload Video
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Video
            </label>
            <div className="mt-2">
              <input
                id="video"
                name="video"
                type="file"
                onChange={(e) => setVideo(e.target.files[0])}
                required
                className="block w-full text-white"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
