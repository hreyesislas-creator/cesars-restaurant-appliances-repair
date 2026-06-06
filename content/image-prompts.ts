/**
 * ════════════════════════════════════════════════════════════════════════
 *  IMAGE SYSTEM — production AI prompts + central slot registry
 * ════════════════════════════════════════════════════════════════════════
 *
 *  Single source of truth for every large image on the site. The layout is
 *  built image-first: sections render <ImageSlot image="…"/>, which shows a
 *  cinematic, scene-tuned placeholder until the real photo is dropped in.
 *
 *  TO SWAP IN A REAL IMAGE
 *  -----------------------
 *    1. Generate it with the entry's `prompt` (Midjourney / Flux / Ideogram).
 *    2. Export it as WebP and save to  public/images/<file>   (e.g. hero-commercial-kitchen.webp).
 *    3. Set that entry's `ready: true`.
 *  Nothing else changes — the slot swaps the placeholder for the photo with no
 *  layout shift. While `ready: false`, the scene-tuned placeholder renders, so
 *  there is never a broken image.
 *
 *  ART DIRECTION (every prompt): Apple / Rivian / Porsche / Tesla / Awwwards.
 *  Ultra-realistic, architectural, cinematic, dark luxury. Never bright/flat
 *  catalog lighting, never generic stock, never clutter.
 */

/** Placeholder palette/character used until a real photo exists. */
export type Scene =
  | "kitchen" // warm steel, Michelin cooking line
  | "steel" // cool brushed stainless, refrigeration
  | "cold" // deep cold blue, walk-in cooler / frost
  | "ice" // icy cyan-white
  | "fire" // amber/orange fryer, oven & flame
  | "dim" // moody, desaturated — downtime / paused service
  | "night" // deep blue night, warm headlight/window glow
  | "city" // urban dusk skyline, restaurant district
  | "portrait" // dark studio key light, human subject
  | "onsite"; // warm restaurant interior, two people

export type Aspect = "hero" | "wide" | "portrait" | "square" | "tall";

export interface SiteImage {
  /** Target filename under public/images (the canonical reference). */
  file: string;
  /** Flip to true once the WebP exists in public/images. */
  ready: boolean;
  /** SEO alt text (English). */
  alt: string;
  scene: Scene;
  aspect: Aspect;
  /** object-position used when a real photo is present. */
  focal?: string;
  /** Production-quality AI generation prompt (verbatim, ready to paste). */
  prompt: string;
}

