"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function LandingLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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
      setStatus("success");
      form.reset();
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[520px] flex-col justify-center rounded-[28px] bg-white p-7 text-center shadow-[0_28px_80px_-38px_rgba(17,17,18,0.55)] sm:p-9" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="m4 12.5 5 5L20 6.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold">Your inspection request is in.</h2>
        <p className="mt-3 leading-relaxed text-ink-soft/70">Our team will contact you within one working day.</p>
        <a href="tel:+919833779955" className="mt-7 font-display text-lg font-semibold text-brand hover:text-brand-deep">
          Need help now? Call 98337 79955
        </a>
      </div>
    );
  }

  return (
    <form
      id="landing-enquiry"
      onSubmit={submit}
      className="rounded-[28px] bg-white p-6 shadow-[0_28px_80px_-38px_rgba(17,17,18,0.55)] sm:p-8"
      noValidate
    >
      <div className="inline-flex rounded-full bg-brand-soft px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
        Limited-period Monsoon Offer
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">Claim ₹1,000 off your inspection</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft/65">Tell us about the property. We will recommend the right inspection.</p>

      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor="landing-name" className="mb-1.5 block font-display text-sm font-semibold">Name</label>
          <input id="landing-name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="landing-phone" className="mb-1.5 block font-display text-sm font-semibold">Phone</label>
            <input id="landing-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" className={inputClass} />
          </div>
          <div>
            <label htmlFor="landing-email" className="mb-1.5 block font-display text-sm font-semibold">Email</label>
            <input id="landing-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={inputClass} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="landing-property" className="mb-1.5 block font-display text-sm font-semibold">Property type</label>
            <select id="landing-property" name="property" defaultValue="Housing society" className={`${inputClass} cursor-pointer`}>
              <option>Housing society</option>
              <option>Home / Apartment</option>
              <option>Commercial property</option>
              <option>Industrial property</option>
              <option>Managed property portfolio</option>
            </select>
          </div>
          <div>
            <label htmlFor="landing-service" className="mb-1.5 block font-display text-sm font-semibold">What do you need?</label>
            <select id="landing-service" name="service" defaultValue="Water leakage & seepage inspection" className={`${inputClass} cursor-pointer`}>
              <option>Water leakage & seepage inspection</option>
              <option>Thermal scanning</option>
              <option>Waterproofing diagnosis</option>
              <option>Pre-possession inspection</option>
              <option>Electrical safety audit</option>
              <option>Property quality audit</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="landing-message" className="mb-1.5 block font-display text-sm font-semibold">What have you noticed?</label>
          <textarea
            id="landing-message"
            name="message"
            rows={3}
            placeholder="Damp patch, seepage, visible defects, possession date..."
            className={`${inputClass} h-auto resize-y py-3`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 flex h-12 w-full cursor-pointer items-center justify-between rounded-full bg-ink pl-5 text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="font-display text-sm font-semibold">{status === "sending" ? "Submitting..." : "Get My Inspection Plan"}</span>
        <span className="mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-white group-hover:text-brand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft/45">
        By submitting, you agree to receive calls, SMS, or email about your enquiry.
      </p>
    </form>
  );
}
