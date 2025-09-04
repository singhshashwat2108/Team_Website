"use client"

import { useEffect, useState } from "react"

// Star interface for TypeScript
interface Star {
  id: number
  left: number
  animationDuration: number
  opacity: number
  size: number
}

// Falling Stars Component
const FallingStars = () => {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 6 + 4,
          opacity: Math.random() * 0.8 + 0.3,
          size: Math.random() * 3 + 1,
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: "-20px",
              opacity: star.opacity,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `fall ${star.animationDuration}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default FallingStars
