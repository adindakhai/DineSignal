"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react"; // `MapPin` removed as it is not used.

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
  const [priceRange, setPriceRange] = useState<[number, number]>([
    50000,
    249900,
  ]); // default full range
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // **New States for Search Suggestions**
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // User location (hard-coded Jakarta)
  const userLatitude = -6.2;
  const userLongitude = 106.816666;

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
          throw new Error(
            `API responded with status ${response.status}: ${response.statusText}`
          );
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

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  const isFilterApplied =
    cuisineType !== "" ||
    priceRange.join("-") !== "50000-249900" ||
    distance !== undefined ||
    searchTerm.trim() !== "";

  const fetchRestaurants = useCallback(
    async (page: number) => {
      if (!isFilterApplied) {
        setRestaurants([]);
        setTotalPages(1);
        setCurrentPage(1);
        return;
      }

      try {
        const queryParams = new URLSearchParams({
          cuisine: cuisineType || "",
          priceRange: priceRange.join("-"),
          page: page.toString(),
          distance: distance?.toString() || "",
          userLatitude: userLatitude.toString(),
          userLongitude: userLongitude.toString(),
          searchTerm: searchTerm || "",
        }).toString();

        const response = await fetch(`/api/restaurants?${queryParams}`);
        if (!response.ok) {
          throw new Error(
            `API responded with status ${response.status}: ${response.statusText}`
          );
        }

        const {
          restaurants: fetchedRestaurants,
          totalPages: fetchedTotalPages,
        } = await response.json();
        setRestaurants(fetchedRestaurants);
        setTotalPages(fetchedTotalPages);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    },
    [
      cuisineType,
      priceRange,
      distance,
      searchTerm,
      isFilterApplied,
      userLatitude,
      userLongitude,
    ] // Added `userLatitude` and `userLongitude` as dependencies
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      fetchRestaurants(newPage);
    },
    [fetchRestaurants]
  );

  const handleFilter = useCallback(() => {
    fetchRestaurants(1);
  }, [fetchRestaurants]);

  const handleSearch = useCallback(() => {
    fetchRestaurants(1);
  }, [fetchRestaurants]);

  const handleClearFilter = useCallback(() => {
    setCuisineType("");
    setPriceRange([50000, 249900]);
    setDistance(undefined);
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    setRestaurants([]);
    setCurrentPage(1);
    setTotalPages(1);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/restaurants/suggestions?query=${encodeURIComponent(
            searchTerm
          )}`
        );
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        const data: string[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2C0A0A] text-[#F8ECEC]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-50 text-[#F8ECEC] font-sans">
      {/* Header */}
      <motion.header
        className="sticky top-0 mx-auto bg-opacity-50 backdrop-blur-md bg-[#4A1414] z-50 px-6 py-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logogelap.png"
              alt="DineSignal Logo"
              width={35} // Adjust size as needed
              height={35} // Adjust size as needed
              className="rounded-full"
            />
            <span className="text-2xl md:text-3xl font-bold tracking-wider text-[#F8ECEC]">
              Dine<span className="text-[#CDC69A] font-extrabold">Signal</span>
            </span>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-[#F8ECEC] hover:text-[#CDC69A] transition duration-300 text-sm md:text-base mt-4 md:mt-0"
          >
            Log Out
          </Button>
        </div>
      </motion.header>

      {/* Welcome Section */}
      <motion.section
        className="relative text-center py-32 md:py-48 px-4 md:px-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/resto1.jpg"
            alt="Food background"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </motion.div>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold relative z-10 text-[#F8ECEC] drop-shadow-lg">
          Welcome,{" "}
          <span className="text-[#CDC69A]">
            {session?.user?.name || "Guest"}!
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl text-[#F8ECEC]/80 relative z-10">
          Discover your next favorite dining spot
        </p>
      </motion.section>

      {/* Filtering Section */}
      <section
        id="filter"
        className="py-16 px-4 md:px-6 bg-gradient-to-b from-[#2C0A0A] to-[#290102] relative"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-[#F8ECEC]">
            Find Your Perfect Meal
          </h2>

          {/* Search Bar */}
          <div className="w-full max-w-4xl mx-auto space-y-4 mb-8 relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for city or restaurant name"
                className="w-full pl-10 pr-12 py-3 rounded-full bg-white/10 backdrop-blur-md text-[#F8ECEC] placeholder-[#F8ECEC]/50 border border-[#D9A5A5] focus:border-[#CDC69A] transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isFilterApplied) {
                    handleSearch();
                  }
                }}
              />
              <button
                onClick={handleSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CDC69A] hover:text-[#F8ECEC] transition-colors duration-300 ${
                  !isFilterApplied ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFilterApplied}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-[#4A1414] border border-[#D9A5A5] rounded-md mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-[#CDC69A] hover:text-[#290102] cursor-pointer transition-colors duration-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Filters Section */}
          <div className="w-full max-w-4xl mx-auto space-y-4 mb-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* Cuisine Type Select */}
              <div className="relative flex-grow">
                <Select
                  onValueChange={(value) => setCuisineType(value)}
                  value={cuisineType}
                >
                  <SelectTrigger className="w-full bg-[#ffebbc] text-[#4A1414] border border-[#D9A5A5] hover:border-[#CDC69A] transition-colors duration-300">
                    <SelectValue placeholder="Cuisine Type" />
                  </SelectTrigger>
                  <SelectContent className="absolute mt-2 bg-[#ffebbc] text-[#4A1414] border border-[#D9A5A5] rounded-md shadow-lg z-50">
                    {cuisines.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Select */}
              <div className="relative flex-grow">
                <Select
                  onValueChange={(value) => {
                    const [min, max] = value.split("-").map(Number);
                    setPriceRange([min, max]);
                  }}
                  value={priceRange.join("-")}
                >
                  <SelectTrigger className="w-full bg-[#ffebbc] text-[#4A1414] border border-[#D9A5A5] hover:border-[#CDC69A] transition-colors duration-300">
                    <SelectValue placeholder="Average Cost (50,000 - 249,900)" />
                  </SelectTrigger>
                  <SelectContent className="absolute mt-2 bg-[#ffebbc] text-[#4A1414] border border-[#D9A5A5] rounded-md shadow-lg z-50">
                    <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
                    <SelectItem value="100000-150000">
                      100,000 - 150,000
                    </SelectItem>
                    <SelectItem value="150000-200000">
                      150,000 - 200,000
                    </SelectItem>
                    <SelectItem value="200000-249900">
                      200,000 - 249,900
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distance Select */}
              <div className="relative flex-grow">
                <Select
                  onValueChange={(value) => setDistance(Number(value))}
                  value={distance?.toString() || ""}
                >
                  <SelectTrigger className="w-full bg-[#ffebbc] text-[#4A1414] border border-[#D9A5A5] hover:border-[#CDC69A] transition-colors duration-300">
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent className="absolute mt-2 bg-[#ffebbc] text-[#4A1414] border border-[#D9A5A5] rounded-md shadow-lg z-50">
                    <SelectItem value="1">&lt; 1 km</SelectItem>
                    <SelectItem value="5">&lt; 5 km</SelectItem>
                    <SelectItem value="10">&lt; 10 km</SelectItem>
                    <SelectItem value="20">&lt; 20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Apply and Clear Filters Buttons */}
          <div className="flex justify-center space-x-4 mt-8 md:mt-12">
            <Button
              onClick={handleFilter}
              className={`bg-[#CDC69A] text-[#290102] px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#D9D1BE] transition-colors duration-300 ${
                !isFilterApplied ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFilterApplied}
            >
              Apply Filters
            </Button>
            <Button
              onClick={handleClearFilter}
              className="bg-[#CDC69A] text-[#290102] px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#D9D1BE] transition-colors duration-300"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section
        id="explore"
        className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#290201] to-[#290201]"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#D9D1BE]">
          Explore the Best Dining Spots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#F2E8D0] text-[#290102] overflow-hidden hover:shadow-xl transition duration-300">
                  <CardHeader className="p-0">
                    <div className="relative h-48 md:h-56 lg:h-64">
                      <Image
                        src="/images/resto1.jpg" // Replace with restaurant image if available
                        alt={restaurant.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        priority={index === 0} // Prioritize the first image
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold mb-2 text-[#4A1414]">
                      {restaurant.name}
                    </CardTitle>
                    <CardDescription className="text-[#4A1414]/80 mb-4">
                      {restaurant.city || "City not available"}
                    </CardDescription>
                    <p className="text-sm md:text-base text-[#4A1414]/70 mb-2">
                      Cuisines: {restaurant.cuisines || "N/A"}
                    </p>
                    <p className="text-sm md:text-base text-[#4A1414]/70 mb-2">
                      Avg Cost:{" "}
                      {restaurant.average_cost?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }) || "N/A"}
                    </p>
                    {restaurant.aggregate_rating && (
                      <div className="mt-4 flex items-center">
                        <span className="text-black mr-2">★</span>
                        <span className="text-[#290201]">
                          {restaurant.aggregate_rating.toFixed(1)}
                        </span>
                        <span className="text-[#290201]/60 ml-2">
                          ({restaurant.votes} votes)
                        </span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full bg-[#430d0e] text-[#D9D1BE] rounded-full font-bold hover:bg-[#a2725c] transition duration-300"
                    onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-[#F8ECEC]/80 col-span-full text-lg">
              No restaurants found
            </p>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-8 px-4 md:px-6 bg-[#290201]">
          <div className="flex justify-center items-center space-x-6">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-[#CDC69A] text-[#290102] hover:bg-[#D9D1BE] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <span className="text-[#F8ECEC] text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-[#CDC69A] text-[#290102] hover:bg-[#D9D1BE] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-[#290201] text-[#F8ECEC]/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer sections can be added here */}
          </div>
          <div className="border-t border-[#F2E8D0]/20 mt-8 md:mt-12 pt-8 md:pt-12 text-center text-sm">
            <p>© 2024 DineSignal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
