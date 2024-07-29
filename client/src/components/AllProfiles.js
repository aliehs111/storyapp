import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const AllProfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Storytellers</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Meet the storytellers who are sharing their amazing stories!
          </p>
        </div>
        <div className="flex justify-center mt-20">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <li key={user.id} className="rounded-2xl bg-gray-800 px-8 py-10">
                <Link to={`/profile/${user.id}`} className="block">
                  <div className="flex justify-center">
                    <img
                      alt={user.username}
                      src={user.profile_picture || 'https://via.placeholder.com/150'}
                      className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-gray-800 md:h-56 md:w-56"
                    />
                  </div>
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{user.username}</h3>
                  
                </Link>
                <ul role="list" className="mt-6 flex justify-center gap-x-6">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-gray-300">
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-gray-300">
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

export default AllProfiles;
