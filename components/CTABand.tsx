"use client";

import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { ImageSlot } from "./ImageSlot";
import { PhoneIcon } from "./Icons";

/**
 * Emergency CTA — a full-width cinematic "technician at night" image section.
 * The photograph sets the mood (urgency, reliability after hours); the copy is
 * a thin overlay. Replaces the previous bordered card / grid-texture band.
 */
export function CTABand() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-ink-950">
      <ImageSlot
        image="emergency"
        sizes="100vw"
        overlay="full"
        className="absolute inset-0 h-full w-full"
      />
      {/* blend into neighbouring sections */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(180deg, rgba(8,9,11,1), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(180deg, transparent, rgba(8,9,11,1))" }}
      />

      <div className="container-x relative flex min-h-[70vh] items-center justify-center py-24 text-center lg:min-h-[80vh]">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
            {t(UI.needRepair)}
          </span>

          <h2 className="mt-5 text-balance font-display font-extrabold uppercase leading-[0.95] tracking-tightest text-white text-4xl sm:text-6xl lg:text-7xl">
            {t({
              en: "Equipment down? We answer, day or night.",
              es: "¿Equipo descompuesto? Contestamos, de día o de noche.",
            })}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-silver sm:text-xl">
            {t(UI.ctaBlurb)}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3.5 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary text-lg">
              <PhoneIcon className="h-5 w-5" />
              {t(UI.callNowFull)}
            </a>
            <a href="/#contact" className="btn-outline text-lg">
              {t(UI.requestEstimate)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
