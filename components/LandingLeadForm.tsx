"use client";

import { useState } from "react";
import { enquiryServiceOptions, propertyTypeOptions } from "@/lib/form-options";
import ThemedSelect from "@/components/ThemedSelect";

type Status = "idle" | "sending" | "error";
type Variant = "card" | "horizontal" | "popup";

const inputClass =
  "h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function LandingLeadForm({
  variant = "card",
  idPrefix = "landing-enquiry",
}: {
  variant?: Variant;
  idPrefix?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not submit your request.");
      window.location.assign("/thank-you#confirmation");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Please try again.");
    }
  }

  const isCard = variant === "card";
  const isHorizontal = variant === "horizontal";
  const shellClass = isCard
    ? "rounded-[28px] bg-white p-6 shadow-[0_28px_80px_-38px_rgba(17,17,18,0.55)] sm:p-8"
    : variant === "popup"
      ? "bg-white"
      : "";
  const gridClass = isHorizontal
    ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    : "grid gap-4";

  return (
    <form id={idPrefix} onSubmit={submit} className={shellClass} noValidate>
      {isCard && (
        <>
          <div className="inline-flex rounded-full bg-brand-soft px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
            Limited-period Monsoon Offer
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">Claim ₹1,000 off your inspection</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft/65">
            Tell us about the property. We will recommend the right inspection.
          </p>
        </>
      )}

      <div className={`${isCard ? "mt-6" : ""} ${gridClass}`}>
        <div className="min-w-0">
          <label htmlFor={`${idPrefix}-name`} className={`mb-1.5 block font-display text-sm font-semibold ${isHorizontal ? "text-white" : ""}`}>
            Name
          </label>
          <input id={`${idPrefix}-name`} name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClass} />
        </div>
        <div className="min-w-0">
          <label htmlFor={`${idPrefix}-phone`} className={`mb-1.5 block font-display text-sm font-semibold ${isHorizontal ? "text-white" : ""}`}>
            Phone
          </label>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={`mb-1.5 block font-display text-sm font-semibold ${isHorizontal ? "text-white" : ""}`}>
            Email
          </label>
          <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={inputClass} />
        </div>
        <div className="min-w-0">
          <label htmlFor={`${idPrefix}-property`} className={`mb-1.5 block font-display text-sm font-semibold ${isHorizontal ? "text-white" : ""}`}>
            Property type
          </label>
          <ThemedSelect id={`${idPrefix}-property`} name="property" defaultValue={propertyTypeOptions[0]} options={propertyTypeOptions} className={`${inputClass} cursor-pointer`} />
        </div>
        <div className="min-w-0">
          <label htmlFor={`${idPrefix}-service`} className={`mb-1.5 block font-display text-sm font-semibold ${isHorizontal ? "text-white" : ""}`}>
            What do you need?
          </label>
          <ThemedSelect id={`${idPrefix}-service`} name="service" defaultValue={enquiryServiceOptions[0]} options={enquiryServiceOptions} className={`${inputClass} cursor-pointer`} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-message`} className={`mb-1.5 block font-display text-sm font-semibold ${isHorizontal ? "text-white" : ""}`}>
            What have you noticed?
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={isHorizontal ? 1 : 3}
            placeholder="Damp patch, seepage, visible defects..."
            className={`${inputClass} h-auto min-h-12 resize-y py-3`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className={isHorizontal ? "mt-5 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between" : ""}>
        {isHorizontal && (
          <p className="max-w-2xl text-xs leading-relaxed text-white/45">
            By submitting, you agree to receive calls, SMS, or email about your enquiry.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className={`group flex h-12 cursor-pointer items-center justify-between rounded-full bg-brand pl-5 text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60 ${
            isHorizontal ? "w-full shrink-0 sm:w-auto sm:min-w-56" : "mt-6 w-full"
          }`}
        >
          <span className="font-display text-sm font-semibold">{status === "sending" ? "Submitting..." : "Submit Enquiry"}</span>
          <span className="mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {!isHorizontal && (
        <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft/45">
          By submitting, you agree to receive calls, SMS, or email about your enquiry.
        </p>
      )}
    </form>
  );
}
