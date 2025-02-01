/**
 * # Help Page Component
 * 
 * ## Overview
 * This component provides an interactive and user-friendly Help page with a modern blue-themed design.
 * It includes an FAQ section with expandable items, a contact section, and additional support resources.
 * 
 * ## Features:
 * - Responsive design with a professional blueish theme.
 * - Animated UI using Framer Motion for smooth transitions.
 * - Expandable FAQ sections with intuitive interactions.
 * - Contact section with multiple ways to reach support.
 * - Live chat simulation for instant assistance.
 * - Search functionality to quickly find help topics.
 * 
 * ## Dependencies:
 * - `framer-motion`: Used for smooth animations.
 * - `next/link`: Provides navigation.
 * - `react-icons/fa`: Supplies UI icons.
 * 
 * ## Author: 
 * - Implemented by the user.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaQuestionCircle, FaEnvelope, FaPhone, FaHome, FaSearch, FaCommentDots } from "react-icons/fa";

const faqs = [
  { question: "How do I reset my password?", answer: "You can reset your password from the login page by clicking on 'Forgot Password'." },
  { question: "How can I contact support?", answer: "You can reach us via email at support@example.com or call us at (123) 456-7890." },
  { question: "Where can I find the user guide?", answer: "The user guide is available in the Help section of your account dashboard." },
  { question: "How do I update my profile information?", answer: "You can update your profile in the settings section of your account." },
  { question: "What should I do if I find a bug?", answer: "Please report any bugs to our support team through the contact form or email." }
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFaqs = faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full relative"
      >
        <Link href="/" className="absolute top-4 left-4 text-blue-700 hover:text-indigo-900 transition text-lg">
          <FaHome className="inline mr-2" /> Home
        </Link>
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">Help & Support</h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-2">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-800"
              >
                {faq.question}
                <FaQuestionCircle className="text-blue-600" />
              </button>
              {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Contact Us</h3>
          <p className="text-gray-600">For further assistance, reach out to us:</p>
          <div className="mt-2 space-y-2">
            <p className="flex items-center justify-center gap-2 text-gray-700"><FaEnvelope /> support@example.com</p>
            <p className="flex items-center justify-center gap-2 text-gray-700"><FaPhone /> (123) 456-7890</p>
          </div>
        </div>

        {/* Live Chat Simulation */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Live Chat</h3>
          <p className="text-gray-600">Chat with our support team in real-time.</p>
          <button className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            <FaCommentDots /> Start Chat
          </button>
        </div>
      </motion.div>
    </div>
  );
}
