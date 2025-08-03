'use client'

import type React from "react"
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import teamlogo from "@/public/teamlogo-real.png"

// Load font
const inter = Inter({ subsets: ["latin"] })

// Splash screen component
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white rounded-lg">
      <video
        autoPlay
        muted
        onEnded={onFinish}
        className="w-full h-full object-cover"
      >
        <source src="/video/splash_correct.mp4" type="video/mp4" />

        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Team Sammard</title>
        <meta
          name="description"
          content="Team Sammard is a student collegiate rocketry team based at VIT Vellore, participating in competitions like IREC and CanSat."
        />
      </head>
      <body className={inter.className}>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen bg-[url('/images/main/launch.jpeg')] bg-cover bg-center bg-no-repeat">
              {/* HEADER */}
              <header className="fixed top-0 left-0 w-full z-50 h-20 bg-black/80 border-b border-white/10">
                <div className="container flex h-16 items-center justify-between">
                  <Link href="/" className=" flex items-center gap-2">
                    <img src="sammard_logo.png" alt="Rocket" className="relative top-1 w-11 h-17" />
                  </Link>

                  <nav className="relative hidden md:flex gap-6 h-full items-center">
                    {["About", "Projects", "Events", "Timeline","Gallery" ,"Sponsors"].map((page) => (
                     <Button
                     key={page}
                     asChild
                     className="h-full px-4 bg-transparent text-foreground hover:bg-transparent hover:text-primary leading-[1.1rem] pt-[14px]"
                   >
                     <Link href={`/${page.toLowerCase()}`} className="text-sm font-medium transition-colors">
                       {page}
                     </Link>
                   </Button>
                   
                    ))}
                  </nav>

                  <div className="flex items-center gap-4">
                    <Button className="hidden md:flex">Contact Us</Button>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <div className="flex flex-col gap-6 mt-8">
                          {["About", "Projects", "Events", "Timeline","Gallery","Sponsors"].map((page) => (
                            <Link key={page} href={`/${page.toLowerCase()}`} className="text-sm font-medium transition-colors hover:text-primary">
                              {page}
                            </Link>
                          ))}
                          <Button>Contact Us</Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </header>

              {/* MAIN CONTENT */}
              <main className="flex-1 pt-20">{children}</main>

              {/* FOOTER */}
              <footer className="border-t bg-background">
                <div className="container py-8 md:py-12">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Slogan */}
                    <div className="space-y-4">
                      <Link href="/" className="flex items-center gap-2">
                        <span className="font-bold text-lg">TEAM SAMMARD</span>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Give your dreams some space to unfold.
                      </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="font-medium mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        {["About", "Projects", "Events", "Timeline","Gallery","Sponsors"].map((page) => (
                          <li key={page}>
                            <Link href={`/${page.toLowerCase()}`} className="text-med text-muted-foreground hover:text-foreground">
                              {page}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="font-medium mb-4">Contact</h3>
                      <ul className="space-y-2">
                        <li className="text-sm text-muted-foreground">Creation Labs, VIT Vellore</li>
                        <li className="text-sm text-muted-foreground">Vellore, Tamil Nadu, India</li>
                        <br></br>
                        <li>
                          <a href="mailto:teamsammard@gmail.com" className="text-sm text-muted-foreground hover:text-foreground">
                            teamsammard@gmail.com
                          </a>
                        </li>
                        <li className="text-sm text-muted-foreground">+91 **************</li>
                      </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                      <h3 className="font-medium mb-4">Follow Us</h3>
                      <div className="flex space-x-4">
                        {/* Insert your icons here */}
                        {/* ... */}
                      </div>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      © {new Date().getFullYear()} Team Sammard. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                        Privacy Policy
                      </Link>
                      <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                        Terms of Service
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}