// Example page component using BackButton
import React from 'react';
import BackButton from '../components/BackButton'; // Adjust the path as necessary

const SomePage = () => {
  return (
    <div className="relative"> {/* Ensure this container is not positioned absolutely */}
      <BackButton />
      {/* Rest of your page content */}
      <div className="mt-8">
        {/* Page content goes here */}
      </div>
    </div>
  );
};

export default SomePage;



