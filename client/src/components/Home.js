// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import KenzoImage from "../assets/KENZOCROPPED.jpeg"; // Ensure the path and extension are correct
import KohjiImage from "../assets/KOHJI.jpeg"; // Ensure the path and extension are correct

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800 dark:text-white">
      <div className="relative flex-grow">
        {/* Image background div */}
        <div className="absolute inset-0 grid grid-cols-2">
          <img
            src={KenzoImage}
            alt="Story time with Kenzo"
            className="object-cover w-full h-full"
          />
          <img
            src={KohjiImage}
            alt="Reading together with Kohji"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Overlay for content to ensure text is readable */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-start py-20 px-6 lg:px-8 bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70">
          <div className="lg:max-w-4xl lg:mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Welcome to StoryApp{" "}
              <span className="text-yellow-500 italic">Beta</span> for Kenzo and
              Kohji!
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="register"
                className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Register
              </a>
              <a
                href="learn"
                className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
