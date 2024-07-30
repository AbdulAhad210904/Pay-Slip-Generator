"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch environment variables
    const adminUser = process.env.ADMIN_USER || "Admin";
    const adminPass = process.env.ADMIN_PASS || "Admin123";
 
    if (data.username === adminUser && data.password === adminPass) {
      console.log("Logged in successfully");
      localStorage.setItem("isAuthenticated", "true");
        router.push("/pay-slip-generator");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
