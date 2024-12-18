"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();



  // Jika session sedang dimuat
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth" }); // Logout dan redirect ke halaman /auth
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#260401] to-[#E5D7C4] bg-fixed bg-no-repeat text-[#F2E8D0] font-sans">
      {/* Header */}
      <header className="sticky top-0 mx-auto bg-opacity-90 backdrop-blur-md bg-[#290102]/80 z-50 px-6 py-3 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold tracking-widest text-[#D9D1BE]">
          Dine<span className="text-[#CDC69A]">Signal</span>
        </div>
        <nav className="space-x-6 text-sm">
          <a href="#explore" className="text-[#D9D1BE] hover:text-[#CDC69A] transition">
            Explore
          </a>
          <a href="#filter" className="text-[#D9D1BE] hover:text-[#CDC69A] transition">
            Filter
          </a>
          <button
            onClick={handleLogout}
            className="text-[#D9D1BE] hover:text-[#CDC69A] transition"
          >
            Log Out
          </button>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome, <span className="text-[#D9D1BE]">{session?.user?.name || "Guest"}!</span>
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-[#D9D1BE]">
          You are logged in as {session?.user?.email || "unknown email"}.
        </p>
      </section>

      {/* Explore Section */}
      <section id="explore" className="relative py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#D9D1BE]">
          Explore Restaurants Near You
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {["Italian Bistro", "Sushi Haven", "Burger Palace"].map((restaurant, index) => (
            <div
              key={index}
              className="rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 
                         bg-[#1F1F1F]/80 border border-[#D9D1BE]/30 p-8"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#D9D1BE] flex items-center gap-2">
                <span>🍽</span> {restaurant}
              </h3>
              <p className="text-sm text-[#D9D1BE]">
                Find the best dishes and vibes near you.
              </p>
              <button
                className="mt-6 px-4 py-2 bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition"
                onClick={() => alert(`Explore ${restaurant}`)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[#290102] text-center text-sm text-[#D9D1BE] space-y-4">
        <p>© 2024 Dine Signal. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-[#CDC69A] transition">Facebook</a>
          <a href="#" className="hover:text-[#CDC69A] transition">Instagram</a>
          <a href="#" className="hover:text-[#CDC69A] transition">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
