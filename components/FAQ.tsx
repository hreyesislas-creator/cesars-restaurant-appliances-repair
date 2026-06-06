"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import type { FAQ as FAQType } from "@/lib/content-types";
import { SectionLabel, GlowBlob } from "./ui";
import { PlusIcon } from "./Icons";

export function FAQ({
  faqs,
  heading,
}: {
  faqs: FAQType[];
  heading?: string;
  /** retained for API compatibility; the site is dark-themed throughout */
  dark?: boolean;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-32"
    >
      <GlowBlob className="left-1/2 top-0 h-[360px] w-[560px] -translate-x-1/2 opacity-25" />

      <div className="container-x relative max-w-3xl">
        <div className="text-center">
          <SectionLabel className="justify-center">FAQ</SectionLabel>
          <h2 className="mt-5 text-balance display-lg text-white">
            {heading ?? t(UI.faqHeading)}
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-accent/30 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white sm:text-lg">
                    {t(faq.question)}
                  </span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-accent bg-accent text-white"
                        : "border-white/15 text-silver"
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-silver-dark sm:px-6">
                      {t(faq.answer)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
