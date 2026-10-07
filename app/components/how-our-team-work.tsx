"use client";
import { Code, GitBranch, Globe, GraduationCap } from "lucide-react";
import { cn } from "./lib/utils";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { ShapeIcon } from "./ui/shapeicon";
import { useLanguage } from "../contexts/LanguageContext";
import Image from "next/image";

export default function HowOurTeamWork() {
  const { t } = useLanguage();
  
  const items = [
    {
      title: t('research_driven'),
      description: (
        <span className="text-sm">
          {t('research_driven_desc')}
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] p-4">
          <Image 
            src="/images/decoration_4.png" 
            alt="decoration" 
            width={200} 
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ),
      className: "md:col-span-2",
      shape: "dodecahedron",
    },
    {
      title: t('agile_methodology'),
      description: (
        <span className="text-sm">
          {t('agile_methodology_desc')}
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] p-4">
          <Image 
            src="/images/decoration_3.jpg" 
            alt="decoration" 
            width={200} 
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ),
      className: "md:col-span-1",
      shape: "tetrahedron",
    },
    {
      title: t('flexible_work'),
      description: (
        <span className="text-sm">
          {t('flexible_work_desc')}
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] p-4">
          <Image 
            src="/images/decoration_2.jpg" 
            alt="decoration" 
            width={200} 
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ),
      className: "md:col-span-1",
      shape: "octahedron",
    },
    {
      title: t('continuous_growth'),
      description: (
        <span className="text-sm">
          {t('continuous_growth_desc')}
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] p-4">
          <Image 
            src="/images/decoration.jpg" 
            alt="decoration" 
            width={200} 
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ),
      className: "md:col-span-2",
      shape: "icosahedron",
    },
  ];

  return (
    <div
      id="how-our-team-work"
      className="bg-background-light w-full text-black py-16 sm:py-20 md:py-24 lg:py-32 relative"
    >

      <Image
        src="/images/icon_transparent.png"
        width={800}
        height={800}
        alt="ITea Lab Logo"
        className="hidden w-[267px] h-[267px] sm:w-[333px] sm:h-[333px] md:w-[400px] md:h-[400px] lg:w-[467px] lg:h-[467px] xl:w-[533px] xl:h-[533px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 z-10"
      />
      <div
        className="absolute inset-0 z-0 right-0 w-full hidden lg:block"
        style={{
          backgroundImage: "url(/images/test2.svg)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="font-michroma mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-dark-green to-light-green bg-clip-text py-2 leading-normal sm:leading-relaxed inline-block">
            {t('how_team_work_title')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-center max-w-3xl mx-auto transition-opacity duration-2000 leading-relaxed px-4">
            {t('how_team_work_description')}
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("backdrop-blur-sm border-green-800/20 hover:border-green-800/50 ",
                item.className
              )}
              shape={item.shape || "square"}
            />
          ))}
        </BentoGrid>

        {/* Additional spacing for mobile */}
        <div className="h-8 sm:h-12 md:h-16 lg:hidden"></div>
      </div>
    </div>
  );
}