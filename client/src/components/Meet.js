import React from 'react';
import kenzoProfile2 from '../assets/kenzoProfile2.jpeg';
import kohjiProfile from '../assets/kohjiProfile.jpeg';
import { FaInstagram, FaGithub } from 'react-icons/fa'; // Import Instagram and GitHub icons

const people = [
  {
    name: 'Mackenzo Kirchhoff',
    role: 'The best Kuya ever',
    imageUrl: kenzoProfile2,
    instagramUrl: '#', // Add Instagram URL
    githubUrl: '#', // Add GitHub URL
  },
  {
    name: 'Kohji Kirchhoff',
    role: 'The best little brother ever',
    imageUrl: kohjiProfile,
    instagramUrl: '#', // Add Instagram URL
    githubUrl: '#', // Add GitHub URL
  },
  // More people...
];

const Meet = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Kenzo and Kohji</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Profiles of the two awesome brothers who want to hear your stories!
          </p>
        </div>
        <div className="flex justify-center mt-20">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {people.map((person) => (
              <li key={person.name} className="rounded-2xl bg-gray-800 px-8 py-10">
                <div className="flex justify-center">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-gray-800 md:h-56 md:w-56"
                  />
                </div>
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{person.name}</h3>
                <p className="text-sm leading-6 text-gray-400">{person.role}</p>
                <ul role="list" className="mt-6 flex justify-center gap-x-6">
                  <li>
                    <a href={person.instagramUrl} className="text-gray-400 hover:text-gray-300">
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  </li>
                  <li>
                    <a href={person.githubUrl} className="text-gray-400 hover:text-gray-300">
                      <span className="sr-only">GitHub</span>
                      <FaGithub className="h-5 w-5" />
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Meet;
