'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingDock } from "./ui/floating-dock";
import SimpleLanguageSwitcher from "./simple-language-switcher";
import { useLanguage } from "../contexts/LanguageContext";
import { useLoading } from "../contexts/LoadingContext";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandFacebook,
  IconExchange,
  IconHome,
  IconNetwork,
  IconItalic,
  IconNews,
  IconBrandLinkedin,
  IconGitFork,
} from "@tabler/icons-react";

export function Navbar() { 
  const { t } = useLanguage();
  const { isLoading } = useLoading();
  
  const links = [
    {
      title: t('home'),
      icon: (
        <Image
          src="/images/icon_transparent.png"
          width={30}
          height={30}
          alt="ITea Lab Logo"
          priority
        />),    
      href: "#",
      target: "_self",
    },

    {
      title: t('about'),
      icon: (
        <IconItalic className="h-full w-full text-neutral-300" />
      ),
      href: "#about",
      target: "_self",

    },
    {
      title: t('what_we_do'),
      icon: (
        <IconNetwork className="h-full w-full text-neutral-300" />
      ),
      href: "#what-we-do",

      target: "_self",
    },    
    {
      title: t('how_our_team_work'),
      icon: (
        <IconGitFork className="h-full w-full text-neutral-300" />
      ),
      href: "#how-our-team-work",

      target: "_self",
    },
    {
      title: t('news'),
      icon: (
        <IconNews className="h-full w-full text-neutral-300" />
      ),
      href: "#news",
      target: "_self",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-300" />
      ),
      href: 'https://www.linkedin.com/company/itea-lab/',
      target: "_blank",

    },

    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-300" />
      ),
      href: "https://www.facebook.com/ITeaLabTeam",
      target: "_blank",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-300" />
      ),
      href: "https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FItea-Lab%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExOFdZVkFDOTVUaGQ2UGxoeAEeNUBc7hmZM-IuWWXQzBC4lY9ol_NZ9qFYrhYJ7xyV-cbugMDPgSQwXpYCNVY_aem_BNtGzBRq4LyeJwF1jUzZmg&h=AT0AiR0nQAn3ZryC3aPVQtpVFgM8YAX2KKEIFH-vE6ODJqDwVUl4MLQ3xdVu6GhsnwqustI9Sp0KfZNON3lz3GBmisA-735pfZRqNmJiSglUAqTXHPSGCE863ka0dahgfYvox_7IJL2AIyzBCAOsvAVHAQ",
      target: "_blank",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={
        isLoading
          ? { opacity: 0, y: 30, pointerEvents: "none" }
          : { opacity: 1, y: 0, pointerEvents: "auto" }
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-40 bottom-0 flex items-end justify-start h-auto w-full p-4 gap-4"
    >
      <FloatingDock items={links} />
      <div className="flex h-16 items-end">
        <SimpleLanguageSwitcher />
      </div>
    </motion.div>
  );
}
