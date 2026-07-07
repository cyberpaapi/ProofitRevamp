import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  lede?: string;
};

export default function CtaBand({
  title = "Know before you sign, settle or renovate.",
  lede = "Book an inspection or send us your questions — we respond the same day.",
}: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="tile-orange relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-20">
            <svg
              className="check-watermark -right-16 -top-24 h-[420px] w-[420px] md:h-[560px] md:w-[560px]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path d="M4 12.5 9.5 18 20 6.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="max-w-xl text-3xl font-bold leading-[1.08] text-white md:text-5xl">{title}</h2>
                <p className="mt-4 max-w-xl text-lg text-white/90">{lede}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-ink px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Book an Inspection
                </Link>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full bg-white px-8 py-4 font-bold text-brand-deep transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
