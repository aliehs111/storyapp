// client/src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);

    try {
      const response = await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Video uploaded successfully', response.data);
      // Handle successful upload (e.g., redirect, display message, etc.)
    } catch (error) {
      console.error('Error uploading video', error);
      // Handle upload error
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Video:</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
