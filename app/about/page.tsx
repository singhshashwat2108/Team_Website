"use client"
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef} from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Award, Users, School, Linkedin } from "lucide-react"

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedYear, setSelectedYear] = useState("2024-2025")
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  //const [isCircleHovered, setIsCircleHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastScrollTime = useRef(0)
  const cardContainerRef = useRef<HTMLDivElement>(null)
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
        image: "/prithvi2.png?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Prithvi leads Team Sammard with dedication and expertise in aerospace engineering and innovation.",
      },
      {
        name: "Jermy Kanniyakonil Varkey",
        role: "Head of Operations",
        image: "/jermy.png?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review:
          "Jermy ensures the smooth functioning of all team operations, optimizing efficiency and resource allocation.",
      },
      {
        name: "Anshu Kumar",
        role: "Management Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Anshu oversees project management and team coordination, driving our initiatives forward.",
      },
      {
        name: "Vishvak Narayanan",
        role: "Mechanical Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Vishvak leads the mechanical design and fabrication, bringing our rocket concepts to life.",
      },
      {
        name: "Chanakya Acharya",
        role: "Mechanical Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Chanakya provides senior expertise in mechanical systems, mentoring junior members.",
      },
      {
        name: "Ansu Banerjee",
        role: "IREC Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Ansu is at the forefront of our IREC competition efforts, ensuring compliance and performance.",
      },
      {
        name: "Joanna Suzan Biju",
        role: "CANSAT Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Joanna spearheads our CANSAT project, integrating complex systems into compact designs.",
      },
      {
        name: "Aryan Bhirud",
        role: "CS Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Aryan leads the computer science division, designing and developing the digital brain behind the rocket.",
      },
      {
        name: "B Keertana",
        role: "CS Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Keertana contributes senior-level programming skills, enhancing our software capabilities.",
      },
      {
        name: "Syed Zeeshan Ahmed",
        role: "CS Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Zeeshan provides advanced CS support, crucial for complex simulations and system integration.",
      },
      {
        name: "Shyam Rajendran",
        role: "Electronics Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review:
          "Shyam designs and implements the electronic systems, ensuring reliable flight control and data acquisition.",
      },
      {
        name: "Kapileshwar Shrikanth",
        role: "R&D Lead",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Kapileshwar drives our research and development, exploring new technologies for future projects.",
      },
      {
        name: "Sunsitha Varshini P",
        role: "Electronics Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Sunsitha offers senior expertise in electronics, troubleshooting and optimizing our circuits.",
      },
      {
        name: "Mukul Sharma",
        role: "Electronics Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
        review: "Mukul provides advanced electronics support, ensuring the robustness of our systems.",
      },
      {
        name: "Ranjith",
        role: "Electronics Senior",
        image: "/placeholder.svg?height=200&width=200",
        linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
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
      cardContainer.addEventListener("touchstart",handleTouchStart)
      cardContainer.addEventListener("touchend", handleTouchEnd)
      return () => {
        cardContainer.removeEventListener("touchstart", handleTouchStart)
        cardContainer.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentTeam.length])

  const getCardStyle = (relativeIndex: number) => {
    const absIndex = Math.abs(relativeIndex)

    //if (absIndex > 3) return { display: "none" }

    // Spread cards to both sides based on their relative position
    const baseTransform = relativeIndex * (isMobile ? 60 : 80) 
    const scale = 1 - absIndex *  (isMobile ? 0.15 : 0.12) 
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative pb-20">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 -z-10"></div>      
      
       {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Mission</h2>
              <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Team Sammard is dedicated to pushing the boundaries of amateur rocketry and aerospace innovations in India.
                Our mission is to enhance the technical and professional growth of our members through hands-on, project-based learning. We design and build high-performance launch vehicles for intercollegiate rocketry competitions, while also developing propulsion systems, avionics hardware and software, and other advanced aerospace technologies.


                strive to provide hands-on engineering experience to students while competing at the highest levels of
                collegiate rocketry competitions.
              </p>
              <p className="text-slate-300 text-sm sm:text-base">
                Based at VIT Vellore's Innovation Creation Lab, we foster a collaborative environment where students can apply
                theoretical knowledge to practical aerospace challenges, preparing the next generation of aerospace
                engineers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 flex flex-col items-center text-center border border-slate-600/50">
                <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Innovation</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Pushing the boundaries of collegiate aerospace engineering
                </p>
              </div>
              <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 flex flex-col items-center text-center border border-slate-600/50">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Collaboration</h3>
                <p className="text-xs sm:text-sm text-slate-300">Working together to achieve extraordinary results</p>
              </div>
              <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 flex flex-col items-center text-center border border-slate-600/50">
                <School className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Education</h3>
                <p className="text-xs sm:text-sm text-slate-300">Providing hands-on learning experiences</p>
              </div>
              <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 sm:gap-4 flex flex-col items-center text-center border border-slate-600/50">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Excellence</h3>
                <p className="text-xs sm:text-sm text-slate-300">Striving for the highest standards in all we do</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Additional Content for Scrolling */}
      <div className="min-h-screen bg-slate-900/50 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-6">
          <h2 className="text-4xl font-bold mb-8">Our Legacy</h2>
          <p className="text-xl leading-relaxed text-slate-300 mb-6">
            Over the years, our organization has been led by exceptional individuals who have shaped our mission and
            values. Each board has brought unique perspectives and achievements that continue to inspire our community.
          </p>
          
        </div>
      </div>

      {/* Navigation Header
      <nav className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-sm">J</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-white font-medium">
          <a href="#" className="hover:text-blue-400 transition-colors">
            HOME
          </a>
          <a href="#" className="text-blue-400">
            ABOUT
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            PROJECTS
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            EVENTS
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            TIMELINE
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            SPONSORS
          </a>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Contact Us</Button>
      </nav>
            
      */}
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-6 sm:mb-8 tracking-wider px-4">
          MEET OUR TEAM
        </h1>
        {/* Mission Control Dropdown */}
        <div className="mb-8 sm:mb-12 px-4">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center space-x-2 mb-2">
              <Rocket className="h-4 w-4 text-blue-400" />
              <span className="text-white/80 text-sm font-medium">MISSION CONTROL</span>
              <Rocket className="h-4 w-4 text-blue-400 rotate-180" />
            </div>
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
                <div className="bg-slate-900/50 px-3 py-2 border-t border-slate-700">
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    <span>SYSTEMS OPERATIONAL</span>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Team Layout - Conditional Rendering */}
        <div className="relative w-full max-w-6xl mx-auto p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">BATCH OF {selectedYear}</h2>
            <div className="w-20 md:w-24 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-2">
              Navigate through our team using horizontal scroll
            </p>
            
          </div>
          <div
            ref={cardContainerRef}
            className="relative h-[400px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            
            {/* Stacked Cards - Infinite */}
            <div className="relative w-64 h-80 sm:w-96 sm:h-96">
              {" "}
              {/* Adjusted size for mobile */}
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
                        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{member.name}</h3>
                              <p className="text-blue-300 text-sm sm:text-base font-medium">{member.role}</p>
                              <div className="mt-2 sm:mt-4 flex items-center space-x-2">
                                <Rocket className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                <span className="text-slate-300 text-xs sm:text-sm">Team Sammard</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-end justify-between mt-4 sm:mt-6">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-400/40 shadow-lg">
                              <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* LinkedIn Icon */}
                            {member.linkedinUrl && (
                              <a
                                href={member.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 transition-colors duration-200"
                                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking icon
                                aria-label={`Visit ${member.name}'s LinkedIn profile`}
                              >
                                <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-300" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
          {/* Enhanced Indicators - Show relative position */}
          <div className="flex justify-center mt-12 space-x-3">
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
          </div>
          {/* Current Member Detailed Info */}
          <div className="text-center mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-600/50">
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
          </div>
        </div>
      </div>
      
    </div>
  )
}
