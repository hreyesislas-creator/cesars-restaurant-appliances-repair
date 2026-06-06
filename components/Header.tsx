"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { SERVICE_PAGES } from "@/lib/services";
import { LanguageToggle } from "./LanguageToggle";
import { Wordmark } from "./ui";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/#services", label: t(UI.navServices) },
    { href: "/#areas", label: t(UI.navAreas) },
    { href: "/#about", label: t(UI.navAbout) },
    { href: "/#faq", label: t(UI.navFaq) },
    { href: "/#contact", label: t(UI.navContact) },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-ink-950/80 to-transparent"
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-20">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-silver transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow-red transition-all hover:bg-accent-light hover:shadow-glow-red-lg sm:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {SITE.phone}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white backdrop-blur-md lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-ink-900/95 backdrop-blur-xl lg:hidden">
          <nav className="container-x flex flex-col py-5" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-silver hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-silver-muted">
                {t(UI.allServices)}
              </p>
              <div className="mt-2 grid gap-1">
                {SERVICE_PAGES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-silver-dark hover:text-white"
                  >
                    {t(s.name)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <LanguageToggle />
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow-red"
              >
                <PhoneIcon className="h-4 w-4" />
                {t(UI.callNow)}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
