import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Illustration */}
        <div className="md:w-1/2 bg-green-100 p-10 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4215/4215763.png"
            alt="Login medicine"
            className="w-64"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
           <input
  type="email"
  placeholder="Email"
  className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
            <input
  type="password"
  placeholder="Password"
  className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don’t have an account?{' '}
            <span
              className="text-green-600 hover:underline cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
