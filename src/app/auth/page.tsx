"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      localStorage.setItem("user", JSON.stringify({ email: loginData.email }));
      router.push("/home");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#290102] via-[#293454] to-[#CDC69A] flex">
      {/* Left Image Section */}
      <div className="w-1/2 relative">
        <img
          src="/images/resto1.jpg"
          alt="Restaurant"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center w-1/2 bg-white p-12">
        <header className="flex justify-between items-center mb-10">
          <nav className="flex space-x-6">
            <a href="#" className="text-[#290102] hover:text-[#CDC69A]">
              Home
            </a>
            <a href="#" className="text-[#290102] hover:text-[#CDC69A]">
              Catalogue
            </a>
            <a href="#" className="text-[#290102] hover:text-[#CDC69A]">
              About Us
            </a>
          </nav>
          <button
            onClick={() => router.push("/profile")}
            className="text-[#290102] hover:text-[#CDC69A]"
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

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#290102] placeholder-[#442C2E] text-[#290102]"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#290102] placeholder-[#442C2E] text-[#290102]"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#442C2E]">
              👁
            </span>
          </div>
          <button className="text-sm text-[#293454]">Forgot your password?</button>

          <button
            type="submit"
            className="w-full py-3 bg-[#290102] text-[#D9D1BE] rounded-full font-semibold hover:bg-[#293454] transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center justify-center space-x-2">
          <span className="text-sm text-[#442C2E]">OR</span>
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 py-3 bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition">
            Google
          </button>
          <button className="flex-1 py-3 bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition">
            Facebook
          </button>
          <button className="flex-1 py-3 bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition">
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
