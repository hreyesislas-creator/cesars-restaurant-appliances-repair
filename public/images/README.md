# Site imagery — visual-first system

The site is built **image-first**: every major section renders an `<ImageSlot>`
that shows a cinematic, scene-tuned placeholder until the real photo is dropped in.

## Single source of truth

All prompts, alt text, filenames, and wiring live in **`content/image-prompts.ts`**.
Each entry is one image location. To activate a real photo:

1. Generate it with that entry's `prompt` (Midjourney / Flux / Ideogram / DALL·E).
2. Export as **WebP** and save here as `public/images/<file>` (the exact filename below).
3. Set that entry's **`ready: true`**.

No other code changes — the slot swaps the placeholder for the photo with no
layout shift. While `ready: false`, the scene-tuned placeholder renders, so there
is never a broken image.

**Art direction (every image):** Apple / Rivian / Porsche / Tesla / Awwwards —
ultra-realistic, architectural, cinematic, dark luxury. Never bright/flat catalog
lighting, never generic stock, never clutter.

## Image slots

| # | Key | File to add (`public/images/`) | Used in |
|---|-----|--------------------------------|---------|
| 1 | `hero` | `hero-commercial-kitchen.webp` | Hero (full-screen) |
| 2 | `refrigerator` | `commercial-refrigerator.webp` | Services row + service page |
| 3 | `walkInCooler` | `walk-in-cooler.webp` | Services row + service page |
| 4 | `iceMachine` | `ice-machine.webp` | Services row + service page |
| 5 | `fryer` | `commercial-fryer.webp` | Services row + service page |
| 6 | `ovenRange` | `oven-range.webp` | Services row + oven/range/grill/stove pages |
| 7 | `downtime` | `downtime-chef.webp` | "Downtime costs money" section |
| 8 | `emergency` | `emergency-service.webp` | Emergency CTA (full-width night) |
| 9 | `about` | `technician-portrait.webp` | About section |
| 10 | `contact` | `restaurant-owner-handshake.webp` | Contact section |
| 11 | `houstonArea` | `houston-service-area.webp` | Areas Served + city pages |

> The home full-width transition and service pages without a dedicated photo reuse the
> `hero` whole-kitchen shot. If you'd prefer a distinct wide kitchen image there, add a
> new entry to `content/image-prompts.ts` the same way and point those slots at it.

## Recommended exports

- **Hero / wide / break / banner images** (`hero`, `walkInCooler`, `emergency`,
  `houstonArea`, `contact`): 2560×1440 (16:9) or wider, WebP, < 450 KB.
- **Portrait images** (`refrigerator`, `iceMachine`, `fryer`, `ovenRange`,
  `downtime`, `about`): ~1600×2000 (4:5), WebP.
- Keep the **left third darker** on `hero` and any image with overlaid text.

## Generator tips

- **Midjourney v6+:** paste the `prompt`, append `--ar 16:9 --style raw --q 2`
  (use `--ar 4:5` for portrait slots).
- **Flux / Ideogram / DALL·E 3:** paste the `prompt`, request the matching ratio.
- Every prompt already ends with `no text, no logo, no watermark`.
