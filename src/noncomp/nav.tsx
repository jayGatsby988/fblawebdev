'use client'
import { motion } from "framer-motion";
import Link from "next/link";

const NavItem = ({ href, children }) => (
  <li>
    <Link href={href} className="text-gray-700 hover:text-blue-700 transition-colors">
      {children}
    </Link>
  </li>
);

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-blue-700">CareerCollab</h1>
        <ul className="flex text-2xl space-x-6">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/jobs">Job Listings</NavItem>
          <NavItem href="/submit">Post a Job</NavItem>
          <NavItem href="/apply">Apply Now</NavItem>
        </ul>
      </div>
    </motion.nav>
  );
}
