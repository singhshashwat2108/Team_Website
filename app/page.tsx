"use client";

import GalleryPage from "@/components/Gallery";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Rocket, Award, Calendar, Clock, Users, Sparkles, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import FallingStars from "@/components/FallingStars"; // Imported from components
import TypingText from "@/components/typing-text"; // Imported from components
import RocketCarousel from "@/components/rocket-carasoul"; // Imported from components

export default function Home() {
const [typingComplete, setTypingComplete] = useState(false)
const [isCarouselPaused, setIsCarouselPaused] = useState(false)

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
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Background.mp4" type="video/mp4" />
        {/* Fallback gradient if video fails to load */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-sky-800 to-blue-600" />
      </video>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="container relative z-20 mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mb-8 arcane-font"
          initial={{ opacity: 0 }} // Start with opacity 0 for the whole paragraph
          animate={{ opacity: 1 }} // Fade in the paragraph
          transition={{ duration: 1, ease: "easeOut" }} // Faster fade in for the container
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }} // Appear after a short delay
          >
            <b>"</b>
          </motion.span>
          <TypingText
            text="Give your dream some space to unfold"
            delay={70} // Adjust typing speed here
            className="inline-block" // Keep it inline with quotes
            onTypingComplete={() => setTypingComplete(true)}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }} // Appear after a short delay
          >
            <b>"</b>
          </motion.span>
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: typingComplete ? 1 : 0 }} // Only animate buttons after typing is complete
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: typingComplete ? 0.5 : 0, // Delay only if typing is complete
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
              asChild
            >
              <Link href="/projects" className="flex items-center whitespace-nowrap">
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
              <Link href="/about" className="flex items-center whitespace-nowrap">
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
            <h2 className="ml-6 text-3xl md:text-4xl font-bold mb-6 text-white">Who We Are</h2>
            <p className="ml-6 text-white/90 mb-6">
              Team Sammard is a student based aerospace team dedicated to revolutionizing space technology in india through innovation, research and development. We focus on developing and designing high power sounding rockets, payloads and cannister satelites.
            </p>
            <p className="ml-6 text-white/90 text-sm sm:text-base">
              Based at VIT Vellore's Innovation Creation Lab, we foster a collaborative environment where students can apply
              theoretical knowledge to practical aerospace challenges, preparing the next generation of aerospace
              engineers.
            </p>
            <Button className="mt-6 ml-6 backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30" asChild>
              <Link href="/about" className="flex items-center whitespace-nowrap">
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Our Rocket Fleet</h2>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
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
              description: "Miniature satellite system designed to carry out scientific experiments.",
              icon: <Sparkles className="h-10 w-10 text-blue-200" />,
            },
            {
              title: "Propulsion Research",
              description: "Cutting-edge research and development of rocket propulsion systems.",
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
                <Link href="/projects" className="flex items-center whitespace-nowrap">Learn More</Link>
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
            <Link href="/projects" className="flex items-center whitespace-nowrap">
              View All Projects <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
    {/* Events Preview */}
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
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Upcoming Events</h2>
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
        className="backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg p-6 flex flex-col"
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
        <Link href="/events" className="flex items-center whitespace-nowrap">
          View All Events <Calendar className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  </div>
</section>

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
    <div className="relative overflow-hidden">
      <div
        className="flex gap-8 items-center animate-scroll"
        style={{
          width: "max-content",
          animationPlayState: isCarouselPaused ? "paused" : "running",
          animationDuration: "65s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationName: "scrollLogos",
        }}
      >
        {/* First set of logos */}
        {[1, 2, 3, 4, 5, 6, 7].map((sponsor) => (
          <motion.div
            key={`first-${sponsor}`}
            className="backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-lg p-8 w-56 h-32 flex items-center justify-center flex-shrink-0 cursor-pointer border border-white/10"
            whileHover={{
              scale: 1.2,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            onHoverStart={() => setIsCarouselPaused(true)}
            onHoverEnd={() => setIsCarouselPaused(false)}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={`/img/sponsor/${sponsor}.png?height=160&width=280`}
              alt={`Sponsor ${sponsor}`}
              width={160}
              height={80}
              className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        ))}

        {/* Second set for seamless loop */}
        {[1, 2, 3, 4, 5, 6, 7].map((sponsor) => (
          <motion.div
            key={`second-${sponsor}`}
            className="backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-lg p-8 w-56 h-32 flex items-center justify-center flex-shrink-0 cursor-pointer border border-white/10"
            whileHover={{
              scale: 1.2,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            onHoverStart={() => setIsCarouselPaused(true)}
            onHoverEnd={() => setIsCarouselPaused(false)}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={`/img/sponsor/${sponsor}.png?height=160&width=280`}
              alt={`Sponsor ${sponsor}`}
              width={160}
              height={80}
              className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        ))}

        {/* Third set for seamless loop */}
        {[1, 2, 3, 4, 5, 6, 7].map((sponsor) => (
          <motion.div
            key={`third-${sponsor}`}
            className="backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-lg p-8 w-56 h-32 flex items-center justify-center flex-shrink-0 cursor-pointer border border-white/10"
            whileHover={{
              scale: 1.2,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            onHoverStart={() => setIsCarouselPaused(true)}
            onHoverEnd={() => setIsCarouselPaused(false)}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={`/img/sponsor/${sponsor}.png?height=160&width=280`}
              alt={`Sponsor ${sponsor}`}
              width={160}
              height={80}
              className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        ))}
      </div>
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
        <Link href="/sponsors" className="flex items-center whitespace-nowrap">
          View All Sponsors <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  </div>
</section>

<style dangerouslySetInnerHTML={{
  __html: `
    @keyframes scrollLogos {
      0% { transform: translateX(0px); }
      100% { transform: translateX(-1400px); }
    }
  `
}} />
  </div>
);
}
