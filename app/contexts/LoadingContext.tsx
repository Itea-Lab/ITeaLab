"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  progress: 0,
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let assetsLoaded = false;
    const startTime = Date.now();
    const minDuration = 1100; // Smooth ~1.1s bar sweep

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98 && !assetsLoaded) return 98;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.max(1, Math.floor((100 - prev) * 0.15));
        const next = Math.min(prev + step, assetsLoaded ? 100 : 98);
        return next;
      });
    }, 35);

    const finish = () => {
      assetsLoaded = true;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }, remaining);
    };

    // Preload critical hero images
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

    const safety = setTimeout(finish, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, progress }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
