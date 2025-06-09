import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 flex items-center justify-center px-4 py-10"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col md:flex-row items-center max-w-7xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Left Section */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="md:w-1/2 p-10 md:p-16 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight tracking-tight">
            Stay Healthy <br />
            <span className="text-green-500">With MedTrack</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Your smart companion for medicine reminders. Get automatic alerts, track doses, and stay on top of your health.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/signup')}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="md:w-1/2 bg-blue-50 flex justify-center items-center p-6"
        >
          <img
            src="/image/hero-medtrack.avif"
            alt="Doctor with Patient"
            className="w-full max-w-md object-cover rounded-xl shadow-lg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
