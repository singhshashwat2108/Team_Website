import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Award, Users, School, Flag, Star } from "lucide-react"

export default function TimelinePage() {
  const timelineEvents = [
    {
      year: "2024",
      title: "IREC 2024 Top 10 Finish",
      description:
        "Team Sammard achieved a top 10 finish at the Intercollegiate Rocket Engineering Competition with the Icarus X rocket.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      year: "2023",
      title: "InSpace CanSat Victory",
      description: "Won 2nd place at the InSpace CanSat Competition with our innovative Phoenix CanSat design.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Star className="h-10 w-10 text-primary" />,
    },
    {
      year: "2022",
      title: "First International Competition",
      description: "Team Sammard represented India at the US CanSat Competition for the first time.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Flag className="h-10 w-10 text-primary" />,
    },
    {
      year: "2021",
      title: "High-Altitude Launch Success",
      description: "Successfully launched and recovered our first high-altitude rocket, reaching over 8,000 feet.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-10 w-10 text-primary" />,
    },
    {
      year: "2020",
      title: "Expanded Team",
      description: "Team Sammard grew to over 30 active members across multiple engineering disciplines.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      year: "2019",
      title: "First National Competition",
      description: "Participated in our first national rocketry competition and placed in the top 5.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      year: "2018",
      title: "First Rocket Launch",
      description: "Successfully designed, built, and launched our first low-power rocket.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <Rocket className="h-10 w-10 text-primary" />,
    },
    {
      year: "2017",
      title: "Team Sammard Founded",
      description: "Team Sammard was founded at VIT Vellore with a small group of aerospace enthusiasts.",
      image: "/placeholder.svg?height=800&width=1200",
      icon: <School className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Team history" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Timeline</h1>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2">
                  <Card className="h-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {event.icon}
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.year}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:flex md:w-1/2 items-center justify-center relative">
                  <div className="h-full w-px bg-border absolute"></div>
                  <div className="bg-primary text-primary-foreground text-xl font-bold rounded-full h-16 w-16 flex items-center justify-center z-10">
                    {event.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Looking to the Future</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <Rocket className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Advanced Propulsion</h3>
              <p className="text-muted-foreground">
                Developing hybrid rocket motors and exploring liquid propulsion systems for future competition rockets.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <Star className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">International Recognition</h3>
              <p className="text-muted-foreground">
                Aiming to establish Team Sammard as one of the top collegiate rocketry teams globally.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <School className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Aerospace Education</h3>
              <p className="text-muted-foreground">
                Expanding our educational outreach to inspire the next generation of aerospace engineers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

