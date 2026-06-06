"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import type { City } from "@/lib/content-types";
import { SERVICES } from "@/lib/services";
import { CITIES } from "@/lib/cities";
import { ImageSlot } from "./ImageSlot";
import {
  PhoneIcon,
  MapPinIcon,
  ServiceIcon,
  ArrowIcon,
  ChevronDownIcon,
  BoltIcon,
} from "./Icons";

export function CityArticle({ city }: { city: City }) {
  const { t } = useLanguage();
  const services = SERVICES.filter((s) => s.slug);
  const otherCities = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <article>
      {/* Cinematic header */}
      <header className="relative overflow-hidden bg-ink pt-28 sm:pt-32 lg:pt-40">
        <ImageSlot
          image="houstonArea"
          priority
          sizes="100vw"
          overlay="left"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" aria-hidden />

        <div className="container-x relative pb-16 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-silver-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">{t(UI.navHome)}</Link></li>
              <li><ChevronDownIcon className="h-3.5 w-3.5 -rotate-90" /></li>
              <li><Link href="/#areas" className="hover:text-white">{t(UI.relatedAreas)}</Link></li>
              <li><ChevronDownIcon className="h-3.5 w-3.5 -rotate-90" /></li>
              <li className="font-medium text-silver-light">{city.shortName}, TX</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark text-white shadow-glow-red">
              <MapPinIcon className="h-7 w-7" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-light backdrop-blur-md">
              <BoltIcon className="h-4 w-4" />
              {t(UI.emergency247)}
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance display-lg text-white">
            {t(city.h1)}
          </h1>
          <p className="mt-5 max-w-2xl text-balance lede">
            {t(UI.freeEstimates)} • {t(UI.sameDay)} • {t(UI.bilingual)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary text-lg">
              <PhoneIcon className="h-5 w-5" />
              {t(UI.callNowFull)}
            </a>
            <a href="#contact" className="btn-outline text-lg">
              {t(UI.requestEstimate)}
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="bg-ink">
        <div className="container-x grid gap-12 py-14 lg:grid-cols-3 lg:py-20">
          <div className="lg:col-span-2">
            <div className="prose-invert text-balance">
              {t(city.intro)
                .split("\n\n")
                .map((p, i) => (
                  <p key={i} className={i === 0 ? "!text-xl !leading-relaxed !text-silver-light" : ""}>
                    {p}
                  </p>
                ))}
            </div>

            {city.sections.map((section, i) => (
              <section key={i} className="mt-12">
                <h2 className="display-md text-white">{t(section.heading)}</h2>
                <div className="prose-invert mt-4">
                  {t(section.body)
                    .split("\n\n")
                    .map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                </div>
              </section>
            ))}

            {/* Neighborhoods */}
            {city.neighborhoods.length > 0 && (
              <div className="mt-12 rounded-2xl border border-white/10 steel-surface p-6 sm:p-7">
                <h2 className="display-md text-white">
                  {t({
                    en: `Areas We Serve in ${city.shortName}`,
                    es: `Áreas Que Atendemos en ${city.shortName}`,
                  })}
                </h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {city.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-silver-light"
                    >
                      <MapPinIcon className="h-3.5 w-3.5 text-accent-light" />
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inline CTA */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-accent/20 bg-ink-950 p-7 sm:p-8">
              <h2 className="display-md text-white">{t(UI.needRepair)}</h2>
              <p className="mt-3 max-w-lg text-silver-dark">{t(UI.ctaBlurb)}</p>
              <a href={SITE.phoneHref} className="btn-primary mt-6">
                <PhoneIcon className="h-5 w-5" />
                {t(UI.callNowFull)}
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 to-transparent p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
                {t(UI.callUs)}
              </p>
              <a href={SITE.phoneHref} className="mt-2 block display-md text-white hover:text-accent-light">
                {SITE.phone}
              </a>
              <a href={SITE.phoneHref} className="btn-primary mt-4 w-full text-sm">
                <PhoneIcon className="h-4 w-4" />
                {t(UI.callNow)}
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
                {t({ en: `Services in ${city.shortName}`, es: `Servicios en ${city.shortName}` })}
              </h2>
              <ul className="mt-4 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-silver-dark transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                      <ServiceIcon name={s.icon} className="h-4 w-4 flex-shrink-0 text-silver-muted group-hover:text-accent-light" />
                      {t(s.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
                {t(UI.relatedAreas)}
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {otherCities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="text-sm text-silver-dark hover:text-white">
                      {c.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
