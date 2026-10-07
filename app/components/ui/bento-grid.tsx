"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "../lib/utils";
import { Icon } from "./plus-icon";

const ShapeIcon = dynamic(
  () => import("./shapeicon").then((mod) => mod.ShapeIcon),
  { ssr: false }
);

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  shape = "square",
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  shape?: string; // Use ShapeType if defined
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group group/bento shadow-input row-span-1 flex flex-col justify-between border border-neutral-200 bg-background-light/50 hover:bg-background/20 backdrop-blur-3xl p-4 transition duration-200 relative",
        className,
      )}
    >
      <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-black" />
      <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-black" />
      <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-black" />
      <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-black" />
      
      {header}
      <div className="transition-all duration-200 relative group-hover:bg-background/70 group-hover:text-background-light rounded-xl group-hover:mx-4">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 opacity-0 translate-x-4 group-hover:opacity-100 transition-all duration-300 ease-out -ml-6 sm:-ml-8 md:-ml-10 lg:-ml-12">
          {isHovered && <ShapeIcon shape={shape} className="h-16 w-16 sm:h-32 sm:w-32" />}
        </div>
        <div className="flex flex-col items-start relative z-0 p-4 sm:p-6backdrop-blur-sm  
                w-full
                group-hover:mr-16 group-hover:w-[calc(100%-4rem)]
                transition-all duration-300 ease-out
                group-hover:animate-none
                animate-[bounce-return_0.8s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
        <div className="mt-2 font-sans font-bold ">
          {title}
        </div>
        <div className="font-sans text-xs font-normal mt-1">
          {description}
        </div>
                </div>
        
      </div>
    </div>
  );
};