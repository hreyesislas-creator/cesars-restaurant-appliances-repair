import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/services";
import { CITIES } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const services: MetadataRoute.Sitemap = SERVICE_PAGES.map((s) => ({
    url: `${SITE.url}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const cities: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE.url}/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...home, ...services, ...cities];
}
