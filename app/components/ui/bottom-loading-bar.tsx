"use client";
import React from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomLoadingBar() {
  const { isLoading, progress } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="bottom-loader-bar"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
        >
          {/* Number indicator */}
          <div className="flex justify-end items-end px-6 sm:px-10 pb-3 sm:pb-4 select-none">
            <span className="font-michroma text-3xl sm:text-5xl md:text-6xl font-bold text-light-green tracking-tight tabular-nums">
              {Math.min(100, Math.round(progress))}%
            </span>
          </div>

          {/* Hairline loading bar */}
          <div className="w-full h-[2.5px] bg-white/10 overflow-hidden">
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
