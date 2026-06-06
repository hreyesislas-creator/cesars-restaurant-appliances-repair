"use client";

import { SITE, FULL_ADDRESS } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { ContactForm } from "./ContactForm";
import { ImageSlot } from "./ImageSlot";
import { SectionLabel } from "./ui";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "./Icons";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-28 lg:py-36"
    >
      <div className="container-x relative">
        {/* On-site image banner with overlaid editorial */}
        <div className="relative">
          <ImageSlot
            image="contact"
            sizes="(max-width: 1280px) 100vw, 1200px"
            overlay="left"
            className="aspect-[16/10] w-full rounded-3xl border border-white/10 shadow-soft-lg sm:aspect-[16/7] lg:aspect-[21/8]"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-7 sm:px-12">
                <SectionLabel>{t(UI.navContact)}</SectionLabel>
                <h2 className="mt-5 text-balance display-lg text-white">
                  {t(UI.contactHeading)}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-silver">
                  {t(UI.contactSub)}
                </p>
              </div>
            </div>
          </ImageSlot>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — contact info */}
          <div>
            {/* Prominent phone */}
            <a
              href={SITE.phoneHref}
              className="group flex items-center gap-5 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/15 to-transparent p-5 transition-all hover:from-accent/25"
            >
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-glow-red">
                <PhoneIcon className="h-7 w-7 text-white" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-silver-muted">
                  {t(UI.callUs)} — {t(UI.emergency247)}
                </span>
                <span className="mt-1 block display-md text-white">
                  {SITE.phone}
                </span>
              </span>
            </a>

            {/* Info rows */}
            <ul className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <InfoRow icon={MailIcon} label={t(UI.emailUs)} href={SITE.emailHref}>
                <span className="break-all">{SITE.email}</span>
              </InfoRow>
              <InfoRow icon={MapPinIcon} label={t(UI.address)}>
                {FULL_ADDRESS}
              </InfoRow>
              <InfoRow icon={ClockIcon} label={t(UI.hours)}>
                {t(UI.emergency247)}
              </InfoRow>
            </ul>
          </div>

          {/* Right — form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof MailIcon;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <span className="flex items-start gap-3.5 bg-ink-900/40 px-5 py-4">
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-light" />
      <span className="text-sm">
        <span className="block font-semibold uppercase tracking-wider text-silver-muted">
          {label}
        </span>
        <span className="mt-0.5 block text-silver-light">{children}</span>
      </span>
    </span>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="block transition-colors hover:bg-white/[0.03]">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}
