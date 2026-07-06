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
    <section className="relative overflow-hidden bg-brand">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-ink/10"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20 lg:px-8">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-white/90">{lede}</p>
        </Reveal>
        <Reveal delay={150} className="flex shrink-0 flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-7 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book an Inspection
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
            className="rounded-full border-2 border-white/80 px-7 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-brand-deep"
          >
            WhatsApp Us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
