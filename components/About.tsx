"use client";

import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import type { Bilingual } from "@/lib/i18n/types";
import { ImageSlot } from "./ImageSlot";
import { SectionLabel } from "./ui";
import { PhoneIcon } from "./Icons";

const aboutCopy = {
  heading: {
    en: "Houston's commercial kitchen repair specialists.",
    es: "Especialistas en reparación de cocinas comerciales de Houston.",
  },
  paragraphs: {
    en: [
      "Cesar's Restaurant Appliances Repair is a Houston-based company built for one purpose: keeping commercial kitchens running. We work on commercial equipment only — refrigeration, cooking lines, and ice machines — so every technician who shows up actually knows your gear.",
      "We're local, fully bilingual, and available around the clock. When a walk-in fails overnight or a fryer quits mid-rush, you reach a team that answers, shows up fast, and fixes the root cause — not a band-aid that fails again next week.",
    ],
    es: [
      "Cesar's Restaurant Appliances Repair es una empresa con base en Houston creada con un solo propósito: mantener las cocinas comerciales funcionando. Trabajamos solo en equipo comercial — refrigeración, líneas de cocción y máquinas de hielo — así que cada técnico que llega realmente conoce su equipo.",
      "Somos locales, completamente bilingües y disponibles las 24 horas. Cuando un walk-in falla de noche o una freidora se descompone en plena hora pico, contacta a un equipo que contesta, llega rápido y arregla la causa raíz — no un parche que vuelve a fallar la próxima semana.",
    ],
  },
};

// Pared back to a quiet text list — no icon-heavy card grid.
const pillars: { title: Bilingual; desc: Bilingual }[] = [
  {
    title: { en: "Commercial Only", es: "Solo Comercial" },
    desc: {
      en: "No home appliances. Commercial kitchen equipment is all we do.",
      es: "Nada de aparatos del hogar. Solo equipo de cocina comercial.",
    },
  },
  {
    title: { en: "24/7 Emergency", es: "Emergencia 24/7" },
    desc: {
      en: "Day, night, weekends, holidays — we answer and respond.",
      es: "Día, noche, fines de semana, feriados — contestamos y respondemos.",
    },
  },
  {
    title: { en: "Fully Bilingual", es: "Completamente Bilingüe" },
    desc: {
      en: "Clear communication in English and Spanish.",
      es: "Comunicación clara en inglés y español.",
    },
  },
  {
    title: { en: "Local to Houston", es: "Local de Houston" },
    desc: {
      en: "Mobile service across the entire Greater Houston region.",
      es: "Servicio móvil en toda la región metropolitana de Houston.",
    },
  },
];

export function About() {
  const { t, tList } = useLanguage();

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-28 lg:py-36"
    >
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Large technician portrait — edge-weighted on desktop */}
        <div className="relative order-last lg:order-first lg:-ml-10 xl:-ml-16">
          <ImageSlot
            image="about"
            sizes="(max-width: 1024px) 100vw, 50vw"
            overlay="soft"
            className="aspect-[4/5] w-full rounded-3xl border border-white/10 shadow-soft-lg"
          >
            {/* Floating credential chip */}
            <div className="absolute bottom-5 left-5 rounded-2xl glass-strong px-5 py-4">
              <p className="display-md text-white">{SITE.hours.split(" ")[0]}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-silver-muted">
                {t(UI.emergency247)}
              </p>
            </div>
          </ImageSlot>
        </div>

        {/* Editorial copy */}
        <div>
          <SectionLabel>{t(UI.aboutHeading)}</SectionLabel>
          <h2 className="mt-5 text-balance display-lg text-white">
            {t(aboutCopy.heading)}
          </h2>
          <div className="prose-invert mt-6 max-w-xl">
            {tList(aboutCopy.paragraphs).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {pillars.map(({ title, desc }, i) => (
              <div key={i} className="border-l-2 border-accent/50 pl-4">
                <dt className="font-bold text-white">{t(title)}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-silver-dark">
                  {t(desc)}
                </dd>
              </div>
            ))}
          </dl>

          <a href={SITE.phoneHref} className="btn-primary mt-10">
            <PhoneIcon className="h-5 w-5" />
            {t(UI.callNowFull)}
          </a>
        </div>
      </div>
    </section>
  );
}
