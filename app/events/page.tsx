import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react"

export default function EventsPage() {
  const categories = ["All", "Competitions", "Workshops", "Outreach"]

  const upcomingEvents = [
    {
      title: "IREC 2025",
      category: "Competitions",
      date: "June 15-20, 2025",
      location: "New Mexico, USA",
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Team at competition" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Events</h1>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Upcoming Events</h2>

          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {upcomingEvents
                    .filter((event) => category === "All" || event.category === category)
                    .map((event, index) => (
                      <Card key={index} className="overflow-hidden flex flex-col h-full">
                        <div className="relative h-48 w-full">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription className="mt-1">
                                <Badge variant="outline">{event.category}</Badge>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                          <p className="text-muted-foreground">{event.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <a href={event.url} target="_blank" rel="noopener noreferrer">
                              Learn More <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Event</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="IREC Competition"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Intercollegiate Rocket Engineering Competition (IREC) 2025</h3>
              <p className="text-muted-foreground mb-6">
                The world's largest collegiate rocket engineering competition, bringing together teams from around the
                globe to launch solid, liquid, and hybrid rockets to target altitudes of 10,000 or 30,000 feet.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-bold">Date</h4>
                    <p className="text-muted-foreground">June 15-20, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-muted-foreground">Spaceport America, New Mexico, USA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-bold">Registration Deadline</h4>
                    <p className="text-muted-foreground">January 31, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-bold">Team Size</h4>
                    <p className="text-muted-foreground">10-15 members</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <a href="https://example.com/irec" target="_blank" rel="noopener noreferrer">
                  Official Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                    {event.result}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{event.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-muted-foreground">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Participate?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            If you're interested in participating in our workshops or collaborating on events, we'd love to hear from
            you.
          </p>
          <Button size="lg">Contact Us</Button>
        </div>
      </section>
    </div>
  )
}

