import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { getServiceBySlug, SERVICE_PAGES } from "@/lib/services";
import { getCityBySlug, CITIES } from "@/lib/cities";
import { ServiceArticle } from "@/components/ServiceArticle";
import { CityArticle } from "@/components/CityArticle";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import {
  faqSchema,
  serviceSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return [
    ...SERVICE_PAGES.map((s) => ({ slug: s.slug as string })),
    ...CITIES.map((c) => ({ slug: c.slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(slug);
  const canonical = `${SITE.url}/${slug}`;

  if (service?.metaTitle && service.metaDescription) {
    return {
      title: service.metaTitle.en,
      description: service.metaDescription.en,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: service.metaTitle.en,
        description: service.metaDescription.en,
        url: canonical,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: service.metaTitle.en,
        description: service.metaDescription.en,
      },
    };
  }

  if (city) {
    return {
      title: city.metaTitle.en,
      description: city.metaDescription.en,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: city.metaTitle.en,
        description: city.metaDescription.en,
        url: canonical,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: city.metaTitle.en,
        description: city.metaDescription.en,
      },
    };
  }

  return {};
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(slug);

  if (service?.slug) {
    const url = `${SITE.url}/${slug}`;
    const breadcrumb = breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: service.name.en, url },
    ]);
    const svc = serviceSchema({
      name: service.name.en,
      description: service.metaDescription?.en ?? service.shortDescription.en,
      url,
    });
    const faqLd = service.faqs
      ? faqSchema(
          service.faqs.map((f) => ({
            question: f.question.en,
            answer: f.answer.en,
          }))
        )
      : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(svc)} />
        {faqLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
        )}
        <ServiceArticle service={service} />
        {service.faqs && <FAQ faqs={service.faqs} dark />}
        <Contact />
      </>
    );
  }

  if (city) {
    const url = `${SITE.url}/${slug}`;
    const breadcrumb = breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: city.name.en, url },
    ]);
    const faqLd = faqSchema(
      city.faqs.map((f) => ({ question: f.question.en, answer: f.answer.en }))
    );

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
        <CityArticle city={city} />
        <FAQ faqs={city.faqs} dark />
        <Contact />
      </>
    );
  }

  notFound();
}
