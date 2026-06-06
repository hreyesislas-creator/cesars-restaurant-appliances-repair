"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Bilingual } from "@/lib/i18n/types";
import type { ImageKey } from "@/content/image-prompts";
import { ImageSlot } from "./ImageSlot";
import { PhoneIcon } from "./Icons";
import { SITE } from "@/lib/site";

/**
 * ImageBreak — a full-width, near-full-height cinematic image section used for
 * the large visual transitions between content blocks. The photograph carries
 * the section; the type is a thin editorial overlay.
 */
export function ImageBreak({
  image,
  eyebrow,
  title,
  body,
  align = "center",
  height = "tall",
  cta,
  priority = false,
}: {
  image: ImageKey;
  eyebrow?: Bilingual;
  title: Bilingual;
  body?: Bilingual;
  align?: "center" | "left";
  height?: "tall" | "full";
  cta?: "call" | null;
  priority?: boolean;
}) {
  const { t } = useLanguage();

  const minH = height === "full" ? "min-h-[100svh]" : "min-h-[78vh] lg:min-h-[88vh]";
  const justify = align === "center" ? "items-center text-center" : "items-end";
  const overlay = align === "center" ? "full" : "left";

  return (
    <section className="relative w-full overflow-hidden bg-ink-950">
      <ImageSlot
        image={image}
        priority={priority}
        sizes="100vw"
        overlay={overlay}
        className={`absolute inset-0 h-full w-full`}
      />
      {/* extra bottom fade so the next section blends in */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(8,9,11,1))",
        }}
      />

      <div
        className={`container-x relative flex ${minH} ${justify} py-24`}
      >
        <div className={align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"}>
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-silver">
              {t(eyebrow)}
            </span>
          )}
          <h2 className="mt-5 text-balance font-display font-extrabold uppercase leading-[0.95] tracking-tightest text-white text-4xl sm:text-6xl lg:text-7xl">
            {t(title)}
          </h2>
          {body && (
            <p
              className={`mt-6 text-lg leading-relaxed text-silver sm:text-xl ${
                align === "center" ? "mx-auto max-w-xl" : "max-w-lg"
              }`}
            >
              {t(body)}
            </p>
          )}
          {cta === "call" && (
            <div className={`mt-9 flex ${align === "center" ? "justify-center" : ""}`}>
              <a href={SITE.phoneHref} className="btn-primary text-lg">
                <PhoneIcon className="h-5 w-5" />
                {SITE.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
