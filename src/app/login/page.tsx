"use client";
import { useState } from "react";
import { useAuth } from "../context/authcontext";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("redirect");

  // Email and Password Sign In
  const handleEmailSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirect("/" + (search || ""));
    } catch (error:any) {
      console.error("Error signing in:", error.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error:any) {
      console.error("Google sign-in error:", error.message);
    }
    finally{
      
      redirect("/" + (search || ""));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Sign In
        </h1>
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white border border-gray-300 p-3 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition mt-2"
          >
            <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </div>
        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
