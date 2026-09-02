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
    const saved = await writeAdminStore(body.store);
    return NextResponse.json({ ok: true, store: saved });
  } catch (error) {
    if (error instanceof StaleAdminStoreError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }
}
