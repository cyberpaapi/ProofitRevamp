import Reveal from "./Reveal";
import ArrowBtn from "./ArrowBtn";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  lede?: string;
};

export default function CtaBand({
  title = "Don't Just Buy a Home. PROOFIT.",
  lede = "Because ownership should begin with certainty, not surprises. An inspection today can prevent repair bills worth lakhs tomorrow.",
}: Props) {
  return (
    <section className="site-section site-container">
      <div className="flex w-full flex-col items-start gap-8 rounded-2xl border border-brand/40 bg-ink p-8 text-white sm:p-12 xl:flex-row xl:items-center xl:justify-between">
        <Reveal>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.12] md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-white/75">{lede}</p>
        </Reveal>
        <Reveal delay={150} className="flex shrink-0 flex-wrap gap-4">
          <ArrowBtn href="/contact" variant="white">
            Book an Inspection
          </ArrowBtn>
          <ArrowBtn href={site.whatsapp} external variant="ghost" className="border border-white/30">
            WhatsApp Us
          </ArrowBtn>
        </Reveal>
      </div>
    </section>
  );
}
