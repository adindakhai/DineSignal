"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const AuthPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields!");
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
        // Tambahkan delay kecil sebelum redirect
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
    <div className="min-h-screen bg-gradient-to-tr from-[#290102] via-[#442C2E] to-[#F2E8D0] flex">
      {/* Left Image Section */}
      <div className="w-1/2 relative">
        <img
          src="/images/resto1.jpg"
          alt="Restaurant"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center w-1/2 bg-[#F2E8D0] p-12 shadow-lg">
        <header className="flex justify-between items-center mb-10">
          <nav className="flex space-x-6">
            <a href="/" className="text-[#290102] hover:text-[#CDC69A] transition">
              Home
            </a>
            <a href="/catalogue" className="text-[#290102] hover:text-[#CDC69A] transition">
              Catalogue
            </a>
            <a href="/about" className="text-[#290102] hover:text-[#CDC69A] transition">
              About Us
            </a>
          </nav>
          <button
            onClick={() => router.push("/profile")}
            className="text-[#290102] hover:text-[#CDC69A] transition"
          >
            Profile
          </button>
        </header>

        <h1 className="text-4xl font-bold text-[#290102] mb-4">Welcome Back!</h1>
        <p className="text-sm text-[#442C2E] mb-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-[#293454] font-semibold cursor-pointer"
          >
            Sign Up
          </span>
        </p>

        {error && (
          <div className="mb-4 text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#442C2E] placeholder-[#442C2E] text-[#290102]"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#442C2E] placeholder-[#442C2E] text-[#290102]"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#442C2E]">
              👁
            </span>
          </div>
          <button
            type="button"
            onClick={() => alert("Feature belum tersedia!")}
            className="text-sm text-[#293454] hover:text-[#290102] transition"
          >
            Forgot your password?
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-[#290102] text-[#F2E8D0] rounded-full font-semibold hover:bg-[#442C2E] transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
