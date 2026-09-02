import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { deletePublicMedia, mediaBlobToken, uploadPublicMedia } from "@/lib/admin/blob";
import { getAdminStore, updateAdminStore } from "@/lib/admin/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  const target = String(form.get("target") || "");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }
  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Images must be smaller than 4 MB." }, { status: 400 });
  }
  if (!/^\/images\/[A-Za-z0-9_./+()-]+\.(avif|gif|jpe?g|png|svg|webp)$/i.test(target) || target.includes("..")) {
    return NextResponse.json({ error: "Invalid image target." }, { status: 400 });
  }

  const publicRoot = path.resolve(process.cwd(), "public");
  const absolute = path.resolve(publicRoot, target.slice(1));
  if (!absolute.startsWith(`${publicRoot}${path.sep}`)) {
    return NextResponse.json({ error: "Invalid image path." }, { status: 400 });
  }
  const extension = path.extname(absolute).toLowerCase();
  const input = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  if (extension === ".svg" || extension === ".gif") {
    output = input;
  } else {
    let transformer = sharp(input).rotate();
    if (extension === ".webp") transformer = transformer.webp({ quality: 82, effort: 4 });
    else if (extension === ".avif") transformer = transformer.avif({ quality: 60, effort: 4 });
    else if (extension === ".png") transformer = transformer.png({ compressionLevel: 9 });
    else transformer = transformer.jpeg({ quality: 84, mozjpeg: true });
    output = await transformer.toBuffer();
  }

  if (mediaBlobToken()) {
    const previous = (await getAdminStore()).imageOverrides[target];
    const blob = await uploadPublicMedia(target, output, contentType(extension));
    if (!blob) return NextResponse.json({ error: "Media storage is not configured." }, { status: 503 });
    const modifiedAt = new Date().toISOString();
    try {
      await updateAdminStore((store) => ({
        ...store,
        imageOverrides: {
          ...store.imageOverrides,
          [target]: { url: blob.url, pathname: blob.pathname, size: output.length, modifiedAt },
        },
      }));
    } catch (error) {
      await deletePublicMedia(blob.url).catch(() => undefined);
      throw error;
    }
    if (previous?.url && previous.url !== blob.url) {
      await deletePublicMedia(previous.url).catch((error) => console.error("Could not remove replaced media blob", error));
    }
    return NextResponse.json({
      ok: true,
      image: { path: target, url: blob.url, size: output.length, modifiedAt, overridden: true },
    });
  }

  if (process.env.VERCEL) {
    return NextResponse.json({ error: "A public media Blob token is required on Vercel." }, { status: 503 });
  }
  await fs.mkdir(path.dirname(absolute), { recursive: true });
  await fs.writeFile(absolute, output);
  const stat = await fs.stat(absolute);
  return NextResponse.json({ ok: true, image: { path: target, size: stat.size, modifiedAt: stat.mtime.toISOString() } });
}

function contentType(extension: string) {
  const types: Record<string, string> = {
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  return types[extension] || "application/octet-stream";
}
