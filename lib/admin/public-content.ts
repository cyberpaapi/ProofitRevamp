import "server-only";

import { getAdminStore } from "@/lib/admin/store";
import { cache } from "react";
const getPublicStore = cache(getAdminStore);
import { site } from "@/lib/site";
import { offeringHref } from "./offering-seeds";
import type { ServiceSlide } from "@/components/ServicesCarousel";

export async function getPublicTeam() {
  return (await getPublicStore()).team.filter(item => item.visible).sort((a,b) => a.order-b.order);
}
export async function getPublicOfferings() {
  return (await getPublicStore()).offerings.filter(item => item.visible).sort((a,b) => a.order-b.order);
}
export async function getPublicServiceSlides(): Promise<ServiceSlide[]> {
  return (await getPublicOfferings()).filter(item => item.homepage).map(item => ({anchor:item.slug,title:item.title,desc:item.description,benefits:item.benefits,media:{type:"image",src:item.image},mediaAlt:item.title,href:offeringHref(item)}));
}
export async function getPublicSite() {
  const { contact } = await getPublicStore();
  const phones = contact.phones.filter(Boolean).map(label => ({label,href:`tel:+${label.replace(/\D/g,"")}`}));
  return {...site, phones:phones.length ? phones : site.phones, phone:phones[0]?.label || site.phone,phoneHref:phones[0]?.href || site.phoneHref,email:contact.email || site.email};
}

export async function getPublicPosts() {
  return (await getPublicStore()).posts.filter((item) => item.published).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublicCareers() {
  return (await getPublicStore()).careers.filter((item) => item.active).sort((a, b) => a.order - b.order);
}

export async function getPublicTestimonials() {
  return (await getPublicStore()).testimonials.filter((item) => item.visible).map(item => ({...item,organisation:item.organisation || (item.id === "testimonial-vikram-malhotra" ? "Pre-Renovation" : item.id === "testimonial-priya-nair" ? "Building Audit" : "")})).sort((a, b) => a.order - b.order);
}

export async function getPublicCaseStudies() {
  return (await getPublicStore()).caseStudies.filter((item) => item.published).sort((a, b) => a.order - b.order);
}
