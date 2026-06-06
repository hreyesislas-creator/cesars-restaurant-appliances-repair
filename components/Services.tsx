"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import type { Service } from "@/lib/content-types";
import type { Bilingual } from "@/lib/i18n/types";
import type { ImageKey } from "@/content/image-prompts";
import { ImageSlot } from "./ImageSlot";
import { SectionLabel } from "./ui";
import { ArrowIcon, PhoneIcon } from "./Icons";

/**
 * Services — rebuilt as an editorial, image-led sequence (magazine rhythm)
 * instead of a card grid. Each anchor service gets a large photograph that
 * alternates side to side; secondary services collapse into a single quiet
 * text strip so the imagery, not the UI, carries the section.
 */

// Anchor services rendered as full editorial rows, paired with a hero image.
const ANCHORS: { key: string; image: ImageKey }[] = [
  { key: "commercial-refrigerator", image: "refrigerator" },
  { key: "walk-in-cooler", image: "walkInCooler" },
  { key: "ice-machine", image: "iceMachine" },
  { key: "commercial-fryer", image: "fryer" },
  { key: "commercial-oven", image: "ovenRange" },
];

const byKey = (key: string) => SERVICES.find((s) => s.key === key)!;

export function Services() {
  const { t } = useLanguage();
  const anchors = ANCHORS.map((a) => ({ ...a, service: byKey(a.key) }));
  const anchorKeys = new Set(ANCHORS.map((a) => a.key));
  const rest = SERVICES.filter((s) => !anchorKeys.has(s.key));

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-28 lg:py-36"
    >
      <div className="container-x relative">
        <div className="max-w-3xl">
          <SectionLabel>{t(UI.relatedServices)}</SectionLabel>
          <h2 className="mt-5 text-balance display-lg text-white">
            {t(UI.servicesHeading)}
          </h2>
          <p className="mt-5 lede">{t(UI.servicesSub)}</p>
        </div>

        <div className="mt-16 space-y-24 sm:mt-20 lg:space-y-32">
          {anchors.map(({ service, image }, i) => (
            <EditorialRow
              key={service.key}
              index={i + 1}
              service={service}
              image={image}
              reverse={i % 2 === 1}
              t={t}
            />
          ))}
        </div>

        {/* Secondary services — a single quiet strip, not a card grid */}
        <AlsoRepair services={rest} t={t} />
      </div>
    </section>
  );
}

function EditorialRow({
  index,
  service,
  image,
  reverse,
  t,
}: {
  index: number;
  service: Service;
  image: ImageKey;
  reverse: boolean;
  t: (v: Bilingual) => string;
}) {
  const href = service.slug ? `/${service.slug}` : SITE.phoneHref;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Image — oversized, bleeding past the text column on large screens */}
      <Link
        href={href}
        className={`group relative block ${
          reverse ? "lg:order-last lg:-mr-10 xl:-mr-16" : "lg:-ml-10 xl:-ml-16"
        }`}
      >
        <ImageSlot
          image={image}
          sizes="(max-width: 1024px) 100vw, 50vw"
          overlay="soft"
          className="aspect-[4/5] w-full rounded-3xl border border-white/10 shadow-soft-lg transition-transform duration-700 group-hover:scale-[1.01] sm:aspect-[16/11] lg:aspect-[4/5]"
        >
          <span className="pointer-events-none absolute left-6 top-5 font-display text-7xl font-extrabold leading-none text-white/15 sm:text-8xl">
            {String(index).padStart(2, "0")}
          </span>
        </ImageSlot>
      </Link>

      {/* Editorial copy */}
      <div className={reverse ? "lg:pr-6" : "lg:pl-6"}>
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-light">
          {t({ en: "Service", es: "Servicio" })} {String(index).padStart(2, "0")}
        </span>
        <h3 className="mt-4 text-balance display-md text-white">
          {t(service.name)}
        </h3>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-silver-dark">
          {t(service.shortDescription)}
        </p>

        <Link
          href={href}
          className="group mt-8 inline-flex items-center gap-2.5 text-base font-semibold text-white"
        >
          <span className="border-b border-accent/40 pb-1 transition-colors group-hover:border-accent">
            {service.slug ? t(UI.viewService) : t(UI.callNow)}
          </span>
          <ArrowIcon className="h-4 w-4 text-accent-light transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function AlsoRepair({
  services,
  t,
}: {
  services: Service[];
  t: (v: Bilingual) => string;
}) {
  return (
    <div className="mt-24 border-t border-white/10 pt-12 lg:mt-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="display-md text-white">
            {t({ en: "We also repair", es: "También reparamos" })}
          </h3>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
            {services.map((s) => {
              const inner = (
                <span className="text-lg font-medium text-silver-dark transition-colors hover:text-white">
                  {t(s.name)}
                </span>
              );
              return (
                <li key={s.key}>
                  {s.slug ? (
                    <Link href={`/${s.slug}`}>{inner}</Link>
                  ) : (
                    <a href={SITE.phoneHref}>{inner}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <a href={SITE.phoneHref} className="btn-primary shrink-0">
          <PhoneIcon className="h-5 w-5" />
          {t(UI.callNow)}
        </a>
      </div>
    </div>
  );
}
