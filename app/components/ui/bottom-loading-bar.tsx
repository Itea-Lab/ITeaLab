"use client";
import React, { useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomLoadingBar() {
  const { isLoading, progress } = useLoading();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="bottom-loader-bar"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] bg-background flex flex-col justify-end select-none pointer-events-auto"
        >
          {/* Subtle ambient glow in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-light-green/5 blur-3xl" />
          </div>

          {/* Number indicator */}
          <div className="relative z-10 flex justify-end items-end px-6 sm:px-10 pb-4 sm:pb-6 select-none">
            <span className="font-michroma text-4xl sm:text-6xl md:text-7xl font-bold text-light-green tracking-tight tabular-nums drop-shadow-[0_0_24px_rgba(116,161,115,0.4)]">
              {Math.min(100, Math.round(progress))}%
            </span>
          </div>

          {/* Hairline loading bar */}
          <div className="relative z-10 w-full h-[3px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-light-green transition-all duration-75 ease-out shadow-[0_0_12px_#74a173,0_0_24px_rgba(116,161,115,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
