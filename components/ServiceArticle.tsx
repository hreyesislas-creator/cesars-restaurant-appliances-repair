"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import type { Service } from "@/lib/content-types";
import { SERVICES } from "@/lib/services";
import { CITIES } from "@/lib/cities";
import { ImageSlot } from "./ImageSlot";
import type { ImageKey } from "@/content/image-prompts";
import {
  PhoneIcon,
  CheckIcon,
  ServiceIcon,
  ArrowIcon,
  ChevronDownIcon,
  BoltIcon,
} from "./Icons";

// Map an equipment icon to the closest cinematic image; fall back to the
// whole-kitchen shot for equipment without a dedicated photograph.
const IMAGE_BY_ICON: Record<string, ImageKey> = {
  refrigerator: "refrigerator",
  cooler: "walkInCooler",
  ice: "iceMachine",
  fryer: "fryer",
  oven: "ovenRange",
  stove: "ovenRange",
  grill: "ovenRange",
};
const imageForService = (icon: string): ImageKey =>
  IMAGE_BY_ICON[icon] ?? "hero";

export function ServiceArticle({ service }: { service: Service }) {
  const { t, tList } = useLanguage();
  const others = SERVICES.filter((s) => s.slug && s.key !== service.key);
  const heroImage = imageForService(service.icon);

  return (
    <article>
      {/* Cinematic image-led header */}
      <header className="relative overflow-hidden bg-ink pt-28 sm:pt-32 lg:pt-40">
        <ImageSlot
          image={heroImage}
          priority
          sizes="100vw"
          overlay="left"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" aria-hidden />

        <div className="container-x relative pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-silver-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">{t(UI.navHome)}</Link></li>
              <li><ChevronDownIcon className="h-3.5 w-3.5 -rotate-90" /></li>
              <li className="font-medium text-silver-light">{t(service.name)}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark text-white shadow-glow-red">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-light backdrop-blur-md">
              <BoltIcon className="h-4 w-4" />
              {t(UI.emergency247)}
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance display-lg text-white">
            {service.h1 ? t(service.h1) : t(service.name)}
          </h1>
          <p className="mt-5 max-w-2xl text-balance lede">
            {t(UI.servingArea)} • {t(UI.freeEstimates)} • {t(UI.sameDay)}
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
        <div className="container-x grid gap-12 py-14 lg:grid-cols-3 lg:gap-12 lg:py-20">
          <div className="lg:col-span-2">
            {service.intro && (
              <div className="prose-invert text-balance">
                {t(service.intro)
                  .split("\n\n")
                  .map((p, i) => (
                    <p key={i} className={i === 0 ? "!text-xl !leading-relaxed !text-silver-light" : ""}>
                      {p}
                    </p>
                  ))}
              </div>
            )}

            {service.commonProblems && (
              <div className="mt-10 rounded-2xl border border-white/10 steel-surface p-6 sm:p-7">
                <h2 className="display-md text-white">
                  {t({ en: "Common Problems We Fix", es: "Problemas Comunes Que Reparamos" })}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {tList(service.commonProblems).map((problem, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-silver-light">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-light">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.sections?.map((section, i) => (
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

            {/* Inline CTA */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-accent/20 bg-ink-950 p-7 sm:p-8">
              <div className="relative">
                <h2 className="display-md text-white">{t(UI.needRepair)}</h2>
                <p className="mt-3 max-w-lg text-silver-dark">{t(UI.ctaBlurb)}</p>
                <a href={SITE.phoneHref} className="btn-primary mt-6">
                  <PhoneIcon className="h-5 w-5" />
                  {t(UI.callNowFull)}
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {service.benefits && (
              <div className="rounded-2xl glass-strong edge-top p-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
                  {t({ en: "Why Call Us", es: "Por Qué Llamarnos" })}
                </h2>
                <ul className="mt-4 space-y-3">
                  {tList(service.benefits).map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-silver-light">
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-light" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a href={SITE.phoneHref} className="btn-primary mt-5 w-full text-sm">
                  <PhoneIcon className="h-4 w-4" />
                  {SITE.phone}
                </a>
              </div>
            )}

            <SidebarLinks
              title={t(UI.relatedServices)}
              items={others.map((s) => ({
                href: `/${s.slug}`,
                label: t(s.name),
                icon: s.icon,
              }))}
            />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
                {t(UI.relatedAreas)}
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {CITIES.map((c) => (
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

function SidebarLinks({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; icon: string }[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
        {title}
      </h2>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-silver-dark transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              <ServiceIcon name={item.icon} className="h-4 w-4 flex-shrink-0 text-silver-muted group-hover:text-accent-light" />
              {item.label}
              <ArrowIcon className="ml-auto h-3.5 w-3.5 -translate-x-1 text-accent-light opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
