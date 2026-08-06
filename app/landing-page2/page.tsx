import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience";
import { CampaignFooter, CampaignHeader } from "@/components/CampaignChrome";
import LandingEnquiryPopup from "@/components/LandingEnquiryPopup";
import ScrollToEnquiryButton from "@/components/ScrollToEnquiryButton";

export const metadata: Metadata = {
  title: "AI-Led Home Health Assessment",
  description:
    "Technology-backed home inspections that uncover hidden property risks before they become expensive repairs.",
  robots: { index: false, follow: false },
};

export default function LandingPageTwo() {
  return (
    <>
      <CampaignHeader />
      <HomeExperience campaignMode />
      <section className="overflow-hidden bg-brand px-4 py-14 text-white sm:px-6 md:py-18 lg:px-8">
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-[28px] border border-white/20 bg-ink px-6 py-10 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.55)] sm:px-10 md:grid-cols-[1fr_auto] md:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[38px] border-brand/25" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Limited-period inspection offer
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Claim <span className="text-brand">₹1,000 off</span> your professional property inspection.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Get expert clarity on hidden defects, moisture, seepage, electrical concerns, and property risks while the offer is available.
            </p>
          </div>
          <div className="relative md:justify-self-end">
            <ScrollToEnquiryButton targetId="landing2-footer-enquiry" variant="orange">
              Claim ₹1,000 Off
            </ScrollToEnquiryButton>
          </div>
        </div>
      </section>
      <CampaignFooter idPrefix="landing2-footer-enquiry" />
      <LandingEnquiryPopup />
    </>
  );
}
