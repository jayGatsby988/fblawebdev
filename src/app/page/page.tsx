"use client";
import Reactw from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const jobListings = [
  { title: "Software Engineer Intern", company: "Tech Corp", location: "New York, NY" },
  { title: "Marketing Assistant", company: "Ad Agency", location: "San Francisco, CA" },
  { title: "Graphic Designer", company: "Creative Studio", location: "Remote" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-700">Guidance Jobs</h1>
          <ul className="flex space-x-6">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/jobs">Job Listings</NavItem>
            <NavItem href="/submit">Post a Job</NavItem>
            <NavItem href="/apply">Apply Now</NavItem>
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 pt-28 pb-16 max-w-7xl mx-auto">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }} 
          className="max-w-lg text-center lg:text-left"
        >
          <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Discover Your <span className="text-blue-600">Dream Job</span> Today!
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Browse job opportunities from top employers and start your career journey with confidence.
          </p>
          <div className="mt-6 flex space-x-4 justify-center lg:justify-start">
            <CTAButton href="/jobs" text="Explore Jobs" />
            <CTAButton href="/submit" text="Post a Job" primary />
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }} 
          className="mt-8 lg:mt-0"
        >
          <Image 
            src="/job-posting.jpg" 
            alt="Job search illustration" 
            width={550} 
            height={400} 
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Job Listings Preview */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-semibold text-gray-800 text-center">Latest Job Openings</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {jobListings.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold text-blue-700">{job.title}</h4>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-sm text-gray-600 mt-2">{job.location}</p>
              <Link href="/apply" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
                Apply Now →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p className="text-sm">© {new Date().getFullYear()} Guidance Jobs. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* Navigation Item Component */
function NavItem({ href, children }: { href: string; children: string }) {
  return (
    <motion.li whileHover={{ scale: 1.1 }} className="transition">
      <Link href={href} className="text-gray-700 hover:text-blue-600 transition font-medium">
        {children}
      </Link>
    </motion.li>
  );
}

/* CTA Button Component */
function CTAButton({ href, text, primary }: { href: string; text: string; primary?: boolean }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      className={`px-6 py-3 text-lg rounded-lg font-semibold transition shadow-md ${
        primary ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-blue-600 text-blue-600 hover:bg-blue-100"
      }`}
    >
      {text}
    </motion.a>
  );
}
