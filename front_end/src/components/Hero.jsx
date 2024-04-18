// src/components/Hero.jsx
import React from 'react';
import 'tailwindcss/tailwind.css';

const Hero = () => {
  return (
    <div className="bg-gray-200 text-center p-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to Our Service</h1>
      <p className="text-xl">Get started with our solutions today.</p>
      <button className="mt-5 py-3 px-6 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
        Get Started
      </button>
    </div>
  );
};

export default Hero;