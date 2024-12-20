'use client'

import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Coffee, Utensils, ChefHat } from 'lucide-react'

const LandingPage = () => {
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
  ]

  return (
    <div className="min-h-screen bg-[#2C0A0A] text-[#F8ECEC] font-sans">
      {/* Header */}
      <motion.header
        className="sticky top-0 mx-auto bg-opacity-90 backdrop-blur-md bg-[#4A1414] z-50 px-6 py-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* <ChefHat className="h-8 w-8 text-[#D9A5A5]" /> */}
            <span className="text-2xl font-bold tracking-wider text-[#F8ECEC]">
              Dine<span className="text-[#CDC69A]">Signal</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm uppercase">
            <a href="#hero" className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300">Home</a>
            <a href="#features" className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300">Features</a>
            <a href="#top-picks" className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300">Top Picks</a>
            <a href="#about" className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300">About Us</a>
          </nav>
          <div className="flex space-x-4">
            <Button
              onClick={() => router.push("/auth")}
              variant="ghost"
              className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300"
            >
              Log In
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-[#F2E8D0] text-[#4A1414] px-6 py-2 rounded-full font-semibold hover:bg-[#F8ECEC] transition duration-300"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="relative text-center py-32 px-6 overflow-hidden"
        id="hero"
        style={{ opacity }}
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
        <motion.h1
  className="text-6xl font-extrabold leading-tight relative z-10"
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  Discover Your <span className="text-[#ffebbc]">Perfect Place</span>
</motion.h1>
<motion.p
  className="mt-6 text-xl max-w-2xl mx-auto text-[#ffebbc] relative z-10"
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  Uncover culinary gems tailored to your taste, budget, and location.
</motion.p>

        <motion.div
          className="mt-10 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex justify-center items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for cuisines or restaurants"
                className="w-64 md:w-80 pl-10 pr-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#F8ECEC] placeholder-[#F8ECEC]/50 border-[#D9A5A5] focus:border-[#F8ECEC]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9A5A5]" size={18} />
            </div>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-[#F2E8D0] text-[#4A1414] px-6 py-2 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#F8ECEC] transition duration-300"
            >
              Explore Now
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-[#4A1414]" id="features">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#F8ECEC]">
            Why Choose <span className="text-[#ffebbc]">DineSignal</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Coffee, title: "Personalized Recommendations", description: "Get tailored suggestions based on your preferences and past experiences." },
              { icon: MapPin, title: "Discover Local Gems", description: "Uncover hidden culinary treasures in your neighborhood and beyond." },
              { icon: Utensils, title: "Diverse Cuisine Options", description: "Explore a wide range of cuisines from around the world, all in one place." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <feature.icon className="mx-auto h-12 w-12 text-[#ffebbc] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#F8ECEC]">{feature.title}</h3>
                <p className="text-[#F8ECEC]/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-24 px-6" id="top-picks">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#F8ECEC]">
          Top Picks for You
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {cafes.map((cafe, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#F2E8D0] text-[#290102] overflow-hidden hover:shadow-xl transition duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={cafe.image}
                      alt={cafe.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-semibold mb-2 text-[#4A1414]">{cafe.name}</CardTitle>
                  <CardDescription className="text-[#4A1414]/80 mb-4">{cafe.description}</CardDescription>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} className="text-[#D9A5A5]" />
                    <span className="text-sm text-[#4A1414]">{cafe.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-[#430d0e] text-[#D9D1BE] rounded-full font-bold hover:bg-[#a2725c] transition duration-300">
                    Explore Menu
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-6 bg-[#4A1414]" id="about">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#F8ECEC]">
            About <span className="text-[#CDC69A]">DineSignal</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#CDC69A]">Our Mission</h3>
              <p className="text-[#F8ECEC]/80 mb-6">
                At DineSignal, we&apos;re passionate about connecting food lovers with their perfect dining experiences. Our mission is to make every meal an adventure, helping you discover new flavors and hidden gems in your area.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-[#CDC69A]">How We Do It</h3>
              <p className="text-[#F8ECEC]/80">
                Using advanced algorithms and user preferences, we curate personalized recommendations that match your taste, budget, and location. Whether you&apos;re craving a quick bite or planning a special night out, DineSignal is your trusted companion in the world of culinary exploration.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/images/resto1.jpg"
                alt="About DineSignal"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#2C0A0A] text-[#F8ECEC]/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-8 w-8 text-[#D9A5A5]" />
                <span className="text-2xl font-bold tracking-wider text-[#F8ECEC]">
                  Dine<span className="text-[#D9A5A5]">Signal</span>
                </span>
              </div>
              <p className="text-sm text-[#F8ECEC]/80">Discover and enjoy the best dining experiences tailored just for you.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F8ECEC]">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#hero" className="hover:text-[#D9A5A5] transition duration-300">Home</a></li>
                <li><a href="#features" className="hover:text-[#D9A5A5] transition duration-300">Features</a></li>
                <li><a href="#top-picks" className="hover:text-[#D9A5A5] transition duration-300">Top Picks</a></li>
                <li><a href="#about" className="hover:text-[#D9A5A5] transition duration-300">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F8ECEC]">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#D9A5A5] transition duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#D9A5A5] transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D9A5A5] transition duration-300">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F8ECEC]">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#F8ECEC] hover:text-[#D9A5A5] transition duration-300">
                  <svg className="h
-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#958e7e] hover:text-[#E6B17E] transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#F2E8D0]/20 mt-8 pt-8 text-center text-sm">
            <p>© 2024 DineSignal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

