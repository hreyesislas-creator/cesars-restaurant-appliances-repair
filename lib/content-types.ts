import type { Bilingual, BilingualList } from "./i18n/types";

export interface FAQ {
  question: Bilingual;
  answer: Bilingual;
}

export interface ContentSection {
  heading: Bilingual;
  body: Bilingual; // one or more paragraphs separated by \n\n
}

export interface Service {
  /** Stable key used internally. */
  key: string;
  /** URL slug for the dedicated page, or null if grid-only. */
  slug: string | null;
  icon: string;
  name: Bilingual;
  shortDescription: Bilingual;
  benefits: BilingualList;
  // Dedicated-page-only fields:
  metaTitle?: Bilingual;
  metaDescription?: Bilingual;
  h1?: Bilingual;
  intro?: Bilingual; // paragraphs separated by \n\n
  sections?: ContentSection[];
  commonProblems?: BilingualList;
  faqs?: FAQ[];
}

export interface City {
  slug: string;
  name: Bilingual; // e.g. "Houston, TX"
  shortName: string; // e.g. "Houston"
  metaTitle: Bilingual;
  metaDescription: Bilingual;
  h1: Bilingual;
  intro: Bilingual;
  sections: ContentSection[];
  neighborhoods: string[];
  faqs: FAQ[];
}
