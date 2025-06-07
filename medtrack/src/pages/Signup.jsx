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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Illustration */}
        <div className="md:w-1/2 bg-blue-100 p-10 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
            alt="medicine icon"
            className="w-64"
          />
        </div>

        {/* Signup Form */}
        <div className="md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
            Create Your Account
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
