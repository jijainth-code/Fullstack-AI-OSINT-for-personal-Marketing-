import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 h-full min-h-screen fixed left-0 top-0 flex flex-col justify-between py-4">
      <div>
        <div className="logo font-bold mb-6 pl-4"><img src="https://cdn-icons-png.flaticon.com/256/901/901787.png" alt="Logo" className="w-20 h-20 object-cover rounded-full" /></div>
        <div className="px-4">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/scrapper" className="block py-2">Scrapper</Link>
          <Link to="/testimonials" className="block py-2">Testimonials</Link>
          <Link to="/download" className="block py-2">Download</Link>
        </div>
      </div>
      <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
        Sign Up
      </Link>
    </nav>
  );
};

export default NavBar;