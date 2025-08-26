"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Zap, Globe, Star, Target, Flame, Satellite, Trophy, Users } from 'lucide-react';

// Star interface for TypeScript
interface Star {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string[];
  icon: React.ReactNode;
  side: 'left' | 'right';
  images?: string[];
  layout: 'single' | 'double' | 'triple' | 'none';
}

const timelineData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Breaking New Frontiers',
    description: [
      'Had a successful test for our first in-house developed J-class KNSB solid rocket motor.',
    ],
    icon: <Trophy className="w-6 h-6" />,
    side: 'left',
    layout: 'none',
  },
  {
    year: '2024',
    title: 'Elevating Global Presence',
    description: [
      'Presented at Bangalore\'s Space Expo 2024.',
      'Launched Agneya at SA Cup.',
    ],
    icon: <Users className="w-6 h-6" />,
    side: 'right',
    images: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'double',
  },
  {
    year: '2023',
    title: 'Inspiring Innovation',
    description: [
      'Conducted the Ignitia workshop during Yantra.',
      'Launched Vajra at SA Cup.',
      'Hosted a lecture with Chandrayaan-3 Mission Director, inspiring the next generation.',
    ],
    icon: <Globe className="w-6 h-6" />,
    side: 'left',
    layout: 'none',
  },
  {
    year: '2022',
    title: 'World Stage Recognition',
    description: [
      'Placed 23rd worldwide at SA Cup.',
      'Presented at Bangalore\'s Space Expo 2022.',
      'Conducted a live workshop at Techno VIT in Chennai.',
      'Exhibited during World Space Week with ISRO and VIT.',
      'Achieved successful test of the recovery system.',
    ],
    icon: <Satellite className="w-6 h-6" />,
    side: 'right',
    images: [
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'single',
  },
  {
    year: '2021',
    title: 'Ascending the Ranks',
    description: [
      'Ranked 13th worldwide in Cansat.',
      'Achieved 5th rank in Asia Pacific and competed in the 10K COTS category at IREC.',
      'Collaborated with BSG Karnataka for SatCan.',
    ],
    icon: <Star className="w-6 h-6" />,
    side: 'left',
    images: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'triple',
  },
  {
    year: '2020',
    title: 'Forging Ahead Through Innovation',
    description: [
      'Hosted the Astrophilia webinar in collaboration with Star Labs.',
      'Hosted the Space Voyagers webinar with SAE VIT.',
      'Started research and development for the sounding rocket.',
    ],
    icon: <Zap className="w-6 h-6" />,
    side: 'right',
    layout: 'none',
  },
  {
    year: '2019',
    title: 'Strengthening Global Ties',
    description: [
      'Secured 20th rank globally in Cansat.',
      'Presented innovations at ISRO\'s Bangalore Space Expo 2019, strengthening industry connections.',
    ],
    icon: <Flame className="w-6 h-6" />,
    side: 'left',
    images: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'double',
  },
  {
    year: '2018',
    title: 'Making Our Mark',
    description: [
      'Achieved 18th rank worldwide in the international Cansat competition, marking Team Sammard\'s first appearance on the global stage.',
    ],
    icon: <Target className="w-6 h-6" />,
    side: 'right',
    images: [
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'single',
  },
  {
    year: '2017',
    title: 'Genesis of Sammard',
    description: [
      'Team Sammard was founded, uniting passionate students to embark on a journey in space technology and engineering.',
    ],
    icon: <Rocket className="w-6 h-6" />,
    side: 'left',
    layout: 'none',
  },
];

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
              top: '-20px',
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

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  // Add this useEffect to initialize the refs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, timelineData.length);
    for (let i = itemRefs.current.length; i < timelineData.length; i++) {
      itemRefs.current[i] = null;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const visibleEnd = Math.min(rect.height, window.innerHeight - rect.top);
      const progress = Math.max(0, Math.min(1, visibleEnd / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleItems((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) newSet.add(index);
            else newSet.delete(index);
            return newSet;
          });
        },
        { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' }
      );
      observer.observe(ref);
      return observer;
    }).filter(Boolean); // Filter out null observers

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [timelineData.length]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.clientWidth, 1200); // Cap max width
        setContainerWidth(width);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Base horizontal wave amplitude (will be clamped to viewport to avoid horizontal scroll)
  const amplitudeBase = React.useMemo(() => {
    if (containerWidth < 640) return 60;      // phones
    if (containerWidth < 1024) return 90;     // tablets
    if (containerWidth < 1536) return 110;    // desktop
    return 130;                               // very wide screens
  }, [containerWidth]);
  const frequency = 0.006; // Wave frequency
  // Removed hard-coded asymmetric margins (previously marginLeft / marginRight) to center timeline
  const yGap = 400;
  const yBase = 400;
  const totalHeight = timelineData.length * yGap + yBase;

  const generateWavePath = (amp: number) => {
    const points = [];
    // Use true container center; with margins.left = cardWidth+gap and margins.right = gap, layout is inherently balanced.
    const centerX = containerWidth / 2;
    // Generate full path immediately without scroll dependency
    for (let y = 0; y <= totalHeight; y += 2) {
      const x = Math.sin(y * frequency) * amp + centerX;
      points.push(`${x},${y}`);
    }
    return points.length > 0 ? `M ${points.join(' L ')}` : '';
  };

  const getCirclePosition = (yPosition: number) => {
    const centerX = containerWidth / 2;
    const xPosition = Math.sin(yPosition * frequency) * safeAmplitude + centerX;
    return { x: xPosition, y: yPosition };
  };

  const getResponsiveMargins = () => {
    // Card widths by breakpoint (Tailwind: w-72=18rem, md:w-80=20rem, lg:w-96=24rem)
  let cardWidth = 288; // default (w-72)
    if (containerWidth >= 768) cardWidth = 320; // md
    if (containerWidth >= 1024) cardWidth = 384; // lg

    // Desired gap between wave center line and card edge
  // Horizontal clearance between wave center line and nearest card edge
  let gap = 75; // base desktop
  if (containerWidth < 640) gap = 50;            // phones
  else if (containerWidth < 1024) gap = 65;      // tablets
  else if (containerWidth >= 1536) gap = 90;     // very wide

    // Left margin must be cardWidth + gap so the right edge of left card aligns at center-gap
    // Right margin is just the gap so left edge of right card aligns at center+gap
  return { left: cardWidth + gap, right: gap, cardWidth };
  };

  const margins = getResponsiveMargins();

  // Clamp amplitude so even extreme sine offset + card width + gap stays inside container
  const safeAmplitude = React.useMemo(() => {
    // Ensure cards never force horizontal scroll: amplitude + cardWidth + gap fits inside half width
    const gap = margins.right; // same as horizontal clearance
    // Maximum amplitude so that: centerX + amplitude + gap + cardWidth <= containerWidth AND centerX - amplitude - (cardWidth+gap) >= 0
    // => amplitude <= containerWidth/2 - (cardWidth + gap)
    const theoreticalMax = containerWidth / 2 - (margins.cardWidth + gap);
    const maxAllowed = Math.max(20, theoreticalMax - 8); // subtract small safety buffer
    return Math.min(amplitudeBase, maxAllowed);
  }, [amplitudeBase, containerWidth, margins.cardWidth, margins.right]);

  return (
  <div className="relative overflow-hidden">
      {/* Add Orbitron Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .arcane-font {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

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

        body {
          overflow-x: hidden;
        }
      `}</style>

      {/* Falling Stars Background */}
      <FallingStars />

      <div
        ref={containerRef}
        className="relative z-10 px-8 md:px-12 lg:px-20 xl:px-32" // Increased padding for larger screens
        style={{ minHeight: `${totalHeight + 800}px` }}
      >
        {/* Hero Section */}
        <div className="relative pt-32 pb-32 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white arcane-font drop-shadow-2xl">
                Mission Timeline
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-lg">
              {'Charting Team Sammard\'s Odyssey — from our bold beginnings to the frontiers of innovation.'}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pb-32">
          {/* Wave SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ height: `${totalHeight + 200}px` }}
          >
            <defs>
              <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={generateWavePath(safeAmplitude)}
              fill="none"
              stroke="url(#rocketGradient)"
              strokeWidth="6"
              strokeDasharray="15,10"
              filter="url(#glow)"
              className="opacity-100"
            />
            {/* Year circles on the wave line */}
            {timelineData.map((item, index) => {
              const yPosition = index * yGap + yBase;
              const circlePos = getCirclePosition(yPosition);
              const isVisible = visibleItems.has(index);
              return (
                <g key={`circle-${index}`}>
                  {/* Background halo removed (was pulsing circle) to avoid large expanding artifact */}
                  {/* Main year circle */}
                  <circle
                    cx={circlePos.x}
                    cy={circlePos.y}
                    r="35"
                    fill="url(#rocketGradient)"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    filter="url(#glow)"
                    className={`transition-all duration-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{
                      transformOrigin: `${circlePos.x}px ${circlePos.y}px`,
                      transitionDelay: isVisible ? `${index * 150 + 200}ms` : '0ms',
                    }}
                  />
                  {/* Year text */}
                  <text
                    x={circlePos.x}
                    y={circlePos.y + 6}
                    textAnchor="middle"
                    className={`fill-white font-bold text-base transition-all duration-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transitionDelay: isVisible ? `${index * 150 + 300}ms` : '0ms',
                      textShadow: '0 0 10px rgba(0,0,0,0.8)',
                    }}
                  >
                    {item.year}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Timeline Items */}
          <div className="relative z-20">
            {timelineData.map((item, index) => {
              const yPosition = index * yGap + yBase;
              const centerX = containerWidth / 2;
              const xOffset = Math.sin(yPosition * frequency) * safeAmplitude + centerX;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (itemRefs.current) {
                      itemRefs.current[index] = el;
                    }
                  }}
                  className="absolute transform -translate-y-1/2"
                  style={{
                    top: `${yPosition}px`,
                    // For small screens, center all cards to avoid awkward left/right overlaps
                    left: containerWidth < 640
                      ? `${xOffset - (margins.cardWidth / 2)}px` // center card around wave on very small screens
                      : item.side === 'left'
                        ? `${xOffset - margins.left}px`
                        : `${xOffset + margins.right}px`,
                  }}
                >
                  <div
                    className={`relative max-w-md transition-all duration-800 ease-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-32 scale-95'}`}
                    style={{
                      transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                    }}
                  >
                    {/* Content Card */}
                    <div
                      className={`backdrop-blur-lg bg-black/40 border border-white/30 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 w-72 md:w-80 lg:w-96 overflow-hidden hover:bg-black/50 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}
                      style={{ transitionDelay: isVisible ? `${index * 150 + 100}ms` : '0ms' }}
                    >
                      {/* Images */}
                      {item.layout !== 'none' && item.images && (
                        <div
                          className={`transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                          style={{ transitionDelay: isVisible ? `${index * 150 + 150}ms` : '0ms' }}
                        >
                          {item.layout === 'single' && (
                            <div className="relative">
                              <img
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                          )}
                          {item.layout === 'double' && (
                            <div className="grid grid-cols-2 gap-1">
                              {item.images.slice(0, 2).map((img, imgIndex) => (
                                <div key={imgIndex} className="relative">
                                  <img
                                    src={img || "/placeholder.svg"}
                                    alt={`${item.title} ${imgIndex + 1}`}
                                    className="w-full h-40 object-cover hover:scale-110 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                              ))}
                            </div>
                          )}
                          {item.layout === 'triple' && (
                            <div className="space-y-1">
                              <div className="relative">
                                <img
                                  src={item.images[0] || "/placeholder.svg"}
                                  alt={`${item.title} main`}
                                  className="w-full h-40 object-cover hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                {item.images.slice(1, 3).map((img, imgIndex) => (
                                  <div key={imgIndex} className="relative">
                                    <img
                                      src={img || "/placeholder.svg"}
                                      alt={`${item.title} ${imgIndex + 2}`}
                                      className="w-full h-24 object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {/* Content */}
                      <div className={`p-8 ${item.layout === 'none' ? 'pt-8' : 'pt-6'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg text-blue-300 transition-all duration-500 ${isVisible ? 'rotate-0 scale-100' : 'rotate-45 scale-0'}`}
                            style={{ transitionDelay: isVisible ? `${index * 150 + 300}ms` : '0ms' }}
                          >
                            {item.icon}
                          </div>
                          <h3
                            className={`text-2xl font-bold text-white drop-shadow-lg transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: isVisible ? `${index * 150 + 250}ms` : '0ms' }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        {/* Render bullet points */}
                        <ul
                          className={`list-disc list-inside text-white/90 text-lg leading-relaxed transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                          style={{ transitionDelay: isVisible ? `${index * 150 + 350}ms` : '0ms' }}
                        >
                          {item.description.map((point, i) => (
                            <li key={i} className="mb-3 drop-shadow-sm">{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
