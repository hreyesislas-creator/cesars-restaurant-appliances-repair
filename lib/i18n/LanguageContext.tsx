"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale, Bilingual, BilingualList } from "./types";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Pick the right side of a bilingual value for the active locale. */
  t: (value: Bilingual) => string;
  tList: (value: BilingualList) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "cesars-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore preference on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") {
      setLocaleState(stored);
    } else if (navigator.language?.toLowerCase().startsWith("es")) {
      setLocaleState("es");
    }
  }, []);

  // Keep <html lang> in sync for accessibility + SEO.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "es" : "en";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback((value: Bilingual) => value[locale], [locale]);
  const tList = useCallback(
    (value: BilingualList) => value[locale],
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggle, t, tList }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
