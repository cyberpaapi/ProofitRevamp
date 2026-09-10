import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAdminStore, getEnquiries, listPublicImages, setEnquiryMeta, StaleAdminStoreError, writeAdminStore } from "@/lib/admin/store";
import type { AdminEnquiryMeta, AdminStore } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [store, enquiries, images] = await Promise.all([getAdminStore(), getEnquiries(), listPublicImages()]);
  return NextResponse.json({ store, enquiries, images });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: { store?: AdminStore; enquiry?: { id: string; meta: AdminEnquiryMeta } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (body.enquiry?.id && body.enquiry.meta) {
    await setEnquiryMeta(body.enquiry.id, body.enquiry.meta);
    return NextResponse.json({ ok: true, enquiries: await getEnquiries() });
  }
  if (!body.store || typeof body.store !== "object") {
    return NextResponse.json({ error: "Missing store data." }, { status: 400 });
  }
  try {
    const allowedImage = (value: string) => {
      if (typeof value !== "string") return false;
      if (/^\/images\/[A-Za-z0-9_./+()-]+\.(webp|png|jpe?g|avif|svg|gif)$/i.test(value) && !value.includes("..")) return true;
      try { const url = new URL(value); return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com"); } catch { return false; }
    };
    if (body.store.team?.some(item=> !item.name.trim() || !Number.isFinite(item.order) || (item.visible && !allowedImage(item.image)))) {
      return NextResponse.json({error:"Each team member needs a name and display order. Upload a team photo before making them visible."},{status:400});
    }
    if (body.store.offerings) {
      const slugs = new Set<string>();
      for (const item of body.store.offerings) {
        if (!["home-inspection","water-inspection","care-plus"].includes(item.category) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || !item.title.trim() || !Array.isArray(item.benefits) || !Number.isFinite(item.order)) {
          return NextResponse.json({error:"Each service needs a valid category, unique lowercase anchor, title, benefits list and display order."},{status:400});
        }
        if (slugs.has(item.slug)) return NextResponse.json({error:`Duplicate service anchor: ${item.slug}. Choose a unique anchor.`},{status:400});
        slugs.add(item.slug);
        if (item.visible && item.homepage && !allowedImage(item.image)) return NextResponse.json({error:`Upload a service image for ${item.title} before making it visible on the homepage.`},{status:400});
      }
    }
    for (const item of [...(body.store.posts || []).filter(item => item.published), ...(body.store.caseStudies || []).filter(item => item.published)]) {
      if (!allowedImage(item.image)) return NextResponse.json({ error: `Upload an image for "${item.title}" before publishing it.` }, { status: 400 });
    }
    for (const item of (body.store.testimonials || []).filter(item => item.visible)) {
      if (!allowedImage(item.image)) return NextResponse.json({ error: `Upload a customer portrait for "${item.name}" before making it visible.` }, { status: 400 });
    }
    if (body.store.contact) {
      body.store.contact.phones = body.store.contact.phones.map(item=>item.trim()).filter(Boolean);
      body.store.contact.email = body.store.contact.email.trim();
      if (!body.store.contact.phones.length || body.store.contact.phones.some(item=>!/^\+?[\d\s()-]{10,22}$/.test(item)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.store.contact.email)) {
        return NextResponse.json({error:"Enter at least one valid phone number with country code and a valid contact email."},{status:400});
      }
    }
    const saved = await writeAdminStore(body.store);
    return NextResponse.json({ ok: true, store: saved });
  } catch (error) {
    if (error instanceof StaleAdminStoreError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }
}
