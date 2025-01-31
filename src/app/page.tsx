"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./context/authcontext";
import Login from "./login/page";
// Fixed import path

const jobListings = [
  {
    title: "Software Engineer Intern",
    company: "Tech Corp",
    location: "New York, NY",
    type: "Full-time",
    salary: "$6k - $8k/mo",
    posted: "2d ago",
    category: "Engineering",
  },
  {
    title: "Marketing Assistant",
    company: "Ad Agency",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$4k - $5k/mo",
    posted: "1d ago",
    category: "Marketing",
  },
  {
    title: "Senior UX Designer",
    company: "Creative Studio",
    location: "Remote",
    type: "Remote",
    salary: "$90k - $120k",
    posted: "3d ago",
    category: "Design",
  },
];

export default function Home() {
  const { user, logOut } = useAuth();
  if (!user) {
    return <Login />;
  }
  return (
    <div className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="h-screen w-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 pt-24 pb-12 max-w-7xl mx-auto snap-start">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center lg:text-left space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Find Your Next <span className="text-blue-600">Career</span>{" "}
              Opportunity
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-4">
              Join thousands of companies and candidates building the future
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton href="/signup" text="Get Started" primary />
              <CTAButton href="/jobs" text="Browse Jobs" outline />
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
              <p className="text-gray-600">
                <span className="font-semibold">1k+</span> successful hires this
                month
              </p>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 lg:mt-0 lg:ml-12"
          >
            <div className="relative w-[600px] h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="/pexels-photo-4559715.webp"
                alt="Career opportunities"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="min-h-screen w-screen flex flex-col justify-center items-center px-6 py-16 snap-start bg-white">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Job Opportunities
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover roles that match your skills and ambitions
            </p>
          </div>

          {/* Search and Filters */}

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 font-medium mt-1">
                      {job.company}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {job.posted}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {job.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-gray-600">{job.location}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {job.salary}
                    </p>
                  </div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                  >
                    Apply Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/jobs"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              View All Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CareerConnect</h3>
            <p className="text-gray-400 text-sm">
              Connecting talent with opportunity worldwide
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2">
              <FooterLink href="/jobs" text="Browse Jobs" />
              <FooterLink href="/profile" text="My Profile" />
              <FooterLink href="/applications" text="My Applications" />
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <FooterLink href="/post-job" text="Post a Job" />
              <FooterLink href="/pricing" text="Pricing" />
              <FooterLink href="/employer-dashboard" text="Dashboard" />
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/contact" text="Contact" />
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CareerConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function CTAButton({ href, text, primary, outline }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      className={`px-8 py-4 text-lg rounded-xl font-medium transition-all ${
        primary
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
          : outline
          ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          : "text-gray-900 hover:bg-gray-100"
      }`}
    >
      {text}
    </motion.a>
  );
}

function FooterLink({ href, text }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-white text-sm transition"
      >
        {text}
      </Link>
    </li>
  );
}
