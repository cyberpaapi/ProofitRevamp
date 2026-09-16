import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAdminStore, getEnquiries, listPublicImages, setEnquiryMeta, StaleAdminStoreError, writeAdminStore } from "@/lib/admin/store";
import type { AdminEnquiryMeta, AdminStore } from "@/lib/admin/types";
import { AdminEditConflict } from "@/lib/admin/merge-store";

import { InvalidAdminStoreError, validateAdminStore } from "@/lib/admin/validate-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [store, enquiries, images] = await Promise.all([getAdminStore(), getEnquiries(), listPublicImages()]);
  return NextResponse.json({ store, enquiries, images });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: { store?: AdminStore; baseline?: AdminStore; enquiry?: { id: string; meta: AdminEnquiryMeta } };
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
    validateAdminStore(body.store);
    const saved = await writeAdminStore(body.store, body.baseline, validateAdminStore);
    return NextResponse.json({ ok: true, store: saved });
  } catch (error) {
    if (error instanceof InvalidAdminStoreError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof StaleAdminStoreError || error instanceof AdminEditConflict) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }
}
