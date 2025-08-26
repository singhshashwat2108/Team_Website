"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Rocket, Award, Filter, Calendar, X } from "lucide-react"
import FallingStars from "./FallingStars"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type GalleryItem = {
  images: string[]
  title: string
  year: string
  category: string
  description: string
}

// NOTE: Image filenames adjusted to match files in /public
const galleryData: GalleryItem[] = [
  {
    images: [
      "/img/gallery/Team picture/cover_pic.png",
      "/img/gallery/Team picture/Screenshot 2025-08-26 040757.png",
      "/img/gallery/Team picture/Screenshot 2025-08-26 040841.png",
    ],
    title: "Team Picture",
  year: "2025",
    category: "Team",
    description: "Recent team picture collection.",
  },
  {
    images: [
      "/img/gallery/exibitions in vit/cover_pic.jpg",
      "/img/gallery/exibitions in vit/IMG-20250826-WA0017.jpg",
      "/img/gallery/exibitions in vit/IMG-20250826-WA0020.jpg",
      "/img/gallery/exibitions in vit/IMG-20250826-WA0021.jpg",
      "/img/gallery/exibitions in vit/IMG-20250826-WA0022.jpg",
      "/img/gallery/exibitions in vit/IMG-20250826-WA0023.jpg",
      "/img/gallery/exibitions in vit/IMG-20250826-WA0024.jpg",
      "/img/gallery/exibitions in vit/Screenshot 2025-08-26 042557.png",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.18_39dc6859.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.19_1eedc66d.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.19_6a7edc1b.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.19_730c70e1.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.20_457bbf25.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.20_c93e483c.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.20_cd9c60c9.jpg",
      "/img/gallery/exibitions in vit/WhatsApp Image 2025-08-26 at 04.53.20_f8f5d856.jpg",
    ],
    title: "Exhibitions in VIT",
  year: "2025",
    category: "Competition",
    description: "Showcasing projects during campus exhibitions at VIT.",
  },
  {
    images: [
      "/img/gallery/IREC 2025/IREC_COVER.jpg",
      "/img/gallery/IREC 2025/IMG-20250806-WA0075.jpg",
      "/img/gallery/IREC 2025/IMG-20250806-WA0076.jpg",
      "/img/gallery/IREC 2025/IMG-20250806-WA0084.jpg",
      "/img/gallery/IREC 2025/IMG-20250806-WA0085.jpg",
      "/img/gallery/IREC 2025/IMG-20250806-WA0086.jpg",
      "/img/gallery/IREC 2025/IMG-20250806-WA0087.jpg",
      "/img/gallery/IREC 2025/IMG-20250807-WA0001.jpg",
      "/img/gallery/IREC 2025/IMG-20250807-WA0003.jpg",
      "/img/gallery/IREC 2025/IMG-20250807-WA0005.jpg",
    ],
    title: "IREC 2025",
    year: "2025",
    category: "Competition",
    description: "International Rocket Engineering Competition 2025.",
  },
  {
    images: [
      "/img/gallery/26 jan 2025/cover_pic.jpg",
      "/img/gallery/26 jan 2025/WhatsApp Image 2025-08-26 at 04.50.31_8127a2bd.jpg",
      "/img/gallery/26 jan 2025/WhatsApp Image 2025-08-26 at 04.50.31_d0268f67.jpg",
      "/img/gallery/26 jan 2025/WhatsApp Image 2025-08-26 at 04.50.32_694117d6.jpg",
    ],
  title: "repulic day2025 exibition in vit",
  year: "2025",
  category: "Competition",
  description: "Republic Day 2025 exhibition at VIT campus.",
  },
  {
    images: [
      "/img/gallery/Spaceport America Cup 2022/Screenshot 2025-08-26 041221.png",
      "/img/gallery/Spaceport America Cup 2022/Screenshot 2025-08-26 041232.png",
      "/img/gallery/Spaceport America Cup 2022/IMG-20250807-WA0008.jpg",
    ],
    title: "Spaceport America Cup 2022",
    year: "2022",
    category: "Competition",
    description: "Spaceport America Cup 2022 highlights.",
  },
  {
    images: [
      "/img/gallery/Spaceport America Cup 2023/cover_pic.jpg",
      "/img/gallery/Spaceport America Cup 2023/IMG-20250807-WA0012.jpg",
      "/img/gallery/Spaceport America Cup 2023/IMG-20250807-WA0014.jpg",
      "/img/gallery/Spaceport America Cup 2023/Screenshot 2025-08-26 040921.png",
      "/img/gallery/Spaceport America Cup 2023/Screenshot 2025-08-26 040932.png",
      "/img/gallery/Spaceport America Cup 2023/Screenshot 2025-08-26 040945.png",
      "/img/gallery/Spaceport America Cup 2023/SAC_4.jpg",
    ],
    title: "Spaceport America Cup 2023",
    year: "2023",
    category: "Competition",
    description: "Spaceport America Cup 2023 highlights.",
  },
  {
    images: [
      "/img/gallery/Techkriti 2024, IIT Kanpur– Showcased Work to Researchers and Scientists/cover_pic.jpg",
      "/img/gallery/Techkriti 2024, IIT Kanpur– Showcased Work to Researchers and Scientists/Screenshot 2025-08-26 041410.png",
      "/img/gallery/Techkriti 2024, IIT Kanpur– Showcased Work to Researchers and Scientists/Screenshot 2025-08-26 041421.png",
    ],
    title: "Techkriti 2024, IIT Kanpur– Showcased Work to Researchers and Scientists",
    year: "2024",
    category: "Competition",
    description: "Showcasing our work to researchers and scientists at IIT Kanpur.",
  },
  {
    images: [
      "/img/gallery/Our Labs/cover_pic.jpg",
      "/img/gallery/Our Labs/IMG-20250826-WA0010.jpg",
      "/img/gallery/Our Labs/IMG-20250826-WA0011.jpg",
      "/img/gallery/Our Labs/IMG-20250826-WA0012.jpg",
      "/img/gallery/Our Labs/IMG-20250826-WA0013.jpg",
    ],
  title: "Our Lab",
    year: "2025",
    category: "Research",
    description: "Behind the scenes inside our laboratory spaces.",
  },
]

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0) // which card
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0) // which image within stack
  const [imgPop, setImgPop] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedYear, setSelectedYear] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showYearFilters, setShowYearFilters] = useState<boolean>(true)
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(true)
  const popupRef = useRef<HTMLDivElement>(null)
  // (Swipe removed per request; using arrow buttons only)

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
      setSelectedImageIndex((prev) => {
        const images = filteredGallery[selectedItem].images
        return prev === 0 ? images.length - 1 : prev - 1
      })
    }
    if (moveType === "nxt") {
      setSelectedImageIndex((prev) => {
        const images = filteredGallery[selectedItem].images
        return prev === images.length - 1 ? 0 : prev + 1
      })
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
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        .arcane-font {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: white;
        }
        .montserrat-font {
          font-family: 'Montserrat', sans-serif;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredGallery.map((item: GalleryItem, i: number) => (
              <motion.div
                key={i}
        className="group cursor-pointer w-full max-w-[340px]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => {
                  setSelectedItem(i)
                  setSelectedImageIndex(0)
                  setImgPop(true)
                }}
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-xl border border-slate-200 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-blue-500/20 flex flex-col h-full text-sm"> {/* White background card */}
                  {/* Image (reduced height) */}
                  <div className="relative h-48 sm:h-52">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
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
                    {/* Image count badge */}
                    {item.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full tracking-wide">
                        {item.images.length} IMAGES
                      </div>
                    )}
                  </div>
                  {/* Content */}
          <div className="p-3 flex-grow flex flex-col justify-between min-h-[80px]"> {/* Reduced padding & min height */}
                    <div>
            <h3 className="text-slate-800 font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
            <p className="text-slate-500 text-xs mb-2 tracking-wide">
                        {item.category} • {item.year}
                      </p>
            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2"> {/* Adjusted sizing */}
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
          <div ref={popupRef} className="relative flex flex-col items-center gap-4 max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 md:-right-8 text-white z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            {/* Arrow Navigation */}
            {filteredGallery[selectedItem].images.length > 1 && (
              <>
                <button
                  onClick={() => swipeImg("prv")}
                  className="hidden sm:flex absolute -left-16 top-1/2 -translate-y-1/2 text-white z-20 hover:text-blue-300 transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full h-14 w-14 items-center justify-center shadow-lg"
                  aria-label="Previous image"
                >
                  <span className="text-2xl">&#8592;</span>
                </button>
                <button
                  onClick={() => swipeImg("nxt")}
                  className="hidden sm:flex absolute -right-16 top-1/2 -translate-y-1/2 text-white z-20 hover:text-blue-300 transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full h-14 w-14 items-center justify-center shadow-lg"
                  aria-label="Next image"
                >
                  <span className="text-2xl">&#8594;</span>
                </button>
                <div className="flex sm:hidden absolute inset-0 items-center justify-between px-2 pointer-events-none">
                  <button
                    onClick={(e) => { e.stopPropagation(); swipeImg("prv") }}
                    className="pointer-events-auto text-white bg-black/40 rounded-full p-2 hover:bg-black/60 backdrop-blur-sm border border-white/10"
                    aria-label="Previous image"
                  >
                    <span className="text-xl">&#8592;</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); swipeImg("nxt") }}
                    className="pointer-events-auto text-white bg-black/40 rounded-full p-2 hover:bg-black/60 backdrop-blur-sm border border-white/10"
                    aria-label="Next image"
                  >
                    <span className="text-xl">&#8594;</span>
                  </button>
                </div>
              </>
            )}
            {/* Image Display */}
            <div className="relative w-full flex flex-col items-center justify-center">
              <div className="relative w-full max-w-6xl md:h-[55vh] lg:h-[60vh] min-h-[260px] flex items-center justify-center">
                <Image
                  src={filteredGallery[selectedItem].images[selectedImageIndex] || "/placeholder.svg"}
                  alt={filteredGallery[selectedItem]?.title || "Gallery Image"}
                  fill
          sizes="(max-width:640px) 95vw, (max-width:1024px) 90vw, 1200px"
          className="object-contain rounded-lg shadow-2xl"
                  priority
                />
              </div>
              {filteredGallery[selectedItem].images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-1 rounded-full text-white text-xs">
                  {filteredGallery[selectedItem].images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx) }}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === selectedImageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Image Info */}
            <div className="text-center text-white max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">{filteredGallery[selectedItem]?.title}</h3>
              <div className="flex justify-center items-center gap-4 mb-3 text-white/80">
                <span className="flex items-center gap-1">
                  {getCategoryIcon(filteredGallery[selectedItem]?.category || "")}
                  {filteredGallery[selectedItem]?.category}
                </span>
                <span>•</span>
                <span>{filteredGallery[selectedItem]?.year}</span>
              </div>
              <p className="text-white/90">{filteredGallery[selectedItem]?.description}</p>
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
