"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "./plus-icon";

const ImageSlider = () => {
  const slides = [
    {
      id: 1,
      image:
        "/images/itealab_10.JPG",
      title: "Modern Development",
      description: "Building the future with cutting-edge technologies",
    },
    {
      id: 2,
      image: "/images/itealab_12-min.JPG",
      title: "Team Collaboration",
      description: "Working together to create amazing solutions",
    },
    {
      id: 3,
      image:
        "/images/itealab_11.JPG",
      title: "Innovation Hub",
      description: "Where creativity meets technology",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Generous rootMargin so it activates well before scrolling into view and stays smooth
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "400px 0px 400px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isInView, slides.length]);

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div ref={containerRef} className="relative col-span-3">
      {/* Corner Icons */}

      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black z-10" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black z-10" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black z-10" />
      <div className="border-1 border-black/30 relative overflow-hidden h-96">
        {/* Slides Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={90}
                className="w-full h-full object-cover"
              />
              {/* Text Overlay - Bottom Left */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 bg-opacity-40 flex items-end justify-start">
                <div className="text-left text-white p-6 pb-12">
                  <h2 className="text-3xl font-bold mb-3 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg drop-shadow-md">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full transition-all duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full transition-all duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-[2px] transition-all duration-200 ${
                index === currentSlide
                  ? "bg-light-green"
                  : "bg-dark-green bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
