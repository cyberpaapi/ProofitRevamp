import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Home Care, Inspection & Waterproofing Insights",
  description:
    "Practical guides from Proofit's inspectors: monsoon-proofing, thermal imaging, possession snag lists, and early signs of hidden water damage.",
};

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Field notes from"
        accent="the inspectors."
        lede="What we learn inside Mumbai's homes, written up so you can use it — before you need us."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          <Reveal className="mb-12">
            <Link href={`/blog/${lead.slug}`} className="tile tile-hover group grid overflow-hidden lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{lead.tag}</span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="mb-3 text-sm text-ink-soft/60">
                  {fmt.format(new Date(lead.date))} · {lead.readMins} min read
                </p>
                <h2 className="mb-4 text-2xl font-bold leading-snug transition-colors group-hover:text-brand-deep md:text-3xl">
                  {lead.title}
                </h2>
                <p className="mb-6 leading-relaxed text-ink-soft/80">{lead.excerpt}</p>
                <p className="font-bold text-brand">
                  Read article <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link href={`/blog/${p.slug}`} className="tile tile-hover group block h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{p.tag}</span>
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs text-ink-soft/60">
                      {fmt.format(new Date(p.date))} · {p.readMins} min read
                    </p>
                    <h3 className="mb-2 font-bold leading-snug transition-colors group-hover:text-brand-deep">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft/70">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Reading about leaks won't fix yours." lede="Book a water inspection and get the source traced — non-destructively." />
    </>
  );
}
