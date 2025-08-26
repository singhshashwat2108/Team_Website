"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Rocket, Satellite, Cpu, Wrench, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ProjectDetailsModal from "@/components/project_detail" // Import the new modal component

// Star interface for TypeScript
interface Star {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

// Project data interface (updated to match the modal's expectation)
interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  icon: React.ReactNode;
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

// Research Card Component with expandable description
interface ResearchCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageSrc: string;
  imageAlt: string;
  animationDirection: 'left' | 'right';
}

const ResearchCard = ({ title, shortDescription, fullDescription, imageSrc, imageAlt, animationDirection }: ResearchCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-8 hover:bg-white/20 transition-colors"
      initial={{ opacity: 0, x: animationDirection === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <p className="text-white/90 mb-4">
          {isExpanded ? fullDescription : shortDescription}
        </p>
      </motion.div>
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-300 hover:text-blue-200 hover:bg-white/10 p-0 h-auto mb-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
        <ChevronRight 
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isExpanded ? 'rotate-90' : ''
          }`} 
        />
      </Button>
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const categories = ["All", "Rockets", "CanSat", "Avionics", "Research"]
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      title: "Vajra",
      category: "Rockets",
      year: "2023",
      description:
        "High-altitude rocket designed for the IREC competition, reaching altitudes of over 10,000 feet with a custom propulsion system.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "CanSat",
      category: "CanSat",
      year: "2022",
      description:
        "Miniature satellite system designed to fit inside a rocket, featuring environmental sensors and a controlled descent system.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Satellite className="h-6 w-6" />,
    },
    {
      title: "Avionics",
      category: "Avionics",
      year: "2023",
      description:
        "Custom flight computer and telemetry system for high-altitude rockets, featuring redundant sensors and real-time data transmission.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Pinaka",
      category: "Rockets",
      year: "2021",
      description: "The team's first indigenously developed sounding rocket, built in 2021. Designed to reach an altitude of 30,000 ft, Pinaka marked a major milestone in Team Sammard's journey, laying the foundation for advanced rocketry projects in the years ahead.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Propulsion System",
      category: "Research",
      year: "2022",
      description:
        "The foundation for our propulsion systems was laid in 2022, when KNSB pellets were designed and tested for the first time, marking the beginning of our journey in solid rocket motor development.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Wrench className="h-6 w-6" />,
    },
    {
      title: "CanSat",
      category: "CanSat",
      year: "2021",
      description: "CanSat design featuring a glider deployment system for extended data collection during descent.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Satellite className="h-6 w-6" />,
    },
    {
      title: "Agneya",
      category: "Rockets",
      year: "2024",
      description: "Rocket designed for 10,000ft with Mid-range M class solid propellant motor.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title:"Airavat",
      category:"Rockets",
      year:"2025",
      description:"Rocket designed for 10,000ft with Mid-range M class solid propellant motor.",
      image:"/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6"/>,
    }
  ]

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Falling Stars Background */}
      <FallingStars />
      
      {/* Hero Section */}
      <section className="relative py-18 pt-32 z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">Our Projects</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore our innovative aerospace projects, from rockets to satellites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TabsList className="backdrop-blur-md bg-white/10 border border-white/20">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="text-white data-[state=active]:bg-blue-600/80 data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((project) => category === "All" || project.category === category)
                    .map((project, index) => (
                      <motion.div
                        key={`${category}-${index}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="overflow-hidden flex flex-col h-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
                          <div className="relative h-48 w-full">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="flex items-center gap-2 text-white">
                                  <span className="text-blue-300">{project.icon}</span>
                                  {project.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="border-white/30 text-white/80 bg-white/10">
                                    {project.category}
                                  </Badge>
                                  <span className="text-white/70">{project.year}</span>
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-white/80 line-clamp-3 text-sm leading-relaxed">
                              {project.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant="outline"
                              className="w-full backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
                              onClick={() => openModal(project)} // Changed to open modal
                            >
                              View Details <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Featured Project</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden bg-white border border-slate-200 shadow-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Airavat Rocket"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Airavat - IREC Competition Rocket</h3>
              <p className="text-white/90 mb-6">
                Our flagship rocket designed for the Intercollegiate Rocket Engineering Competition (IREC). Airavat
                features a comercial off-the-shelf motor, advanced avionics, a scientific cubesat payload and a dual deployment recovery system.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-bold mb-1 text-slate-800">Height</h4>
                  <p className="text-slate-600">10,000 ft</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-bold mb-1 text-slate-800">Max Speed</h4>
                  <p className="text-slate-600">Mach 0.8</p>
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4">
                  <h4 className="font-bold mb-1 text-white">Length</h4>
                  <p className="text-white/80">2.5 meters</p>
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4">
                  <h4 className="font-bold mb-1 text-white">Weight</h4>
                  <p className="text-white/80">25 kg</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
                  onClick={() => openModal(projects.find(p => p.title === "Airavat")!)} // Open modal for Airavat
                >
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research & Development */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Research & Development</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResearchCard
              title="Propulsion Systems"
              shortDescription="Our propulsion systems provide the thrust that powers rockets to altitude. IGNIS (J-class), our in-house SRAD KNSB solid rocket motor, was fully designed, built, and successfully tested by the team."
              fullDescription="Our propulsion systems provide the thrust that powers rockets to altitude. IGNIS (J-class), our in-house SRAD KNSB solid rocket motor, was fully designed, built, and successfully tested by the team, proving our ability to create reliable high-thrust engines. Building on this foundation, we are now developing an advanced M-class motor for higher altitudes, heavier payloads, and enhanced mission performance. Our research includes advanced grain geometry design, nozzle optimization, and comprehensive testing protocols to ensure maximum efficiency and safety."
              imageSrc="/placeholder.svg?height=400&width=800"
              imageAlt="Propulsion research"
              animationDirection="left"
            />
            <ResearchCard
              title="Avionics & Control Systems"
              shortDescription="We develop custom avionics packages for flight control, data acquisition, and telemetry. Our research focuses on miniaturization, reliability, and integration of advanced sensors."
              fullDescription="We develop custom avionics packages for flight control, data acquisition, and telemetry. Our research focuses on miniaturization, reliability, and integration of advanced sensors for precise flight data collection. Our avionics systems include redundant flight computers, GPS tracking, accelerometers, gyroscopes, and barometric sensors. We also develop custom ground station software for real-time monitoring and post-flight analysis, ensuring comprehensive data collection throughout the entire flight profile."
              imageSrc="/placeholder.svg?height=400&width=800"
              imageAlt="Avionics research"
              animationDirection="right"
            />
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </div>
  )
}