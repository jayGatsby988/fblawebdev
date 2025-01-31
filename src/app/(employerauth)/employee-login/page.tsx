'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-20 rounded-3xl shadow-2xl max-w-lg w-full relative"
      >
        <Link href="/" className="absolute top-4 left-4 text-blue-700 hover:text-indigo-900 transition text-lg">
          <FaHome className="inline mr-2" /> Home
        </Link>
        <h2 className="text-5xl font-extrabold text-blue-700 text-center mb-10">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 font-medium">Employer ID</label>
            <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100">
              <FaEnvelope className="text-gray-500" />
              <input 
                type="text" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter Your Employer ID" 
                className="outline-none bg-transparent w-full pl-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100">
              <FaLock className="text-gray-500" />
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="••••••••" 
                className="outline-none bg-transparent w-full pl-2"
                required
              />
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="w-full bg-cyan-900 text-white py-4 rounded-lg font-bold text-xl hover:bg-indigo-700 transition"
          >
            Log In
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}
