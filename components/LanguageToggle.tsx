"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GlobeIcon } from "./Icons";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-white/12 bg-white/[0.05] p-1 backdrop-blur-md ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <GlobeIcon className="ml-1.5 mr-1 h-3.5 w-3.5 text-silver-muted" />
      {/* Sliding indicator */}
      <span
        aria-hidden
        className="absolute top-1 h-7 w-9 rounded-full bg-accent shadow-glow-red transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: locale === "en" ? "translateX(0)" : "translateX(2.25rem)",
          left: "1.75rem",
        }}
      />
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`relative z-10 h-7 w-9 rounded-full text-xs font-bold tracking-wide transition-colors ${
          locale === "en" ? "text-white" : "text-silver-muted hover:text-silver"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-pressed={locale === "es"}
        className={`relative z-10 h-7 w-9 rounded-full text-xs font-bold tracking-wide transition-colors ${
          locale === "es" ? "text-white" : "text-silver-muted hover:text-silver"
        }`}
      >
        ES
      </button>
    </div>
  );
}
