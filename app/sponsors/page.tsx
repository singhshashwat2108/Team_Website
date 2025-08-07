"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from 'lucide-react'
import { motion } from "framer-motion"
import FallingStars from "@/components/FallingStars"

export default function SponsorsPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    contactName: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    phone: "",
    sponsorshipLevel: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/send-sponsor-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        alert(`Error: ${err.error || "Failed to send email"}`)
        return
      }
      alert("🎉 Sponsorship request sent! We'll be in touch soon.")
      setFormData({
        nickname: "",
        contactName: "",
        email: "",
        companyName: "",
        companyWebsite: "",
        phone: "",
        sponsorshipLevel: "",
        message: "",
      })
    } catch {
      alert("Network error. Please try again.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap");
        .arcane-font {
          font-family: "Orbitron", monospace;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      {/* Stars */}
      <FallingStars />
      <main className="relative z-10">
        {/* Sponsors Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 arcane-font">
                Thank You to Our Sponsors
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Our projects and achievements would not be possible without the
                generous support of our sponsors and partners.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6 flex flex-col h-full hover:bg-white/20 transition-all duration-300 group">
                    <div className="relative h-48 w-full bg-muted/30 flex items-center justify-center p-6">
                      <Image
                        src={sponsor.image || "/placeholder.svg"}
                        alt={sponsor.name}
                        width={200}
                        height={100}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors duration-300">
                        {sponsor.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <Badge
                          variant="outline"
                          className="group-hover:border-primary/50 transition-colors duration-300"
                        >
                          {sponsor.category}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-white/80 mb-4 group-hover:text-white transition-colors duration-300">
                        {sponsor.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white/10 text-white border-white/30 hover:bg-white/20 transition-all"
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
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <Card className="backdrop-blur-md bg-white/10 border border-white/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold arcane-font">
                    Become a Sponsor
                  </CardTitle>
                  <CardDescription className="text-white/80 text-lg">
                    Join our mission to push the boundaries of collegiate aerospace engineering.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={(e) =>
                        handleInputChange("nickname", e.target.value)
                      }
                      autoComplete="off"
                      style={{ display: "none" }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) =>
                            handleInputChange("contactName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyWebsite">Company Website *</Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          value={formData.companyWebsite}
                          onChange={(e) =>
                            handleInputChange("companyWebsite", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        className="min-h-[120px]"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30"
                    >
                      Submit Sponsorship Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
