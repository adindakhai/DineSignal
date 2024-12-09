"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const userData = {
        email,
        name: email.split("@")[0], // Gunakan nama berdasarkan email
      };
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/home");
    } else {
      alert("Login failed! Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#290102] via-[#293454] to-[#CDC69A] flex items-center justify-center text-white">
      <div className="bg-[#D9D1BE] text-[#290102] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Log In to Dine Signal</h1>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#290102] text-[#D9D1BE] py-2 rounded-md font-semibold hover:bg-[#293454]"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
