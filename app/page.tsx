"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Rocket, Award, Calendar, Clock, Users, Sparkles, ChevronLeft } from 'lucide-react'
import RocketModel from "@/components/rocket-model"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

// Star interface for TypeScript
interface Star {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

// Rocket data interface
interface RocketData {
  id: number;
  name: string;
  description: string;
  videoSrc: string;
  specifications: {
    motorModel: string;
    bodyMaterial: string;
    maxThrust: string;
    designApogee: string;
    length: string;
    diameter: string;
    weight: string;
    dryWeight: string;
  };
  status: string;
}

// Rocket data
const rocketsData: RocketData[] = [
  {
    id: 1,
    name: "Airavat",
    description: "Our flagship rocket designed for high-altitude missions and competition use.",
    videoSrc: "/video/airavat.mp4",
    specifications: {
      motorModel: "M1845-NT",
      bodyMaterial: "Carbon Fiber",
      maxThrust: "1150N",
      designApogee: "10,000ft",
      length: "3.2m",
      diameter: "15cm",
      weight: "25kg",
      dryWeight: "18kg"
    },
    status: "Latest"
  },
  {
    id: 2,
    name: "Agneya",
    description: "Advanced propulsion system rocket with enhanced payload capacity.",
    videoSrc: "/video/agneya.mp4",
    specifications: {
      motorModel: "M1845-NT",
      bodyMaterial: "Fiberglass",
      maxThrust: "1378N",
      designApogee: "10,000ft",
      length: "4.1m",
      diameter: "18cm",
      weight: "32kg",
      dryWeight: "24kg"
    },
    status: "Launched"
  },
  {
    id: 3,
    name: "Vayu",
    description: "Experimental rocket focusing on aerodynamic efficiency and stability.",
    videoSrc: "/video/vayu.mp4",
    specifications: {
      motorModel: "K550W",
      bodyMaterial: "Aluminum",
      maxThrust: "550N",
      designApogee: "8,000ft",
      length: "2.8m",
      diameter: "12cm",
      weight: "18kg",
      dryWeight: "13kg"
    },
    status: "Testing Phase"
  },
  {
    id: 4,
    name: "Prithvi",
    description: "Heavy-lift rocket designed for satellite deployment missions.",
    videoSrc: "/video/prithvi.mp4",
    specifications: {
      motorModel: "N2000R",
      bodyMaterial: "Carbon Fiber",
      maxThrust: "2000N",
      designApogee: "20,000ft",
      length: "5.2m",
      diameter: "22cm",
      weight: "45kg",
      dryWeight: "32kg"
    },
    status: "Concept"
  }
];

// Falling Stars Component
const FallingStars = () => {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          size: Math.random() * 3 + 1,
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.left}%`,
            top: '-10px',
            opacity: star.opacity,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `fall ${star.animationDuration}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Rocket Carousel Component
const RocketCarousel = () => {
  const [currentRocketIndex, setCurrentRocketIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextRocket = () => {
    setDirection(1);
    setCurrentRocketIndex((prev) => (prev + 1) % rocketsData.length);
  };

  const prevRocket = () => {
    setDirection(-1);
    setCurrentRocketIndex((prev) => (prev - 1 + rocketsData.length) % rocketsData.length);
  };

  const currentRocket = rocketsData[currentRocketIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Navigation Arrows - Outside the boxes */}
      <button
        onClick={prevRocket}
        className="absolute -left-16 top-1/2 -translate-y-1/2 z-30 text-white hover:text-blue-300 transition-all duration-200 hover:scale-110"
        aria-label="Previous rocket"
      >
        <ChevronLeft className="h-12 w-12" />
      </button>

      <button
        onClick={nextRocket}
        className="absolute -right-16 top-1/2 -translate-y-1/2 z-30 text-white hover:text-blue-300 transition-all duration-200 hover:scale-110"
        aria-label="Next rocket"
      >
        <ChevronRight className="h-12 w-12" />
      </button>

      {/* Carousel Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentRocketIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="flex gap-6 h-[500px]"
          >
            {/* Video Section - Slender Box */}
            <div className="w-[280px] backdrop-blur-md bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <video
                src={currentRocket.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

            {/* Information Section - Specifications Box */}
            <div className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{currentRocket.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentRocket.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      currentRocket.status === 'In Development' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      currentRocket.status === 'Testing Phase' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {currentRocket.status}
                    </span>
                  </div>
                  <p className="text-white/80 text-base">{currentRocket.description}</p>
                </div>

                {/* Specifications Grid */}
                <div className="flex-1 grid grid-cols-2 gap-3 mb-6">
                  <div className="space-y-3">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Motor Model</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.motorModel}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Body Material</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.bodyMaterial}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Max Thrust</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.maxThrust}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Design Apogee</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.designApogee}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Length</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.length}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Diameter</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.diameter}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Weight</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.weight}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-1">Dry Weight</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.dryWeight}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rocket Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {rocketsData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentRocketIndex ? 1 : -1);
              setCurrentRocketIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentRocketIndex
                ? 'bg-blue-400 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to rocket ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-900">
      {/* Add Arcane Nine Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .arcane-font {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      {/* Falling Stars Background */}
      <FallingStars />

      {/* Hero Section with Video */}
      <section className="relative h-screen w-full overflow-hidden z-10 -mt-16 pt-16">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
          {/* Fallback gradient if video fails to load */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-sky-800 to-blue-600" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container relative z-20 mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mb-8 arcane-font"
            initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 0.5,
            }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }}
            >
              <b>"</b>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            >
              <b>Give your dream some space to unfold</b>
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }}
            >
              <b>"</b>
            </motion.span>
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 2.5,
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
                asChild
              >
                <Link href="/projects">
                  Explore Our Projects <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/about">
                  About Us <Users className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Who We Are</h2>
              <p className="text-white/90 mb-6">
                Team Sammard is a student based aerospace team dedicated to revolutionizing space technology in india through innovation, research and development. We focus on developing and designing high power sounding rockets, payloads and cannister satelites.
              </p>
              <Button className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30" asChild>
                <Link href="/about">
                  Learn More About Our Team <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 relative h-[400px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/img/about/aboutus_cover1.jpg?height=800&width=1200"
                alt="Team Sammard members"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Rocket Model Section - Updated with Carousel */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Rocket Fleet</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Explore our collection of rockets, each designed for specific missions and competitions.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <RocketCarousel />
        </motion.div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Projects</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-12">
                From high-altitude rockets to satellite systems, explore our innovative aerospace projects.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "IREC Rocket",
                description: "Our competition rocket for the Intercollegiate Rocket Engineering Competition.",
                icon: <Rocket className="h-10 w-10 text-blue-300" />,
              },
              {
                title: "CanSat Mission",
                description: "Miniature satellite system designed to fit inside a soda can.",
                icon: <Sparkles className="h-10 w-10 text-blue-200" />,
              },
              {
                title: "Propulsion Research",
                description: "Cutting-edge research on rocket propulsion systems.",
                icon: <Award className="h-10 w-10 text-blue-400" />,
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg p-6 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-white/80 mb-4 flex-grow">{project.description}</p>
                <Button
                  variant="outline"
                  className="mt-2 self-start backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/projects">Learn More</Link>
                </Button>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
              asChild
            >
              <Link href="/projects">
                View All Projects <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Upcoming Events</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-12">Join us at these upcoming competitions and events.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "IREC 2025",
                date: "June 2025",
                location: "New Mexico, USA",
                description: "Intercollegiate Rocket Engineering Competition",
              },
              {
                title: "CanSat Competition",
                date: "April 2025",
                location: "Texas, USA",
                description: "Design-Build-Fly competition for small satellite systems",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <Calendar className="h-10 w-10 text-blue-300 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">{event.title}</h3>
                    <p className="text-sm text-white/70 mb-2">
                      {event.date} • {event.location}
                    </p>
                    <p className="text-white/80">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/events">
                View All Events <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Sponsors</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-12">
                We're grateful for the support of these organizations that make our work possible.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((sponsor) => (
              <motion.div
                key={sponsor}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6 w-full h-32 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: sponsor * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={`/img/sponsor/${sponsor}.png?height=120&width=200`}
                  alt={`Sponsor ${sponsor}`}
                  width={120}
                  height={60}
                  className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
              asChild
            >
              <Link href="/sponsors">
                View All Sponsors <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
