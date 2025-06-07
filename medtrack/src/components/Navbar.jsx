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
<header className="flex justify-between items-center px-8 py-4 shadow-lg backdrop-blur-md bg-white/10 text-white">
  <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white flex items-center gap-2">
    💊 MedTrack
  </h1>

  <nav className="flex gap-8 items-center text-sm md:text-base font-medium">
    <Link to="/" className="hover:text-green-300 transition">Home</Link>
    <Link to="/about" className="hover:text-green-300 transition">About</Link>
    <Link to="/contact" className="hover:text-green-300 transition">Contact</Link>

    {!token ? (
      <>
        <Link
          to="/login"
          className="px-4 py-1 rounded bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-1 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition"
        >
          Signup
        </Link>
      </>
    ) : (
      <>
        <Link to="/dashboard" className="hover:text-green-300 transition">Dashboard</Link>
        <Link to="/add" className="hover:text-green-300 transition">Add Medicine</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </>
    )}
  </nav>
</header>

  );
};

export default Navbar;
