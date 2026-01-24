"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Newspaper,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./ui/plus-icon";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // fail gracefully in the client and avoid leaking secrets
  console.error("Missing NEXT_PUBLIC_SUPABASE_* env vars");
}
const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

interface NewsItem {
  id?: number;
  icon: string;
  image: string;
  date: string;
  title: string;
  url: string;
  alt: string;
  created_at?: string;
  updated_at?: string;
}

const News = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );
  
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Unexpected news response:", data);
        return;
      }

      setItems(data as NewsItem[]);
    };

    fetchNews();
  }, []);

  return (
    <div
      id="news"
      className="bg-background text-background-light px-6 sm:px-8 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20 relative"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header Section with animation */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-michroma mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">
            {t("itea_lab_news")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("news_subtitle")}
          </p>
        </motion.div>

        {/* News Cards Grid */}
        <div className="w-full flex justify-between gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto ">
          {paginatedItems.map((item, index) => {
            // map icon name to component (fallback to Newspaper)
            const ItemIcon = item.icon === "Newspaper" ? Newspaper : Newspaper;

            return (
              <motion.div
                key={item.id ?? index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                className="flex-[1]"
              >
                <Link
                  href={item.url}
                  className="group block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <article className="mb-4 sm:mb-6 relative bg-background-light shadow-sm border border-dark-green overflow-hidden">
                    {/* Corner Icons */}
                    <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-background-light z-10" />
                    <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-background-light z-10" />
                    <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-background-light z-10" />
                    <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-background-light z-10" />

                    {/* News Image */}
                    <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 w-full overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.alt}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                  </article>

                  {/* News Content */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold text-background-light group-hover:text-light-green duration-300 transition-colors ease-in-out mb-2 sm:mb-3 leading-tight">
                      {t(item.title)}
                    </h3>
                    <p className="font-michroma text-sm sm:text-base text-gray-300">
                      {item.date}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="relative w-full mt-8 ">
          <div className="flex items-center justify-center relative w-full mt-12 max-w-6xl mx-auto">
            <button
              onClick={() => setPage(page - 1)}
              className={`left-0 absolute rounded-full p-3 border-[2px] 
                hover:scale-125 transition-all duration-300 ease-in-out
                border-background-secondary ${page === 0 && "hidden"}`}
            >
              {" "}
              <ChevronLeft className="h-5 w-5"></ChevronLeft>
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className={`right-0 absolute rounded-full p-3
              hover:scale-125 transition-all duration-300
              border-[2px] border-background-secondary ease-in-out
              ${page === (totalPages - 1) && "hidden"}`
            }
              
            >
              {" "}
              <ChevronRight className="h-5 w-5"></ChevronRight>
            </button>
            <div className="flex gap-2 ">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`h-3 w-3 rounded-sm transition-all duration-300
                ${page === index ? "bg-light-green scale-110" : "bg-gray-500 hover:bg-gray-400"}
              `}
              />
            ))}
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default News;
