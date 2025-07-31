import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Rocket, Satellite, Cpu, Wrench, ChevronRight } from "lucide-react"

export default function ProjectsPage() {
  const categories = ["All", "Rockets", "CanSat", "Avionics", "Research"]

  const projects = [
    {
      title: "Icarus X",
      category: "Rockets",
      year: "2023",
      description:
        "High-altitude rocket designed for the IREC competition, reaching altitudes of over 10,000 feet with a custom propulsion system.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Phoenix CanSat",
      category: "CanSat",
      year: "2022",
      description:
        "Miniature satellite system designed to fit inside a soda can, featuring environmental sensors and a controlled descent system.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Satellite className="h-6 w-6" />,
    },
    {
      title: "Athena Avionics",
      category: "Avionics",
      year: "2023",
      description:
        "Custom flight computer and telemetry system for high-altitude rockets, featuring redundant sensors and real-time data transmission.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Daedalus",
      category: "Rockets",
      year: "2021",
      description: "Mid-power rocket designed for testing new recovery systems and payload deployment mechanisms.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Propulsion Optimization",
      category: "Research",
      year: "2022",
      description:
        "Research project focused on optimizing solid rocket motor performance for collegiate rocketry applications.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Wrench className="h-6 w-6" />,
    },
    {
      title: "Helios CanSat",
      category: "CanSat",
      year: "2021",
      description: "CanSat design featuring a glider deployment system for extended data collection during descent.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Satellite className="h-6 w-6" />,
    },
    {
      title: "Telemetry System",
      category: "Avionics",
      year: "2020",
      description:
        "Long-range telemetry system for real-time rocket flight data transmission and ground station monitoring.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Composite Materials Study",
      category: "Research",
      year: "2021",
      description:
        "Research on lightweight composite materials for rocket airframes, focusing on strength-to-weight optimization.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Wrench className="h-6 w-6" />,
    },
    {
      title: "Hermes",
      category: "Rockets",
      year: "2020",
      description: "Two-stage rocket designed to test staging mechanisms and multi-engine configurations.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Rocket launch" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Projects</h1>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((project) => category === "All" || project.category === category)
                    .map((project, index) => (
                      <Card key={index} className="overflow-hidden flex flex-col h-full">
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
                              <CardTitle className="flex items-center gap-2">
                                {project.icon}
                                {project.title}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{project.category}</Badge>
                                <span className="text-muted-foreground">{project.year}</span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground">{project.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <a href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}>
                              View Details <ChevronRight className="ml-2 h-4 w-4" />
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

      {/* Featured Project */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Project</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=1200" alt="Icarus X Rocket" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Icarus X - IREC Competition Rocket</h3>
              <p className="text-muted-foreground mb-6">
                Our flagship rocket designed for the Intercollegiate Rocket Engineering Competition (IREC). The Icarus X
                features a custom-designed propulsion system, advanced avionics package, and innovative recovery
                mechanisms.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-bold mb-1">Height</h4>
                  <p className="text-muted-foreground">10,500 ft</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-bold mb-1">Max Speed</h4>
                  <p className="text-muted-foreground">Mach 0.8</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-bold mb-1">Length</h4>
                  <p className="text-muted-foreground">2.5 meters</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-bold mb-1">Weight</h4>
                  <p className="text-muted-foreground">15 kg</p>
                </div>
              </div>
              <Button asChild>
                <a href="/projects/icarus-x">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Development */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Research & Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Propulsion Systems</h3>
              <p className="text-muted-foreground mb-6">
                Our team conducts ongoing research into advanced propulsion systems, including solid rocket motors,
                hybrid propulsion, and experimental fuel formulations. This research directly informs the design of our
                competition rockets.
              </p>
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Propulsion research"
                width={800}
                height={400}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Avionics & Control Systems</h3>
              <p className="text-muted-foreground mb-6">
                We develop custom avionics packages for flight control, data acquisition, and telemetry. Our research
                focuses on miniaturization, reliability, and integration of advanced sensors for precise flight data
                collection.
              </p>
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Avionics research"
                width={800}
                height={400}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

