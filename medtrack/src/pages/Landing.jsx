import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

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
      className="h-screen bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center px-6 py-10 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col md:flex-row items-center max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90%]"
      >
        {/* Left Text Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="md:w-1/2 p-10 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
            Medical Reminders <br />
            <span className="text-green-500">Online for Everyone</span>
          </h1>
          <p className="text-gray-600 text-lg">
            MedTrack helps you stay on schedule with smart medicine alerts. Trusted, simple and free.
            Your health companion in your pocket.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="md:w-1/2 bg-blue-50 flex justify-center items-center p-6"
        >
          <img
            src="/image/img1.jpg"
            alt="medical illustration"
            className="w-full max-w-sm object-contain rounded-xl shadow-lg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
