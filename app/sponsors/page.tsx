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
import { useState } from "react";

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
    <div className="min-h-screen bg-background">
      {/* Sponsors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Thank You to Our Sponsors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our projects and achievements would not be possible without the
              generous support of our sponsors and partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 cursor-pointer group"
              >
                <div className="relative h-48 w-full bg-muted flex items-center justify-center p-6 group-hover:bg-muted/80 transition-colors duration-300">
                  <Image
                    src={sponsor.image || "/placeholder.svg"}
                    alt={sponsor.name}
                    width={200}
                    height={100}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
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
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                    {sponsor.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
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
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                  Become a Sponsor
                </CardTitle>
                <CardDescription className="text-lg">
                  Join our mission to push the boundaries of collegiate
                  aerospace engineering. Fill out the form below and we'll get
                  back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.contactName}
                        onChange={(e) =>
                          handleInputChange("contactName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
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
                      type="text"
                      placeholder="Acme Corporation"
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
                        placeholder="https://www.company.com"
                        value={formData.companyWebsite}
                        onChange={(e) =>
                          handleInputChange("companyWebsite", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsorshipLevel">
                      Preferred Sponsorship Level
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("sponsorshipLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sponsorship level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="discuss">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your company and why you're interested in sponsoring Team Sammard. Include any specific sponsorship goals or requirements."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Submit Sponsorship Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}