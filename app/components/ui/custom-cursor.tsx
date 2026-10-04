"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { MousePointerClick, ArrowUpRight } from "lucide-react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<"none" | "button" | "link">(
    "none",
  );
  const animationRef = useRef<number | null>(null);

  // Smoothing factor - lower = more delay/smoothness (0.1 = very smooth, 0.5 = less smooth)
  const smoothingFactor = 0.35;

  // Define selectors for different types
  const linkSelectors = "a[href]";
  const buttonSelectors = [
    "button",
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="reset"]',
    '[role="button"]',
    "select",
    ".cursor-pointer",
    "[onclick]",
    "summary",
  ].join(", ");

  // Only hide system cursor while CustomCursor is mounted
  useEffect(() => {
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check what type of interactive element we're hovering
      const target = e.target as Element;

      if (target?.closest(linkSelectors)) {
        setIsHovering(true);
        setHoverType("link");
      } else if (target?.closest(buttonSelectors)) {
        setIsHovering(true);
        setHoverType("button");
      } else {
        setIsHovering(false);
        setHoverType("none");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [linkSelectors, buttonSelectors]);

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothingFactor,
        y: prev.y + (mousePosition.y - prev.y) * smoothingFactor,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, smoothingFactor]);

  return (
    <div
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: cursorPosition.x,
        top: cursorPosition.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Crosshair Cursor - Default */}
      <div
        className={`transition-opacity duration-200 ${isHovering ? "opacity-0" : "opacity-100"}`}
      >
        {/* Vertical line */}
        <div className="absolute w-[2px] h-5 bg-white/30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-invert" />
        {/* Horizontal line */}
        <div className="absolute h-[2px] w-5 bg-white/30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-invert" />
      </div>

      {/* Icon + Expanding Backdrop-Invert Area - Interactive */}
      <div
        className={`transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"}`}
      >
        {/* Expanding backdrop-invert area - BEHIND the icon */}
        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${
            isHovering ? "w-20 h-20" : "w-5 h-5"
          }`}
          style={{
            backdropFilter: isHovering ? "invert(1)" : "invert(0)",
            WebkitBackdropFilter: isHovering ? "invert(1)" : "invert(0)",
            zIndex: 10,
          }}
        />

        {/* Visible border ring */}
        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white/40 rounded-full transition-all duration-500 ease-out ${
            isHovering
              ? "w-20 h-20 border-opacity-40"
              : "w-5 h-5 border-opacity-20"
          }`}
          style={{ zIndex: 15 }}
        />

        {/* Central icon - changes based on hover type - ABOVE backdrop-invert */}
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 30 }}
        >
          {hoverType === "link" && (
            <ArrowUpRight
              size={20}
              className="text-white mix-blend-difference  drop-shadow-lg"
              strokeWidth={2.5}
            />
          )}
          {hoverType === "button" && (
            <MousePointerClick
              size={20}
              className="text-white drop-shadow-lg"
              strokeWidth={2.5}
            />
          )}
        </div>

        {/* Optional: Subtle outer glow ring */}
        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full transition-all duration-700 ease-out ${
            isHovering
              ? "w-24 h-24 border-opacity-10"
              : "w-0 h-0 border-opacity-0"
          }`}
          style={{ zIndex: 5 }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
