"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS, Language } from "@/translations/dictionary";
import { useCart } from "@/context/CartContext";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof TRANSLATIONS["en"]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const cart = useCart();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("blackrhino_lang") as Language;
      if (stored === "pt") {
        setLanguageState("pt");
      } else {
        setLanguageState("pt");
        cart.setCurrency("BRL");
      }
    } catch (e) {
      console.error("Error reading language from storage", e);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem("blackrhino_lang", newLang);
      // Interchangeable sync: switching to PT can conveniently align currency to BRL, EN to USD, while still letting user change currency independently anytime
      if (newLang === "pt" && cart.currency === "USD") {
        cart.setCurrency("BRL");
      } else if (newLang === "en" && cart.currency === "BRL") {
        cart.setCurrency("USD");
      }
    } catch (e) {
      console.error("Error saving language", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  const t = (key: keyof typeof TRANSLATIONS["en"]): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
