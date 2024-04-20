import 'tailwindcss/tailwind.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 bg-opacity-75 text-white p-4 text-center absolute bottom-0 w-full">
      <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400" >© 2024 Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;