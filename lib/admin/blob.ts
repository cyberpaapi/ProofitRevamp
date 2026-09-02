import "server-only";

import { BlobPreconditionFailedError, del, get, list, put } from "@vercel/blob";

const privatePrefix = "proofit-admin/";

export function adminBlobToken() {
  return process.env.ADMIN_BLOB_READ_WRITE_TOKEN?.trim() || process.env.ADMIN_READ_WRITE_TOKEN?.trim() || "";
}

export function mediaBlobToken() {
  return (
    process.env.MEDIA_BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.MEDIA_READ_WRITE_TOKEN?.trim() ||
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    ""
  );
}

export function requireDurableStorage(kind: "admin" | "media") {
  const configured = kind === "admin" ? adminBlobToken() : mediaBlobToken();
  if (!configured && process.env.VERCEL) {
    throw new Error(
      `${kind === "admin" ? "ADMIN_BLOB_READ_WRITE_TOKEN or ADMIN_READ_WRITE_TOKEN" : "MEDIA_BLOB_READ_WRITE_TOKEN, MEDIA_READ_WRITE_TOKEN or BLOB_READ_WRITE_TOKEN"} is required on Vercel.`,
    );
  }
  return configured;
}

export function privatePath(pathname: string) {
  return `${privatePrefix}${pathname.replace(/^\/+/, "")}`;
}

export async function readPrivateJson<T>(pathname: string): Promise<T | null> {
  return (await readPrivateJsonRecord<T>(pathname))?.value || null;
}

export async function readPrivateJsonRecord<T>(pathname: string): Promise<{ value: T; etag: string } | null> {
  const token = adminBlobToken();
  if (!token) return null;
  const result = await get(privatePath(pathname), {
    access: "private",
    token,
    useCache: false,
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  return {
    value: JSON.parse(await new Response(result.stream).text()) as T,
    etag: result.blob.etag,
  };
}

export async function writePrivateJson(pathname: string, value: unknown, ifMatch?: string) {
  const token = requireDurableStorage("admin");
  if (!token) return null;
  return put(privatePath(pathname), JSON.stringify(value), {
    access: "private",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    ...(ifMatch ? { ifMatch } : {}),
    cacheControlMaxAge: 60,
    contentType: "application/json; charset=utf-8",
  });
}

export function isBlobConflict(error: unknown) {
  return error instanceof BlobPreconditionFailedError;
}

export async function listPrivateJson<T>(prefix: string): Promise<T[]> {
  const token = adminBlobToken();
  if (!token) return [];
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ token, prefix: privatePath(prefix), cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const records = await Promise.all(
    blobs.map(async (blob) => {
      try {
        return await readPrivateJson<T>(blob.pathname.slice(privatePrefix.length));
      } catch (error) {
        console.error(`[admin-blob] Could not read ${blob.pathname}`, error);
        return null;
      }
    }),
  );
  return records.filter((record) => record !== null) as T[];
}

export async function uploadPublicMedia(pathname: string, body: Buffer, contentType: string) {
  const token = requireDurableStorage("media");
  if (!token) return null;
  return put(`proofit-media/${pathname.replace(/^\/+/, "")}`, body, {
    access: "public",
    token,
    addRandomSuffix: true,
    cacheControlMaxAge: 31536000,
    contentType,
  });
}

export async function deletePublicMedia(url: string) {
  const token = mediaBlobToken();
  if (!token || !url) return;
  await del(url, { token });
}
