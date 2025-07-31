"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Rocket, Award, Calendar, Clock, Users, Sparkles } from "lucide-react"
import RocketModel from "@/components/rocket-model"
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-900">
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
          <source src="/video/blackhole.mp4" type="video/mp4" />
          {/* Fallback gradient if video fails to load */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-sky-800 to-blue-600" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container relative z-20 mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mb-8 font-light"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.5,
            }}
          >
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.5 }}>
              <b>"</b>
            </motion.span>
            Give your dream some space to grow
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.5 }}>
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
              delay: 2,
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

      {/* 3D Rocket Model Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Latest Rocket</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Explore our latest rocket design in 3D. Drag to rotate and scroll to zoom.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="flex ml-8 h-[500px] w-[1200px] backdrop-blur-md bg-white/5 border border-white/10 rounded-lg mx-4 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mt-7 ml-8 h-[450px] w-[500px] backdrop-blur-md bg-white/5 border border-white/10 rounded-lg mx-4 relative z-10">
            <RocketModel/>
          </div>
          <div className="mt-7 ml-8 h-[450px] w-[800px] backdrop-blur-md bg-white/5 border border-white/10 rounded-lg mx-4 relative z-10">
            {/* Content for the right side can go here */}
          </div>
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

      {/* Timeline Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Journey</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-12">
                From our founding to our latest achievements, explore the Team Sammard timeline.
              </p>
            </motion.div>
          </div>
          <div className="flex justify-center">
            <div className="relative border-l border-blue-300 pl-8 py-4 max-w-xl">
              {[
                { year: "2023", event: "IREC Competition Finalist" },
                { year: "2021", event: "First successful high-altitude rocket launch" },
                { year: "2019", event: "CanSat Competition Top 10" },
                { year: "2017", event: "Team Sammard Founded" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="mb-8 relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-blue-300"></div>
                  <h3 className="text-xl font-bold mb-1 text-white">{item.year}</h3>
                  <p className="text-white/80">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/timeline">
                View Complete Timeline <Clock className="ml-2 h-4 w-4" />
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

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Join Our Journey to the Stars</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Whether you're interested in joining the team, becoming a sponsor, or learning more about our projects,
              we'd love to hear from you.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}