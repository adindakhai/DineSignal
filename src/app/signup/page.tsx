'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, User } from 'lucide-react';

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupData.name || !signupData.email || !signupData.password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User registered successfully:", data);

        const loginResult = await signIn("credentials", {
          redirect: false,
          email: signupData.email,
          password: signupData.password,
        });

        if (!loginResult?.error) {
          console.log("User logged in successfully");
          window.location.href = '/home';
        } else {
          console.error("Login failed:", loginResult.error);
          setError("Failed to log in. Please try manually.");
          router.push("/auth");
        }
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to create account.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#290102] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#F2E8D0] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto">
          <Image
            src="/images/resto1.jpg"
            alt="Restaurant"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#290102]/80 to-transparent flex flex-col justify-end p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[#F2E8D0] mb-2">Join DineSignal</h2>
              <p className="text-[#CDC69A]">Discover your next favorite dining experience</p>
            </motion.div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="flex items-center mb-8">
            {/* <ChefHat className="h-8 w-8 text-[#290102] mr-2" /> */}
            <span className="text-2xl font-bold text-[#290102]">DineSignal</span>
          </div>
          <h1 className="text-3xl font-bold text-[#290102] mb-6">Create Your Account</h1>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#442C2E]" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full p-3 pl-10 border-2 border-[#CDC69A] rounded-lg bg-[#F2E8D0] placeholder-[#442C2E] text-[#290102] focus:outline-none focus:border-[#290102] transition duration-300"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#442C2E]" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="w-full p-3 pl-10 border-2 border-[#CDC69A] rounded-lg bg-[#F2E8D0] placeholder-[#442C2E] text-[#290102] focus:outline-none focus:border-[#290102] transition duration-300"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#442C2E]" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="w-full p-3 pl-10 border-2 border-[#CDC69A] rounded-lg bg-[#F2E8D0] placeholder-[#442C2E] text-[#290102] focus:outline-none focus:border-[#290102] transition duration-300"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-[#290102] to-[#442C2E] text-[#ffebbc] rounded-lg font-semibold hover:from-[#442C2E] hover:to-[#290102] transition duration-300 shadow-lg"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="mt-6 text-sm text-[#442C2E] text-center">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth")}
              className="text-[#290102] font-bold cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

