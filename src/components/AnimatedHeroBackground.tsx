"use client";

import React, { useMemo } from "react";

const AnimatedHeroBackground: React.FC = () => {
  // Reduce animation count on mobile devices for better performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Generate random positions and delays for animated elements
  const generateFloatingElements = (
    count: number,
    type: "droplet" | "bubble"
  ) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 0.5 + 0.3, // Size between 0.3 and 0.8
      delay: Math.random() * 10, // Animation delay up to 10s
      duration: Math.random() * 15 + 10, // Duration between 10-25s
      type,
    }));
  };

  // Memoize elements to prevent regeneration on re-renders
  const { droplets, bubbles, particles } = useMemo(
    () => ({
      droplets: generateFloatingElements(isMobile ? 6 : 12, "droplet"),
      bubbles: generateFloatingElements(isMobile ? 4 : 8, "bubble"),
      particles: isMobile ? 10 : 20,
    }),
    [isMobile]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 animate-gradient-shift"></div>

      {/* Falling water droplets */}
      {droplets.map((element) => (
        <div
          key={`droplet-${element.id}`}
          className="absolute animate-float-down opacity-20"
          style={{
            left: `${element.left}%`,
            transform: `scale(${element.size})`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          <div className="water-droplet bg-primary/40 relative">
            <div className="droplet-highlight absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full"></div>
          </div>
        </div>
      ))}

      {/* Floating bubbles */}
      {bubbles.map((element) => (
        <div
          key={`bubble-${element.id}`}
          className="absolute animate-float-bubble opacity-30"
          style={{
            left: `${element.left}%`,
            transform: `scale(${element.size})`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          <div className="w-4 h-4 border-2 border-info/40 rounded-full bg-info/10"></div>
        </div>
      ))}

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>

      {/* Floating particles for extra sparkle */}
      {Array.from({ length: particles }, (_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-secondary/30 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default AnimatedHeroBackground;
