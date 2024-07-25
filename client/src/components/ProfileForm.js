import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProfileForm = () => {
  const { token, userId } = useContext(AuthContext); // Access token and userId from context
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profile_picture: '',
    artwork_picture: '',
    answer_one: '',
    answer_two: '',
    answer_three: '',
    answer_four: '',
    answer_five: '',
    answer_six: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setProfile({ ...profile, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }

    try {
      console.log(`Sending update request for userId: ${userId}`); // Log userId for debugging
      console.log(`Sending token: ${token}`); // Log token for debugging
      const response = await axios.put(`http://localhost:3001/api/users/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
      } else {
        setError('Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred during profile update.');
    }
  };


  return (
    <div className="profile-form-page bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">Create or Update Profile</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6">Username</label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              value={profile.username}
              onChange={handleChange}
              required
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              required
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="profile_picture" className="block text-sm font-medium leading-6">Profile Picture</label>
          <div className="mt-2">
            <input
              id="profile_picture"
              name="profile_picture"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="artwork_picture" className="block text-sm font-medium leading-6">Artwork Picture</label>
          <div className="mt-2">
            <input
              id="artwork_picture"
              name="artwork_picture"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer_one" className="block text-sm font-medium leading-6">What are some things you like to do?</label>
          <div className="mt-2">
            <input
              id="answer_one"
              name="answer_one"
              type="text"
              value={profile.answer_one}
              onChange={handleChange}
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer_two" className="block text-sm font-medium leading-6">What makes you happy?</label>
          <div className="mt-2">
            <input
              id="answer_two"
              name="answer_two"
              type="text"
              value={profile.answer_two}
              onChange={handleChange}
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer_three" className="block text-sm font-medium leading-6">What do you like about people's stories?</label>
          <div className="mt-2">
            <input
              id="answer_three"
              name="answer_three"
              type="text"
              value={profile.answer_three}
              onChange={handleChange}
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer_four" className="block text-sm font-medium leading-6">What are your favorite Books?</label>
          <div className="mt-2">
            <input
              id="answer_four"
              name="answer_four"
              type="text"
              value={profile.answer_four}
              onChange={handleChange}
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer_five" className="block text-sm font-medium leading-6">How Big is the World?</label>
          <div className="mt-2">
            <input
              id="answer_five"
              name="answer_five"
              type="text"
              value={profile.answer_five}
              onChange={handleChange}
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="answer_six" className="block text-sm font-medium leading-6">What is your favorite food?</label>
          <div className="mt-2">
            <input
              id="answer_six"
              name="answer_six"
              type="text"
              value={profile.answer_six}
              onChange={handleChange}
              className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
