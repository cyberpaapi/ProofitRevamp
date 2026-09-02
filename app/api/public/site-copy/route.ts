import { NextResponse } from "next/server";
import { getAdminStore } from "@/lib/admin/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const store = await getAdminStore();
  const imageOverrides = Object.fromEntries(
    Object.entries(store.imageOverrides).map(([path, image]) => [path, image.url]),
  );
  return NextResponse.json({
    siteCopy: store.siteCopy.filter((item) => item.enabled),
    proofySettings: store.proofySettings,
    imageOverrides,
  });
}
