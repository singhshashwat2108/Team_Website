"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from 'next/font/google';
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import teamlogo from "@/public/teamlogo-real.png";

// Load font
const inter = Inter({ subsets: ["latin"] });

// Splash screen component
function SplashScreen({ onFinish }: { onFinish: () => void }) {
useEffect(() => {
  const timer = setTimeout(() => {
    onFinish();
  }, 4000);
  return () => clearTimeout(timer);
}, [onFinish]);

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
);
}



export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
const [scrolled, setScrolled] = useState(false);
const [showSplash, setShowSplash] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [isNavbarVisible, setIsNavbarVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Update scrolled state for other effects
    setScrolled(currentScrollY > 50);
    
    // Navbar visibility logic
    if (currentScrollY < 10) {
      // Always show navbar at the top
      setIsNavbarVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down and past 100px - hide navbar
      setIsNavbarVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up - show navbar
      setIsNavbarVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);


useEffect(() => {
  // Check if splash has been shown in this session
  const splashShown = sessionStorage.getItem('splashShown');
  
  if (!splashShown) {
    setShowSplash(true);
  }
  setIsLoading(false);
}, []);

const handleSplashFinish = () => {
  setShowSplash(false);
  // Mark splash as shown for this session
  sessionStorage.setItem('splashShown', 'true');
};

// Show loading state while checking sessionStorage
if (isLoading) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </body>
    </html>
  );
}

return (
  <html lang="en" suppressHydrationWarning>
    <head>
      <title>Team Sammard</title>
      <meta
        name="description"
        content="Team Sammard is a student collegiate rocketry team based at VIT Vellore, participating in competitions like IREC and CanSat."
      />
    </head>
    <body className={`${inter.className} overflow-x-hidden`}>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-[url('/images/main/launch.jpeg')] bg-cover bg-center bg-no-repeat">
            {/* HEADER */}
            <header
              className={`
                fixed inset-x-0 top-0 z-[100] h-20
                bg-transparent
                transform transition-transform duration-500 ease-in-out
                ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}
              `}
            >
              <div className="container relative flex h-20 items-center justify-between 
              before:absolute before:top-0 before:left-0 before:right-0 before:h-4 before:bg-gradient-to-b before:from-black/100 before:to-transparent 
              after:absolute after:top-0 after:bottom-0 after:left-0 after:w-6 after:bg-gradient-to-r after:from-black/10 after:to-transparent
              overflow-hidden">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/sammard_logo.png" alt="Team Sammard Logo" className="w-12 h-13" />
                  
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-6 items-center">
                  {["About", "Projects", "Events", "Timeline", "Gallery", "Sponsors"].map((page) => (
                    <Button
                      key={page}
                      asChild
                      className="h-auto px-0 bg-transparent text-foreground hover:bg-transparent relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                      variant="ghost"
                    >
                      <Link href={`/${page.toLowerCase()}`} className="text-lg font-bold transition-colors">
                        {page}
                      </Link>
                    </Button>
                  ))}
                </nav>

                {/* Right actions + mobile menu */}
                <div className="flex items-center gap-4">
                  <Link
                    href="/sponsors"
                    className="hidden md:inline-flex h-10 px-4 py-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Contact Us
                  </Link>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
                    >
                      <div className="flex flex-col gap-6 mt-8">
                        {["About", "Projects", "Events", "Timeline", "Gallery", "Sponsors"].map((page) => (
                          <Link
                            key={page}
                            href={`/${page.toLowerCase()}`}
                            className="text-lg font-medium transition-colors hover:text-primary"
                          >
                            {page}
                          </Link>
                        ))}
                        <Link
                          href="/sponsors"
                          className="relative top-2 w-full h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
            {/* MAIN CONTENT */}
            <main className="flex-1">{children}</main>
            {/* FOOTER */}
            <footer className="border-t bg-background">
              <div className="container py-4 md:py-5">
                <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr_1.4fr] gap-y-6 md:gap-x-0">
                  {/* Logo and Slogan */}
                  <div className="space-y-1 md:pr-0 md:mr-1">
                    <Link href="/" className="flex items-center gap-2">
                      <img
                        src="sammard_logo.png"
                        alt="Team Sammard Logo"
                        className="h-13 w-12"
                      />
                      <span className="font-bold text-lg">TEAM SAMMARD</span>
                    </Link>
                    <p className="text-sm text-muted-foreground md:whitespace-nowrap">
                      Give your dreams some space to unfold.
                    </p>
                  </div>
                  {/* Quick Links - Now in 2 columns */}
                  <div className="-ml-1">
                    <h3 className="font-medium mb-4">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {[
                        "About",
                        "Projects",
                        "Events",
                        "Timeline",
                        "Gallery",
                        "Sponsors",
                      ].map((page) => (
                        <Link
                          key={page}
                          href={`/${page.toLowerCase()}`}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {page}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Contact + Follow Us */}
                  <div className="flex flex-col gap-8 md:gap-6 md:flex-row md:justify-between">
                    <div>
                      <h3 className="font-medium mb-4">Contact</h3>
                      <ul className="space-y-2">
                        <li className="text-sm text-muted-foreground">Creation Labs, VIT Vellore</li>
                        <li className="text-sm text-muted-foreground">Vellore, Tamil Nadu, India</li>
                        <li>
                          <a
                            href="mailto:teamsammard@gmail.com"
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            teamsammard@gmail.com
                          </a>
                        </li>
                        <li>
                          <a className="text-sm text-muted-foreground hover:text-foreground">+91-************</a>
                        </li>
                      </ul>
                    </div>
                    <div className="md:min-w-[140px]">
                      <h3 className="font-medium mb-4 md:mb-4">Follow Us</h3>
                      <div className="flex space-x-4">
                        {/* Instagram */}
                        <a
                          href="https://www.instagram.com/team_sammard/?hl=en"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Instagram"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/company/teamsammardrocketry/posts/?feedView=all"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="LinkedIn"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        {/* Twitter/X */}
                        <a
                          href="https://x.com/TeamSammard"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Twitter / X"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Copyright */}
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Team Sammard. All rights reserved.</p>
                  <div className="flex gap-4 mt-4 md:mt-0">
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
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
);
}