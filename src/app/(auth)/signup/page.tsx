'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-20 rounded-3xl shadow-2xl max-w-2xl w-full relative"
      >
        <Link href="/" className="absolute top-4 left-4 text-blue-700 hover:text-indigo-900 transition text-lg">
          <FaHome className="inline mr-2" /> Home
        </Link>
        <h2 className="text-5xl font-extrabold text-blue-700 text-center mb-10">Join Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">First Name</label>
              <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100">
                <FaUser className="text-gray-500" />
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  placeholder="John" 
                  className="outline-none bg-transparent w-full pl-2"
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">Last Name</label>
              <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100">
                <FaUser className="text-gray-500" />
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Doe" 
                  className="outline-none bg-transparent w-full pl-2"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100">
              <FaEnvelope className="text-gray-500" />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="johndoe@example.com" 
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
            Sign Up
          </motion.button>
        </form>
        <p className="text-gray-600 text-center mt-6 text-lg">Already have an account? <Link href="/login" className="text-indigo-700 font-bold hover:underline">Login</Link></p>
      </motion.div>
    </div>
  );
}