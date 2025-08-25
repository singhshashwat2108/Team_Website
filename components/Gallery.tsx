"use client"

import React from 'react';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, Calendar, Users, Rocket, Award } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from "@/components/ui/button"; // Imported from shadcn/ui
import FallingStars from "@/components/FallingStars"; // Imported from components

// Type for GalleryItem
type GalleryItem = {
  img: string
  title: string
  year: string
  category: string
  description: string
}

// Sample Gallery Data (using new image paths and placeholder images for others)
const galleryData: GalleryItem[] = [
  {
    img: "/img/about/aboutus_cover1.png",
    title: "Team Sammard Group Photo",
    year: "2024",
    category: "Team",
    description: "Team members at VIT Vellore campus",
  },
  {
    img: "/img/main/launch.png",
    title: "Rocket Launch Event",
    year: "2024",
    category: "Launch",
    description: "Successful rocket launch demonstration",
  },
  {
    img: "/img/sponsor/img1.png",
    title: "Sponsor Partnership",
    year: "2024",
    category: "Sponsors",
    description: "Partnership announcement with our sponsors",
  },
  {
    img: "/img/sponsor/img2.png",
    title: "Corporate Support",
    year: "2024",
    category: "Sponsors",
    description: "Corporate sponsorship collaboration",
  },
  {
    img: "/img/sponsor/img3.png",
    title: "Industry Partnership",
    year: "2023",
    category: "Sponsors",
    description: "Industry partnership development",
  },
  {
    img: "/img/sponsor/img4.png",
    title: "Technical Support",
    year: "2023",
    category: "Sponsors",
    description: "Technical sponsorship and support",
  },
  {
    img: "/placeholder.svg?height=400&width=600",
    title: "Rocket Assembly",
    year: "2023",
    category: "Team",
    description: "Team members assembling a rocket in the workshop.",
  },
  {
    img: "/placeholder.svg?height=400&width=600",
    title: "Project Presentation",
    year: "2022",
    category: "Research",
    description: "Students presenting their research findings at a conference.",
  },
  {
    img: "/placeholder.svg?height=400&width=600",
    title: "CanSat Competition",
    year: "2022",
    category: "Competition",
    description: "Our team competing in the international CanSat competition.",
  },
  {
    img: "/placeholder.svg?height=400&width=600",
    title: "Award Ceremony",
    year: "2021",
    category: "Awards",
    description: "Receiving an award for innovation in aerospace.",
  },
]

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<number>(0)
  const [imgPop, setImgPop] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showYearFilters, setShowYearFilters] = useState<boolean>(true)
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(true)
  const popupRef = useRef<HTMLDivElement>(null)

  // Get unique years and categories for filters
  const years = ["All", ...Array.from(new Set(galleryData.map((item) => item.year)))].sort().reverse()
  const categories = ["All", ...Array.from(new Set(galleryData.map((item) => item.category)))]

  const filteredGallery = galleryData.filter((item) => {
    const matchesYear = selectedYear === "All" || item.year === selectedYear
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesYear && matchesCategory && matchesSearch
  })

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedYear !== "All") count++
    if (selectedCategory !== "All") count++
    if (searchTerm !== "") count++
    return count
  }

  const clearAllFilters = () => {
    setSelectedYear("All")
    setSelectedCategory("All")
    setSearchTerm("")
  }

  // Handle popup visibility transition
  useEffect(() => {
    if (imgPop) {
      setTimeout(() => setIsVisible(true), 10)
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [imgPop])

  // Detect click outside popup
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsVisible(false)
    }
  }

  // Close popup after fade-out finishes
  const handleTransitionEnd = () => {
    if (!isVisible) {
      setImgPop(false)
    }
  }

  // Navigate gallery
  const swipeImg = (moveType: string) => {
    if (moveType === "prv") {
      setSelectedImg((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1))
    }
    if (moveType === "nxt") {
      setSelectedImg((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1))
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Team":
        return <Users className="h-5 w-5" />
      case "Launch":
        return <Rocket className="h-5 w-5" />
      case "Competition":
        return <Award className="h-5 w-5" />
      case "Sponsors":
        return <Award className="h-5 w-5" />
      case "Research":
        return <Filter className="h-5 w-5" />
      case "Awards":
        return <Award className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  return (
    <div className="relative">
      {/* Add Orbitron Font and global animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .arcane-font {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: white;
        }
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
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
        body {
          overflow-x: hidden;
        }
      `}</style>

      {/* Falling Stars Background */}
      <FallingStars />
      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 arcane-font">Gallery</h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Explore our journey through the years - from founding moments to major milestones
              </p>
            </div>
          </motion.div>
          {/* Dropdown Filters right-aligned above grid */}
          <motion.div
            className="mb-10 flex justify-end"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:items-center">
              <Select value={selectedYear} onValueChange={(v) => setSelectedYear(v)}>
                <SelectTrigger className="w-full sm:w-32 bg-white/10 border-white/20 text-white focus:ring-blue-500/40 focus:border-blue-500/40">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {years.map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v)}>
                <SelectTrigger className="w-full sm:w-44 bg-white/10 border-white/20 text-white focus:ring-blue-500/40 focus:border-blue-500/40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white max-h-60">
                  {categories.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredGallery.map((item: GalleryItem, i: number) => (
              <motion.div
                key={i}
        className="group cursor-pointer w-full max-w-[280px]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => {
                  setSelectedImg(i)
                  setImgPop(true)
                }}
              >
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 shadow-xl border border-slate-600/50 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-blue-500/20 flex flex-col h-full text-sm"> {/* Reduced shadow, hover scale, overall text */}
                  {/* Image (reduced height) */}
                  <div className="relative h-48 sm:h-52">
                    <Image
                      src={item.img || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Year Badge */}
                    <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-medium">
                      {item.year}
                    </div>
                    {/* Category Icon */}
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white p-2 rounded-md">
                      {getCategoryIcon(item.category)}
                    </div>
                  </div>
                  {/* Content */}
          <div className="p-3 flex-grow flex flex-col justify-between min-h-[80px]"> {/* Reduced padding & min height */}
                    <div>
            <h3 className="text-white font-semibold text-base mb-1 group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
            <p className="text-white/50 text-xs mb-2 tracking-wide">
                        {item.category} • {item.year}
                      </p>
            <p className="text-white/70 text-xs leading-relaxed line-clamp-2"> {/* Adjusted sizing */}
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* No Results */}
          {filteredGallery.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white/60 text-lg">No images found for the selected filters.</p>
            </motion.div>
          )}
        </div>
      </div>
      {/* Popup Modal */}
      {imgPop && filteredGallery.length > 0 && (
        <div
          onClick={handleBackgroundClick}
          onTransitionEnd={handleTransitionEnd}
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
c          <div ref={popupRef} className="relative flex flex-col items-center gap-4 max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-12 right-0 text-white text-3xl z-10 hover:text-red-400 transition-colors"
            >
              ✕
            </button>
            {/* Navigation Arrows */}
            {filteredGallery.length > 1 && (
              <>
                <button
                  onClick={() => swipeImg("prv")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-blue-400 transition-colors bg-black/50 rounded-full p-2"
                >
                  ←
                </button>
                <button
                  onClick={() => swipeImg("nxt")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-blue-400 transition-colors bg-black/50 rounded-full p-2"
                >
                  →
                </button>
              </>
            )}
            {/* Image Display */}
            <div className="relative w-full h-[70vh] flex flex-col items-center justify-center">
              <Image
                src={filteredGallery[selectedImg]?.img || "/placeholder.svg"}
                alt={filteredGallery[selectedImg]?.title || "Gallery Image"}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            {/* Image Info */}
            <div className="text-center text-white max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">{filteredGallery[selectedImg]?.title}</h3>
              <div className="flex justify-center items-center gap-4 mb-3 text-white/80">
                <span className="flex items-center gap-1">
                  {getCategoryIcon(filteredGallery[selectedImg]?.category || "")}
                  {filteredGallery[selectedImg]?.category}
                </span>
                <span>•</span>
                <span>{filteredGallery[selectedImg]?.year}</span>
              </div>
              <p className="text-white/90">{filteredGallery[selectedImg]?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const GalleryPage = () => {
  return (
    <div className="relative">
      <Gallery />
    </div>
  )
}

export default GalleryPage
