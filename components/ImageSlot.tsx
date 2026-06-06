import Image from "next/image";
import { IMAGES, imageSrc, type ImageKey, type Scene } from "@/content/image-prompts";

/**
 * ImageSlot — the building block of the visual-first layout.
 *
 * Renders a real photograph when one exists (set `src` in content/image-prompts.ts),
 * otherwise a cinematic, scene-tuned placeholder so the layout already reads premium
 * and there is no broken image / layout shift. Fills its positioned parent.
 */
export function ImageSlot({
  image,
  className = "",
  sizes = "100vw",
  priority = false,
  overlay = "none",
  children,
}: {
  image: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Optional darkening for legibility of overlaid content. */
  overlay?: "none" | "soft" | "bottom" | "left" | "full";
  children?: React.ReactNode;
}) {
  const img = IMAGES[image];
  const src = imageSrc(image);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={img.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: img.focal ?? "center" }}
        />
      ) : (
        <ScenePlaceholder scene={img.scene} />
      )}

      {overlay !== "none" && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: OVERLAYS[overlay] }}
        />
      )}

      {children}
    </div>
  );
}

const OVERLAYS: Record<Exclude<Parameters<typeof ImageSlot>[0]["overlay"] & string, "none">, string> = {
  soft: "linear-gradient(180deg, rgba(5,6,7,0.25) 0%, rgba(5,6,7,0.45) 100%)",
  bottom:
    "linear-gradient(180deg, rgba(5,6,7,0) 35%, rgba(5,6,7,0.55) 75%, rgba(5,6,7,0.92) 100%)",
  left: "linear-gradient(90deg, rgba(5,6,7,0.9) 0%, rgba(5,6,7,0.5) 45%, rgba(5,6,7,0.08) 100%)",
  full: "linear-gradient(180deg, rgba(5,6,7,0.6) 0%, rgba(5,6,7,0.72) 100%)",
};

/**
 * Cinematic placeholder. Each scene is a hand-tuned stack of gradients evoking a
 * real photograph of that environment (lighting, palette, depth) — not an abstract
 * tech texture. Replaced automatically the moment a real photo is added.
 */
function ScenePlaceholder({ scene }: { scene: Scene }) {
  const s = SCENES[scene];
  return (
    <div className="absolute inset-0 bg-ink-950" aria-hidden>
      {s.layers.map((bg, i) => (
        <div key={i} className="absolute inset-0" style={{ background: bg }} />
      ))}
      {/* brushed-metal micro-sheen, masked toward the lit side */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0) 3px, rgba(255,255,255,0) 9px)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 30%, black 75%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 30%, black 75%, black 100%)",
        }}
      />
      {/* cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 60% 40%, transparent 52%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}

/** Per-scene gradient recipes — read as photographs, not abstractions. */
const SCENES: Record<Scene, { layers: string[] }> = {
  kitchen: {
    layers: [
      "radial-gradient(130% 100% at 78% 24%, #333a43 0%, #1b1f25 38%, #0c0e11 70%, #060708 100%)",
      "radial-gradient(40% 52% at 80% 20%, rgba(255,188,128,0.24) 0%, rgba(255,160,96,0.06) 40%, transparent 68%)",
      "linear-gradient(180deg, transparent 60%, rgba(40,48,58,0.4) 100%)",
    ],
  },
  steel: {
    layers: [
      "radial-gradient(120% 100% at 60% 35%, #353d47 0%, #1f242b 40%, #0c0e11 78%)",
      "radial-gradient(45% 60% at 70% 30%, rgba(150,180,210,0.18) 0%, transparent 60%)",
      "linear-gradient(115deg, transparent 0%, rgba(170,190,210,0.10) 45%, transparent 80%)",
    ],
  },
  cold: {
    layers: [
      "radial-gradient(120% 110% at 65% 40%, #1c3340 0%, #122430 42%, #07121a 78%, #050a0e 100%)",
      "radial-gradient(35% 55% at 22% 30%, rgba(255,210,150,0.16) 0%, transparent 55%)",
      "linear-gradient(180deg, rgba(120,180,210,0.10) 0%, transparent 40%, rgba(10,30,40,0.5) 100%)",
    ],
  },
  ice: {
    layers: [
      "radial-gradient(120% 110% at 55% 35%, #24414d 0%, #15303b 40%, #08161d 80%)",
      "radial-gradient(40% 50% at 60% 30%, rgba(200,235,255,0.30) 0%, rgba(150,210,235,0.08) 40%, transparent 68%)",
      "linear-gradient(180deg, rgba(190,230,255,0.10) 0%, transparent 45%)",
    ],
  },
  fire: {
    layers: [
      "radial-gradient(120% 110% at 60% 55%, #3a2a20 0%, #20171180 36%, #0c0907 74%, #060403 100%)",
      "radial-gradient(45% 55% at 62% 60%, rgba(255,150,60,0.34) 0%, rgba(255,110,40,0.10) 42%, transparent 70%)",
      "linear-gradient(0deg, rgba(255,130,50,0.14) 0%, transparent 45%)",
    ],
  },
  dim: {
    layers: [
      "radial-gradient(110% 100% at 50% 38%, #262b31 0%, #15181d 44%, #0a0c0e 80%, #060708 100%)",
      "radial-gradient(40% 50% at 58% 32%, rgba(190,200,215,0.10) 0%, transparent 58%)",
      "linear-gradient(180deg, transparent 45%, rgba(6,7,8,0.78) 100%)",
    ],
  },
  night: {
    layers: [
      "radial-gradient(130% 120% at 50% 30%, #14203a 0%, #0c1426 44%, #060a14 80%, #04060c 100%)",
      "radial-gradient(34% 46% at 30% 64%, rgba(255,180,110,0.26) 0%, rgba(255,150,80,0.06) 42%, transparent 68%)",
      "radial-gradient(30% 40% at 76% 60%, rgba(225,29,42,0.20) 0%, transparent 60%)",
      "linear-gradient(180deg, transparent 55%, rgba(8,14,28,0.7) 100%)",
    ],
  },
  city: {
    layers: [
      "linear-gradient(180deg, #1a2740 0%, #16203a 30%, #0c1322 60%, #080d18 100%)",
      "radial-gradient(60% 50% at 50% 78%, rgba(255,180,110,0.22) 0%, rgba(255,150,80,0.05) 45%, transparent 72%)",
      "repeating-linear-gradient(90deg, rgba(255,200,140,0.05) 0px, rgba(255,200,140,0) 6px, rgba(255,200,140,0) 26px)",
    ],
  },
  portrait: {
    layers: [
      "radial-gradient(90% 90% at 62% 38%, #2c333d 0%, #171b21 42%, #0a0c0f 78%, #060708 100%)",
      "radial-gradient(38% 46% at 60% 34%, rgba(255,220,180,0.20) 0%, transparent 60%)",
      "linear-gradient(180deg, transparent 50%, rgba(6,7,8,0.7) 100%)",
    ],
  },
  onsite: {
    layers: [
      "radial-gradient(120% 100% at 55% 40%, #36302a 0%, #211c17 40%, #0e0c0a 76%, #070605 100%)",
      "radial-gradient(45% 55% at 58% 34%, rgba(255,200,150,0.22) 0%, rgba(255,170,110,0.06) 42%, transparent 70%)",
      "linear-gradient(180deg, transparent 58%, rgba(20,16,12,0.55) 100%)",
    ],
  },
};

/** Small "image coming" affordance for development — optional, used by some slots. */
export { IMAGES };
export type { ImageKey };
