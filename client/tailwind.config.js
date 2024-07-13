// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' if you prefer to use the user's system preferences
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};


