import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; // Check if user is logged in

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');  // Remove login status
    sessionStorage.removeItem('userId');      // Remove user ID
    navigate('/');  // Optionally navigate to homepage or login page
    window.location.reload();  // Reload to apply changes
  };

  return (
    <nav className="font-sans bg-[#0d1117] text-white w-full h-12 fixed top-0 left-0 flex items-center px-4">
      <div className="logo flex items-center">
        <Link to="/" className="px-4 py-2 capitalize rounded-lg transition-all duration-300">
          <img src="https://cdn-icons-png.flaticon.com/256/901/901787.png" alt="Logo" className="w-8 h-8 object-cover rounded-full mr-2" />
        </Link>
      </div>
      <div className="flex-grow">
        <Link to="/history" className="px-4 py-2 capitalize hover:bg-teal-300 hover:text-white rounded-lg transition-all duration-300">History</Link>
        <Link to="/search" className="px-4 py-2 capitalize hover:bg-teal-300 hover:text-white rounded-lg transition-all duration-300">Search</Link>
        <Link to="/my-data" className="px-4 py-2 capitalize hover:bg-teal-300 hover:text-white rounded-lg transition-all duration-300">My Data</Link>
      </div>
      {isLoggedIn ? (
        <Button onClick={handleLogout} variant="destructive" className="mx-4">
          Logout
        </Button>
      ) : (
        <Button>
          <Link to="/login">Sign In</Link>
        </Button>
      )}
    </nav>
  );
};

export default NavBar;