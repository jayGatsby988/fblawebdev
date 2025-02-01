"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/app/context/authcontext";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(); // Firestore instance
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("redirect");
  const { user } = useAuth();

  if (user) {
    if (search) {
      redirect("/" + search || "");
    } else {
      redirect("/");
    }
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to store user data in localStorage
  const storeUserDataInLocalStorage = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userInfo = {
          email: user.email,
          uid: user.uid,
          role: userData.role, // Retrieve the role from Firestore
        };
        localStorage.setItem("userData", JSON.stringify(userInfo));
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
    }
  };

  // Email & Password Sign In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await storeUserDataInLocalStorage(userCredential.user); // Store user data in localStorage
      if (search) {
        redirect("/" + search || "");
      } else {
        redirect("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setError(""); // Reset error
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await storeUserDataInLocalStorage(userCredential.user); // Store user data in localStorage
      redirect("/" + search || "");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-20 rounded-3xl shadow-2xl max-w-lg w-full relative"
      >
        <Link
          href="/"
          className="absolute top-4 left-4 text-blue-700 hover:text-indigo-900 transition text-lg"
        >
          <FaHome className="inline mr-2" /> Home
        </Link>
        <h2 className="text-5xl font-extrabold text-blue-700 text-center mb-6">
          Log In
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleEmailSignIn} className="space-y-6">
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
            Log In
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">Or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white border border-gray-300 p-3 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition mt-2"
          >
            <img
              src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/google-color.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>

        <p className="text-gray-600 text-center mt-6 text-lg">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-700 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
