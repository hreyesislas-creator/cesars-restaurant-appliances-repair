import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ImageBreak } from "@/components/ImageBreak";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CTABand } from "@/components/CTABand";
import { AreasServed } from "@/components/AreasServed";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { HOME_FAQS } from "@/lib/home-faqs";
import { faqSchema, jsonLd } from "@/lib/schema";

export default function HomePage() {
  const faqLd = faqSchema(
    HOME_FAQS.map((f) => ({ question: f.question.en, answer: f.answer.en }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqLd)}
      />
      <Hero />
      <Services />

      {/* Full-width cinematic transition — the whole kitchen */}
      <ImageBreak
        image="hero"
        height="tall"
        align="center"
        eyebrow={{ en: "Whole-Kitchen Coverage", es: "Cobertura de Toda la Cocina" }}
        title={{
          en: "Every machine in your kitchen. One number to call.",
          es: "Cada máquina de su cocina. Un solo número que llamar.",
        }}
        body={{
          en: "Refrigeration, cooking lines, ice machines and more — diagnosed and repaired by technicians who work on commercial equipment every day.",
          es: "Refrigeración, líneas de cocción, máquinas de hielo y más — diagnosticado y reparado por técnicos que trabajan con equipo comercial todos los días.",
        }}
        cta="call"
      />

      <WhyChooseUs />

      {/* Full-width cinematic transition — emergency / after hours */}
      <CTABand />

      <AreasServed />
      <About />
      <FAQ faqs={HOME_FAQS} />
      <Contact />
    </>
  );
}
