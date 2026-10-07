"use client";
import React from "react";
import Image from "next/image";
import { Timeline } from "./ui/timeline";
import { Icon } from "./ui/plus-icon";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();
  
  const data = [
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
            {t('conception')}
          </p>
          <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-normal text-neutral-200">
            {t('conception_desc')}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="/images/2023/image1.jpeg"
              alt="Conception image"
              width={500}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-40 sm:h-48 md:h-60 lg:h-80 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: t('early_2024'),
      content: (
        <div>
          <p className="mb-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-neutral-200">
            {t('it_student_association')}
          </p>
          <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-normal text-neutral-200">
            {t('it_student_desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image
              src="/images/itealab_1-min.JPG"
              alt="hero template"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-32 sm:h-40 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/itealab_7-min.JPG"
              alt="feature template"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-32 sm:h-40 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/itealab_6.jpeg"
              alt="bento template"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-32 sm:h-40 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/itealab_2.JPG"
              alt="cards template"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-32 sm:h-40 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-neutral-200">
            {t('swinburne_it_lab')}
          </p>
          <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-normal text-neutral-200">
            {t('swinburne_desc')}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="/images/itealab_4-min.JPG"
              alt="Conception image"
              width={500}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-40 sm:h-48 md:h-60 lg:h-80 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: t('early_2025'),
      content: (
        <div>
          <p className="mb-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-neutral-200">
            {t('itea_lab_community')}
          </p>
          <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-normal text-neutral-200">
            {t('community_desc')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/itealab_5.jpg"
              alt="Conception image"
              width={500}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-40 sm:h-48 md:h-60 lg:h-80 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            /> 
            <Image
              src="/images/itealab_8.jpg"
              alt="Conception image"
              width={500}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-40 sm:h-48 md:h-60 lg:h-80 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: t('present'),
      content: (
        <div>
          <p className="mb-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-neutral-200">
            {t('future_roadmap')}
          </p>
          <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-normal text-neutral-200">
            {t('future_desc')}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="/images/itealab_3-min.JPG"
              alt="Conception image"
              width={500}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-40 sm:h-48 md:h-60 lg:h-80 w-full rounded-lg object-cover shadow-[0_6px_12px_rgba(0,100,50,0.4),_0_8px_16px_rgba(0,255,150,0.2)]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="about" className="relative w-full overflow-clip bg-background">
      <div className="max-w-7xl mx-auto pb-12 sm:pb-16 md:pb-20 pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 md:px-10 lg:px-12">
        {/* Top section with two cards */}
        <div className="flex flex-col lg:flex-row justify-start items-start gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-12">
          {/* About US Card */}
          <motion.div
            className="flex-[2] relative border border-white/10 w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-white" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-white" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-white" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-white" />

            <h2 className="font-michroma text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white pl-3 sm:pl-4 py-1.5 sm:py-2 leading-normal bg-gradient-to-r from-dark-green to-light-green max-w-4xl font-bold">
              {t('about_us')}
            </h2>
            <p className="text-background-light text-sm sm:text-base md:text-lg p-3 sm:p-4 leading-relaxed">
              {t('about_description_long')}
            </p>
          </motion.div>

          {/* Our VISION Card */}
          <motion.div
            className="flex-[3] relative border border-white/10 w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-white" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-white" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-white" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-white" />

            <h2 className="font-michroma text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white pl-3 sm:pl-4 py-1.5 sm:py-2 leading-normal bg-gradient-to-r from-dark-green to-light-green max-w-4xl font-bold">
              {t('our_vision')}
            </h2>
            <p className="text-background-light text-sm sm:text-base md:text-lg p-3 sm:p-4 leading-relaxed">
              {t('vision_description')}
            </p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-7xl mx-auto pt-0 lg:pt-12 xl:pt-20">
          <motion.div
            className="relative border border-white/10 w-full lg:w-3/4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
            <h2 className="font-michroma text-lg md:text-3xl bg-gradient-to-r from-dark-green to-light-green pl-4 py-1.5 sm:py-2 leading-normal font-bold">
              {t('our_journey')}
            </h2>
            <p className="text-background-light text-sm sm:text-base md:text-lg p-4">
              {t('journey_description')}
            </p>
          </motion.div>
        </div>
        <Timeline data={data} />
      </div>
    </div>
  );
}
