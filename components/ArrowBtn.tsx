import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** white pill (ref default) | dark pill | ghost on dark */
  variant?: "white" | "dark" | "ghost" | "orange";
  external?: boolean;
  className?: string;
};

/** Signature ref button: pill label + orange circle with arrow. */
export default function ArrowBtn({ href, children, variant = "white", external, className = "" }: Props) {
  const shell = {
    white: "bg-white text-ink shadow-[0_4px_18px_rgba(17,17,18,0.18)]",
    dark: "bg-ink text-white",
    ghost: "bg-transparent text-white",
    orange: "bg-brand text-white",
  }[variant];

  const inner = (
    <>
      <span className="whitespace-nowrap pl-5 font-display text-sm font-semibold">{children}</span>
      <span className="mx-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-0.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  const cls = `group inline-flex h-11 cursor-pointer items-center gap-2 rounded-full transition-all hover:-translate-y-0.5 ${shell} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
