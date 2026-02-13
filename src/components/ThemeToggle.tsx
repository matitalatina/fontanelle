"use client";
import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isDark");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const ref = useRef<HTMLInputElement>(null);
  const clickPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    const theme = isDark ? "aqua-dark" : "aqua-light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  const handlePointerDown = (e: React.PointerEvent) => {
    clickPos.current = { x: e.clientX, y: e.clientY };
  };

  const toggleTheme = async () => {
    const nextIsDark = !isDark;
    
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDark(nextIsDark);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(nextIsDark);
      });
    });

    await transition.ready;

    let x, y;
    if (clickPos.current) {
      x = clickPos.current.x;
      y = clickPos.current.y;
    } else if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else {
      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
    }

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(150% at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(app)",
      }
    );
    clickPos.current = null;
  };

  return (
    <li>
      <a
        onClick={toggleTheme}
        onPointerDown={handlePointerDown}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={isDark ? faMoon : faSun} className="mr-2" />
          <span>Tema</span>
        </div>
        <div className="toggle text-base-content">
          <input
            ref={ref}
            type="checkbox"
            checked={!isDark}
            readOnly
          />
          {/* Moon icon (left, toggle-off) */}
          <svg
            className="toggle-off shrink-0 size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          {/* Sun icon (right, toggle-on) */}
          <svg
            className="toggle-on shrink-0 size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" x2="12" y1="1" y2="3"></line>
            <line x1="12" x2="12" y1="21" y2="23"></line>
            <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
            <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
            <line x1="1" x2="3" y1="12" y2="12"></line>
            <line x1="21" x2="23" y1="12" y2="12"></line>
            <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
            <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
          </svg>
        </div>
      </a>
    </li>
  );
}
