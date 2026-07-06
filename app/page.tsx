import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { services, caseStudies, testimonials, posts, stats } from "@/lib/content";
import { site } from "@/lib/site";

const homeProcess = [
  {
    title: "Book & brief",
    desc: "Tell us about the property and your concern.",
    image: "/images/process-1.webp",
  },
  {
    title: "On-site inspection",
    desc: "Our inspector works room by room through a structured, international-standard checklist.",
    image: "/images/process-2.webp",
  },
  {
    title: "Thermal & instrument scan",
    desc: "AI-enabled thermal imaging and calibrated moisture meters find what eyes can't: moisture inside walls, missing insulation, overheating circuits, concealed leak paths.",
    image: "/images/process-3.webp",
  },
  {
    title: "Evidence-backed report",
    desc: "Within 48 hours you receive a detailed snag report.",
    image: "/images/process-4.webp",
  },
  {
    title: "Walkthrough & next steps",
    desc: "We walk you through the findings, answer questions, and advise on rectification priorities.",
    image: "/images/process-5.webp",
  },
];

const marqueeItems = [
  "International inspection standards",
  "AI-enabled thermal imaging",
  "48-hour evidence-backed reports",
  "100% non-destructive methods",
  "Mumbai · Navi Mumbai · Thane",
  "Independent & third-party",
];

