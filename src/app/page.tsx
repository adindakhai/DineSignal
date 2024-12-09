"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const LandingPage = () => {
  const router = useRouter();

  const images = [
    "/images/resto1.jpg",
    "/images/resto2.jpg",
    "/images/resto3.jpg",
    "/images/resto4.jpg",
    "/images/resto5.jpg",
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
    <div className="min-h-screen bg-gradient-to-tr from-[#290102] via-[#1F1F1F] to-[#CDC69A] text-white font-sans">
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
          <button
            onClick={() => router.push("/login")}
            className="text-[#D9D1BE] hover:text-[#CDC69A] transition"
          >
            Log In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 bg-[#CDC69A] text-[#290102] rounded-full font-semibold hover:bg-[#D9D1BE] transition"
          >
            Sign Up
          </button>
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
        <motion.button
          onClick={() => router.push("/signup")}
          className="mt-8 bg-[#CDC69A] text-[#290102] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#D9D1BE] transition"
          {...hoverEffect}
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Auto-Slider Section */}
      <section className="relative py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#D9D1BE]">
          Top Picks for You
        </h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          className="max-w-5xl mx-auto"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 flex items-end p-6">
                  <p className="text-white text-lg font-bold">
                    Restaurant {index + 1}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-6"
        id="features"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-[#D9D1BE]">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Nearby Search",
              text: "Locate top restaurants within minutes from your location.",
            },
            {
              title: "Smart Filters",
              text: "Customize results by price, cuisine, and user reviews.",
            },
            {
              title: "Seamless Experience",
              text: "Fast, intuitive, and user-friendly.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white text-[#290102] p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-sm">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

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
