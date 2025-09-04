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
  images?: string[];
  layout: 'single' | 'double' | 'triple' | 'none';
}

const timelineData: TimelineItem[] = [
  {
    year: '2017',
    title: 'Genesis of Sammard',
    description: [
      'Team Sammard was founded, uniting passionate students to embark on a journey in space technology and engineering.',
    ],
    icon: <Rocket className="w-6 h-6" />,
    layout: 'none',
  },
  {
    year: '2018',
    title: 'Making Our Mark',
    description: [
      'Achieved 18th rank worldwide in the international Cansat competition, marking Team Sammard\'s first appearance on the global stage.',
    ],
    icon: <Target className="w-6 h-6" />,
    images: [
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'single',
  },
  {
    year: '2019',
    title: 'Strengthening Global Ties',
    description: [
      'Secured 20th rank globally in Cansat.',
      'Presented innovations at ISRO\'s Bangalore Space Expo 2019, strengthening industry connections.',
    ],
    icon: <Flame className="w-6 h-6" />,
    images: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'double',
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
    layout: 'none',
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
    images: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'triple',
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
    images: [
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'single',
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
    images: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
    ],
    layout: 'double',
  },
  {
    year: '2025',
    title: 'Breaking New Frontiers',
    description: [
      'Had a successful test for our first in-house developed J-class KNSB solid rocket motor.',
    ],
    icon: <Trophy className="w-6 h-6" />,
    layout: 'none',
  }
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
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const elementTop = containerRef.current.offsetTop;
      const elementHeight = containerRef.current.scrollHeight;
      
      const progress = Math.min(Math.max((scrollTop - elementTop + windowHeight * 0.5) / elementHeight, 0), 1);
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
    }).filter(Boolean);

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Add Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        * {
          box-sizing: border-box;
        }

        .arcane-font {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
        }

        .timeline-heading {
          font-size: 50px;
          background: #ff6a00;
          background: -webkit-linear-gradient(to right, #ff6a00, #ee0979);
          background: linear-gradient(to right, #ff6a00, #ee0979);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .timeline-container {
          width: 90vw;
          max-width: 1360px;
          margin: 0 auto;
        }

        .timeline-component {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          position: relative;
        }

        .timeline-item {
          z-index: 2;
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          grid-template-rows: auto;
          grid-template-columns: 1fr 180px 1fr;
          grid-auto-columns: 1fr;
          padding: 80px 0;
          display: grid;
          position: relative;
          width: 100%;
        }

        .timeline-left {
          text-align: right;
          justify-content: flex-end;
          align-items: flex-start;
          display: flex;
          padding-right: 40px;
        }

        .timeline-centre {
          justify-content: center;
          display: flex;
        }

        .timeline-right {
          padding-left: 40px;
        }

        .timeline-date-text {
          color: #fff;
          letter-spacing: -0.03em;
          font-size: 48px;
          font-weight: 500;
          line-height: 1.2;
          position: sticky;
          top: 50vh;
          transform: translateY(-50%);
        }

        .timeline-text {
          color: #fff;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 32px;
        }

        .timeline-circle {
          background-color: #fff;
          border-radius: 100%;
          width: 15px;
          min-width: 15px;
          max-width: 15px;
          height: 15px;
          min-height: 15px;
          max-height: 15px;
          position: sticky;
          top: 50vh;
          transform: translateY(-50%);
          box-shadow: 0 0 0 8px #0a0a0a;
        }

        .timeline-progress {
          z-index: -2;
          background-color: #414141;
          width: 3px;
          height: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .timeline-progress-bar {
          z-index: -1;
          background: #ff6a00;
          background: -webkit-linear-gradient(to bottom, #ff6a00, #ee0979);
          background: linear-gradient(to bottom, #ff6a00, #ee0979);
          width: 3px;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          transition: height 0.1s ease-out;
        }

        .overlay-fade-top {
          background-image: linear-gradient(#0a0a0a, #0a0a0a00);
          height: 80px;
          position: absolute;
          inset: 0% 0% auto;
          z-index: 10;
        }

        .overlay-fade-bottom {
          background-image: linear-gradient(to top, #0a0a0a, #0a0a0a00);
          height: 80px;
          position: absolute;
          inset: auto 0% 0%;
          z-index: 10;
        }

        @media screen and (max-width: 767px) {
          .timeline-heading {
            font-size: 40px;
          }

          .timeline-item {
            grid-template-columns: 64px 1fr;
            width: 100%;
            padding: 60px 0;
          }

          .timeline-left {
            text-align: left;
            grid-area: 1 / 2 / 2 / 3;
            padding-right: 0;
            padding-left: 20px;
          }

          .timeline-centre {
            justify-content: flex-start;
            grid-area: 1 / 1 / 3 / 2;
          }

          .timeline-right {
            grid-area: span 1 / span 1 / span 1 / span 1;
            padding-left: 20px;
          }

          .timeline-date-text {
            margin-bottom: 24px;
            font-size: 36px;
            position: relative;
            top: auto;
            transform: none;
          }

          .timeline-text {
            font-size: 20px;
          }

          .timeline-progress {
            left: 6px;
            transform: none;
          }

          .timeline-progress-bar {
            left: 6px;
            transform: none;
          }

          .timeline-circle {
            position: relative;
            top: auto;
            transform: none;
            margin-top: 12px;
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

      {/* Hero Section */}
      <div className="section-timeline-heading bg-black">
        <div className="timeline-container">
          <div className="py-32">
            <div className="text-center max-w-2xl mx-auto text-white">
              <div className="mb-8">
                <h1 className="timeline-heading arcane-font text-8xl md:text-10xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-violet-600">
                  Mission Timeline
                </h1>
              </div>
              <p className="text-xl leading-relaxed drop-shadow-lg">
                Charting Team Sammard's Odyssey — from our bold beginnings to the frontiers of innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="section-timeline bg-black relative z-10" ref={containerRef}>
        <div className="timeline-container">
          <div className="timeline-component">
            {/* Progress Bar */}
            <div className="timeline-progress"></div>
            <div 
              className="timeline-progress-bar" 
              style={{
                height: `${scrollProgress * 100}vh`
              }}
            ></div>

            {/* Timeline Items */}
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.has(index);
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (itemRefs.current) {
                      itemRefs.current[index] = el;
                    }
                  }}
                  className="timeline-item"
                >
                  {/* Left Side - Date */}
                  <div className="timeline-left">
                    <div className="timeline-date-text">
                      {item.year}
                    </div>
                  </div>

                  {/* Center - Circle */}
                  <div className="timeline-centre">
                    <div className="timeline-circle"></div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="timeline-right">
                    <div 
                      className={`transition-all duration-800 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      {/* Title and Description */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg text-blue-300">
                            {item.icon}
                          </div>
                          <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                            {item.title}
                          </h3>
                        </div>
                        <div className="timeline-text">
                          {item.description.map((desc, i) => (
                            <div key={i} className="mb-3">
                              {desc}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Images */}
                      {item.layout !== 'none' && item.images && (
                        <div className="timeline-image-wrapper">
                          {item.layout === 'single' && (
                            <div className="relative overflow-hidden rounded-lg">
                              <img
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full max-w-md h-64 object-cover hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                          )}
                          {item.layout === 'double' && (
                            <div className="grid grid-cols-2 gap-2 max-w-md">
                              {item.images.slice(0, 2).map((img, imgIndex) => (
                                <div key={imgIndex} className="relative overflow-hidden rounded-lg">
                                  <img
                                    src={img || "/placeholder.svg"}
                                    alt={`${item.title} ${imgIndex + 1}`}
                                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                              ))}
                            </div>
                          )}
                          {item.layout === 'triple' && (
                            <div className="space-y-2 max-w-md">
                              <div className="relative overflow-hidden rounded-lg">
                                <img
                                  src={item.images[0] || "/placeholder.svg"}
                                  alt={`${item.title} main`}
                                  className="w-full h-32 object-cover hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {item.images.slice(1, 3).map((img, imgIndex) => (
                                  <div key={imgIndex} className="relative overflow-hidden rounded-lg">
                                    <img
                                      src={img || "/placeholder.svg"}
                                      alt={`${item.title} ${imgIndex + 2}`}
                                      className="w-full h-20 object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Fade overlays */}
            <div className="overlay-fade-top"></div>
            <div className="overlay-fade-bottom"></div>
          </div>
        </div>
        
        {/* Extra space at bottom */}
        <div style={{ height: '50vh' }}></div>
      </div>
    </div>
  );
};

export default Timeline;