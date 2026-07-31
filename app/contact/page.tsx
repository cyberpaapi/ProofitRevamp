import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us - Book an Inspection",
  description:
    "Contact Proofit for expert property inspections and solutions Mumbai-wide, with neighbouring-city assignments available on request.",
};

const channels = [
  {
    label: "Call us",
    phones: site.phones,
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
        title="Ready to"
        accent="Proofit?"
        lede="From inspections to solutions, our experts are here to help every step of the way."
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
                  {"phones" in c ? (
                    <div className="tile flex items-start gap-4 p-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">{c.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-sm text-ink-soft/60">{c.label}</span>
                        <span className="mt-1 flex flex-wrap gap-x-2 gap-y-1 font-bold">
                          {c.phones!.map((phone, phoneIndex) => (
                            <span key={phone.href} className="inline-flex items-center gap-2">
                              {phoneIndex > 0 && <span className="text-ink-soft/35">/</span>}
                              <a href={phone.href} className="transition-colors hover:text-brand-deep">{phone.label}</a>
                            </span>
                          ))}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})} className="tile tile-hover flex items-center gap-4 p-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">{c.icon}</span>
                      <span>
                        <span className="block text-sm text-ink-soft/60">{c.label}</span>
                        <span className="font-bold">{c.value}</span>
                      </span>
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
            <Reveal delay={300} className="mt-8 tile-black p-7">
              <h3 className="mb-2 font-bold text-brand">Hours</h3>
              <p className="text-white/80">Monday - Saturday, 9:00 - 19:00 IST. Emergency leak calls answered on Sundays too.</p>
            </Reveal>
            <Reveal delay={360} className="mt-4">
              <a href="https://maps.app.goo.gl/xS3WCeqHxkms1j8q8?g_st=ic" target="_blank" rel="noopener" aria-label="Open Proofit in Google Maps for navigation" className="group relative block h-64 overflow-hidden rounded-2xl border border-line bg-cream shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <iframe
                  title="Proofit office location on Google Maps"
                  src="https://www.google.com/maps?q=Proofit,+Auto+Commerce+House+building,+Kennedy+Bridge,+Jyoti+Studio+Compound,+Grant+Road+(W),+Gamdevi,+Mumbai,+Maharashtra+400007&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none h-full w-full border-0"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-lg transition-colors group-hover:bg-brand-deep">Open in Google Maps</span>
              </a>
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
