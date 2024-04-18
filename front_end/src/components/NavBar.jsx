// src/components/NavBar.jsx
import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo font-bold">LOGO</div>
      <div className="links">
        <Link to="/" className="px-4">Home</Link>
        <Link to="/features" className="px-4">Features</Link>
        <Link to="/testimonials" className="px-4">Testimonials</Link>
        <Link to="/download" className="px-4">Download</Link>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </nav>
  );
};

export default NavBar;