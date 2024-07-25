// src/components/ProfilePage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import kenzoProfile2 from '../assets/kenzoProfile2.jpeg';
import kohjiProfile from '../assets/kohjiProfile.jpeg';
// Example profile data; replace with actual data fetching logic
const profiles = {
  kenzo: {
    name: 'Mackenzo Kirchhoff',
    role: 'The best Kuya ever',
    imageUrl: kenzoProfile2,
    instagramUrl: '#',
    githubUrl: '#',
  },
  kohji: {
    name: 'Kohji Kirchhoff',
    role: 'The best little brother ever',
    imageUrl: kohjiProfile,
    instagramUrl: '#',
    githubUrl: '#',
  },
};

const ProfilePage = () => {
  const { username } = useParams();
  const profile = profiles[username];

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <img
            alt={profile.name}
            src={profile.imageUrl}
            className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-gray-800 md:h-56 md:w-56 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">{profile.name}</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
