"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Rocket, Award, Calendar, Clock, Users, Sparkles, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

// Rocket data interface
interface RocketData {
  id: number;
  name: string;
  description: string;
  videoSrc: string;
  specifications: {
    motorModel: string;
    bodyMaterial: string;
    AvgThrust: string;
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
      bodyMaterial: "Fiber Glass",
      AvgThrust: "1875 newtons",
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
      AvgThrust: "1875 newtons",
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
    name: "Vajra",
    description: "Experimental rocket focusing on aerodynamic efficiency and stability.",
    videoSrc: "/video/pinaka.mp4",
    specifications: {
      motorModel: "-",
      bodyMaterial: "FiberGlass",
      AvgThrust: "-",
      designApogee: "10,000ft",
      length: "2.8m",
      diameter: "12cm",
      weight: "18kg",
      dryWeight: "13kg"
    },
    status: "Launched"
  },
  {
    id: 4,
    name: "Pinaka",
    description: "Heavy-lift rocket designed for satellite deployment missions.",
    videoSrc: "/video/prithvi.mp4",
    specifications: {
      motorModel: "N2000R",
      bodyMaterial: "Carbon Fiber",
      AvgThrust: "2000N",
      designApogee: "30,000ft",
      length: "5.2m",
      diameter: "22cm",
      weight: "45kg",
      dryWeight: "32kg"
    },
    status: "Concept"
  }
];

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
                      <div className="text-white/70 text-sm mb-1">AvgThrust</div>
                      <div className="text-blue-300 font-semibold">{currentRocket.specifications.AvgThrust}</div>
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

export default RocketCarousel;
