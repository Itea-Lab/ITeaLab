"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "./ui/plus-icon";
import Image from "next/image";
import { useCurrentTime } from "./hooks/useCurrentTime";
import { useScreenResolution } from "./hooks/useScreenResolution";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";

const KEYWORDS = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Svelte",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind",
  "Bootstrap",
  "Sass",
  "SCSS",
  "PostCSS",
  "Webpack",
  "Vite",
  "Parcel",
  "Rollup",
  "ESLint",
  "Prettier",
  "Babel",
  "Node.js",
  "Express",
  "Fastify",
  "Nest.js",
  "Python",
  "Django",
  "Flask",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Java",
  "Spring",
  "C#",
  "ASP.NET",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "Dart",
  "Flutter",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "SQLite",
  "Firebase",
  "Supabase",
  "PlanetScale",
  "Prisma",
  "AWS",
  "Azure",
  "GCP",
  "Vercel",
  "Netlify",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "GitHub Actions",
  "Jenkins",
  "GitLab",
  "Linux",
  "Ubuntu",
  "REST",
  "GraphQL",
  "API",
  "gRPC",
  "WebSocket",
  "Socket.io",
  "tRPC",
  "React Native",
  "Expo",
  "iOS",
  "Android",
  "PWA",
  "Mobile First",
  "Figma",
  "Sketch",
  "UI/UX",
  "Design System",
  "Accessibility",
  "Jest",
  "Vitest",
  "Cypress",
  "Playwright",
  "Testing Library",
  "Storybook",
  "Redux",
  "Zustand",
  "Context API",
  "Authentication",
  "OAuth",
  "JWT",
  "SEO",
  "Performance",
  "Git",
  "VS Code",
  "Terminal",
  "Web3",
  "AI",
  "Machine Learning",
  "Agile",
  "Scrum",
  "DevOps",
];

const createInfiniteArray = (arr: string[], repeatTimes = 8) => {
  return Array(repeatTimes).fill(arr).flat();
};

