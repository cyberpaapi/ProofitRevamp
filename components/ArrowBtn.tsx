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
    white: "bg-white text-ink shadow-[0_4px_18px_rgba(17,17,18,0.18)] hover:bg-brand hover:text-white",
    dark: "bg-ink text-white ring-1 ring-transparent hover:bg-white hover:text-ink hover:ring-ink/15",
    ghost: "bg-transparent text-white hover:bg-white hover:text-ink",
    orange: "bg-brand text-white hover:bg-brand-deep",
  }[variant];

  const inner = (
    <>
      <span className="whitespace-nowrap pl-5 font-display text-sm font-semibold">{children}</span>
      <span className="mx-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white transition-[transform,background-color,color] duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-brand-deep">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  const cls = `group inline-flex h-11 cursor-pointer touch-manipulation items-center gap-2 rounded-full transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${shell} ${className}`;

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
