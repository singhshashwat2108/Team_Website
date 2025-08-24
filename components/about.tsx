"use client"
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef} from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Award, Users, School, Linkedin } from 'lucide-react'
import { Code, Wrench, Brain, Target, Globe, Cog, RocketIcon, Database, Cable, CircuitBoard, UsersIcon, Megaphone, Handshake, Heart, User, Monitor, Cpu } from 'lucide-react'
import { motion } from "framer-motion"

// Star interface for TypeScript
interface Star {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

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

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedYear, setSelectedYear] = useState("2024-2025")
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastScrollTime = useRef(0)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container
  const scrollAccumulator = useRef(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    handleResize() // Check initial size
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const teamData = {
    "2022-2023": [
      {
        name: "Robert Chen",
        role: "President",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/robertchen",
        review: "Robert's leadership laid a strong foundation for our early initiatives and community engagement.",
      },
      {
        name: "Maria Garcia",
        role: "Vice President",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Maria was instrumental in shaping our internal processes and fostering team cohesion.",
      },
      {
        name: "Kevin Park",
        role: "Secretary",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Kevin meticulously managed our records and ensured smooth communication across all departments.",
      },
      {
        name: "Jennifer Liu",
        role: "Treasurer",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Jennifer's financial acumen was key to our early growth and resource management.",
      },
      {
        name: "Thomas Wright",
        role: "Events Director",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Thomas brought our events to life, creating memorable experiences for our members and partners.",
      },
      {
        name: "Sophia Adams",
        role: "Marketing Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Sophia's creative marketing strategies significantly boosted our visibility and outreach.",
      },
      {
        name: "Daniel Foster",
        role: "Tech Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Daniel spearheaded our technical projects, ensuring robust and innovative solutions.",
      },
      {
        name: "Rachel Green",
        role: "Operations",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Rachel's organizational skills kept our operations running smoothly and efficiently.",
      },
      {
        name: "Marcus Johnson",
        role: "Partnerships",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Marcus forged crucial partnerships that expanded our network and opportunities.",
      },
      {
        name: "Isabella Torres",
        role: "Community Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Isabella built a vibrant and engaged community, making everyone feel welcome.",
      },
    ],
    "2023-2024": [
      {
        name: "Andrew Miller",
        role: "President",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Andrew's vision propelled us into a new era of innovation and strategic growth.",
      },
      {
        name: "Priya Patel",
        role: "Vice President",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Priya's dedication to excellence ensured high standards across all our projects.",
      },
      {
        name: "Jordan Smith",
        role: "Secretary",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Jordan's meticulous record-keeping and communication were vital for our organization.",
      },
      {
        name: "Hannah Lee",
        role: "Treasurer",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Hannah's financial stewardship allowed us to invest in key areas for future development.",
      },
      {
        name: "Carlos Rodriguez",
        role: "Events Director",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Carlos organized impactful events that strengthened our community and showcased our work.",
      },
      {
        name: "Olivia Thompson",
        role: "Marketing Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Olivia's innovative marketing campaigns significantly broadened our reach and appeal.",
      },
      {
        name: "Ethan Davis",
        role: "Tech Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Ethan led our technical advancements, pushing the boundaries of what we could achieve.",
      },
      {
        name: "Zoe Williams",
        role: "Operations",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Zoe's operational expertise streamlined our processes, making us more efficient.",
      },
      {
        name: "Nathan Brown",
        role: "Partnerships",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Nathan's strategic partnerships opened new doors and collaborations for our team.",
      },
      {
        name: "Chloe Martinez",
        role: "Community Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Chloe fostered a supportive and engaging environment for all our members.",
      },
    ],
    "2024-2025": [
      {
        name: "Prithvi Raj Singh",
        role: "Captain",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/prithvirajsingh",
        review: "Prithvi leads Team Sammard with dedication and expertise in aerospace engineering and innovation.",
      },
      {
        name: "Jermy Kanniyakonil Varkey",
        role: "Head of Operations",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/jermykanniyakonilvarkey",
        review:
          "Jermy ensures the smooth functioning of all team operations, optimizing efficiency and resource allocation.",
      },
      {
        name: "Anshu Kumar",
        role: "Management Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/anshukumar",
        review: "Anshu oversees project management and team coordination, driving our initiatives forward.",
      },
      {
        name: "Vishvak Narayanan",
        role: "Mechanical Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/vishvaknarayanan",
        review: "Vishvak leads the mechanical design and fabrication, bringing our rocket concepts to life.",
      },
      {
        name: "Chanakya Acharya",
        role: "Mechanical Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/chanakyaacharya",
        review: "Chanakya provides senior expertise in mechanical systems, mentoring junior members.",
      },
      {
        name: "Ansu Banerjee",
        role: "IREC Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/ansubanerjee",
        review: "Ansu is at the forefront of our IREC competition efforts, ensuring compliance and performance.",
      },
      {
        name: "Joanna Suzan Biju",
        role: "CANSAT Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/joannasuzanbiju",
        review: "Joanna spearheads our CANSAT project, integrating complex systems into compact designs.",
      },
      {
        name: "Aryan Bhirud",
        role: "CS Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/aryanbhirud",
        review: "Aryan leads the computer science division, designing and developing the digital brain behind the rocket.",
      },
      {
        name: "B Keertana",
        role: "CS Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/bkeertana",
        review: "Keertana contributes senior-level programming skills, enhancing our software capabilities.",
      },
      {
        name: "Syed Zeeshan Ahmed",
        role: "CS Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/syedzeeshanahmed",
        review: "Zeeshan provides advanced CS support, crucial for complex simulations and system integration.",
      },
      {
        name: "Shyam Rajendran",
        role: "Electronics Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/shyamrajendran",
        review:
          "Shyam designs and implements the electronic systems, ensuring reliable flight control and data acquisition.",
      },
      {
        name: "Kapileshwar Shrikanth",
        role: "R&D Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/kapileshwarshrikanth",
        review: "Kapileshwar drives our research and development, exploring new technologies for future projects.",
      },
      {
        name: "Sunsitha Varshini P",
        role: "Electronics Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/sunsithavarshinip",
        review: "Sunsitha offers senior expertise in electronics, troubleshooting and optimizing our circuits.",
      },
      {
        name: "Mukul Sharma",
        role: "Electronics Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mukulsharma",
        review: "Mukul provides advanced electronics support, ensuring the robustness of our systems.",
      },
      {
        name: "Ranjith",
        role: "Electronics Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/ranjith",
        review: "Ranjith's senior electronics knowledge is vital for the intricate wiring and sensor integration.",
      },
    ],
  }
  const currentTeam = teamData[selectedYear as keyof typeof teamData]
  const missionYears = [
    { year: "2024-2025", status: "Active Mission", color: "text-green-400" },
    { year: "2023-2024", status: "Completed", color: "text-blue-400" },
    { year: "2022-2023", status: "Archived", color: "text-slate-400" },
  ]

  // Reset current index when year changes
  useEffect(() => {
    setCurrentIndex(0)
    scrollAccumulator.current = 0
  }, [selectedYear])

  // Get member data for infinite scroll
  const getMemberAtIndex = (index: number) => {
    const normalizedIndex = ((index % currentTeam.length) + currentTeam.length) % currentTeam.length
    return currentTeam[normalizedIndex]
  }

  const getDomainLogo = (role: string) => {
    const roleLower = role.toLowerCase()
    // Specific role mappings as requested
    if (roleLower.includes("irec") || roleLower.includes("cansat")) return RocketIcon
    if (roleLower.includes("management lead")) return User
    if (roleLower.includes("cs") && (roleLower.includes("lead") || roleLower.includes("senior"))) return Monitor
    if (roleLower.includes("mechanical") && roleLower.includes("senior")) return Wrench
    if (roleLower.includes("electronics") && (roleLower.includes("lead") || roleLower.includes("senior"))) return Cable
    // General technical roles
    if (roleLower.includes("tech") || roleLower.includes("software")) return Code
    if (roleLower.includes("mechanical") || roleLower.includes("design")) return Wrench
    if (roleLower.includes("r&d") || roleLower.includes("research")) return Brain
    // Leadership roles
    if (roleLower.includes("captain") || roleLower.includes("president") || roleLower.includes("lead")) return Target
    if (roleLower.includes("operations")) return Cog
    if (roleLower.includes("vice") || roleLower.includes("secretary")) return Database
    if (roleLower.includes("treasurer") || roleLower.includes("finance")) return Database
    // Specialized roles
    if (roleLower.includes("events") || roleLower.includes("director")) return UsersIcon
    if (roleLower.includes("marketing") || roleLower.includes("outreach")) return Megaphone
    if (roleLower.includes("partnerships") || roleLower.includes("business")) return Handshake
    if (roleLower.includes("community")) return Heart
    // Default
    return Globe
  }

  // Horizontal scroll navigation with accumulator for less sensitivity
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll or when shift is pressed with vertical scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault()
        const now = Date.now()
        // Increased debounce time for less sensitivity
        if (now - lastScrollTime.current < 150) return
        const deltaX = e.deltaX || e.deltaY // Use deltaY when shift is pressed
        // Accumulate scroll delta - require more scroll to trigger change
        scrollAccumulator.current += deltaX

        // Increased threshold for less sensitivity (was immediate, now requires 100+ accumulated scroll)
        const threshold = 120
        if (Math.abs(scrollAccumulator.current) >= threshold) {
          if (scrollAccumulator.current > 0) {
            // Scroll right - next card (infinite)
            setCurrentIndex((prev) => prev + 1)
          } else {
            // Scroll left - previous card (infinite)
            setCurrentIndex((prev) => prev - 1)
          }
          // Reset accumulator and update last scroll time
          scrollAccumulator.current = 0
          lastScrollTime.current = now
        }
      }
    }
    const cardContainer = cardContainerRef.current
    if (cardContainer) {
      cardContainer.addEventListener("wheel", handleWheel, { passive: false })
      return () => {
        cardContainer.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentTeam.length])

  // Touch/swipe navigation for mobile with less sensitivity
  useEffect(() => {
    let startX = 0
    let startY = 0
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = startX - endX
      const diffY = startY - endY
      // Increased threshold for less sensitivity (was 50px, now 80px)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
        if (diffX > 0) {
          // Swipe left - next card (infinite)
          setCurrentIndex((prev) => prev + 1)
        } else {
          // Swipe right - previous card (infinite)
          setCurrentIndex((prev) => prev - 1)
        }
      }
      startX = 0
      startY = 0
    }
    const cardContainer = cardContainerRef.current
    if (cardContainer) {
      cardContainer.addEventListener("touchstart", handleTouchStart)
      cardContainer.addEventListener("touchend", handleTouchEnd)
      return () => {
        cardContainer.removeEventListener("touchstart", handleTouchStart)
        cardContainer.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentTeam.length])

  const getCardStyle = (relativeIndex: number) => {
    const absIndex = Math.abs(relativeIndex)
    // Spread cards to both sides based on their relative position
    const baseTransform = relativeIndex * (isMobile ? 60 : 80)
    const scale = 1 - absIndex * (isMobile ? 0.15 : 0.12)
    const zIndex = 10 - absIndex
    const opacity = absIndex === 0 ? 1 : 0.7 - absIndex * 0.2
    const blur = absIndex > 0 ? `blur(${absIndex * 1.5}px)` : "none"
    return {
      transform: `translateX(${baseTransform}px) translateY(${absIndex * (isMobile ? 10 : 8)}px) scale(${scale})`,
      zIndex,
      opacity: Math.max(opacity, 0.3),
      filter: blur,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-900">
      {/* Falling Stars Background */}
      <FallingStars />

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="ml-4 text-2xl sm:text-3xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">Our Mission</h2>
              <p className="ml-4 text-white/90 mb-4 sm:mb-6 text-sm sm:text-base">
                Team Sammard is dedicated to pushing the boundaries of amateur rocketry and aerospace innovations in India.
                Our mission is to enhance the technical and professional growth of our members through hands-on, project-based learning. We design and build high-performance launch vehicles for intercollegiate rocketry competitions, while also developing propulsion systems, avionics hardware and software, and other advanced aerospace technologies.
              </p>
              <p className="ml-4 text-white/90 text-sm sm:text-base">
                Based at VIT Vellore's Innovation Creation Lab, we foster a collaborative environment where students can apply
                theoretical knowledge to practical aerospace challenges, preparing the next generation of aerospace
                engineers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="min-h-screen backdrop-blur-sm bg-white/5 flex items-center justify-center relative z-10">
        <motion.div
          className="text-center text-white max-w-4xl px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8">Our Legacy</h2>
          <p className="text-xl leading-relaxed text-white/90 mb-6">
            Over the years, our organization has been led by exceptional individuals who have shaped our mission and
            values. Each board has brought unique perspectives and achievements that continue to inspire our community.
          </p>
        </motion.div>
      </section>

      {/* Main Team Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-6 sm:mb-8 tracking-wider px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MEET OUR TEAM
        </motion.h1>

        {/* Mission Control Dropdown */}
        <motion.div
          ref={dropdownRef}  
          className="mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent w-32 mx-auto"></div>
          </div>
          <div className="relative max-w-xs mx-auto">
            {/* Dropdown Trigger */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border-2 border-slate-600 hover:border-blue-500 rounded-xl px-6 py-4 flex items-center justify-between transition-all duration-300 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="text-left">
                  <div className="text-xs text-slate-400 font-medium">MISSION YEAR</div>
                  <div className="text-white font-bold">{selectedYear}</div>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                <div className="p-2">
                  <div className="text-xs text-slate-400 font-medium px-3 py-2 border-b border-slate-700">
                    SELECT MISSION YEAR
                  </div>
                  {missionYears.map((mission, index) => (
                    <button
                      key={mission.year}
                      onClick={() => {
                        setSelectedYear(mission.year)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 ${
                        selectedYear === mission.year
                          ? "bg-blue-600/20 border border-blue-500/30"
                          : "hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Rocket
                            className={`h-4 w-4 transition-all duration-200 ${
                              selectedYear === mission.year ? "text-blue-400" : "text-slate-500"
                            }`}
                          />
                          {selectedYear === mission.year && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-white font-semibold text-sm">{mission.year}</div>
                          <div className={`text-xs ${mission.color}`}>{mission.status}</div>
                        </div>
                      </div>
                      {selectedYear === mission.year && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                    </button>
                  ))}
                </div>
                {/* Launch Sequence Footer */}
              </div>
            )}
          </div>
        </motion.div>

        {/* Team Layout - Conditional Rendering */}
        <div className="relative w-full max-w-6xl mx-auto p-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">BATCH OF {selectedYear}</h2>
            <div className="w-20 md:w-24 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-2">
              Navigate through our team using horizontal scroll
            </p>
          </motion.div>
          <motion.div
            ref={cardContainerRef}
            className="relative h-[400px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Stacked Cards - Infinite */}
            <div className="relative w-72 h-[420px] sm:w-80 sm:h-[520px]">
              {[-3, -2, -1, 0, 1, 2, 3].map((relativeIndex) => {
                const member = getMemberAtIndex(currentIndex + relativeIndex)
                return (
                  <Card
                    key={`${selectedYear}-${currentIndex + relativeIndex}`}
                    className="absolute inset-0 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20"
                    style={getCardStyle(relativeIndex)}
                    onClick={() => setCurrentIndex(currentIndex + relativeIndex)}
                  >
                    <CardContent className="p-0 h-full">
                      <div className="h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-xl relative overflow-hidden shadow-2xl border border-slate-600/50">
                        {/* Enhanced Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-6 right-6 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
                          <div className="absolute bottom-6 left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
                          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-400/5 rounded-full blur-lg"></div>
                        </div>
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col text-white">
                          {/* Large rectangular image at top with thick border */}
                          <div className="p-2">
                            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-lg border-4 border-blue-400/60">
                              <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          {/* Content below image */}
                          <div className="p-3 flex flex-col">
                            {/* Name and role */}
                            <div className="text-center mb-2">
                              <h3 className="text-lg sm:text-xl font-bold mb-1">{member.name}</h3>
                              <p className="text-blue-300 text-sm font-medium">{member.role}</p>
                            </div>
                            {/* Domain Logo and LinkedIn stacked vertically */}
                            <div className="flex flex-col items-center gap-4 mb-2">
                              {/* Domain Logo */}
                              <div className="bg-slate-700/30 rounded-md p-2 border border-blue-400/30">
                                {(() => {
                                  const LogoComponent = getDomainLogo(member.role)
                                  return <LogoComponent className="h-6 w-6 text-blue-400" />
                                })()}
                              </div>
                              {/* LinkedIn icon below */}
                              {member.linkedinUrl && (
                                <a
                                  href={member.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                                >
                                  <Linkedin className="h-4 w-4 text-white" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          {/* Enhanced Indicators - Show relative position */}
          <motion.div
            className="flex justify-center mt-12 space-x-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {currentTeam.map((_, index) => {
              const normalizedCurrent = ((currentIndex % currentTeam.length) + currentTeam.length) % currentTeam.length
              return (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === normalizedCurrent
                      ? "bg-blue-400 w-8 shadow-lg shadow-blue-400/50"
                      : "bg-slate-600 w-3 hover:bg-slate-500"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              )
            })}
          </motion.div>

          {/* Current Member Detailed Info */}
          <motion.div
            className="text-center mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-600/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Rocket className="h-5 w-5 text-blue-400" />
              <span className="text-slate-400 text-sm font-medium">CURRENT SELECTION</span>
              <Rocket className="h-5 w-5 text-blue-400 rotate-180" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{getMemberAtIndex(currentIndex).name}</h3>
            <p className="text-blue-400 font-semibold text-lg mb-3">{getMemberAtIndex(currentIndex).role}</p>
            <p className="text-slate-300 text-base leading-relaxed max-w-md mx-auto">
              {getMemberAtIndex(currentIndex).review}
            </p>
            <div className="mt-4 text-slate-400 text-sm">
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
