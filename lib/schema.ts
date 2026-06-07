import { SITE } from "./site";

// JSON-LD structured data generators. Output plain objects; render with
// <script type="application/ld+json"> in the relevant layout/page.

const businessId = `${SITE.url}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": businessId,
    name: SITE.name,
    image: `${SITE.url}/opengraph-image`,
    logo: `${SITE.url}/icon.svg`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: [
      "Houston",
      "Pasadena",
      "Pearland",
      "Sugar Land",
      "Katy",
      "Cypress",
      "Spring",
      "The Woodlands",
      "Missouri City",
      "Baytown",
      "Conroe",
      "Tomball",
    ].map((city) => ({ "@type": "City", name: `${city}, TX` })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [],
    description:
      "24/7 commercial restaurant equipment repair in Houston, TX. Refrigerators, walk-in coolers, ice machines, fryers, ovens and more. $50 on-site diagnostic & estimate, emergency and same-day service.",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    telephone: SITE.phone,
    email: SITE.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "US-TX",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: "Houston, TX" },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: SITE.phone,
      serviceUrl: opts.url,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Helper to render a JSON-LD script tag's content safely. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
