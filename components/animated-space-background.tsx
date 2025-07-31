"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function RotatingSunBackground() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([])
  const [solarFlares, setSolarFlares] = useState<Array<{ id: number; angle: number; size: number; intensity: number }>>([])

  useEffect(() => {
    // Generate background stars
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          duration: Math.random() * 10 + 5,
        })
      }
      setStars(newStars)
    }

    // Generate solar flares
    const generateSolarFlares = () => {
      const flares = []
      for (let i = 0; i < 12; i++) {
        flares.push({
          id: i,
          angle: (360 / 12) * i,
          size: Math.random() * 80 + 40,
          intensity: Math.random() * 0.8 + 0.2,
        })
      }
      setSolarFlares(flares)
    }

    generateStars()
    generateSolarFlares()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 via-transparent to-black" />

      {/* Background Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Sun Container - Centered and Large */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        
        {/* Solar Corona - Outermost Layer */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
          }}
        >
          <div
            className="w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: `
                radial-gradient(circle, transparent 45%, rgba(251, 146, 60, 0.1) 50%, rgba(249, 115, 22, 0.15) 60%, rgba(234, 88, 12, 0.1) 80%, transparent 100%)
              `,
              filter: 'blur(4px)',
            }}
          />
        </motion.div>

        {/* Solar Flares */}
        {solarFlares.map((flare) => (
          <motion.div
            key={flare.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              rotate: `${flare.angle}deg`,
            }}
            animate={{
              rotate: [flare.angle, flare.angle + 360],
              opacity: [flare.intensity, flare.intensity * 1.5, flare.intensity],
            }}
            transition={{
              rotate: {
                duration: 45,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              opacity: {
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            }}
          >
            <div
              className="w-2 opacity-60"
              style={{
                height: `${flare.size}px`,
                background: `linear-gradient(to top, rgba(251, 191, 36, ${flare.intensity}) 0%, rgba(245, 158, 11, ${flare.intensity * 0.8}) 50%, rgba(217, 119, 6, ${flare.intensity * 0.6}) 80%, transparent 100%)`,
                transformOrigin: 'bottom center',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        ))}

        {/* Sun Surface - Multiple Rotating Layers */}
        
        {/* Outer Chromosphere */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(252, 211, 77, 0.9) 0%, rgba(245, 158, 11, 0.8) 40%, rgba(217, 119, 6, 0.7) 80%, rgba(180, 83, 9, 0.6) 100%)
              `,
              boxShadow: `
                0 0 100px rgba(251, 191, 36, 0.8),
                inset 0 0 100px rgba(180, 83, 9, 0.3)
              `,
            }}
          />
        </motion.div>

        {/* Middle Photosphere with Surface Details */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="w-[500px] h-[500px] rounded-full relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(254, 240, 138, 1) 0%, rgba(252, 211, 77, 0.95) 20%, rgba(245, 158, 11, 0.9) 50%, rgba(217, 119, 6, 0.85) 80%, rgba(180, 83, 9, 0.8) 100%)
              `,
              boxShadow: `
                0 0 80px rgba(252, 211, 77, 0.9),
                inset 0 0 80px rgba(217, 119, 6, 0.2)
              `,
            }}
          >
            {/* Solar Granulation Pattern */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 40 + 20}px`,
                    height: `${Math.random() * 40 + 20}px`,
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    background: `rgba(254, 240, 138, ${Math.random() * 0.3 + 0.1})`,
                  }}
                  animate={{
                    opacity: [0.1, 0.4, 0.1],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            {/* Sunspot Groups */}
            <div className="absolute top-[20%] left-[30%] w-12 h-8 rounded-full bg-orange-900/60" />
            <div className="absolute top-[60%] right-[25%] w-8 h-6 rounded-full bg-orange-800/50" />
            <div className="absolute bottom-[30%] left-[45%] w-6 h-10 rounded-full bg-amber-900/40" />
          </div>
        </motion.div>

        {/* Inner Core - Fastest Rotation */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.02, 1],
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
          }}
        >
          <div
            className="w-[400px] h-[400px] rounded-full relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(254, 240, 138, 0.9) 30%, rgba(252, 211, 77, 0.8) 60%, rgba(245, 158, 11, 0.7) 100%)
              `,
              boxShadow: `
                0 0 60px rgba(254, 240, 138, 1),
                inset 0 0 60px rgba(245, 158, 11, 0.3)
              `,
            }}
          >
            {/* Core Convection Cells */}
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 30 + 15}px`,
                  height: `${Math.random() * 30 + 15}px`,
                  left: `${Math.random() * 70 + 15}%`,
                  top: `${Math.random() * 70 + 15}%`,
                  background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: Math.random() * 4 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Solar Prominence Arcs */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {/* Large Prominence */}
          <motion.div
            className="absolute w-2 h-32 -top-16 left-1/2 transform -translate-x-1/2 origin-bottom"
            style={{
              background: 'linear-gradient(to top, rgba(245, 158, 11, 0.8) 0%, rgba(252, 211, 77, 0.6) 50%, transparent 100%)',
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Secondary Prominences */}
          <div className="absolute w-1 h-20 -top-10 -left-48 transform origin-bottom rotate-45"
               style={{
                 background: 'linear-gradient(to top, rgba(217, 119, 6, 0.7) 0%, rgba(245, 158, 11, 0.5) 70%, transparent 100%)',
                 borderRadius: '50%',
                 filter: 'blur(0.5px)',
               }} />
          
          <div className="absolute w-1 h-24 -top-12 left-44 transform origin-bottom -rotate-30"
               style={{
                 background: 'linear-gradient(to top, rgba(217, 119, 6, 0.6) 0%, rgba(245, 158, 11, 0.4) 60%, transparent 100%)',
                 borderRadius: '50%',
                 filter: 'blur(0.5px)',
               }} />
        </motion.div>

        {/* Lens Flare Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 30%, rgba(252, 211, 77, 0.1) 40%, transparent 50%)',
              filter: 'blur(2px)',
            }}
          />
        </motion.div>
      </div>

      {/* Heat Shimmer Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(252, 211, 77, 0.05) 50%, transparent 60%)',
            filter: 'blur(3px)',
          }}
        />
      </motion.div>
    </div>
  )
}