"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Utensils } from "lucide-react";

interface Restaurant {
  id: number;
  restaurant_id: number;
  name: string;
  city?: string;
  address?: string;
  locality?: string;
  longitude?: number;
  latitude?: number;
  cuisines?: string;
  average_cost?: number;
  aggregate_rating?: number;
  votes?: number;
}

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cuisineType, setCuisineType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [distance, setDistance] = useState(5);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await fetch("/api/restaurants/cuisines");
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
        }
        const data: string[] = await response.json();
        const uniqueCuisines = Array.from(
          new Set(
            data
              .flatMap((cuisine: string) => 
                cuisine.split(",").map((item: string) => item.trim())
              )
              .filter((item: string) => item)
          )
        );
        setCuisines(uniqueCuisines);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };

    fetchCuisines();
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams({
        cuisine: cuisineType,
        priceRange: priceRange.join("-"),
        city: "Your City Here",
      }).toString();

      const response = await fetch(`/api/restaurants?${queryParams}`);
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2C0A0A] text-[#F8ECEC]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2C0A0A] text-[#F8ECEC] font-sans">
      {/* Header */}
      <motion.header
        className="sticky top-0 mx-auto bg-opacity-70 backdrop-blur-md bg-[#4A1414] z-50 px-4 md:px-6 py-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold tracking-wider text-[#F8ECEC]">
              Dine<span className="text-[#CDC69A]">Signal</span>
            </span>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-[#F8ECEC] hover:text-[#dd7f7f] transition duration-300"
          >
            Log Out
          </Button>
        </div>
      </motion.header>

      {/* Welcome Section */}
      <motion.section
        className="relative text-center py-24 md:py-32 px-4 md:px-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/resto1.jpg"
            alt="Food background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-extrabold relative z-10">
          Welcome, <span className="text-[#D9D1BE]">{session?.user?.name || "Guest"}!</span>
        </h1>
      </motion.section>

      {/* Filtering Section */}
      <section id="filter" className="py-16 px-4 md:px-6 bg-[#2C0A0A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-[#F8ECEC]">
            Filter Your Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Cuisine Type */}
            <div>
              <label htmlFor="cuisine-type" className="block text-sm font-medium text-[#F8ECEC] mb-2">
                Cuisine Type
              </label>
              <Select onValueChange={setCuisineType}>
                <SelectTrigger id="cuisine-type" className="w-full bg-[#2C0A0A] border-[#D9A5A5] text-[#F8ECEC]">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent className="bg-[#2C0A0A] border-[#D9A5A5] text-[#F8ECEC]">
                  {cuisines.map((cuisine, index) => (
                    <SelectItem key={index} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-[#F8ECEC] mb-2">
                Price Range
              </label>
              <Slider
                id="price-range"
                min={0}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
              <div className="mt-2 text-sm text-[#F8ECEC]">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>

            {/* Distance */}
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-[#F8ECEC] mb-2">
                Distance (km)
              </label>
              <Slider
                id="distance"
                min={1}
                max={20}
                step={1}
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                className="w-full"
              />
              <div className="mt-2 text-sm text-[#F8ECEC]">
                {distance} km
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center">
            <Button
              onClick={handleFilter}
              className="bg-[#CDC69A] text-[#290102] px-6 py-2 md:px-8 md:py-2 rounded-full font-bold text-lg shadow-lg"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="relative py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-[#D9D1BE]">
          Explore Restaurants Near You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              className="rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 bg-[#4A1414] border border-[#D9A5A5]/30 p-6 md:p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#D9D1BE] flex items-center gap-2">
                <Utensils className="h-6 w-6" />
                {restaurant.name}
              </h3>
              <p className="text-sm text-[#F8ECEC]/80">
                {restaurant.city || "No city information available"}
              </p>
              <Button
                className="mt-4 md:mt-6 w-full bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition"
                onClick={() => alert(`Explore ${restaurant.name}`)}
              >
                Explore
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-[#2C0A0A] text-[#F8ECEC]/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer sections */}
          </div>
          <div className="border-t border-[#F2E8D0]/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm">
            <p>© 2024 DineSignal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
