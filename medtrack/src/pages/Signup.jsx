import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row max-w-3xl w-full overflow-hidden">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-gradient-to-tr from-teal-200 to-blue-300 flex items-center justify-center p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5065/5065857.png"
            alt="medicine icon"
            className="max-w-full max-h-64 object-contain"
          />
        </div>

        {/* Right Signup Form Section */}
        <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-indigo-700 text-center tracking-wide">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline cursor-pointer font-medium"
            >
              Login here
            </span>
          </p>

          <p className="mt-8 text-center text-sm text-gray-500 italic">
            Track your medicines and stay healthy with MedTrack!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