const getRandomSize = () => {
  const sizes = ["text-sm", "text-xl"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const getRandomColor = () => {
  const colors = [
    "#74A173", // light-green
    "#5eae5c", // dark-green
    "#83d681", // dark-green
    "#428341", // dark-green
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/*
   OPTION 2: INTERACTIVE 3D ISOMETRIC GRID (ACTIVE)
   Exact true 1:1 square cells (64px x 64px) centered on the 3D plane.
   Invisible by default. Lights up on hover, unblocked by overlaying text.
 */
const CELL_SIZE = 64; // 64px x 64px true square
const COLS = 28;
const ROWS = 28;
const TOTAL_CELLS = COLS * ROWS;

const Interactive3DGrid = React.memo(function Interactive3DGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const cells = useMemo(
    () => Array.from({ length: TOTAL_CELLS }, (_, i) => i),
    [],
  );

  if (!mounted) return null;

  return (
    <div
      className="absolute grid select-none pointer-events-auto"
      style={{
        width: `${COLS * CELL_SIZE}px`,
        height: `${ROWS * CELL_SIZE}px`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
        maskImage:
          "radial-gradient(ellipse 60% 60% at 50% 50%, black 25%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 60% at 50% 50%, black 25%, transparent 80%)",
      }}
    >
      {cells.map((index) => (
        <div
          key={index}
          className="relative w-16 h-16 aspect-square border border-transparent transition-all duration-700 ease-out hover:duration-0 hover:border-light-green/70 hover:bg-light-green/15 hover:shadow-[0_0_24px_rgba(116,161,115,0.4)] group cursor-crosshair"
        >
          {/* Subtle intersection accent dot - invisible until hover */}
          <div className="absolute -top-[1.5px] -left-[1.5px] w-[3px] h-[3px] rounded-full bg-transparent group-hover:bg-light-green group-hover:scale-150 transition-all duration-700 hover:duration-0" />
        </div>
      ))}
    </div>
  );
});

/*
   OPTION 1: FLOATING WORDS MATRIX (COMMENTED OUT)
   Kept for reference. Uncomment <BackgroundKeywords /> below to re-enable.
*/
const BackgroundKeywords = React.memo(function BackgroundKeywords() {
  const infiniteKeywords = useMemo(() => {
    return createInfiniteArray(KEYWORDS, 8).map((keyword, index) => ({
      text: keyword,
      size: getRandomSize(),
      id: `${keyword}-${index}`,
    }));
  }, []);

  return (
    <div
      className="absolute -z-10 flex flex-wrap leading-relaxed select-none pointer-events-none"
      style={{
        width: "280vw",
        height: "280vh",
        top: "-90vh",
        left: "-90vw",
        padding: "15vh 15vw",
      }}
    >
      {infiniteKeywords.map((item) => (
        <motion.span
          className={`text-transparent mr-1 sm:mr-2 mb-1 inline-block cursor-default text-xs sm:text-sm md:${item.size} pointer-events-auto`}
          key={item.id}
          style={{ willChange: "transform, color" }}
          animate={{
            color: "rgba(0,0,0,0.1)",
            textShadow: "none",
            scale: 1,
          }}
          whileHover={{
            color: getRandomColor(),
            textShadow: "0 0 16px currentColor, 0 0 32px currentColor",
            scale: 1.1,
            transition: { duration: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {item.text}
        </motion.span>
      ))}
      \n{" "}
    </div>
  );
});

// Isolated time display to avoid re-rendering entire hero tree every second
const TimeDisplay = React.memo(function TimeDisplay({ isVisible }: { isVisible: boolean }) {
  const currentTime = useCurrentTime();
  return (
    <div
      className={`absolute top-0 left-0 p-4 font-michroma text-[12px] z-30 transition-opacity duration-700 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
      suppressHydrationWarning
    >
      {currentTime.toLocaleTimeString()}
    </div>
  );
});

// Isolated resolution display to avoid re-rendering hero on resize
const ResolutionDisplay = React.memo(function ResolutionDisplay({ isVisible }: { isVisible: boolean }) {
  const { resolution } = useScreenResolution();
  return (
    <div className={`absolute top-0 right-0 p-4 font-michroma text-[12px] z-30 transition-opacity duration-700 ${isVisible ? 'opacity-50' : 'opacity-0'}`}>
      {resolution}
    </div>
  );
});

const HERO_TITLE_WORDS = [
  { word: "ITea", chars: ["I", "T", "e", "a"], className: "mr-4 sm:mr-6 md:mr-8 lg:mr-10" },
  { word: "Lab", chars: ["L", "a", "b"], className: "" },
];

export default function Hero() {
  const { t } = useLanguage();
  const { isLoading } = useLoading();

  return (
    <div className="relative h-screen pb-12 sm:pb-16 md:pb-24 w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 text-background-light">
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 z-20 bg-gradient-to-b from-transparent to-background" />
      <TimeDisplay isVisible={!isLoading} />
      <ResolutionDisplay isVisible={!isLoading} />

      <div
        style={{
          transform: "rotateX(55deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
        }}
        className="text-left relative w-full max-w-6xl hidden md:block pointer-events-none"
      >
        {/* Option 2: 3D Interactive Isometric Grid (Rendered first so it sits behind interactive elements) */}
        <Interactive3DGrid />

        {/* Top section with image and text - slides up after load */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full pb-6 sm:pb-8 md:pb-12 flex justify-start gap-4 pointer-events-none"
        >
          {/* Blur shadow - positioned behind */}
          <div className="absolute left-0 w-1/2 h-[120px] sm:h-[150px] md:h-[180px] bg-black blur-[60px] sm:blur-[80px] -z-10 -translate-x-10 sm:-translate-x-20 translate-y-10 sm:translate-y-20 pointer-events-none"></div>

          {/* Main image container */}
          <div
            className="relative duration-300 ease-in-out transition-all grayscale hover:grayscale-0 bg-white h-[120px] sm:h-[150px] md:h-[180px] w-1/2 z-20 mr-0 pointer-events-auto cursor-pointer"
            style={{ transform: "translateZ(20px)" }}
          >
            <Image
              src="/images/iot.jpg"
              alt=""
              fill
              className="object-cover"
              priority // This preloads the image
            />
          </div>

          <div className="font-bold text-lg sm:text-2xl md:text-3xl rotate-90 flex items-center text-background-light pointer-events-none select-none">
            Your playground
          </div>
        </motion.div>

        {/* Welcome text - 3D emerging from grid along Z level as whole phrase to keep color gradient */}
        <motion.p
          initial={{ opacity: 0, z: 0 }}
          animate={
            !isLoading
              ? { opacity: 1, z: 35 }
              : { opacity: 0, z: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-gradient-to-r from-dark-green via-light-green to-light-green bg-clip-text font-bold mb-4 sm:mb-6 md:mb-8 pointer-events-none select-none py-2 leading-tight sm:leading-normal"
        >
          {t("welcome_title")}
        </motion.p>

        {/* ITea Lab heading with icons - 3D emerging from grid along Z level character by character */}
        <div
          style={{ transformStyle: "preserve-3d" }}
          className="relative my-6 sm:my-8 md:my-10 pointer-events-none select-none"
        >
          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -left-2 sm:-left-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.35 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 0,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.35 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 0.75,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -right-2 sm:-right-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.35 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 1.5,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.35 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 2.25,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <h1
            className="text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] xl:text-[200px] 2xl:text-[240px] font-michroma font-bold text-light-green leading-none break-words pointer-events-none select-none flex flex-wrap items-baseline"
            style={{ transformStyle: "preserve-3d" }}
          >
            {HERO_TITLE_WORDS.map((wordObj, wordIdx) => {
              const startIndex = wordIdx === 0 ? 0 : HERO_TITLE_WORDS[0].chars.length;
              return (
                <span
                  key={wordObj.word}
                  className={`inline-flex whitespace-nowrap ${wordObj.className}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {wordObj.chars.map((char, charIdx) => {
                    const globalIndex = startIndex + charIdx;
                    return (
                      <motion.span
                        key={charIdx}
                        initial={{ opacity: 0, z: 0 }}
                        animate={
                          !isLoading
                            ? { opacity: 1, z: 45 }
                            : { opacity: 0, z: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 0.45 + globalIndex * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Bottom section with tagline and logo - slides up after load */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col sm:flex-row items-start sm:items-end justify-end gap-4 sm:gap-6 pointer-events-none"
        >
          <p className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 text-background-light text-right pointer-events-none select-none">
            Where tech meets its quali-tea
          </p>

          {/* Logo section */}
          <div className="relative flex-shrink-0 pointer-events-auto">
            {/* Blur shadow */}
            <div className="absolute inset-0 bg-black/40 blur-md sm:blur-lg translate-y-2 sm:translate-y-3 z-0 pointer-events-none"></div>

            {/* Main logo container */}
            <div
              className="relative p-2 sm:p-3 md:p-4 hover:p-0 duration-300 ease-in-out transition-all hover:scale-110 bg-white w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] z-20 pointer-events-auto"
            >
              <Image
                src="/images/icon_transparent.png"
                alt="Hero Image"
                fill
                className="object-cover"
                priority // This preloads the image
              />
            </div>
          </div>
        </motion.div>

        {/* Floating Words Matrix (Commented out) */}
        {/* <BackgroundKeywords /> */}
      </div>

      <div className="block md:hidden relative" style={{ perspective: "1000px" }}>
        {/* ITea Lab heading with icons - 3D emerging along Z level character by character */}
        <div
          style={{ transformStyle: "preserve-3d" }}
          className="relative my-6 sm:my-8 md:my-10"
        >
          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -left-2 sm:-left-3"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 0,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 0.75,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -right-2 sm:-right-3"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 1.5,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1, rotate: [0, 360, 360] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              rotate: {
                duration: 3,
                times: [0, 0.33, 1],
                repeat: Infinity,
                ease: ["easeOut", "linear"],
                delay: 2.25,
              },
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <h1
            className="text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] xl:text-[200px] 2xl:text-[240px] font-michroma font-bold text-light-green leading-none break-words flex flex-wrap items-baseline"
            style={{ transformStyle: "preserve-3d" }}
          >
            {HERO_TITLE_WORDS.map((wordObj, wordIdx) => {
              const startIndex = wordIdx === 0 ? 0 : HERO_TITLE_WORDS[0].chars.length;
              return (
                <span
                  key={wordObj.word}
                  className={`inline-flex whitespace-nowrap ${wordObj.className}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {wordObj.chars.map((char, charIdx) => {
                    const globalIndex = startIndex + charIdx;
                    return (
                      <motion.span
                        key={charIdx}
                        initial={{ opacity: 0, z: -30, scale: 0.95 }}
                        animate={
                          !isLoading
                            ? { opacity: 1, z: 0, scale: 1 }
                            : { opacity: 0, z: -30, scale: 0.95 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 0.25 + globalIndex * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Bottom section with tagline and logo - slides up after load */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col sm:flex-row items-start sm:items-end justify-end gap-4 sm:gap-6"
        >
          <p className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 text-background-light text-right z-20">
            Where tech meets its quali-tea
          </p>

          {/* Logo section */}
          <div className="relative flex-shrink-0">
            {/* Blur shadow */}
            <div className="absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-black blur-lg sm:blur-xl -translate-x-8 sm:-translate-x-12 md:-translate-x-20 translate-y-8 sm:translate-y-12 md:translate-y-20 z-0"></div>

            {/* Main logo container */}
            <div className="relative p-2 sm:p-3 md:p-4 hover:p-0 duration-300 ease-in-out transition-all bg-white w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] z-20">
              <Image
                src="/images/icon_transparent.png"
                alt="Hero Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
