"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Import useParams untuk menggantikan akses langsung params
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Restaurant {
  id: number;
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

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Gunakan useParams untuk mendapatkan id dari URL
  const params = useParams();
  const id = params.id; // Pastikan Anda mendapatkan id di sini

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`/api/restaurants/${id}`);
        if (!response.ok) {
          throw new Error(
            `API responded with status ${response.status}: ${response.statusText}`
          );
        }
        const data = await response.json();
        setRestaurant(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to fetch restaurant details");
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2C0A0A] text-[#F8ECEC]">
        Loading...
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2C0A0A] text-[#F8ECEC]">
        <p>{error || "Restaurant not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-50 text-[#F8ECEC] font-sans">
      <motion.header
        className="sticky top-0 mx-auto bg-opacity-50 backdrop-blur-md bg-[#4A1414] z-50 px-6 py-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logogelap.png"
              alt="DineSignal Logo"
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="text-2xl md:text-3xl font-bold tracking-wider text-[#F8ECEC]">
              Dine<span className="text-[#CDC69A] font-extrabold">Signal</span>
            </span>
          </div>
          <Button
            onClick={() => router.push("/home")}
            variant="ghost"
            className="text-[#F8ECEC] hover:text-[#CDC69A] transition duration-300"
          >
            Back to Home
          </Button>
        </div>
      </motion.header>

      <section className="relative py-16 px-4 md:px-6 bg-gradient-to-b from-[#2C0A0A] to-[#290102]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#F2E8D0] text-[#290102] p-8 rounded-lg shadow-lg"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{restaurant.name}</h1>
            <p className="text-lg mb-4">City: {restaurant.city || "N/A"}</p>
            <p className="text-lg mb-4">Address: {restaurant.address || "N/A"}</p>
            <p className="text-lg mb-4">Locality: {restaurant.locality || "N/A"}</p>
            <p className="text-lg mb-4">Cuisines: {restaurant.cuisines || "N/A"}</p>
            <p className="text-lg mb-4">
              Avg Cost:{" "}
              {restaurant.average_cost?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              }) || "N/A"}
            </p>
            <p className="text-lg mb-4">Rating: {restaurant.aggregate_rating || "N/A"}</p>
            <p className="text-lg">Votes: {restaurant.votes || "N/A"}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
