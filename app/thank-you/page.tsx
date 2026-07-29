import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-dvh items-center justify-center bg-ink px-5 py-16 text-white">
      <div className="w-full max-w-2xl text-center">
        <Image
          src="/images/logo.svg"
          alt="Proofit"
          width={160}
          height={54}
          priority
          className="mx-auto h-auto w-[150px] brightness-0 invert"
        />
        <span className="mx-auto mt-12 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="m4 12.5 5 5L20 6.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-8 font-display text-5xl font-semibold sm:text-6xl">Thank You!</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Your enquiry has been successfully received. A member of the Proofit team will contact you within 24–48 hours.
        </p>
      </div>
    </section>
  );
}
