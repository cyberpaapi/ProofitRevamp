"use client";

import { useState } from "react";

const serviceOptions = [
  "New Flat Possession Inspection",
  "Resale Property Inspection",
  "Rental Move In / Move Out Inspection",
  "Water Leakage & Dampness Inspection",
  "Pre / Post Renovation Inspection",
  "Builder Quality Audit",
  "Proofit Care+ (Annual Plan)",
];

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-2.5 text-white placeholder-white/35 outline-none transition-colors focus:border-brand";

/** Ref-style minimal enquiry form for dark sections (underline inputs). */
export default function DarkEnquiryForm() {
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
      <div className="rounded-2xl border border-white/15 p-10 text-center" role="status">
        <svg className="draw-check mx-auto mb-5" width="64" height="64" viewBox="0 0 72 72" fill="none" aria-hidden>
          <circle cx="36" cy="36" r="34" stroke="#F7941D" strokeWidth="3" />
          <path d="M22 37 L32 47 L52 26" stroke="#F7941D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <h3 className="mb-2 font-display text-2xl font-semibold text-white">Enquiry received</h3>
        <p className="text-white/70">We&apos;ll get back to you within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cta-name" className="mb-1 block font-display text-sm font-semibold text-white">Name</label>
          <input id="cta-name" name="name" type="text" required autoComplete="name" placeholder="John Doe" className={field} />
        </div>
        <div>
          <label htmlFor="cta-email" className="mb-1 block font-display text-sm font-semibold text-white">Email</label>
          <input id="cta-email" name="email" type="email" required autoComplete="email" placeholder="johndoe@gmail.com" className={field} />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cta-phone" className="mb-1 block font-display text-sm font-semibold text-white">Phone</label>
          <input id="cta-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 9876543212" className={field} />
        </div>
        <div>
          <label htmlFor="cta-service" className="mb-1 block font-display text-sm font-semibold text-white">Service</label>
          <select id="cta-service" name="service" defaultValue={serviceOptions[0]} className={`${field} cursor-pointer [&>option]:text-ink`}>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cta-message" className="mb-1 block font-display text-sm font-semibold text-white">Message</label>
        <textarea id="cta-message" name="message" rows={2} placeholder="Description" className={`${field} resize-y`} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="max-w-sm text-xs leading-relaxed text-white/45">
          By proceeding, you are authorizing our representatives to get in touch with you through calls, SMS, or e-mail.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-11 shrink-0 cursor-pointer items-center self-center rounded-full bg-brand text-white transition-all hover:-translate-y-0.5 hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <span className="pl-5 font-display text-sm font-semibold">{status === "sending" ? "Sending…" : "Enquire Now"}</span>
          <span className="mx-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-deep transition-transform duration-300 group-hover:translate-x-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
