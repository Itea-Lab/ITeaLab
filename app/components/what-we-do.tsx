"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShapeIcon } from "./ui/shapeicon";
import { Icon } from "./ui/plus-icon";
import ImageSlider from "./ui/image-slider";
import { useLanguage } from "../contexts/LanguageContext";
import { supabase } from "./lib/supabase";
import Link from "next/link";
interface workshopItem {
  id?: number;
  name: string;
  url: string;
  image?: string;
  alt?: string;
  shape?: string;
  created_at?: string;
  updated_at?: string;
}
const Community = () => {
  const { t } = useLanguage();
  const [workshops, setWorkshops] = useState<workshopItem[]>([]);
  const maxItemToShow = 3;
  
  useEffect(() => {
    const fetchWorkshops = async () => {
      const { data, error } = await supabase.from("workshops").select("*").order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching workshops:", error);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Unexpected workshops response:", data);
        return;
      }

      setWorkshops(data as workshopItem[]);
    };

    fetchWorkshops();
  }, []);

  return (
    <div
      id="what-we-do"
      className="bg-background-light w-full text-black py-16 sm:py-20 md:py-24 lg:py-32 relative"
    >
      <div
        className="absolute inset-0 z-0 left-0 w-full hidden lg:block"
        style={{
          backgroundImage: "url(/images/test.svg)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 z-10 relative">
        {/* Main Content Section */}
        <div className="flex flex-col space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Header and Image Slider Row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Header and Description */}
            <div className="text-center lg:text-left lg:flex-1 mb-8 lg:mb-0">
              <h1 className="font-michroma mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-dark-green to-light-green bg-clip-text">
                {t("what_we_do_title")}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto lg:mx-0">
                {t("what_we_do_desc")}
              </p>
            </div>

            {/* Image Slider */}
            <div className="lg:flex-1">
              <ImageSlider />
            </div>
          </div>

          {/* Workshops Section */}
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <h2 className="font-michroma text-2xl sm:text-3xl md:text-4xl font-bold text-background text-center lg:text-left">
              {t("workshops")}
            </h2>

            {/* Workshop Links */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:justify-start">
              {workshops.slice(0, maxItemToShow).map((workshop, index) => (
                <div key={index} className="relative group">
                  {/* Corner Icons */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300 ease-out -ml-6 sm:-ml-8 md:-ml-10 lg:-ml-12">
                    <ShapeIcon
                      shape={workshop.shape}
                      className="h-16 w-16 sm:h-32 sm:w-32"
                    />
                  </div>

                  <a
                    href={workshop.url}
                    target="_blank"
                    className="relative z-0 flex items-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm border border-green-800/20 hover:border-green-800/50 hover:bg-background/80 textbackground hover:text-background-light 
                w-full
                group-hover:ml-16 group-hover:w-[calc(100%-4rem)]
                transition-all duration-300 ease-out
                group-hover:animate-none
                animate-[bounce-return_0.8s_cubic-bezier(0.68,-0.55,0.265,1.55)]"
                  >
                    <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-black" />
                    <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-black" />
                    <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-black" />
                    <Icon className="absolute z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-black" />
                    {/* Workshop Name */}
                    <span className="text-lg sm:text-xl font-semibold relative z-10 pr-20 group-hover:pl-8 transition-all duration-300">
                      {workshop.name}
                    </span>
                  </a>
                </div>
              ))}
              <Link href='https://www.facebook.com/' target="_blank" className="hover:text-dark-green duration-200 transition-all text-right hover:underline">Other workshops</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
