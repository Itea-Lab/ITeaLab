"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./plus-icon";

export default function PagePreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const minDisplayDuration = 900;
    let assetsLoaded = false;

    // Smooth counter progression
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98 && !assetsLoaded) return 98;
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12));
        const next = Math.min(prev + increment, assetsLoaded ? 100 : 98);
        return next;
      });
    }, 45);

    const finish = () => {
      assetsLoaded = true;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayDuration - elapsed);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
        }, 400);
      }, remaining);
    };

    // Preload essential hero images
    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    Promise.all([
      preload("/images/icon_transparent.png"),
      preload("/images/iot.jpg"),
      new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", () => resolve(), { once: true });
        }
      }),
    ]).then(finish);

    // Safety timeout
    const safety = setTimeout(finish, 1600);

    return () => {
      clearInterval(timer);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.4,
              ease: "easeOut",
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background text-background-light p-6 sm:p-10 md:p-14 select-none pointer-events-auto"
        >
          {/* Top minimal header */}
          <div className="flex justify-between items-center text-xs tracking-wider opacity-60">
            <span
              className="text-light-green tracking-widest uppercase font-semibold"
              style={{ fontFamily: "var(--font-michroma), Michroma, sans-serif" }}
            >
              ITea Lab
            </span>
            <div className="flex items-center gap-2 text-background-light/70">
              <span className="w-1.5 h-1.5 rounded-full bg-light-green animate-pulse" />
              <span style={{ fontFamily: "var(--font-ubuntu), Ubuntu, sans-serif" }}>
                Infusing...
              </span>
            </div>
          </div>

          {/* Center Brand Framing with 4 Rotating Corner Crosshairs */}
          <div className="relative mx-auto my-auto flex flex-col items-center justify-center max-w-4xl w-full py-8 sm:py-12 px-6 sm:px-10">
            {/* 4 Corner Crosshairs matching Hero */}
            <motion.div
              className="absolute -top-3 -left-3 h-5 w-5 sm:h-7 sm:w-7 text-white"
              animate={{ rotate: [0, 360, 360] }}
              transition={{
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
              }}
            >
              <Icon className="w-full h-full" />
            </motion.div>
            <motion.div
              className="absolute -top-3 -right-3 h-5 w-5 sm:h-7 sm:w-7 text-white"
              animate={{ rotate: [0, 360, 360] }}
              transition={{
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 0.75,
              }}
            >
              <Icon className="w-full h-full" />
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -left-3 h-5 w-5 sm:h-7 sm:w-7 text-white"
              animate={{ rotate: [0, 360, 360] }}
              transition={{
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 1.5,
              }}
            >
              <Icon className="w-full h-full" />
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -right-3 h-5 w-5 sm:h-7 sm:w-7 text-white"
              animate={{ rotate: [0, 360, 360] }}
              transition={{
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 2.25,
              }}
            >
              <Icon className="w-full h-full" />
            </motion.div>

            {/* Rotated Diamond Logo matching Hero */}
            <div className="mb-6 sm:mb-8">
              <div className="relative p-2.5 sm:p-3 bg-white w-14 h-14 sm:w-16 sm:h-16 shadow-[0_0_24px_rgba(116,161,115,0.3)]">
                <Image
                  src="/images/icon_transparent.png"
                  alt="ITea Lab Logo"
                  fill
                  className="object-cover p-1.5"
                  priority
                />
              </div>
            </div>

            {/* Headline with Progressive Liquid Color Fill */}
            <div className="relative text-center">
              {/* Ghost base layer */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-light-green/20 select-none leading-none"
                style={{ fontFamily: "var(--font-michroma), Michroma, sans-serif" }}
              >
                ITea Lab
              </h1>

              {/* Luminous revealed layer with smooth clip-path wipe */}
              <h1
                className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-light-green select-none leading-none transition-all duration-150 ease-out drop-shadow-[0_0_30px_rgba(116,161,115,0.4)]"
                style={{
                  fontFamily: "var(--font-michroma), Michroma, sans-serif",
                  clipPath: `inset(0 ${100 - progress}% 0 0)`,
                }}
              >
                ITea Lab
              </h1>
            </div>

            {/* Tagline matching Hero */}
            <p
              className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl font-bold text-background-light text-center tracking-wide"
              style={{ fontFamily: "var(--font-ubuntu), Ubuntu, sans-serif" }}
            >
              Where tech meets its quali-tea
            </p>
          </div>

          {/* Bottom Row: Minimal Hairline Track & Oversized Typographic Counter */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-white/10 pt-4 sm:pt-6">
            {/* Progress hairline track */}
            <div className="w-full sm:max-w-xs">
              <div className="h-[2px] w-full bg-white/10 overflow-hidden relative rounded-full">
                <div
                  className="h-full bg-light-green transition-all duration-150 ease-out shadow-[0_0_10px_#74a173]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Oversized Typographic Number Counter */}
            <div
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-light-green tracking-tight leading-none self-end"
              style={{ fontFamily: "var(--font-michroma), Michroma, sans-serif" }}
            >
              {progress.toString().padStart(2, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
