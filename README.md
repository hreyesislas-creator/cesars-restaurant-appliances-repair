# Cesar's Restaurant Appliances Repair

Bilingual (English/Spanish), SEO-optimized lead-generation website for a commercial
restaurant equipment repair business serving Houston, TX and surrounding areas.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.
No CMS, no database, no auth — a fast static-first marketing site focused on
phone calls and estimate requests.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Pages

- `/` — Homepage (hero, services, why-choose-us, areas, about, FAQ, contact)
- Service pages:
  - `/commercial-refrigerator-repair-houston`
  - `/walk-in-cooler-repair-houston`
  - `/ice-machine-repair-houston`
  - `/commercial-fryer-repair-houston`
  - `/restaurant-equipment-repair-houston`
- City pages:
  - `/houston-tx`, `/katy-tx`, `/sugar-land-tx`, `/pearland-tx`, `/pasadena-tx`, `/cypress-tx`

## Contact form / email delivery

The contact form (`/api/contact`) sends leads via [Resend](https://resend.com).

1. Create a Resend account and verify a sending domain (or use the test domain
   `onboarding@resend.dev` while developing).
2. Set the following environment variables (see `.env.example`):
   - `RESEND_API_KEY` — your Resend API key
   - `LEAD_TO_EMAIL` — where leads are delivered (defaults to the business email)
   - `LEAD_FROM_EMAIL` — verified "from" address
3. On Vercel, add these under **Project → Settings → Environment Variables**.

If `RESEND_API_KEY` is not set, the form still works in the UI and the lead is
logged to the server console (so nothing breaks before email is configured).

## Editing content

All copy lives in `lib/` and is fully bilingual (hand-written, not machine
translated):

- `lib/site.ts` — business NAP (name, address, phone, email, hours)
- `lib/services.ts` — services + full service-page content
- `lib/cities.ts` — city/service-area pages + the areas-served list
- `lib/home-faqs.ts` — homepage FAQ
- `lib/i18n/dictionary.ts` — shared UI strings

## SEO

- Per-page metadata via the Metadata API (title, description, canonical, OG, Twitter)
- JSON-LD: LocalBusiness, Organization, Service, FAQPage, BreadcrumbList
- `sitemap.xml` and `robots.txt` generated automatically
- Dynamically generated Open Graph image (`app/opengraph-image.tsx`)

## Deploy to Vercel

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain
(`https://cesarrestaurantappliancerepair.com`) and add the Resend variables.
