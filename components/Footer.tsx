"use client";

import Link from "next/link";
import { SITE, FULL_ADDRESS } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { SERVICE_PAGES } from "@/lib/services";
import { CITIES } from "@/lib/cities";
import { Wordmark } from "./ui";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "./Icons";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Wordmark href={null} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver-dark">
            {t(UI.servingArea)}. {t(UI.emergency247)}. {t(UI.freeEstimates)}.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href={SITE.phoneHref} className="flex items-center gap-3 text-silver hover:text-white">
              <PhoneIcon className="h-4 w-4 text-accent-light" />
              {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="flex items-center gap-3 break-all text-silver hover:text-white">
              <MailIcon className="h-4 w-4 text-accent-light" />
              {SITE.email}
            </a>
            <p className="flex items-center gap-3 text-silver-dark">
              <MapPinIcon className="h-4 w-4 text-accent-light" />
              {FULL_ADDRESS}
            </p>
            <p className="flex items-center gap-3 text-silver-dark">
              <ClockIcon className="h-4 w-4 text-accent-light" />
              {t(UI.emergency247)}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
            {t(UI.relatedServices)}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICE_PAGES.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-silver-dark transition-colors hover:text-white">
                  {t(s.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
            {t(UI.relatedAreas)}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-silver-dark transition-colors hover:text-white">
                  {c.shortName}, TX
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links + CTA */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted">
            {t(UI.quickLinks)}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/#services" className="text-silver-dark hover:text-white">{t(UI.navServices)}</Link></li>
            <li><Link href="/#areas" className="text-silver-dark hover:text-white">{t(UI.navAreas)}</Link></li>
            <li><Link href="/#about" className="text-silver-dark hover:text-white">{t(UI.navAbout)}</Link></li>
            <li><Link href="/#faq" className="text-silver-dark hover:text-white">{t(UI.navFaq)}</Link></li>
            <li><Link href="/#contact" className="text-silver-dark hover:text-white">{t(UI.navContact)}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-silver-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. {t(UI.rights)}
          </p>
          <p>{FULL_ADDRESS} &middot; {SITE.phone}</p>
        </div>
      </div>
    </footer>
  );
}
