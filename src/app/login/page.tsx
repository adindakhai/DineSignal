"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AuthPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulasi login
    if (loginData.email && loginData.password) {
      const userData = {
        email: loginData.email,
      };

      // Simpan data ke localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect ke halaman Home
      router.push("/home");
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulasi signup
    if (signupData.email && signupData.password && signupData.name) {
      const userData = {
        name: signupData.name,
        email: signupData.email,
      };

      // Simpan data ke localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect ke halaman Home
      router.push("/home");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#290102] via-[#293454] to-[#CDC69A] flex items-center justify-center text-white">
      <div className="bg-[#D9D1BE] text-[#290102] p-8 rounded-lg shadow-lg w-full max-w-lg">
        <Tabs defaultValue="login">
          <TabsList className="mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="login-email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="login-password" className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="login-password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
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
          </TabsContent>

          {/* Signup Form */}
          <TabsContent value="signup">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="signup-name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="signup-name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="signup-email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#293454]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="signup-password" className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
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
          </TabsContent>
        </Tabs>
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

export default AuthPage;
