'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock } from 'lucide-react';

const AuthPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        setTimeout(() => {
          router.push("/home");
        }, 500);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again.");
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
              <h2 className="text-3xl font-bold text-[#F2E8D0] mb-2">Welcome Back!</h2>
              <p className="text-[#CDC69A]">Log in to access your account</p>
            </motion.div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#290102] mb-6">Log In to Your Account</h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#442C2E]" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full p-3 pl-10 border-2 border-[#CDC69A] rounded-lg bg-[#F2E8D0] placeholder-[#442C2E] text-[#290102] focus:outline-none focus:border-[#290102] transition duration-300"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#442C2E]" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-3 pl-10 border-2 border-[#CDC69A] rounded-lg bg-[#F2E8D0] placeholder-[#442C2E] text-[#290102] focus:outline-none focus:border-[#290102] transition duration-300"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-[#290102] to-[#442C2E] text-[#ffebbc] rounded-lg font-semibold hover:from-[#442C2E] hover:to-[#290102] transition duration-300 shadow-lg"
            >
              Log In
            </motion.button>
          </form>

          <p className="mt-6 text-sm text-[#442C2E] text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-[#290102] font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
