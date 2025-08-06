"use client";
import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

export default function SponsorsPage() {
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    phone: "",
    sponsorshipLevel: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/send-sponsor-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error("Failed to send email");
  
      alert("Sponsorship request submitted successfully!");
      setFormData({
        contactName: "",
        email: "",
        companyName: "",
        companyWebsite: "",
        phone: "",
        sponsorshipLevel: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an issue submitting your form. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sponsors = [
    {
      name: "Converge",
      category: "Platinum",
      description:
        "Leading aerospace manufacturing company providing materials and technical expertise.",
      image: "/placeholder.svg?height=400&width=800",
      website: "https://example.com",
    },
    {
      name: "SolidWorks",
      category: "Partners",
      description:
        "Innovative space technology company supporting our propulsion systems development.",
      image: "/placeholder.svg?height=400&width=800",
      website: "https://example.com",
    },
    {
      name: "Altium Designer",
      category: "Partners",
      description:
        "Electronics manufacturer providing components for our avionics systems.",
      image: "/placeholder.svg?height=400&width=800",
      website: "https://example.com",
    },
    {
      name: "Altair",
      category: "Partners",
      description:
        "Advanced materials supplier for our rocket airframes and structural components.",
      image: "/placeholder.svg?height=400&width=800",
      website: "https://example.com",
    },
    {
      name: "VIT University",
      category: "Partners",
      description:
        "Our home institution providing facilities, mentorship, and academic support.",
      image: "/placeholder.svg?height=400&width=800",
      website: "https://example.com",
    },
    {
      name: "Aerospace Association of India",
      category: "Partners",
      description:
        "National organization supporting collegiate aerospace initiatives.",
      image: "/placeholder.svg?height=400&width=800",
      website: "https://example.com",
    },
  ];

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

      {/* Hero Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white arcane-font">
              Our Sponsors
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Powering innovation through partnership. Thank you to our sponsors who make our journey to the stars possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Thank You to Our Sponsors
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Our projects and achievements would not be possible without the
                generous support of our sponsors and partners.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 rounded-lg overflow-hidden flex flex-col h-full group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative h-48 w-full backdrop-blur-md bg-white/5 flex items-center justify-center p-6 group-hover:bg-white/10 transition-colors duration-300">
                  <Image
                    src={sponsor.image || "/placeholder.svg"}
                    alt={sponsor.name}
                    width={200}
                    height={100}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {sponsor.name}
                      </h3>
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className="border-blue-400/50 text-blue-300 group-hover:border-blue-300 transition-colors duration-300"
                        >
                          {sponsor.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4 group-hover:text-white/90 transition-colors duration-300 flex-grow">
                    {sponsor.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-blue-600/80 hover:border-blue-400/50 transition-all duration-300"
                    asChild
                  >
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor Form */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white arcane-font mb-4">
                    Become a Sponsor
                  </h2>
                  <p className="text-lg text-white/90">
                    Join our mission to push the boundaries of collegiate
                    aerospace engineering. Fill out the form below and we'll get
                    back to you within 24 hours.
                  </p>
                </motion.div>
              </div>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-white">Contact Name *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                      className="backdrop-blur-md bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="backdrop-blur-md bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Acme Corporation"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="backdrop-blur-md bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400/50"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite" className="text-white">Company Website *</Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      placeholder="https://www.company.com"
                      value={formData.companyWebsite}
                      onChange={(e) =>
                        handleInputChange("companyWebsite", e.target.value)
                      }
                      className="backdrop-blur-md bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="backdrop-blur-md bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorshipLevel" className="text-white">
                    Preferred Sponsorship Level
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("sponsorshipLevel", value)
                    }
                  >
                    <SelectTrigger className="backdrop-blur-md bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select sponsorship level" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-md bg-gray-800 border-white/30 text-white">
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="discuss">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your company and why you're interested in sponsoring Team Sammard. Include any specific sponsorship goals or requirements."
                    className="min-h-[120px] backdrop-blur-md bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400/50"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full backdrop-blur-md bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30 text-white"
                  >
                    Submit Sponsorship Application
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}