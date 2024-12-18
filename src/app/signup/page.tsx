"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",

    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  // Fungsi handleSignup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupData.name || !signupData.email || !signupData.password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      // Kirim data registrasi ke API
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User registered successfully:", data);

        // Proses login otomatis setelah registrasi
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
    <div className="min-h-screen bg-gradient-to-tr from-[#290102] via-[#293454] to-[#CDC69A] flex">
      <div className="w-1/2 relative">
        <img
          src="/images/resto1.jpg"
          alt="Restaurant"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center w-1/2 bg-[#F2E8D0] p-12">
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

        {error && (
          <div className="mb-4 text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
            className="w-full p-3 border rounded-full placeholder-[#442C2E]"
          />
          <input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            className="w-full p-3 border rounded-full placeholder-[#442C2E]"
          />
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            className="w-full p-3 border rounded-full placeholder-[#442C2E]"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#290102] text-white rounded-full hover:bg-[#442C2E] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
