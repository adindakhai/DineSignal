"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import Button dari ShadCN

const LandingPage = () => {
  const router = useRouter();

  const cafes = [
    {
      name: "Cafe Mocha",
      location: "Downtown",
      image: "/images/resto1.jpg",
      description: "Cozy atmosphere and great coffee.",
    },
    {
      name: "The French Bistro",
      location: "Uptown",
      image: "/images/resto2.jpg",
      description: "Authentic French cuisine and pastries.",
    },
    {
      name: "Sushi Paradise",
      location: "Midtown",
      image: "/images/resto3.jpg",
      description: "Fresh sushi and sashimi served daily.",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const hoverEffect = {
    whileHover: { scale: 1.1, rotate: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#290102] via-[#442C2E] to-[#F2E8D0] bg-fixed bg-no-repeat text-[#290102] font-sans">
      {/* Header */}
      <motion.header
        className="sticky top-0 mx-auto bg-opacity-90 backdrop-blur-md bg-[#290102]/80 z-50 px-6 py-3 flex justify-between items-center shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold tracking-widest text-[#D9D1BE]">
          Dine<span className="text-[#CDC69A]">Signal</span>
        </div>
        <nav className="space-x-6 text-sm uppercase">
          <Button
            onClick={() => router.push("/login")}
            variant="ghost"
            className="text-[#D9D1BE] hover:text-[#CDC69A] transition"
          >
            Log In
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition"
          >
            Sign Up
          </Button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="text-center py-24 px-6"
        id="hero"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h1
          className="text-6xl font-extrabold leading-tight"
          {...fadeIn}
        >
          Find Your <span className="text-[#D9D1BE]">Perfect Place</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg max-w-2xl mx-auto text-[#D9D1BE]"
          {...fadeIn}
        >
          Discover top-rated restaurants tailored to your taste, budget, and
          location.
        </motion.p>
        <motion.div {...hoverEffect}>
          <Button
            onClick={() => router.push("/signup")}
            className="mt-8 bg-[#CDC69A] text-[#290102] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#D9D1BE] transition"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.section>

      {/* Top Picks Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#D9D1BE]">
          Top Picks for You
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {cafes.map((cafe, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg overflow-hidden shadow-lg bg-[#1F1F1F]/80 border border-[#D9D1BE]/30"
            >
              <Card>
                <CardHeader className="p-0">
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    className="w-full h-[200px] object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6 text-[#D9D1BE]">
                  <CardTitle className="text-xl font-semibold mb-2">
                    {cafe.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {cafe.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6">
                  <Button className="bg-[#CDC69A] text-[#290102] px-4 py-2 rounded-full font-bold hover:bg-[#D9D1BE] transition">
                    Explore
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[#290102] text-center text-sm text-[#D9D1BE] space-y-4">
        <p>© 2024 Dine Signal. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-[#CDC69A]">Facebook</a>
          <a href="#" className="hover:text-[#CDC69A]">Instagram</a>
          <a href="#" className="hover:text-[#CDC69A]">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
