import type { Bilingual } from "./types";

// UI strings shared across the site. Page/section body content lives in the
// services/cities data files. Native-quality copy — not machine translated.
export const UI: Record<string, Bilingual> = {
  // Global CTAs
  callNow: { en: "Call Now", es: "Llamar Ahora" },
  callNowFull: {
    en: "Call Now: (832) 545-2389",
    es: "Llame Ahora: (832) 545-2389",
  },
  requestEstimate: {
    en: "Request a $50 Estimate",
    es: "Solicitar Estimado por $50",
  },
  freeEstimate: { en: "$50 Estimate", es: "Estimado por $50" },
  getEstimate: { en: "Get a $50 Estimate", es: "Obtenga un Estimado por $50" },

  // Nav
  navHome: { en: "Home", es: "Inicio" },
  navServices: { en: "Services", es: "Servicios" },
  navAreas: { en: "Service Areas", es: "Áreas de Servicio" },
  navAbout: { en: "About", es: "Nosotros" },
  navContact: { en: "Contact", es: "Contacto" },
  navFaq: { en: "FAQ", es: "Preguntas" },

  // Section headings
  servicesHeading: {
    en: "Commercial Repair Services",
    es: "Servicios de Reparación Comercial",
  },
  servicesSub: {
    en: "Factory-trained technicians repairing every major brand of commercial kitchen equipment across Houston.",
    es: "Técnicos capacitados que reparan todas las marcas principales de equipo comercial de cocina en Houston.",
  },
  whyHeading: { en: "Why Choose Us", es: "Por Qué Elegirnos" },
  whySub: {
    en: "Houston restaurants trust us to get their kitchens running fast.",
    es: "Los restaurantes de Houston confían en nosotros para que sus cocinas funcionen rápido.",
  },
  areasHeading: { en: "Areas We Serve", es: "Áreas Que Atendemos" },
  areasSub: {
    en: "Mobile commercial appliance repair across Greater Houston.",
    es: "Reparación móvil de equipo comercial en el área metropolitana de Houston.",
  },
  aboutHeading: { en: "About Us", es: "Acerca de Nosotros" },
  faqHeading: {
    en: "Frequently Asked Questions",
    es: "Preguntas Frecuentes",
  },
  contactHeading: { en: "Request Your $50 Estimate", es: "Solicite Su Estimado por $50" },
  contactSub: {
    en: "Call for emergency service or send us the details and we'll respond fast.",
    es: "Llame para servicio de emergencia o envíenos los detalles y le responderemos rápido.",
  },

  // Form
  formName: { en: "Name", es: "Nombre" },
  formBusiness: { en: "Business Name", es: "Nombre del Negocio" },
  formPhone: { en: "Phone", es: "Teléfono" },
  formEmail: { en: "Email", es: "Correo Electrónico" },
  formEquipment: { en: "Equipment Type", es: "Tipo de Equipo" },
  formIssue: {
    en: "Description of Issue",
    es: "Descripción del Problema",
  },
  formSubmit: { en: "Send Request", es: "Enviar Solicitud" },
  formSending: { en: "Sending…", es: "Enviando…" },
  formSuccess: {
    en: "Thank you! We received your request and will contact you shortly.",
    es: "¡Gracias! Recibimos su solicitud y nos pondremos en contacto pronto.",
  },
  formError: {
    en: "Something went wrong. Please call us at (832) 545-2389.",
    es: "Ocurrió un error. Por favor llámenos al (832) 545-2389.",
  },
  formRequired: { en: "Required", es: "Requerido" },
  formOptional: { en: "Optional", es: "Opcional" },
  formSelectEquipment: {
    en: "Select equipment…",
    es: "Seleccione el equipo…",
  },

  // Misc labels
  emergency247: { en: "24/7 Emergency Service", es: "Servicio de Emergencia 24/7" },
  sameDay: { en: "Same-Day Repairs", es: "Reparaciones el Mismo Día" },
  freeEstimates: { en: "$50 Estimates", es: "Estimados por $50" },
  bilingual: { en: "English & Spanish", es: "Inglés y Español" },
  commercialSpecialists: {
    en: "Commercial Specialists",
    es: "Especialistas Comerciales",
  },
  callUs: { en: "Call Us", es: "Llámenos" },
  emailUs: { en: "Email Us", es: "Escríbanos" },
  hours: { en: "Hours", es: "Horario" },
  address: { en: "Address", es: "Dirección" },
  quickLinks: { en: "Quick Links", es: "Enlaces Rápidos" },
  allServices: { en: "All Services", es: "Todos los Servicios" },
  viewService: { en: "Learn More", es: "Más Información" },
  servingArea: {
    en: "Serving Houston & Surrounding Areas",
    es: "Sirviendo Houston y Áreas Cercanas",
  },
  relatedServices: { en: "Our Services", es: "Nuestros Servicios" },
  relatedAreas: { en: "Service Areas", es: "Áreas de Servicio" },
  rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
  needRepair: {
    en: "Need a repair now?",
    es: "¿Necesita una reparación ahora?",
  },
  ctaBlurb: {
    en: "Don't let broken equipment cost you sales. Call now for fast, professional commercial repair.",
    es: "No deje que el equipo dañado le cueste ventas. Llame ahora para una reparación comercial rápida y profesional.",
  },
};
