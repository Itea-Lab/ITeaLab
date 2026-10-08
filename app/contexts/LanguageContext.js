"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUserLanguage,
  setUserLanguage,
  t,
  initializeLanguage,
} from "../utils/language";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initializeLanguage();
      const language = getUserLanguage();
      setCurrentLanguage(language);
      setIsLoading(false);
    };

    initialize();

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  const changeLanguage = (language) => {
    setUserLanguage(language);
    setCurrentLanguage(language);
  };

  const translate = (key, params = {}) => {
    return t(key, params);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t: translate,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
