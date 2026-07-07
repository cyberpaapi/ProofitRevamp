import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Book an Inspection",
  description:
    "Book a Proofit home or water inspection in Mumbai, Navi Mumbai or Thane. Call +91-9594013666, WhatsApp us, or send an enquiry — we respond the same day.",
};

const channels = [
  {
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: site.whatsapp,
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Same-day answers."
        accent="48-hour reports."
        lede={`Serving ${site.serviceArea}. Tell us what's worrying you about the property — we'll tell you honestly what an inspection can do about it.`}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Reach us directly</h2>
            </Reveal>
            <div className="space-y-4">
              {channels.map((c, i) => (
                <Reveal key={c.label} delay={i * 90}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                    className="tile tile-hover flex items-center gap-4 p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                      {c.icon}
                    </span>
                    <span>
                      <span className="block text-sm text-ink-soft/60">{c.label}</span>
                      <span className="font-bold">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300} className="mt-8 tile-black p-7">
              <h3 className="mb-2 font-bold text-brand">Service area</h3>
              <p className="text-white/80">
                {site.serviceArea}. Outside this area? Write to us — we take up select assignments.
              </p>
              <h3 className="mb-2 mt-5 font-bold text-brand">Hours</h3>
              <p className="text-white/80">Monday – Saturday, 9:00 – 19:00 IST. Emergency leak calls answered on Sundays too.</p>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Send an enquiry</h2>
            </Reveal>
            <Reveal delay={100}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