export const IMAGES = {
  // 1 ── HERO ──────────────────────────────────────────────────────────────
  hero: {
    file: "hero-commercial-kitchen.webp",
    ready: true,
    alt: "Luxury commercial restaurant kitchen with massive stainless steel equipment in Houston",
    scene: "kitchen",
    aspect: "hero",
    focal: "70% center",
    prompt:
      "Ultra realistic luxury commercial restaurant kitchen, massive stainless steel " +
      "equipment, premium industrial design, dramatic architectural lighting, polished " +
      "metal reflections, Michelin-star restaurant atmosphere, cinematic photography, " +
      "dark luxury mood, volumetric lighting, editorial photography, shot on Hasselblad " +
      "X2D, ultra detailed, photorealistic, 8k, no text, no logo, no watermark.",
  },

  // 2 ── COMMERCIAL REFRIGERATOR REPAIR ────────────────────────────────────
  refrigerator: {
    file: "commercial-refrigerator.webp",
    ready: true,
    alt: "Technician repairing a large stainless steel commercial restaurant refrigerator",
    scene: "steel",
    aspect: "portrait",
    focal: "center",
    prompt:
      "Professional commercial refrigeration technician repairing a large stainless " +
      "steel restaurant refrigerator, luxury commercial kitchen environment, realistic " +
      "tools, premium lighting, polished steel reflections, shallow depth of field, " +
      "cinematic commercial photography, photorealistic, 8k, no text, no logo, no watermark.",
  },

  // 3 ── WALK-IN COOLER REPAIR ─────────────────────────────────────────────
  walkInCooler: {
    file: "walk-in-cooler.webp",
    ready: true,
    alt: "Technician inspecting cooling systems inside a premium commercial walk-in cooler",
    scene: "cold",
    aspect: "wide",
    focal: "center",
    prompt:
      "Inside a premium walk-in cooler, commercial refrigeration technician inspecting " +
      "cooling systems, stainless steel shelving, organized restaurant inventory, " +
      "dramatic lighting, industrial luxury atmosphere, ultra realistic commercial " +
      "service photography, 8k, no text, no logo, no watermark.",
  },

  // 4 ── ICE MACHINE REPAIR ────────────────────────────────────────────────
  iceMachine: {
    file: "ice-machine.webp",
    ready: true,
    alt: "Luxury commercial ice machine producing crystal clear ice during maintenance",
    scene: "ice",
    aspect: "portrait",
    focal: "center",
    prompt:
      "Luxury commercial ice machine producing crystal clear ice, restaurant technician " +
      "performing maintenance, stainless steel surfaces, premium hospitality environment, " +
      "dramatic lighting, ultra realistic photography, high-end restaurant equipment, 8k, " +
      "no text, no logo, no watermark.",
  },

  // 5 ── COMMERCIAL FRYER REPAIR ───────────────────────────────────────────
  fryer: {
    file: "commercial-fryer.webp",
    ready: true,
    alt: "Technician repairing a commercial fryer in a luxury restaurant kitchen",
    scene: "fire",
    aspect: "portrait",
    focal: "center",
    prompt:
      "Commercial fryer in a luxury restaurant kitchen, technician repairing professional " +
      "frying equipment, warm cinematic lighting, stainless steel reflections, premium " +
      "industrial environment, photorealistic, ultra detailed, 8k, no text, no logo, no watermark.",
  },

  // 6 ── OVEN & RANGE REPAIR ───────────────────────────────────────────────
  ovenRange: {
    file: "oven-range.webp",
    ready: true,
    alt: "Technician performing diagnostics on high-end commercial restaurant ovens and ranges",
    scene: "fire",
    aspect: "portrait",
    focal: "center",
    prompt:
      "High-end commercial restaurant ovens and ranges, professional technician performing " +
      "diagnostics, luxury kitchen environment, cinematic lighting, polished steel, premium " +
      "restaurant equipment photography, ultra realistic, 8k, no text, no logo, no watermark.",
  },

  // 7 ── DOWNTIME COSTS MONEY ──────────────────────────────────────────────
  downtime: {
    file: "downtime.webp",
    ready: true,
    alt: "Chef in a luxury commercial kitchen facing paused operations from an equipment failure",
    scene: "dim",
    aspect: "portrait",
    focal: "center",
    prompt:
      "Professional chef standing in a luxury commercial kitchen looking at equipment " +
      "failure, dramatic atmosphere, restaurant operations paused, cinematic storytelling, " +
      "emotional business impact, premium hospitality photography, ultra realistic, 8k, " +
      "no text, no logo, no watermark.",
  },

  // 8 ── EMERGENCY SERVICE (night) ─────────────────────────────────────────
  emergency: {
    file: "emergency-service.webp",
    ready: true,
    alt: "Commercial appliance repair service truck arriving at a restaurant at night for an emergency call",
    scene: "night",
    aspect: "wide",
    focal: "center",
    prompt:
      "Commercial appliance repair service truck arriving at a restaurant at night, " +
      "technician responding to emergency repair call, rain reflections, cinematic " +
      "lighting, premium commercial service branding, ultra realistic, dramatic " +
      "photography, 8k, no text, no logo, no watermark.",
  },

  // 9 ── ABOUT US (technician portrait) ────────────────────────────────────
  about: {
    file: "technician-portrait.webp",
    ready: true,
    alt: "Confident professional commercial appliance repair technician in a luxury commercial kitchen",
    scene: "portrait",
    aspect: "portrait",
    focal: "center top",
    prompt:
      "Professional Hispanic commercial appliance repair technician, confident pose, " +
      "luxury commercial kitchen background, trustworthy, premium lighting, editorial " +
      "portrait photography, photorealistic, 8k, no text, no logo, no watermark.",
  },

  // 10 ── CONTACT (owner handshake) ────────────────────────────────────────
  contact: {
    file: "restaurant-owner-handshake.webp",
    ready: true,
    alt: "Restaurant owner shaking hands with a commercial appliance repair technician in a premium kitchen",
    scene: "onsite",
    aspect: "wide",
    focal: "center",
    prompt:
      "Restaurant owner shaking hands with commercial appliance repair technician inside " +
      "premium restaurant kitchen, trust, professionalism, business partnership, cinematic " +
      "lighting, luxury hospitality environment, ultra realistic, 8k, no text, no logo, no watermark.",
  },

  // 11 ── HOUSTON SERVICE AREA ─────────────────────────────────────────────
  houstonArea: {
    file: "houston-service-area.webp",
    ready: true,
    alt: "Houston Texas skyline at sunset blended with a luxury commercial kitchen atmosphere",
    scene: "city",
    aspect: "wide",
    focal: "center",
    prompt:
      "Houston Texas skyline at sunset blended with luxury restaurant and commercial " +
      "kitchen atmosphere, premium commercial service branding, cinematic city photography, " +
      "ultra realistic, 8k, no text, no logo, no watermark.",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;

/** Resolved public path for a slot, or null while the photo isn't ready yet. */
export function imageSrc(key: ImageKey): string | null {
  const img = IMAGES[key];
  return img.ready ? `/images/${img.file}` : null;
}

/** Flat list of every prompt — handy for batch generation / export. */
export const IMAGE_PROMPTS = (Object.keys(IMAGES) as ImageKey[]).map((key) => ({
  key,
  file: IMAGES[key].file,
  prompt: IMAGES[key].prompt,
}));
