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
      onClick={() => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        document.getElementById(targetId)?.scrollIntoView({ behavior, block: "center" });
      }}
      className={`group inline-flex h-11 cursor-pointer touch-manipulation items-center gap-2 rounded-full transition-[transform,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${colors} ${className}`}
    >
      <span className="whitespace-nowrap pl-5 font-display text-sm font-semibold">{children}</span>
      <span className="mx-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:translate-x-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
