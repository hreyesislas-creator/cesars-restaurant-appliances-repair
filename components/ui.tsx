import Link from "next/link";
import type { ReactNode } from "react";

/** Small uppercase section label with a leading accent line. */
export function SectionLabel({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? "text-accent-dark" : "text-accent-light"
      } ${className}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
      {children}
    </span>
  );
}

/** Soft red radial glow accent — position with className. */
export function GlowBlob({
  className = "",
  color = "rgba(225,29,42,0.28)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-0 rounded-full blur-[120px] ${className}`}
      style={{ background: color }}
    />
  );
}

/** Faint engineering-grid texture overlay. */
export function GridTexture({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-grid-faint [background-size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] ${className}`}
    />
  );
}

/** Refined text-based brand mark (no real logo needed). */
export function Wordmark({
  size = "md",
  href = "/",
}: {
  size?: "sm" | "md";
  href?: string | null;
}) {
  const mark = (
    <span className="flex items-center gap-3">
      {/* Refined CR monogram badge (matches /brand/logo-icon.svg) */}
      <span className="relative flex h-10 w-10 items-center justify-center rounded-[11px] bg-charcoal-800 shadow-soft-lg">
        <span className="font-display text-[17px] font-extrabold leading-none tracking-[-0.05em]">
          <span className="text-silver-light">C</span>
          <span className="text-accent">R</span>
        </span>
        <span className="absolute inset-0 rounded-[11px] ring-1 ring-inset ring-white/12" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold uppercase tracking-[0.1em] text-white ${
            size === "sm" ? "text-[13px]" : "text-[15px]"
          }`}
        >
          Cesar<span className="text-accent">&apos;</span>s
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-silver-muted">
          Restaurant Appliances Repair
        </span>
      </span>
    </span>
  );

  if (href === null) return mark;
  return (
    <Link href={href} aria-label="Cesar's Restaurant Appliances Repair" className="group">
      {mark}
    </Link>
  );
}
