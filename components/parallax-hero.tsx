"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stars background - moves slowest */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <Image
          src="/img/main/launch.jpeg?height=1080&width=1920"
          alt="Stars background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Distant mountains - moves slowly */}
      <div
        className="absolute inset-0 w-full h-full z-1"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <Image
          src="/img/main/launch.jpeg?height=1080&width=1920"
          alt="Distant mountains"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Rocket silhouette - moves faster */}
      <div
        className="absolute inset-0 w-full h-full z-2"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        <Image
          src="/img/main/launch.jpeg?height=1080&width=1920"
          alt="Rocket silhouette"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}

