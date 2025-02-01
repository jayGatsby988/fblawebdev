"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser, FaHome, FaUserTie } from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/authcontext";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Student",
  });
  const [error, setError] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("redirect");
  const { user } = useAuth();

  if (user) {
    redirect(search ? "/" + search : "/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveAndStoreUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);

      // Save user data to Firestore
      await setDoc(userRef, {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        uid: user.uid,
      });

      // Retrieve user data from Firestore and store it in localStorage
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userInfo = {
          email: user.email,
          uid: user.uid,
          role: userData.role,
        };
        localStorage.setItem("userData", JSON.stringify(userInfo));
        console.log(JSON.stringify(userInfo));
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error saving or retrieving user data: ", error);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await saveAndStoreUser(userCredential.user);
      redirect("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await saveAndStoreUser(userCredential.user);
      redirect(search ? "/" + search : "/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full relative"
      >
        <Link
          href="/"
          className="absolute top-4 left-4 text-blue-700 hover:text-indigo-900 transition text-lg"
        >
          <FaHome className="inline mr-2" /> Home
        </Link>
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
          Sign Up
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="outline-none bg-transparent w-full pl-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
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
            <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
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
          <div>
            <label className="text-gray-700 font-medium">Role</label>
            <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-100">
              <FaUserTie className="text-gray-500" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="outline-none bg-transparent w-full pl-2"
              >
                <option value="Student">Student</option>
                <option value="Employer">Employer</option>
                <option value="Counselor">Counselor</option>
              </select>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-cyan-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Or</p>
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center bg-white border border-gray-300 p-3 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition mt-2"
          >
            Continue with Google
          </button>
        </div>
        <p className="text-gray-600 text-center mt-4 text-md">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-700 font-bold hover:underline"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
