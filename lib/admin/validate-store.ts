import type { AdminStore } from "./types";

export class InvalidAdminStoreError extends Error {}

/** Validate the final merged candidate as well as the submitted draft. */
export function validateAdminStore(store: AdminStore): void {
  const invalid = (message: string): never => { throw new InvalidAdminStoreError(message); };
  const allowedImage = (value: string) => {
    if (typeof value !== "string") return false;
    if (/^\/images\/[A-Za-z0-9_./+()-]+\.(webp|png|jpe?g|avif|svg|gif)$/i.test(value) && !value.includes("..")) return true;
    try { const url = new URL(value); return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com"); } catch { return false; }
  };
  if (store.team?.some(item => !item.name.trim() || !Number.isFinite(item.order) || (item.visible && !allowedImage(item.image)))) {
    invalid("Each team member needs a name and display order. Upload a team photo before making them visible.");
  }
  if (store.offerings) {
    const slugs = new Set<string>();
    for (const item of store.offerings) {
      if (!["home-inspection", "water-inspection", "care-plus"].includes(item.category) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || !item.title.trim() || !Array.isArray(item.benefits) || !Number.isFinite(item.order)) {
        invalid("Each service needs a valid category, unique lowercase anchor, title, benefits list and display order.");
      }
      if (slugs.has(item.slug)) invalid(`Duplicate service anchor: ${item.slug}. Choose a unique anchor.`);
      slugs.add(item.slug);
      if (item.visible && item.homepage && !allowedImage(item.image)) invalid(`Upload a service image for ${item.title} before making it visible on the homepage.`);
    }
  }
  for (const item of [...(store.posts || []).filter(item => item.published), ...(store.caseStudies || []).filter(item => item.published)]) {
    if (!allowedImage(item.image)) invalid(`Upload an image for "${item.title}" before publishing it.`);
  }
  for (const item of (store.testimonials || []).filter(item => item.visible)) {
    if (!allowedImage(item.image)) invalid(`Upload a customer portrait for "${item.name}" before making it visible.`);
  }
  if (store.contact) {
    store.contact.phones = store.contact.phones.map(item => item.trim()).filter(Boolean);
    store.contact.email = store.contact.email.trim();
    if (!store.contact.phones.length || store.contact.phones.some(item => !/^\+?[\d\s()-]{10,22}$/.test(item)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.contact.email)) {
      invalid("Enter at least one valid phone number with country code and a valid contact email.");
    }
  }
}
