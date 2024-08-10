// src/components/UserSearchDropdown.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const UserSearchDropdown = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedUsers = response.data.sort((a, b) => a.username.localeCompare(b.username));
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers =
    query === ''
      ? users
      : users.filter((user) => {
          return user.username.toLowerCase().includes(query.toLowerCase());
        });

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Combobox as="div" value={selectedUser} onChange={handleUserSelect}>
        <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Find a Storyteller</Label>
        <div className="relative mt-2">
          <ComboboxInput
            className="w-full rounded-md border-0 bg-white dark:bg-gray-800 py-1.5 pl-3 pr-12 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(user) => user?.username}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          {filteredUsers.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredUsers.map((user) => (
                <ComboboxOption
                  key={user.id}
                  value={user}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-white data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <div className="flex items-center">
                    <img
                      src={user.profile_picture || 'https://via.placeholder.com/150'}
                      alt=""
                      className="h-6 w-6 flex-shrink-0 rounded-full"
                    />
                    <span className="ml-3 truncate group-data-[selected]:font-semibold">{user.username}</span>
                  </div>

                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default UserSearchDropdown;
