// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import KenzoImage from "../assets/KENZO.jpeg"; // Ensure the path and extension are correct
import KohjiImage from "../assets/KOHJI.jpeg"; // Ensure the path and extension are correct

const Home = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white py-34 sm:py-20">
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10 bg-white dark:bg-gray-900 lg:max-w-4xl lg:mx-auto text-center py-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Welcome to StoryApp Beta for Kenzo and Kohji!
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
              From videos you already have created on your device, you can read
              them a book or just tell them a story about your life, about your
              day or any topic you would like to share with them! If you have
              just been invited to their story app, please register and upload
              your first video! If you have already registered, please sign in
              anytime and as many times as you like and share a story or a
              thought with them.
            </p>
            <p className="mt-4 text-lg leading-4 text-pink-400 !text-pink-700 dark:text-pink-700 !dark:text-pink-700 italic">
  Thank you for testing this app and I hope we will all have fun with this!  There will be bugs and things that need improvement.  Any and all feedback is greatly appreciated! Please email questions, comments, ideas for new features to&nbsp;
  <a href="mailto:smcgov11.11@gmail.com" className="underline">
    smcgov11.11@gmail.com
  </a>.
</p>


            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={KenzoImage}
                  alt="Story time with Kenzo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={KohjiImage}
                  alt="Reading together with Kohji"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/videos"
                className="text-indigo-500 hover:text-indigo-400"
              >
                View All Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
