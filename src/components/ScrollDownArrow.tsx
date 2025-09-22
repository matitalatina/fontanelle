"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface ScrollDownArrowProps {
  onClick?: () => void;
  className?: string;
}

const ScrollDownArrow: React.FC<ScrollDownArrowProps> = ({
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to next section
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`cursor-pointer group ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Scorri verso il basso per vedere di più"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex flex-col items-center space-y-1 sm:space-y-2">
        {/* Text hint - hidden on very small screens */}
        <span className="hidden xs:block text-xs sm:text-sm font-medium opacity-70 animate-fade-pulse group-hover:opacity-100 transition-opacity duration-300">
          Scorri per saperne di più
        </span>

        {/* Arrow container with background */}
        <div className="relative">
          {/* Background circle */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300">
            {/* Double arrow for better visibility */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-sm sm:text-lg animate-bounce-down group-hover:scale-110 transition-transform duration-300"
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-sm sm:text-lg absolute top-0 left-0 opacity-30 animate-bounce-down"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full blur-lg animate-fade-pulse opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDownArrow;
