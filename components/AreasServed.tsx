"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { SERVICE_AREAS } from "@/lib/cities";
import { ImageSlot } from "./ImageSlot";
import { SectionLabel } from "./ui";
import { PhoneIcon, ArrowIcon } from "./Icons";

/**
 * AreasServed — led by a large Houston restaurant-district photograph with the
 * editorial copy overlaid; the individual areas drop to a quiet wrapped text
 * list beneath, rather than a grid of cards.
 */
export function AreasServed() {
  const { t } = useLanguage();

  return (
    <section
      id="areas"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-24 sm:py-28 lg:py-36"
    >
      <div className="container-x relative">
        {/* Hero image with overlaid editorial */}
        <div className="relative">
          <ImageSlot
            image="houstonArea"
            sizes="(max-width: 1280px) 100vw, 1200px"
            overlay="left"
            className="aspect-[16/10] w-full rounded-3xl border border-white/10 shadow-soft-lg sm:aspect-[16/8] lg:aspect-[21/9]"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-7 sm:px-12">
                <SectionLabel>{t(UI.relatedAreas)}</SectionLabel>
                <h2 className="mt-5 text-balance display-lg text-white">
                  {t(UI.areasHeading)}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-silver">
                  {t(UI.areasSub)}
                </p>
                <a href={SITE.phoneHref} className="btn-primary mt-8">
                  <PhoneIcon className="h-5 w-5" />
                  {t(UI.callNow)}
                </a>
              </div>
            </div>
          </ImageSlot>
        </div>

        {/* Quiet area list — text links, not cards */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-silver-muted">
            {t({ en: "Serving across Greater Houston", es: "Servicio en toda el área de Houston" })}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3.5">
            {SERVICE_AREAS.map((area) =>
              area.slug ? (
                <li key={area.name}>
                  <Link
                    href={`/${area.slug}`}
                    className="group inline-flex items-center gap-1.5 text-lg font-medium text-silver-dark transition-colors hover:text-white"
                  >
                    {area.name}
                    <ArrowIcon className="h-3.5 w-3.5 text-accent-light opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ) : (
                <li
                  key={area.name}
                  className="text-lg font-medium text-silver-muted"
                >
                  {area.name}
                </li>
              )
            )}
          </ul>
          <p className="mt-7 max-w-lg text-sm text-silver-muted">
            {t({
              en: "Don't see your area? We cover all of Greater Houston — give us a call.",
              es: "¿No ve su área? Cubrimos todo el área metropolitana de Houston — llámenos.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
