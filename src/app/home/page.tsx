"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const handlePageChange = async (newPage: number) => {
    try {
      const queryParams = new URLSearchParams({
        cuisine: cuisineType,
        priceRange: priceRange.join("-"),
        page: newPage.toString(),
      }).toString();
  
      const response = await fetch(`/api/restaurants?${queryParams}`);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
      }
  
      const { restaurants: fetchedRestaurants, totalPages: fetchedTotalPages } = await response.json();
      setRestaurants(fetchedRestaurants);
      setTotalPages(fetchedTotalPages);
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };  
  
  const handleFilter = async () => {
    setRestaurants([]); // Clear current restaurant list saat fetch ulang
    try {
      const queryParams = new URLSearchParams({
        cuisine: cuisineType || "", // Kirim nilai cuisineType ke backend
        priceRange: priceRange.join("-"),
        page: "1", // Reset ke halaman pertama
      }).toString();
  
      const response = await fetch(`/api/restaurants?${queryParams}`);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
      }
  
      const { restaurants: fetchedRestaurants, totalPages: fetchedTotalPages } = await response.json();

      // Filter hasil di frontend jika backend belum melakukan filter
      const filteredRestaurants = fetchedRestaurants.filter((restaurant: Restaurant) =>
        restaurant.cuisines
          ?.split(",")
          .map((cuisine) => cuisine.trim().toLowerCase())
          .includes(cuisineType.toLowerCase())
      );

      setRestaurants(filteredRestaurants); // Set hasil restoran yang difilter
      setTotalPages(fetchedTotalPages); // Set jumlah halaman total
      setCurrentPage(1); // Reset ke halaman pertama
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

          {/* Search Bar */}
          <div className="w-full max-w-4xl mx-auto space-y-4 mb-8">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search for cuisines or restaurants"
                className=" flex-grow w-64 md:w-80 pl-10 pr-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#F8ECEC] placeholder-[#F8ECEC]/50 border-[#D9A5A5] focus:border-[#F8ECEC]"
              />
              <Button className="bg-[#CDC69A] text-[#290102]">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="flex space-x-2">
              <Select onValueChange={(value) => setCuisineType(value)}>
                <SelectTrigger className="flex-grow bg-[#4A1414] text-[#F8ECEC] border-[#D9A5A5]">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#4A1414] text-[#F8ECEC]">
                  {cuisines.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="flex-grow bg-[#4A1414] text-[#F8ECEC] border-[#D9A5A5]">
                  <SelectValue placeholder="Average Cost" />
                </SelectTrigger>
                <SelectContent className="bg-[#4A1414] text-[#F8ECEC]">
                  <SelectItem value="low">$</SelectItem>
                  <SelectItem value="medium">$$</SelectItem>
                  <SelectItem value="high">$$$</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="flex-grow bg-[#4A1414] text-[#F8ECEC] border-[#D9A5A5]">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent className="bg-[#4A1414] text-[#F8ECEC]">
                  <SelectItem value="1">&lt; 1 km</SelectItem>
                  <SelectItem value="5">&lt; 5 km</SelectItem>
                  <SelectItem value="10">&lt; 10 km</SelectItem>
                  <SelectItem value="20">&lt; 20 km</SelectItem>
                </SelectContent>
              </Select>
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
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#4A1414] border border-[#D9A5A5]/30">
                  <CardHeader>
                    <CardTitle className="text-[#D9D1BE]">{restaurant.name}</CardTitle>
                    <CardDescription className="text-[#F8ECEC]/80">
                      {restaurant.city || "City not available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#F8ECEC]/60">
                      Cuisines: {restaurant.cuisines || "N/A"}
                    </p>
                    <p className="text-sm text-[#F8ECEC]/60">
                      Avg Cost: {restaurant.average_cost || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-[#F8ECEC]/80">No restaurants found</p>
          )}
        </div>
      </section>

      <div className="flex justify-center items-center space-x-4 mt-8">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-[#CDC69A] text-[#290102]"
        >
          Previous
        </Button>
        <span className="text-[#F8ECEC]">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-[#CDC69A] text-[#290102]"
        >
          Next
        </Button>
      </div>

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
