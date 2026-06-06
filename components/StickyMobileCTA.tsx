"use client";

import { SITE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { PhoneIcon, WrenchIcon } from "./Icons";

// Fixed bottom bar on mobile with two large touch targets: Call + Estimate.
export function StickyMobileCTA() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="border-t border-white/10 bg-ink-900/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-bold text-white shadow-glow-red active:scale-[0.98]"
          >
            <PhoneIcon className="h-5 w-5" />
            {t(UI.callNow)}
          </a>
          <a
            href="/#contact"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-3.5 text-base font-bold text-white active:scale-[0.98]"
          >
            <WrenchIcon className="h-5 w-5" />
            {t(UI.freeEstimate)}
          </a>
        </div>
      </div>
    </div>
  );
}
