"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Github, Facebook, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const FOOTER_BRAND_WORDS = [
  { word: "ITea", chars: ["I", "T", "e", "a"], className: "mr-3 sm:mr-5 md:mr-7 lg:mr-10" },
  { word: "Lab", chars: ["L", "a", "b"], className: "" },
];

const charVariants = {
  hidden: {
    y: "115%",
    opacity: 0,
  },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Footer = () => {
  const { t } = useLanguage();
  const brandRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(brandRef, { amount: "some", once: false });
  return (
    <footer className="w-full bg-background text-background-light relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Top Section with Brand Message and Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8 mb-12 sm:mb-16">
          {/* Left section - Brand Message */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-light-green leading-tight mb-4 sm:mb-6">
              {t("footer_message")}
            </h2>
            <div className="space-y-2">
              <p className="font-medium text-sm sm:text-base">
                {t("more_information")}
              </p>
              <Link
                href="mailto:contact.contact.itealab@gmail.com"
                className="underline hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                contact.itealab@gmail.com
              </Link>
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-light-green mb-4 sm:mb-6">
              Explore
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <Link
                href="#about"
                className="block hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                About
              </Link>
              <Link
                href="#what-we-do"
                className="block hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                Community
              </Link>
              <Link
                href="#joinus"
                className="block hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                Join Us
              </Link>
            </div>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-light-green mb-4 sm:mb-6">
              Connect
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <Link
                href="https://github.com/Itea-Lab"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                GitHub
              </Link>
              <Link
                href="https://www.facebook.com/ITeaLabTeam"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                Facebook
              </Link>
              <Link
                href="https://www.linkedin.com/company/itea-lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#74A173] transition-colors text-sm sm:text-base"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Campus Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-light-green mb-4 sm:mb-6">
              Location
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://maps.app.goo.gl/Y1r1YzVi6rEpftYn7"
              >
                Visit now
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-light-green mb-8 sm:mb-12">
          <Link
            href="https://www.linkedin.com/company/itea-lab/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-background-light rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Linkedin size={18} className="sm:w-5 sm:h-5" />
          </Link>
          <Link
            href="https://github.com/Itea-Lab"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-background-light rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Github size={18} className="sm:w-5 sm:h-5" />
          </Link>
          <Link
            href="https://www.facebook.com/ITeaLabTeam"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-background-light rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Facebook size={18} className="sm:w-5 sm:h-5" />
          </Link>
          <Link
            href="mailto:contact.contact.itealab@gmail.com"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-background-light rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Mail size={18} className="sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Large Brand Name with Character Wave Animation */}
        <div ref={brandRef} className="text-left mb-8 sm:mb-12 leading-none py-2">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[152px] 2xl:text-[216px] font-bold tracking-tight font-michroma break-words flex flex-wrap items-baseline">
            {FOOTER_BRAND_WORDS.map((wordObj, wordIdx) => {
              const startIndex = wordIdx === 0 ? 0 : FOOTER_BRAND_WORDS[0].chars.length;
              return (
                <span
                  key={wordObj.word}
                  className={`inline-flex whitespace-nowrap overflow-hidden py-2 ${wordObj.className}`}
                >
                  {wordObj.chars.map((char, charIdx) => {
                    const globalIndex = startIndex + charIdx;
                    return (
                      <motion.span
                        key={charIdx}
                        custom={globalIndex}
                        variants={charVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="inline-block will-change-transform"
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

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-6 sm:pt-8 border-t border-gray-200 gap-4 lg:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
            <p className="text-sm sm:text-base">{t("copyright")}</p>
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-background-light rounded-full">
                <Image
                  src="/images/icon_transparent.png"
                  width={24}
                  height={24}
                  alt="ITea Lab Logo"
                  className="sm:w-[30px] sm:h-[30px]"
                />
              </div>
              <span className="font-medium text-sm sm:text-base">ITea Lab</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm sm:text-base">
            Made with love for ITea Lab -{" "}
            <span className="mx-1">
              <a
                href="https://leviron.me"
                className="text-light-green py-2 hover:underline"
                target="_blank"
              >
                Leviron
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
