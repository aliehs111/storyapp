import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const ProfileForm = () => {
  const { token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        profile_picture: '',
        artwork_picture: '',
        answer_one: user.answer_one || '',
        answer_two: user.answer_two || '',
        answer_three: user.answer_three || '',
        answer_four: user.answer_four || '',
        answer_five: user.answer_five || '',
        answer_six: user.answer_six || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const updateFormData = new FormData();
    for (const key in formData) {
      updateFormData.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/users/profile/${user.id}`, updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
        const updatedProfile = response.data;
        setFormData({
          ...formData,
          profile_picture: '',
          artwork_picture: ''
        });
      } else {
        setError('Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred during profile update.');
    }
  };

  if (!user) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <img
            alt={user.username}
            src={user.profile_picture || 'https://via.placeholder.com/150'}
            className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-gray-800 md:h-56 md:w-56 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">{user.username}</h2>
          <div className="mt-6 text-lg leading-8 text-gray-400">
            {user.answer_one && (
              <p>{user.username} likes {user.answer_one}</p>
            )}
            {user.answer_two && (
              <p>And is most happy when {user.answer_two}</p>
            )}
            {user.answer_three && (
              <p>For {user.username}, stories are {user.answer_three}</p>
            )}
            {user.answer_four && (
              <p>And some favorite books are {user.answer_four}</p>
            )}
            {user.answer_five && (
              <p>In {user.username}'s opinion the world is {user.answer_five}</p>
            )}
            {user.answer_six && (
              <p>And favorite foods are {user.answer_six}</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-24 sm:py-32">
        <h1 className="text-3xl font-bold text-white">Create or Update Profile</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">Username</label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="profile_picture" className="block text-sm font-medium leading-6 text-white">Profile Picture</label>
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
            <label htmlFor="artwork_picture" className="block text-sm font-medium leading-6 text-white">Artwork Picture</label>
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
            <label htmlFor="answer_one" className="block text-sm font-medium leading-6 text-white">What are some things you like to do?</label>
            <div className="mt-2">
              <input
                id="answer_one"
                name="answer_one"
                type="text"
                value={formData.answer_one}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="answer_two" className="block text-sm font-medium leading-6 text-white">What makes you happy?</label>
            <div className="mt-2">
              <input
                id="answer_two"
                name="answer_two"
                type="text"
                value={formData.answer_two}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="answer_three" className="block text-sm font-medium leading-6 text-white">What do you like about people's stories?</label>
            <div className="mt-2">
              <input
                id="answer_three"
                name="answer_three"
                type="text"
                value={formData.answer_three}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="answer_four" className="block text-sm font-medium leading-6 text-white">What are your favorite Books?</label>
            <div className="mt-2">
              <input
                id="answer_four"
                name="answer_four"
                type="text"
                value={formData.answer_four}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="answer_five" className="block text-sm font-medium leading-6 text-white">How Big is the World?</label>
            <div className="mt-2">
              <input
                id="answer_five"
                name="answer_five"
                type="text"
                value={formData.answer_five}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-white block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="answer_six" className="block text-sm font-medium leading-6 text-white">What is your favorite food?</label>
            <div className="mt-2">
              <input
                id="answer_six"
                name="answer_six"
                type="text"
                value={formData.answer_six}
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
    </div>
  );
};

export default ProfileForm;