export default function HomePage() {
  const featured = caseStudies[1];

  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-40">
          <div>
            <p className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand" style={{ ["--rise-delay" as string]: "0ms" }}>
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand" aria-hidden />
              Residential inspection experts · {site.city}
            </p>
            <h1 className="hero-rise text-4xl font-bold leading-[1.08] sm:text-5xl xl:text-6xl" style={{ ["--rise-delay" as string]: "120ms" }}>
              Your home has secrets.
              <br />
              <span className="text-brand">We find them</span> before they cost you.
            </h1>
            <p className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-white/80" style={{ ["--rise-delay" as string]: "240ms" }}>
              Independent, evidence-backed inspections of flats, homes and villas — powered by AI-enabled thermal
              imaging and international standards, adapted to how India actually builds.
            </p>
            <div className="hero-rise mt-9 flex flex-wrap gap-4" style={{ ["--rise-delay" as string]: "360ms" }}>
              <Link
                href="/contact"
                className="rounded-full bg-brand px-8 py-4 font-bold text-white shadow-[0_10px_30px_-8px_rgba(247,148,29,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                Book an Inspection
              </Link>
              <Link
                href="/process"
                className="rounded-full border-2 border-white/25 px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
              >
                See How It Works
              </Link>
            </div>
          </div>

          <div className="hero-rise relative" style={{ ["--rise-delay" as string]: "300ms" }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/images/thermal-technician.webp"
                alt="Proofit technician scanning an interior wall with a thermal imaging camera"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="kenburns object-cover"
              />
              <div className="scanline" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
                <p className="text-sm font-semibold text-brand">Thermal imaging in action</p>
                <p className="text-sm text-white/80">Moisture shows up here months before it shows up on your ceiling.</p>
              </div>
            </div>
            {/* floating check card */}
            <div className="absolute -left-4 -top-5 hidden rounded-xl bg-white px-4 py-3 text-ink shadow-xl sm:block">
              <p className="flex items-center gap-2 text-sm font-bold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Non-destructive
              </p>
              <p className="text-xs text-ink-soft/70">No broken tiles. No guesswork.</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10 bg-ink-soft/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="text-center">
                <p className="font-display text-3xl font-bold text-brand md:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ MARQUEE ----------------------------- */}
      <div className="overflow-hidden border-b border-line bg-white py-4" aria-hidden>
        <div className="marquee-track gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 text-sm font-semibold uppercase tracking-wider text-ink-soft/60">
              {item}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------- INTRO ------------------------------ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal from="left" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/report-review-couple.webp"
                alt="A Proofit inspector walking a young couple through their snag report"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-xl bg-brand px-5 py-4 text-white shadow-xl sm:-right-6">
              <p className="font-display text-2xl font-bold">48 hrs</p>
              <p className="text-sm text-white/90">to your full report</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Why Proofit"
              title="A brochure shows the dream."
              accent="We show the building."
            />
            <Reveal delay={100} className="-mt-6 space-y-4 leading-relaxed text-ink-soft/85">
              <p>
                Proofit is a Mumbai-based home inspection company delivering international-standard inspections,
                inspired by North American methodology and adapted to Indian construction styles and apartment
                layouts.
              </p>
              <p>
                We go beyond surface-level checks: expert on-site evaluation combined with AI-enabled thermal imaging
                uncovers defects invisible to the naked eye — hidden dampness, faulty wiring, failed waterproofing.
                Every inspection ends in a detailed, photo- and thermal-backed report you can act on.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <Link href="/about" className="link-underline font-bold text-brand-deep">
                Meet the founders →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------- SERVICES ----------------------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Three ways we protect"
            accent="your biggest asset."
            center
          />
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 120} as="div">
                <Link
                  href={`/services/${s.slug}`}
                  className="card-lift group block h-full overflow-hidden rounded-2xl border border-line bg-paper"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-brand-deep">{s.name}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft/75">{s.short}</p>
                    <p className="mt-4 text-sm font-bold text-brand">
                      Explore <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- WHAT WE FIND --------------------------- */}
      <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 60% at 70% 10%, rgba(247,148,29,0.12), transparent 60%), radial-gradient(60% 50% at 10% 90%, rgba(247,148,29,0.07), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we find"
            title="Small signals."
            accent="Big consequences."
            lede="These are the early warnings most people paint over. Our instruments read them for what they are — active problems getting more expensive by the month."
            dark
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { img: "/images/defect-damp-patch.webp", title: "Rising damp", desc: "Moisture climbing inside a wall — visible to thermal long before the stain spreads." },
              { img: "/images/defect-paint-blister.webp", title: "Blistering paint", desc: "Trapped moisture pushing paint off the wall. The source is still active behind it." },
              { img: "/images/defect-ceiling-stain.webp", title: "Ceiling rings", desc: "A slow leak from above — often two floors away from where it starts." },
            ].map((d, i) => (
              <Reveal key={d.title} delay={i * 120} from="scale" className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={d.img}
                  alt={d.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-bold text-brand">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ PROCESS ----------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our process" title="Booked to briefed" accent="in five steps." center />
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {homeProcess.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 90}
                as="li"
                className={`group h-full ${i === 4 ? "sm:col-span-2 lg:col-span-1 sm:mx-auto sm:w-1/2 lg:mx-0 lg:w-auto" : ""}`}
              >
                <div className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden />
                    <span
                      className="absolute bottom-3 left-4 font-display text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      aria-hidden
                    >
                      <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    {i < 4 && (
                      <span
                        className="absolute right-3 top-3 hidden h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-deep shadow xl:flex"
                        aria-hidden
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1.5 font-bold leading-snug">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft/75">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 text-center">
            <Link href="/process" className="link-underline font-bold text-brand-deep">
              See the full process →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- CASE STUDY ---------------------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Case study"
              title={featured.title}
            />
            <Reveal delay={100} className="-mt-6 space-y-4 leading-relaxed text-ink-soft/85">
              <p>{featured.problem}</p>
              <p>{featured.approach}</p>
            </Reveal>
            <Reveal delay={200} className="mt-8 flex flex-wrap gap-8">
              {featured.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-bold text-brand">{s.value}</p>
                  <p className="text-sm text-ink-soft/70">{s.label}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={300} className="mt-8">
              <Link href="/case-studies" className="link-underline font-bold text-brand-deep">
                Read all case studies →
              </Link>
            </Reveal>
          </div>
          <Reveal from="right" className="order-1 lg:order-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- TESTIMONIALS --------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What clients say" title="Reports that end" accent="arguments." center />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120} className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-4" aria-hidden>
                  <path d="M0 24V14.4C0 6.4 4.8 1.6 12.8 0l1.6 4c-4.8 1.6-7.2 4.27-7.2 8h6.4v12H0Zm18.4 0V14.4c0-8 4.8-12.8 12.8-14.4l1.6 4c-4.8 1.6-7.2 4.27-7.2 8H32v12H18.4Z" fill="#F7941D" fillOpacity="0.35" />
                </svg>
                <p className="flex-1 leading-relaxed text-ink-soft/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-ink-soft/60">{t.context}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CARE+ ------------------------------- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 md:py-24">
          <div>
            <SectionHeading
              eyebrow="Proofit Care+"
              title="One monsoon-proof plan."
              accent="Every year, handled."
              lede="Annual scheduled inspections, thermal re-scans of known trouble spots, priority emergency visits and a running condition history of your home."
              dark
            />
            <Reveal delay={150} className="-mt-4">
              <Link
                href="/services/proofit-care-plus"
                className="inline-block rounded-full bg-brand px-8 py-4 font-bold text-white shadow-[0_10px_30px_-8px_rgba(247,148,29,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                Explore Care+
              </Link>
            </Reveal>
          </div>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/careplus-rooftop.webp"
                alt="Technician applying waterproof sealant on a rooftop terrace during an annual maintenance visit"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- BLOG ------------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="From the blog" title="Know your home" accent="better." center />
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link href={`/blog/${p.slug}`} className="card-lift group block h-full overflow-hidden rounded-2xl border border-line bg-white">
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
                    <h3 className="mb-2 font-bold leading-snug transition-colors group-hover:text-brand-deep">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft/70">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
