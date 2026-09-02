import "server-only";

import { getAdminStore } from "@/lib/admin/store";

export async function getPublicPosts() {
  return (await getAdminStore()).posts.filter((item) => item.published).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublicCareers() {
  return (await getAdminStore()).careers.filter((item) => item.active).sort((a, b) => a.order - b.order);
}

export async function getPublicTestimonials() {
  return (await getAdminStore()).testimonials.filter((item) => item.visible).sort((a, b) => a.order - b.order);
}

export async function getPublicCaseStudies() {
  return (await getAdminStore()).caseStudies.filter((item) => item.published).sort((a, b) => a.order - b.order);
}
