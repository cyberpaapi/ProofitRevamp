"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LandingLeadForm from "@/components/LandingLeadForm";

export default function LandingEnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openedRef = useRef(false);

  useEffect(() => {
    const storageKey = `proofit-enquiry-popup:${pathname}`;
    if (sessionStorage.getItem(storageKey)) return;

    const show = () => {
      if (openedRef.current) return;
      openedRef.current = true;
      setOpen(true);
      sessionStorage.setItem(storageKey, "shown");
    };
    const timer = window.setTimeout(show, 22000);
    const exitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0 && event.relatedTarget === null) show();
    };
    document.addEventListener("mouseout", exitIntent);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", exitIntent);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close enquiry form"
          className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Before You Go</p>
        <h2 id="popup-title" className="mt-3 max-w-lg pr-12 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Let us recommend the right inspection.
        </h2>
        <p className="mb-7 mt-3 max-w-xl text-sm leading-relaxed text-ink-soft/65">
          Share the property details and concern. A Proofit team member will follow up within 24-48 hours.
        </p>
        <LandingLeadForm variant="popup" idPrefix={`popup-${pathname.replaceAll("/", "")}`} />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 h-11 w-full cursor-pointer rounded-full border border-ink/15 bg-white font-display text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Close
        </button>
      </div>
    </div>
  );
}
