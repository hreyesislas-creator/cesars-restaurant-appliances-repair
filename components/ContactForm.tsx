"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { UI } from "@/lib/i18n/dictionary";
import { CheckIcon } from "./Icons";

const EQUIPMENT_OPTIONS: { value: string; label: { en: string; es: string } }[] =
  [
    { value: "Commercial Refrigerator", label: { en: "Commercial Refrigerator", es: "Refrigerador Comercial" } },
    { value: "Walk-In Cooler", label: { en: "Walk-In Cooler", es: "Walk-In Cooler" } },
    { value: "Commercial Freezer", label: { en: "Commercial Freezer", es: "Congelador Comercial" } },
    { value: "Ice Machine", label: { en: "Ice Machine", es: "Máquina de Hielo" } },
    { value: "Commercial Oven", label: { en: "Commercial Oven", es: "Horno Comercial" } },
    { value: "Commercial Fryer", label: { en: "Commercial Fryer", es: "Freidora Comercial" } },
    { value: "Commercial Grill", label: { en: "Commercial Grill", es: "Parrilla Comercial" } },
    { value: "Commercial Stove / Range", label: { en: "Commercial Stove / Range", es: "Estufa / Hornilla Comercial" } },
    { value: "Other", label: { en: "Other", es: "Otro" } },
  ];

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const { t, locale } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-accent/30 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-white shadow-glow-red">
          <CheckIcon className="h-8 w-8" />
        </div>
        <p className="text-lg font-semibold text-white">{t(UI.formSuccess)}</p>
      </div>
    );
  }

  const reqCls = "ml-1 text-accent-light";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl glass-strong edge-top p-6 sm:p-8"
      noValidate
    >
      {/* Honeypot anti-spam field (hidden from users) */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            {t(UI.formName)}
            <span className={reqCls}>*</span>
          </label>
          <input id="name" name="name" type="text" required className="field" autoComplete="name" />
        </div>

        <div>
          <label htmlFor="businessName" className="field-label">
            {t(UI.formBusiness)}
          </label>
          <input id="businessName" name="businessName" type="text" className="field" autoComplete="organization" />
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            {t(UI.formPhone)}
            <span className={reqCls}>*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className="field" autoComplete="tel" />
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            {t(UI.formEmail)}
          </label>
          <input id="email" name="email" type="email" className="field" autoComplete="email" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="equipmentType" className="field-label">
            {t(UI.formEquipment)}
          </label>
          <select id="equipmentType" name="equipmentType" className="field" defaultValue="">
            <option value="" disabled className="bg-ink-800">
              {t(UI.formSelectEquipment)}
            </option>
            {EQUIPMENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-ink-800">
                {opt.label[locale]}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="issue" className="field-label">
            {t(UI.formIssue)}
            <span className={reqCls}>*</span>
          </label>
          <textarea id="issue" name="issue" rows={4} required className="field" />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent-light">
          {t(UI.formError)}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full text-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? t(UI.formSending) : t(UI.formSubmit)}
      </button>

      <p className="mt-4 text-center text-xs text-silver-muted">
        {t({
          en: "Prefer to talk now? Call (832) 545-2389 — we answer 24/7.",
          es: "¿Prefiere hablar ahora? Llame al (832) 545-2389 — contestamos 24/7.",
        })}
      </p>
    </form>
  );
}
