"use client";

import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import type { Bilingual } from "@/lib/i18n/types";
import { ImageSlot } from "./ImageSlot";
import { SectionLabel } from "./ui";
import { BoltIcon, PhoneIcon } from "./Icons";

const stats: { value: Bilingual; label: Bilingual }[] = [
  { value: { en: "24/7", es: "24/7" }, label: { en: "Emergency Service", es: "Servicio de Emergencia" } },
  { value: { en: "Same-Day", es: "Mismo Día" }, label: { en: "Repairs Available", es: "Reparaciones Disponibles" } },
  { value: { en: "Free", es: "Gratis" }, label: { en: "On-Site Estimates", es: "Estimados en Sitio" } },
  { value: { en: "EN / ES", es: "EN / ES" }, label: { en: "Bilingual Team", es: "Equipo Bilingüe" } },
];

export function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-28 lg:py-36">
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left — immersive editorial image */}
        <div className="relative lg:-ml-10 xl:-ml-16">
          <ImageSlot
            image="downtime"
            sizes="(max-width: 1024px) 100vw, 50vw"
            overlay="soft"
            className="aspect-[4/5] w-full rounded-3xl border border-white/10 shadow-soft-lg sm:aspect-[16/12] lg:aspect-[4/5]"
          >
            {/* Cost-of-downtime overlay caption */}
            <div className="absolute bottom-6 left-6 max-w-[16rem]">
              <p className="font-display text-5xl font-extrabold leading-none tracking-tightest text-white">
                $1,000s
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-silver">
                {t({ en: "lost overnight when a walk-in fails", es: "perdidos de un día para otro cuando falla un walk-in" })}
              </p>
            </div>
          </ImageSlot>
        </div>

        {/* Right — message + stat band */}
        <div>
          <SectionLabel>{t(UI.whyHeading)}</SectionLabel>
          <h2 className="mt-5 text-balance display-lg text-white">
            {t({
              en: "Downtime costs money. We make it short.",
              es: "El tiempo de inactividad cuesta dinero. Lo hacemos corto.",
            })}
          </h2>
          <p className="mt-6 lede">
            {t({
              en: "A warm walk-in can spoil thousands of dollars of inventory overnight, and a dead fryer stalls every ticket. We specialize only in commercial kitchen equipment and respond fast — because we know exactly what a closed kitchen costs you.",
              es: "Un walk-in caliente puede echar a perder miles de dólares de inventario en una noche, y una freidora descompuesta detiene cada orden. Nos especializamos solo en equipo de cocina comercial y respondemos rápido — porque sabemos exactamente lo que le cuesta una cocina cerrada.",
            })}
          </p>

          {/* Clean stat band (no boxes, no icons) */}
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8">
            {stats.map((s, i) => (
              <div key={i} className="border-t border-white/12 pt-4">
                <dt className="font-display text-3xl font-extrabold tracking-tightest text-gradient-steel sm:text-4xl">
                  {t(s.value)}
                </dt>
                <dd className="mt-1.5 text-sm font-medium uppercase tracking-wider text-silver-dark">
                  {t(s.label)}
                </dd>
              </div>
            ))}
          </dl>

          {/* Emergency highlight */}
          <div className="mt-10 flex items-center gap-5 rounded-2xl border border-accent/20 bg-accent/[0.07] p-5 backdrop-blur-md">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-glow-red">
              <BoltIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">
                {t({ en: "Emergency? We answer day or night.", es: "¿Emergencia? Contestamos de día o de noche." })}
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-0.5 inline-flex items-center gap-2 text-xl font-extrabold text-accent-light hover:text-white"
              >
                <PhoneIcon className="h-5 w-5" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
