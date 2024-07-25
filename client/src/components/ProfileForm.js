import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const ProfileForm = () => {
  const { token, userId } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profile_picture: '',
    role: '',
    answer_one: '',
    answer_two: '',
    answer_three: '',
    answer_four: '',
    answer_five: '',
    answer_six: ''
  });
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
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;
        setProfile(data);
        setFormData({
          username: data.username || '',
          email: data.email || '',
          profile_picture: '',
          artwork_picture: '',
          answer_one: data.answer_one || '',
          answer_two: data.answer_two || '',
          answer_three: data.answer_three || '',
          answer_four: data.answer_four || '',
          answer_five: data.answer_five || '',
          answer_six: data.answer_six || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId, token]);

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
      const response = await axios.put(`http://localhost:3001/api/users/profile/${userId}`, updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
        const updatedProfile = response.data;
        setProfile(updatedProfile); // Update the profile state to reflect changes
        // Reset formData.profile_picture to ensure the form input is cleared
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

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <img
            alt={profile.username}
            src={profile.profile_picture}
            className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-gray-800 md:h-56 md:w-56 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">{profile.username}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">{profile.role}</p>
          <div className="mt-6 flex justify-center gap-x-6">
            <a href={profile.instagramUrl} className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href={profile.githubUrl} className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-10 text-left text-lg leading-8 text-gray-400 space-y-4">
            <p><strong>What are some things you like to do?</strong> {profile.answer_one}</p>
            <p><strong>What makes you happy?</strong> {profile.answer_two}</p>
            <p><strong>What do you like about people's stories?</strong> {profile.answer_three}</p>
            <p><strong>What are your favorite Books?</strong> {profile.answer_four}</p>
            <p><strong>How Big is the World?</strong> {profile.answer_five}</p>
            <p><strong>What is your favorite food?</strong> {profile.answer_six}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-24 sm:py-32">
        <h1 className="text-3xl font-bold">Create or Update Profile</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6">Username</label>
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
            <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
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
                value={formData.answer_one}
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
                value={formData.answer_two}
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
                value={formData.answer_three}
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
                value={formData.answer_four}
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
                value={formData.answer_five}
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

