"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Import Button dari ShadCN
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card dari ShadCN
import { Input } from "@/components/ui/input"; // Import Input dari ShadCN

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
    <div className="min-h-screen bg-gradient-to-tr from-[#290102] via-[#442C2E] to-[#F2E8D0] bg-fixed bg-no-repeat flex items-center justify-center text-white relative">
      {/* Back Button */}
      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className="absolute top-4 left-4 text-[#D9D1BE] bg-[#290102] px-4 py-2 rounded-md hover:bg-[#442C2E] transition"
      >
        ← Back
      </Button>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-[#D9D1BE] text-[#290102] rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-4">
            Log In to Dine Signal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#290102] text-[#D9D1BE] py-2 rounded-md font-semibold hover:bg-[#293454] transition"
            >
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
