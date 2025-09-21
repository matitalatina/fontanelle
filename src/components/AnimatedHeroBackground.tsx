import React from "react";

const AnimatedHeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 animate-gradient-shift"></div>

      {/* CSS-only floating elements - minimal for performance */}
      <div className="hero-droplets">
        <div className="hero-droplet hero-droplet-1"></div>
        <div className="hero-droplet hero-droplet-2"></div>
        <div className="hero-droplet hero-droplet-3"></div>
        <div className="hero-droplet hero-droplet-4"></div>
      </div>

      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default AnimatedHeroBackground;
