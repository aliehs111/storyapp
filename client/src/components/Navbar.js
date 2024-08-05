import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import AuthContext from '../context/AuthContext';
import StoryApp from '../assets/StoryApp.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const logo = StoryApp

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className="bg-teal-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-20 w-20"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-white"
                  >
                    Home
                  </Link>
                  {!isAuthenticated && (
                    <>
                      <Link
                        to="/login"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Register
                      </Link>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <Link
                        to="/upload"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Upload
                      </Link>
                      <Link
                      to="/storytopics"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Story Topics
                      </Link>
                      <Link
                        to="/videos"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Videos
                      </Link>
                      <Link
                        to="/meet"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Kenzo & Kohji
                      </Link>
                      <Link
                        to="/profile"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/storytellers"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-700"
                      >
                        Storytellers
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated && (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon aria-hidden="true" className="h-6 w-6" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt=""
                            src={user?.profile_picture || 'https://via.placeholder.com/150'}
                            className="h-8 w-8 rounded-full"
                          />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              My Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-purple-700' : 'bg-pink-400',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </>
                )}
                {!isAuthenticated && (
                  <div className="relative ml-3">
                    <img
                      alt="Avatar"
                      src="https://via.placeholder.com/150"
                      className="h-8 w-8 rounded-full"
                    />
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 pb-3 pt-2">
    <Disclosure.Button
      as={Link}
      to="/"
      className="block border-l-4 border-indigo-500 bg-green-600 py-2 pl-3 pr-4 text-base font-medium text-white"
    >
      Home
    </Disclosure.Button>
    {!isAuthenticated && (
      <>
        <Disclosure.Button
          as={Link}
          to="/login"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Login
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/register"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Register
        </Disclosure.Button>
      </>
    )}
    {isAuthenticated && (
      <>
        <Disclosure.Button
          as={Link}
          to="/upload"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Upload
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/videos"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Videos
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/meet"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Kenzo & Kohji
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/profile"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          My Profile
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/storytellers"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Storytellers
        </Disclosure.Button>
        <Disclosure.Button
          as="button"
          onClick={handleLogout}
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Logout
        </Disclosure.Button>
      </>
    )}
  </div>
</Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
