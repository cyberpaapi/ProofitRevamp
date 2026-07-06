"use client";

import { useState } from "react";

const serviceOptions = [
  "Water Inspection",
  "Home Inspection — New Flat / Possession",
  "Home Inspection — Resale Purchase",
  "Home Inspection — Rental Move In/Out",
  "Home Inspection — Renovation / Builder Audit",
  "Proofit Care+ (Annual Plan)",
  "Not sure — need advice",
];

type Status = "idle" | "sending" | "success" | "error";

export default function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center" role="status">
        <svg className="draw-check mx-auto mb-5" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
          <circle cx="36" cy="36" r="34" stroke="#F7941D" strokeWidth="3" />
          <path d="M22 37 L32 47 L52 26" stroke="#F7941D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <h3 className="mb-2 text-2xl font-bold">Enquiry received</h3>
        <p className="text-ink-soft/80">
          Thank you — we&apos;ve got your details and will get back to you within one working day. A confirmation
          email is on its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
            Full name <span className="text-brand" aria-hidden>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
            Phone <span className="text-brand" aria-hidden>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 …"
            className="w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Email <span className="text-brand" aria-hidden>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold">
            Service needed
          </label>
          <select
            id="service"
            name="service"
            defaultValue={defaultService || serviceOptions[0]}
            className="w-full cursor-pointer rounded-lg border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25"
          >
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="property" className="mb-1.5 block text-sm font-semibold">
          Property details
        </label>
        <input
          id="property"
          name="property"
          type="text"
          placeholder="e.g. 2BHK apartment, Powai — possession next month"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
        <p className="mt-1.5 text-xs text-ink-soft/60">Configuration, locality, and anything you&apos;d like us to know.</p>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Describe your concern — a leak, an upcoming possession, a purchase decision…"
          className="w-full resize-y rounded-lg border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="cursor-pointer rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-[0_6px_20px_-6px_rgba(247,148,29,0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
      <p className="text-xs text-ink-soft/60">
        We use your details only to respond to this enquiry. No spam, no sharing.
      </p>
    </form>
  );
}
