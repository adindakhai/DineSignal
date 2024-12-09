"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/login"); // Redirect ke login jika tidak ada data
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data pengguna dari localStorage
    router.push("/login"); // Redirect ke halaman login
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#290102] via-[#293454] to-[#CDC69A] text-white font-sans">
      {/* Navbar */}
      <header className="sticky top-4 mx-auto max-w-5xl bg-[#D9D1BE] text-[#290102] shadow-lg z-50 rounded-xl px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">Dine Signal</div>
        <nav className="space-x-6">
          <a href="#explore" className="hover:text-[#290102]/70">
            Explore
          </a>
          <a href="#filter" className="hover:text-[#290102]/70">
            Filter
          </a>
          <button
            onClick={handleLogout}
            className="hover:text-[#290102]/70"
          >
            Log Out
          </button>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="text-center py-10 px-6">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-[#D9D1BE]">{user.name}!</span>
        </h1>
        <p className="mt-4 text-lg">
          You are logged in as {user.email}.
        </p>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-16 px-6 bg-[#293454] text-white">
        <h2 className="text-3xl font-bold text-center">Explore Restaurants Near You</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {["Italian Bistro", "Sushi Haven", "Burger Palace"].map((restaurant, index) => (
            <div
              key={index}
              className="bg-white text-[#290102] p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold">{restaurant}</h3>
              <p className="mt-2">Find the best dishes and vibes near you.</p>
              <button
                className="mt-4 bg-[#290102] text-[#D9D1BE] px-4 py-2 rounded-lg font-semibold hover:bg-[#293454]"
                onClick={() => alert(`Explore ${restaurant}`)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section id="filter" className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center">Personalize Your Search</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-white text-[#290102] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Filter by Price</h3>
            <p className="mt-2">Set your budget and find restaurants within your range.</p>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full mt-4"
              onChange={(e) => console.log(`Price range: ${e.target.value}`)}
            />
          </div>
          <div className="bg-white text-[#290102] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Filter by Cuisine</h3>
            <p className="mt-2">Choose your favorite cuisine and explore top spots.</p>
            <select
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293454]"
              onChange={(e) => console.log(`Cuisine: ${e.target.value}`)}
            >
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
            </select>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#290102] text-center text-sm">
        <p>© 2024 Dine Signal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
