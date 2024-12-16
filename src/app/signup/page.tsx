"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signupData.name && signupData.email && signupData.password) {
      const userData = { name: signupData.name, email: signupData.email };
      localStorage.setItem("user", JSON.stringify(userData));
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
      <div className="flex flex-col justify-center w-1/2 bg-[#F2E8D0] p-12">
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

        <h1 className="text-4xl font-bold text-[#290102] mb-4">
          Create Your Account
        </h1>
        <p className="text-sm text-[#442C2E] mb-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth")}
            className="text-[#293454] font-semibold cursor-pointer"
          >
            Log In
          </span>
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#290102] placeholder-[#442C2E] text-[#290102]"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#290102] placeholder-[#442C2E] text-[#290102]"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full p-3 border border-[#CDC69A] rounded-full focus:ring-2 focus:ring-[#290102] placeholder-[#442C2E] text-[#290102]"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#442C2E]">
              👁
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#290102] text-[#D9D1BE] rounded-full font-semibold hover:bg-[#442C2E] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
