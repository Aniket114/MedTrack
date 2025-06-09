import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text flex items-center gap-2"
        >
          💊 MedTrack
        </Link>

        {/* Navigation */}
        <nav className="flex gap-4 md:gap-6 items-center text-sm md:text-base font-medium text-gray-800">
          <Link to="/" className="hover:text-green-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-600 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-green-600 transition">
            Contact
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded-lg bg-green-400 text-white font-semibold hover:bg-green-500 transition shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-green-600 transition">
                Dashboard
              </Link>
              <Link to="/add" className="hover:text-green-600 transition">
                Add Medicine
              </Link>
              <Link to="/disease-info" className="hover:text-green-600 transition">
                Disease Info
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
