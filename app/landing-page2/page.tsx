import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience";
import { CampaignFooter, CampaignHeader } from "@/components/CampaignChrome";
import LandingEnquiryPopup from "@/components/LandingEnquiryPopup";

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
      <CampaignFooter idPrefix="landing2-footer-enquiry" />
      <LandingEnquiryPopup />
    </>
  );
}
