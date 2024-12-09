"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulasi proses signup (Anda bisa mengganti dengan API backend)
    if (email && password && name) {
      const userData = {
        name,
        email,
      };

      // Simpan data user ke localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect ke halaman Home
      router.push("/home");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#290102] via-[#293454] to-[#CDC69A] flex items-center justify-center text-white">
      <div className="bg-[#D9D1BE] text-[#290102] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up for Dine Signal</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#290102] text-[#D9D1BE] py-2 rounded-md font-semibold hover:bg-[#293454]"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full bg-[#293454] text-[#D9D1BE] py-2 rounded-md font-semibold hover:bg-[#290102]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
