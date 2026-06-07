// Single source of truth for NAP (Name, Address, Phone) and business metadata.
// Keep this consistent everywhere for local SEO.

export const SITE = {
  name: "Cesar's Restaurant Appliances Repair",
  legalName: "Cesar's Restaurant Appliances Repair",
  phone: "(832) 545-2389",
  phoneHref: "tel:+18325452389",
  email: "cesaredgarmejia0603@gmail.com",
  emailHref: "mailto:cesaredgarmejia0603@gmail.com",
  address: {
    street: "2502 Wall St.",
    city: "Houston",
    state: "TX",
    region: "Texas",
    postalCode: "77002",
    country: "US",
  },
  geo: {
    // Approximate coordinates for Houston, TX service center.
    latitude: 29.7604,
    longitude: -95.3698,
  },
  hours: "24/7 Emergency Service",
  serviceArea: "Houston and Surrounding Areas",
  domain: "cesarrestaurantappliancerepair.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://cesarrestaurantappliancerepair.com",
  languages: ["en", "es"] as const,
  priceRange: "$$",
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}`;
