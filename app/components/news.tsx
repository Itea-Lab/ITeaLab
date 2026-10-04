"use client";
import React, { useState } from "react";
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./ui/plus-icon";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { supabase } from "./lib/supabase";
import { useQuery } from "@tanstack/react-query";

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
  const [page, setPage] = useState(0);
  const itemsPerPage = 2;

  const { data: items = [], isLoading } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        throw error;
      }

      return (data || []) as NewsItem[];
    },
  });

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

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

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="w-full flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="flex-[1] animate-pulse">
                <article className="mb-4 sm:mb-6 relative bg-zinc-950/80 shadow-sm border border-dark-green/60 overflow-hidden">
                  <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-light-green/40 z-10" />
                  <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-light-green/40 z-10" />
                  <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-light-green/40 z-10" />
                  <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-light-green/40 z-10" />

                  <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
                    <Newspaper className="w-10 h-10 text-zinc-700 animate-pulse" />
                  </div>
                </article>

                <div className="space-y-3">
                  <div className="h-6 bg-zinc-800/80 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-zinc-900 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-500 py-12 font-michroma text-sm">
            No news updates found.
          </div>
        ) : (
          /* News Cards Grid */
          <div className="w-full flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            {paginatedItems.map((item, index) => {
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
                          alt={item.alt || item.title}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="relative w-full mt-8">
            <div className="flex items-center justify-center relative w-full mt-12 max-w-6xl mx-auto">
              <button
                onClick={() => setPage(page - 1)}
                className={`left-0 absolute rounded-full p-3 border-[2px]
                  hover:scale-125 transition-all duration-300 ease-in-out
                  border-background-secondary ${page === 0 && "hidden"}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                className={`right-0 absolute rounded-full p-3
                hover:scale-125 transition-all duration-300
                border-[2px] border-background-secondary ease-in-out
                ${page === totalPages - 1 && "hidden"}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index)}
                    className={`h-3 w-3 rounded-sm transition-all duration-300
                    ${
                      page === index
                        ? "bg-light-green scale-110"
                        : "bg-gray-500 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
