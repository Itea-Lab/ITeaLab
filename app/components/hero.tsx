"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "./ui/plus-icon";
import Image from "next/image";
import { useCurrentTime } from "./hooks/useCurrentTime";
import { useScreenResolution } from "./hooks/useScreenResolution";
import { useLanguage } from "../contexts/LanguageContext";
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
  "Adobe XD",
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
  "MobX",
  "Authentication",
  "OAuth",
  "JWT",
  "Analytics",
  "SEO",
  "Performance",
  "Git",
  "VS Code",
  "Terminal",
  "npm",
  "Web3",
  "Blockchain",
  "AI",
  "Machine Learning",
  "Agile",
  "Scrum",
  "DevOps",
];
const createInfiniteArray = (arr: any, repeatTimes = 50) => {
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

export default function Hero() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const currentTime = useCurrentTime();
  const { resolution } = useScreenResolution();
  const { t } = useLanguage();

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const infiniteKeywords = useMemo(() => {
    return createInfiniteArray(KEYWORDS, 50).map((keyword, index) => ({
      text: keyword,
      size: getRandomSize(),
      id: `${keyword}-${index}`,
    }));
  }, []);
  return (
    <div className="relative h-screen pb-12 sm:pb-16 md:pb-24 w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 text-background-light">
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 z-20 bg-gradient-to-b from-transparent to-background" />
      <div className="absolute top-0 left-0 p-4 font-michroma text-[12px] z-30 opacity-50" suppressHydrationWarning>
        {currentTime.toLocaleTimeString()}
      </div>
      <div className="absolute top-0 right-0 p-4 font-michroma text-[12px] z-30 opacity-50">
        {resolution}
      </div>

      <div
        style={{
          transform: "rotateX(55deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
        }}
        className="text-left relative w-full max-w-6xl hidden md:block"
      >
        {/* Top section with image and text */}
        <div className="relative w-full pb-6 sm:pb-8 md:pb-12 flex justify-start gap-4">
          {/* Blur shadow - positioned behind */}
          <div className="absolute left-0 w-1/2 h-[120px] sm:h-[150px] md:h-[180px] bg-black blur-[60px] sm:blur-[80px] -z-10 -translate-x-10 sm:-translate-x-20 translate-y-10 sm:translate-y-20"></div>

          {/* Main image container - positioned above */}
          <div className="relative duration-300 ease-in-out transition-all grayscale hover:grayscale-0 bg-white h-[120px] sm:h-[150px] md:h-[180px] w-1/2 z-20 mr-0">
            <Image
              src="/images/iot.jpg"
              alt=""
              fill
              className="object-cover"
              style={{ transform: "-rotateZ(45deg)" }}
               priority // This preloads the image
              placeholder="blur" // Shows blur while loading
              blurDataURL="data:image/jpeg;base64,..." // Tiny base64 image
            />
          </div>

          <div className="font-bold text-lg sm:text-2xl md:text-3xl rotate-90 flex items-center text-background-light">
            Your playground
          </div>
        </div>

        {/* Welcome text */}
        <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-gradient-to-r from-dark-green via-light-green to-light-green bg-clip-text font-bold z-20 mb-4 sm:mb-6 md:mb-8">
          {t('welcome_title').split(' ').slice(0, 2).join(' ')}
        </p>

        {/* ITea Lab heading with icons */}
        <div className="relative my-6 sm:my-8 md:my-10">
          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -left-2 sm:-left-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3, // Total cycle time
              times: [0, 0.33, 1], // Fast spin for first 1/3, then pause
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 0,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3,
              times: [0, 0.33, 1],
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 0.75,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -right-2 sm:-right-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3,
              times: [0, 0.33, 1],
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 1.5,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3,
              times: [0, 0.33, 1],
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 2.25,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <h1 className="text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] xl:text-[200px] 2xl:text-[240px] font-michroma font-bold text-light-green leading-none break-words">
            ITea Lab
          </h1>
        </div>

        {/* Bottom section with tagline and logo */}
        <div className="relative w-full flex flex-col sm:flex-row items-start sm:items-end justify-end gap-4 sm:gap-6">
          <div className="relative flex-shrink-0 text-right">
            <div className="absolutebg-black blur-lg sm:blur-lg -translate-x-8 sm:-translate-x-12 md:-translate-x-20 translate-y-8 sm:translate-y-12 md:translate-y-20 z-0
                            text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 text-black text-right">
                Where tech meets its quali-tea
            </div>

            <p className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 text-background-light text-right z-20">
              Where tech meets its quali-tea
            </p>
          </div>

          {/* Logo section */}
          <div className="relative flex-shrink-0">
            {/* Blur shadow */}
            <div className="absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-black blur-lg sm:blur-xl -translate-x-8 sm:-translate-x-12 md:-translate-x-20 translate-y-8 sm:translate-y-12 md:translate-y-20 z-0"></div>

            {/* Main logo container */}
            <div className="relative p-2 sm:p-3 md:p-4 hover:p-0 duration-300 ease-in-out transition-all hover:scale-110 bg-white w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] z-20">
              <Image
                src="/images/icon_transparent.png"
                alt="Hero Image"
                fill
                className="object-cover"
                style={{ transform: "rotate(45deg)" }}
                priority // This preloads the image
                placeholder="blur" // Shows blur while loading
                blurDataURL="data:image/jpeg;base64,..." // Tiny base64 image
              />
            </div>
          </div>
        </div>

        {/* Background keywords */}
        <div
          className="absolute -z-10 flex flex-wrap leading-relaxed"
          style={{
            width: "300vw",
            height: "300vh",
            top: "-100vh",
            left: "-100vw",
            padding: "20vh 20vw",
          }}
        >
          {/* {infiniteKeywords.map((item) => (
            <motion.span
              className={`text-transparent mr-1 sm:mr-2 mb-1 inline-block cursor-default text-xs sm:text-sm md:${item.size}`}
              key={item.id}
              animate={{
                color: "rgba(0,0,0,0.1)",
                textShadow: "none",
                scale: 1,
              }}

            >
              {item.text}
            </motion.span>
          ))} */}
        </div>
      </div>
      <div className="block md:hidden relative">
              <Image
                src="/images/icon_transparent.png"
                alt="Hero Image"
                fill
                className="object-cover hidden"
                style={{ transform: "rotate(45deg)" }}
              />
        {/* ITea Lab heading with icons */}
        <div className="relative my-6 sm:my-8 md:my-10">
          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -left-2 sm:-left-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3, // Total cycle time
              times: [0, 0.33, 1], // Fast spin for first 1/3, then pause
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 0,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3,
              times: [0, 0.33, 1],
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 0.75,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -top-2 sm:-top-3 -right-2 sm:-right-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3,
              times: [0, 0.33, 1],
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 1.5,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3"
            animate={{ rotate: [0, 360, 360] }}
            transition={{
              duration: 3,
              times: [0, 0.33, 1],
              repeat: Infinity,
              ease: ["easeOut", "linear"],
              delay: 2.25,
            }}
          >
            <Icon className="text-white w-full h-full" />
          </motion.div>

          <h1 className="text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] xl:text-[200px] 2xl:text-[240px] font-michroma font-bold text-light-green leading-none break-words">
            ITea Lab
          </h1>
        </div>

        {/* Bottom section with tagline and logo */}
        <div className="relative w-full flex flex-col sm:flex-row items-start sm:items-end justify-end gap-4 sm:gap-6">
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
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
