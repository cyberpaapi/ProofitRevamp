import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { services, caseStudies, testimonials, posts, stats } from "@/lib/content";

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

const Check = ({ className = "", stroke = "#F7941D", size = 16 }: { className?: string; stroke?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M4 12.5 9.5 18 20 6.5" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HomePage() {
  const featured = caseStudies[1];

  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative">
        <div className="relative h-[92svh] min-h-[560px] w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
            aria-label="A smooth glide through a bright, sunlit apartment as a thermal heat-map briefly reveals hidden warmth inside a wall"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="scanline" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 pb-36 md:pb-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1
                className="hero-rise max-w-4xl text-4xl font-bold leading-[1.02] text-white sm:text-6xl xl:text-7xl"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                Your home has secrets.
                <br />
                <span className="text-brand">We find them first.</span>
              </h1>
              <p
                className="hero-rise mt-5 flex max-w-xl items-center gap-2 text-lg text-white/85"
                style={{ ["--rise-delay" as string]: "200ms" }}
              >
                <Check size={16} /> Moisture shows up on our screens months before it shows up on your ceiling.
              </p>
            </div>
          </div>
        </div>

        {/* Overlapping bento tile row */}
        <div className="relative z-10 mx-auto -mt-24 max-w-7xl px-4 sm:px-6 md:-mt-28 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/contact"
              className="hero-rise tile-orange tile-hover group relative flex min-h-44 flex-col justify-between overflow-hidden p-7"
              style={{ ["--rise-delay" as string]: "320ms" }}
            >
              <svg className="check-watermark -bottom-10 -right-10 h-44 w-44" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12.5 9.5 18 20 6.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="relative">
                <h2 className="text-3xl font-bold leading-tight">Book an Inspection</h2>
                <p className="mt-2 text-white/90">Fast. Thorough. Evidence-backed.</p>
              </div>
              <span className="relative mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-deep transition-transform duration-300 group-hover:translate-x-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <div className="hero-rise tile-black flex flex-col justify-between p-7" style={{ ["--rise-delay" as string]: "400ms" }}>
              <p className="font-display text-5xl font-bold text-brand">48hr</p>
              <p className="mt-3 text-white/80">Report turnaround — every finding photographed and thermally documented</p>
            </div>
            <div className="hero-rise tile flex flex-col justify-between p-7" style={{ ["--rise-delay" as string]: "480ms" }}>
              <Check size={40} stroke="#F7941D" />
              <p className="mt-3 font-semibold text-ink-soft">
                100% non-destructive — no broken tiles, no guesswork
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ MARQUEE ----------------------------- */}
      <div className="mt-16 overflow-hidden bg-ink py-5 md:mt-20" aria-hidden>
        <div className="marquee-track gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 font-display text-sm font-bold uppercase tracking-wider text-white/80">
              {item}
              <Check size={14} />
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------- STATS ------------------------------ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className={`${i % 2 ? "tile" : i === 0 ? "tile-orange" : "tile-black"} flex h-full flex-col justify-between p-7`}>
                <p className={`font-display text-4xl font-bold md:text-5xl ${i % 2 ? "text-brand" : i === 0 ? "text-white" : "text-brand"}`}>
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className={`mt-3 text-sm font-medium ${i % 2 ? "text-ink-soft/80" : "text-white/85"}`}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------- INTRO ------------------------------ */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal from="left" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/report-review-couple.webp"
                alt="A Proofit inspector walking a young couple through their snag report"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="tile-orange absolute -bottom-5 -right-3 px-6 py-4 shadow-xl sm:-right-5">
              <p className="font-display text-3xl font-bold">48 hrs</p>
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
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-7 grid grid-cols-2 gap-3">
              {["Independent & third-party", "Thermal + instrument led", "Reports builders act on", "Founded on Canadian training"].map((x) => (
                <p key={x} className="flex items-start gap-2 text-sm font-semibold">
                  <Check className="mt-0.5 shrink-0" />
                  {x}
                </p>
              ))}
            </Reveal>
            <Reveal delay={280} className="mt-8">
              <Link href="/about" className="link-underline font-bold text-brand-deep">
                Meet the founders →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------- SERVICES ----------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What we do" title="Three ways we protect" accent="your biggest asset." center />
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((s, i) => {
              const flavors = [
                { tile: "tile-orange", num: "text-white/40", text: "text-white/90", title: "text-white" },
                { tile: "tile-black", num: "text-brand", text: "text-white/80", title: "text-white" },
                { tile: "tile", num: "text-brand", text: "text-ink-soft/80", title: "text-ink" },
              ][i];
              return (
                <Reveal key={s.slug} delay={i * 110} className="h-full">
                  <Link href={`/services/${s.slug}`} className={`${flavors.tile} tile-hover group flex h-full flex-col overflow-hidden`}>
                    <div className="flex items-start justify-between p-7 pb-0">
                      <span className={`font-display text-6xl font-bold ${flavors.num}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-deep shadow transition-transform duration-300 group-hover:translate-x-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <div className="p-7 pt-4">
                      <h3 className={`text-2xl font-bold ${flavors.title}`}>{s.name}</h3>
                      <p className={`mt-2 text-sm leading-relaxed ${flavors.text}`}>{s.short}</p>
                    </div>
                    <div className="relative mt-auto aspect-[16/9] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------- WHAT WE FIND --------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="tile-black overflow-hidden p-7 md:p-12">
              <SectionHeading
                eyebrow="What we find"
                title="Small signals."
                accent="Big consequences."
                lede="These are the early warnings most people paint over. Our instruments read them for what they are — active problems getting more expensive by the month."
                dark
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { img: "/images/defect-damp-patch.webp", title: "Rising damp", desc: "Moisture climbing inside a wall — visible to thermal long before the stain spreads." },
                  { img: "/images/defect-paint-blister.webp", title: "Blistering paint", desc: "Trapped moisture pushing paint off the wall. The source is still active behind it." },
                  { img: "/images/defect-ceiling-stain.webp", title: "Ceiling rings", desc: "A slow leak from above — often two floors away from where it starts." },
                ].map((d, i) => (
                  <Reveal key={d.title} delay={i * 110} from="scale" className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
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
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ PROCESS ----------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our process" title="Booked to briefed" accent="in five steps." center />
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {homeProcess.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 90}
                as="li"
                className={`group h-full ${i === 4 ? "sm:col-span-2 lg:col-span-1 sm:mx-auto sm:w-1/2 lg:mx-0 lg:w-auto" : ""}`}
              >
                <div className="tile tile-hover flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-3 rounded-xl bg-brand px-2.5 py-1 font-display text-xl font-bold text-white" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
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
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal from="left">
              <div className="tile-orange relative flex h-full flex-col justify-between overflow-hidden p-8 md:p-12">
                <svg className="check-watermark -bottom-16 -right-16 h-72 w-72" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 12.5 9.5 18 20 6.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white">
                    Case study · {featured.location}
                  </span>
                  <h2 className="mt-5 text-3xl font-bold leading-[1.08] text-white md:text-4xl">{featured.title}</h2>
                  <p className="mt-4 leading-relaxed text-white/90">{featured.problem}</p>
                </div>
                <div className="relative mt-8 flex flex-wrap gap-4">
                  {featured.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-ink/25 px-5 py-3">
                      <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                      <p className="text-sm text-white/85">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="grid gap-4">
              <Reveal from="right" className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </Reveal>
              <Reveal delay={120}>
                <div className="tile flex items-center justify-between gap-6 p-7">
                  <p className="leading-relaxed text-ink-soft/85">{featured.approach}</p>
                  <Link
                    href="/case-studies"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform hover:translate-x-1.5"
                    aria-label="Read all case studies"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- TESTIMONIALS --------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What clients say" title="Reports that end" accent="arguments." center />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110} className="h-full">
                <div className="tile tile-hover flex h-full flex-col p-7">
                  <svg width="34" height="26" viewBox="0 0 32 24" fill="none" className="mb-4" aria-hidden>
                    <path d="M0 24V14.4C0 6.4 4.8 1.6 12.8 0l1.6 4c-4.8 1.6-7.2 4.27-7.2 8h6.4v12H0Zm18.4 0V14.4c0-8 4.8-12.8 12.8-14.4l1.6 4c-4.8 1.6-7.2 4.27-7.2 8H32v12H18.4Z" fill="#F7941D" fillOpacity="0.4" />
                  </svg>
                  <p className="flex-1 leading-relaxed text-ink-soft/90">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-line pt-4">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-ink-soft/60">{t.context}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CARE+ ------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="tile-black grid items-center gap-8 overflow-hidden lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <SectionHeading
                  eyebrow="Proofit Care+"
                  title="One monsoon-proof plan."
                  accent="Every year, handled."
                  lede="Annual scheduled inspections, thermal re-scans of known trouble spots, priority emergency visits and a running condition history of your home."
                  dark
                />
                <Link
                  href="/services/proofit-care-plus"
                  className="-mt-2 inline-block rounded-full bg-brand px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
                >
                  Explore Care+
                </Link>
              </div>
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[380px]">
                <Image
                  src="/images/careplus-rooftop.webp"
                  alt="Technician applying waterproof sealant on a rooftop terrace during an annual maintenance visit"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- BLOG ------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="From the blog" title="Know your home" accent="better." center />
          <div className="grid gap-4 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 110} className="h-full">
                <Link href={`/blog/${p.slug}`} className="tile tile-hover group flex h-full flex-col overflow-hidden">
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
