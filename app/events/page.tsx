"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

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

export default function EventsPage() {
  const categories = ["All", "Competitions", "Workshops", "Outreach"]

  const upcomingEvents = [
    {
      title: "IREC 2025",
      category: "Competitions",
      date: "June 15-20, 2025",
      location: "Midland texas , USA",
      description:
        "Intercollegiate Rocket Engineering Competition, the world's largest collegiate rocket engineering competition.",
      image: "/placeholder.svg?height=800&width=1200",
      url: "https://example.com/irec",
    },
    {
      title: "CanSat Competition 2025",
      category: "Competitions",
      date: "April 5-7, 2025",
      location: "Texas, USA",
      description:
        "Design-Build-Fly competition for small satellite systems, challenging teams to fit all subsystems into a soda can-sized container.",
      image: "/placeholder.svg?height=800&width=1200",
      url: "https://example.com/cansat",
    },
    {
      title: "Aerospace Workshop Series",
      category: "Workshops",
      date: "March 10-15, 2025",
      location: "VIT Vellore",
      description:
        "A week-long workshop series covering rocket design, propulsion systems, avionics, and flight dynamics.",
      image: "/placeholder.svg?height=800&width=1200",
      url: "https://example.com/workshop",
    },
    {
      title: "School Outreach Program",
      category: "Outreach",
      date: "February 20, 2025",
      location: "Various Schools, Vellore",
      description:
        "Educational outreach program introducing high school students to rocketry and aerospace engineering.",
      image: "/placeholder.svg?height=800&width=1200",
      url: "https://example.com/outreach",
    },
  ]

  const pastEvents = [
    {
      title: "IREC 2024",
      category: "Competitions",
      date: "June 18-22, 2024",
      location: "New Mexico, USA",
      description: "Team Sammard placed in the top 10 at the Intercollegiate Rocket Engineering Competition.",
      image: "/placeholder.svg?height=800&width=1200",
      result: "Top 10 Finish",
    },
    {
      title: "InSpace CanSat 2024",
      category: "Competitions",
      date: "March 10-12, 2024",
      location: "Bangalore, India",
      description: "National-level CanSat competition where Team Sammard secured 2nd place.",
      image: "/placeholder.svg?height=800&width=1200",
      result: "2nd Place",
    },
    {
      title: "Rocket Propulsion Workshop",
      category: "Workshops",
      date: "January 15-16, 2024",
      location: "VIT Vellore",
      description: "Two-day workshop on rocket propulsion systems and performance optimization.",
      image: "/placeholder.svg?height=800&width=1200",
      result: "100+ Participants",
    },
    {
      title: "National Science Day Exhibition",
      category: "Outreach",
      date: "February 28, 2024",
      location: "VIT Vellore",
      description: "Exhibition showcasing Team Sammard's rockets and aerospace projects to inspire young students.",
      image: "/placeholder.svg?height=800&width=1200",
      result: "500+ Visitors",
    },
    {
      title: "US CanSat Competition 2023",
      category: "Competitions",
      date: "June 9-11, 2023",
      location: "Virginia, USA",
      description: "International CanSat competition where Team Sammard represented India.",
      image: "/placeholder.svg?height=800&width=1200",
      result: "Top 15 Finish",
    },
    {
      title: "Avionics Design Challenge",
      category: "Competitions",
      date: "April 5-7, 2023",
      location: "IIT Madras",
      description: "National competition focused on designing flight computers and telemetry systems.",
      image: "/placeholder.svg?height=800&width=1200",
      result: "1st Place",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-900">
      {/* Falling Stars Background */}
      <FallingStars />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden z-10">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/background.mp4" type="video/mp4" />
          {/* Fallback gradient if video fails to load */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-sky-800 to-blue-600" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex items-center justify-center relative z-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Events
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Join us on our journey through competitions, workshops, and outreach programs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Upcoming Events</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Discover our upcoming competitions, workshops, and community engagement activities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="All" className="w-full">
              <div className="flex justify-center mb-12">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-1">
                  <TabsList className="bg-transparent border-0">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="data-[state=active]:bg-blue-600/80 data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {upcomingEvents
                      .filter((event) => category === "All" || event.category === category)
                      .map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 rounded-lg overflow-hidden flex flex-col h-full"
                        >
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                <Badge className="bg-blue-600/80 text-white border-blue-400/30">
                                  {event.category}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-white/80 mb-4 flex-grow">{event.description}</p>
                            <div className="space-y-2 mb-6">
                              <div className="flex items-center gap-2 text-sm text-white/70">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-white/70">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                className="w-full backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30" 
                                asChild
                              >
                                <a href={event.url} target="_blank" rel="noopener noreferrer">
                                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Event</h2>
          </motion.div>
          
          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="relative h-[400px] rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="IREC Competition"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Intercollegiate Rocket Engineering Competition (IREC) 2025</h3>
                <p className="text-white/80 mb-6">
                  The world's largest collegiate rocket engineering competition, bringing together teams from around the
                  globe to launch solid, liquid, and hybrid rockets to target altitudes of 10,000 or 30,000 feet.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { icon: Calendar, label: "Date", value: "June 15-20, 2025" },
                    { icon: MapPin, label: "Location", value: "Spaceport America, New Mexico, USA" },
                    { icon: Clock, label: "Registration Deadline", value: "January 31, 2025" },
                    { icon: Users, label: "Team Size", value: "10-15 members" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <item.icon className="h-5 w-5 text-blue-300" />
                      <div>
                        <h4 className="font-bold text-white">{item.label}</h4>
                        <p className="text-white/70">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
                    asChild
                  >
                    <a href="https://example.com/irec" target="_blank" rel="noopener noreferrer">
                      Official Website <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Past Events</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Celebrating our achievements and milestones in aerospace competitions and community engagement
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 rounded-lg overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={event.image || "/placeholder.svg"} 
                    alt={event.title} 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-blue-600/80 text-white px-3 py-1 text-sm font-medium rounded-full border border-blue-400/30">
                    {event.result}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <Badge className="bg-blue-600/80 text-white border-blue-400/30 mb-4 w-fit">
                    {event.category}
                  </Badge>
                  <p className="text-white/80 mb-4 flex-grow">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}