"use client";

export default function ScrollToEnquiryButton({
  targetId,
  children,
  variant = "orange",
  className = "",
}: {
  targetId: string;
  children: React.ReactNode;
  variant?: "orange" | "dark" | "white";
  className?: string;
}) {
  const colors = {
    orange: "bg-brand text-white hover:bg-brand-deep",
    dark: "bg-ink text-white hover:bg-brand",
    white: "bg-white text-ink hover:bg-cream",
  }[variant];

  return (
    <button
      type="button"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "center" })}
      className={`group inline-flex h-11 cursor-pointer items-center gap-2 rounded-full transition-all hover:-translate-y-0.5 ${colors} ${className}`}
    >
      <span className="whitespace-nowrap pl-5 font-display text-sm font-semibold">{children}</span>
      <span className="mx-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
