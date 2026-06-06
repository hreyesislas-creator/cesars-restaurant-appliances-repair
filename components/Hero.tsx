"use client";

import Image from "next/image";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import type { Bilingual } from "@/lib/i18n/types";
import {
  PhoneIcon,
  BoltIcon,
  ClockIcon,
  ShieldIcon,
  CheckIcon,
  GlobeIcon,
} from "./Icons";
import { imageSrc } from "@/content/image-prompts";

/*
  ════════════════════════════════════════════════════════════════════════
  HERO IMAGE SLOT  —  "Apple meets Michelin Kitchen"
  ════════════════════════════════════════════════════════════════════════
  The hero is a full-screen cinematic image covering 100% of this section; a
  dark gradient overlay keeps the left-side editorial type legible.

  The image is wired to the central registry. To drop in the real photo:
  generate it with IMAGES.hero.prompt (see content/image-prompts.ts), save it
  to public/images/hero-commercial-kitchen.webp, and set IMAGES.hero.ready = true.
  Until then a bespoke cinematic placeholder renders (no layout shift).
*/
const HERO_IMAGE: string | null = imageSrc("hero");

// Rendered as three editorial lines; the concatenated text content
// ("Commercial Restaurant Equipment Repair") stays the single SEO H1.
const headlineLines: Bilingual[] = [
  { en: "Commercial", es: "Reparación de" },
  { en: "Restaurant Equipment", es: "Equipo de Restaurante" },
  { en: "Repair", es: "Comercial" },
];

const sub: Bilingual = {
  en: "Emergency repairs for commercial kitchens, refrigeration systems, ice machines, ovens and restaurant equipment.",
  es: "Reparaciones de emergencia para cocinas comerciales, sistemas de refrigeración, máquinas de hielo, hornos y equipo de restaurante.",
};

const servingLine: Bilingual = {
  en: "Serving Houston, 24/7.",
  es: "Servicio en Houston, 24/7.",
};

const badges = [
  { icon: BoltIcon, label: UI.emergency247 },
  { icon: ClockIcon, label: UI.sameDay },
  { icon: ShieldIcon, label: UI.commercialSpecialists },
  { icon: CheckIcon, label: UI.freeEstimates },
  { icon: GlobeIcon, label: UI.bilingual },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      {/* ===== Full-screen cinematic image (covers 100% of the hero) ===== */}
      <div className="absolute inset-0">
        {HERO_IMAGE ? (
          <Image
            src={HERO_IMAGE}
            alt="Luxury Michelin-star commercial restaurant kitchen with brushed stainless-steel cooking line in Houston"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        ) : (
          <HeroPlaceholder />
        )}
      </div>

      {/* ===== Cinematic dark gradient overlay (left-weighted for readability) ===== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,7,0.96) 0%, rgba(5,6,7,0.82) 30%, rgba(5,6,7,0.46) 60%, rgba(5,6,7,0.22) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,6,7,0.62) 0%, rgba(5,6,7,0) 26%, rgba(5,6,7,0) 52%, rgba(8,9,11,1) 100%)",
        }}
        aria-hidden
      />

      {/* ===== Editorial content (left) ===== */}
      <div className="container-x relative w-full pt-32 pb-24 sm:pt-36 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl animate-fade-up">
          {/* Quiet editorial kicker — a hairline rule + restrained label.
              (Intentionally not a SaaS "status pill".) */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" aria-hidden />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-silver">
              {t({ en: "Houston, Texas", es: "Houston, Texas" })}
            </span>
          </div>

          <h1 className="mt-8 font-display font-extrabold uppercase leading-[0.9] tracking-tightest text-white text-[3.25rem] sm:text-7xl lg:text-[5.75rem] xl:text-[6.25rem]">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className={`block ${i === 2 ? "text-gradient-steel" : ""}`}
              >
                {t(line)}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-silver sm:text-xl">
            {t(sub)}{" "}
            <span className="font-semibold text-white">{t(servingLine)}</span>
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary text-lg">
              <PhoneIcon className="h-5 w-5" />
              {t(UI.callNow)}
            </a>
            <a href="#contact" className="btn-outline text-lg">
              {t(UI.freeEstimate)}
            </a>
          </div>

          {/* Floating premium glass badges (replaces the old dashboard card) */}
          <ul className="mt-14 flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }, i) => (
              <li
                key={i}
                className="edge-top inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-[13px] font-medium text-silver-light shadow-soft-lg backdrop-blur-xl"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <Icon className="h-4 w-4 text-accent-light" />
                {t(label)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Minimal editorial scroll cue ===== */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-silver-muted transition-colors group-hover:text-silver">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </a>
    </section>
  );
}

/**
 * Photographic cinematic placeholder shown until the real hero image lands.
 * Layered to read like an actual Michelin-kitchen photograph rather than an
 * abstract tech gradient: deep room ambiance, a warm overhead service-lamp
 * glow on the right, a receding brushed-steel cooking line, a faint floor
 * reflection, and a vignette. Designed to keep the LEFT THIRD dark for type.
 */
function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 bg-ink-950" aria-hidden>
      {/* deep room base — light pools to the upper-right, depth to the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 80% 22%, #30373f 0%, #1b1f25 36%, #0c0e11 68%, #060708 100%)",
        }}
      />
      {/* warm overhead service-lamp glow (Michelin pass-line heat lamps) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 50% at 78% 20%, rgba(255,188,128,0.26) 0%, rgba(255,160,96,0.07) 38%, transparent 66%)",
        }}
      />
      {/* receding brushed-steel cooking line — vertical sheen, fades left */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0) 3px, rgba(255,255,255,0) 9px)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 38%, black 70%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 38%, black 70%, black 100%)",
        }}
      />
      {/* horizontal counter / steel worktop band catching the key light */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "54%",
          height: "16%",
          background:
            "linear-gradient(180deg, rgba(180,196,214,0.10) 0%, rgba(120,140,160,0.05) 45%, rgba(8,9,11,0) 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 50%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 50%, black 100%)",
        }}
      />
      {/* cool reflection sweeping across the right-hand steel */}
      <div
        className="absolute inset-y-0 right-0 w-2/3"
        style={{
          background:
            "linear-gradient(108deg, transparent 0%, rgba(130,152,176,0.12) 42%, transparent 78%)",
        }}
      />
      {/* faint polished-floor reflection at the base */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(40,48,58,0.35) 60%, rgba(60,70,84,0.18) 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 55%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 55%, black 100%)",
        }}
      />
      {/* cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 70% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
