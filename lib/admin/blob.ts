import "server-only";

import { BlobError, BlobNotFoundError, BlobPreconditionFailedError, del, get, head, list, put } from "@vercel/blob";

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
  const result = await downloadPrivateJson<T>(pathname);
  return result?.value ?? null;
}

async function downloadPrivateJson<T>(pathname: string): Promise<{ value: T; etag: string } | null> {
  const token = adminBlobToken();
  if (!token) return null;
  const result = await get(privatePath(pathname), {
    access: "private",
    token,
    useCache: false,
    // Compressed delivery responses can have a weak/representation-specific ETag.
    headers: { "Accept-Encoding": "identity" },
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  return {
    value: JSON.parse(await new Response(result.stream).text()) as T,
    etag: result.blob.etag,
  };
}

export class BlobSnapshotConflict extends Error {
  constructor() {
    super("Blob content and storage metadata changed during the read.");
  }
}

export async function readPrivateJsonRecord<T>(pathname: string): Promise<{ value: T; etag: string } | null> {
  const token = adminBlobToken();
  if (!token) return null;
  let metadata;
  try {
    // head() uses the storage API, not the download CDN. Pass its canonical
    // ETag back to that same API for conditional writes.
    metadata = await head(privatePath(pathname), { token });
  } catch (error) {
    if (error instanceof BlobNotFoundError) return null;
    throw error;
  }
  const downloaded = await downloadPrivateJson<T>(pathname);
  const version = (etag: string) => etag.trim().replace(/^W\//, "");
  // Never attach a newer metadata version to stale content. Weak delivery
  // validators are used only for comparison, never sent as write validators.
  if (!downloaded || !metadata.etag || !downloaded.etag ||
      version(metadata.etag) !== version(downloaded.etag)) {
    throw new BlobSnapshotConflict();
  }
  return { value: downloaded.value, etag: metadata.etag };
}

export async function writePrivateJson(pathname: string, value: unknown, ifMatch?: string | null) {
  const token = requireDurableStorage("admin");
  if (!token) return null;
  try {
    return await put(privatePath(pathname), JSON.stringify(value), {
      access: "private",
      token,
      addRandomSuffix: false,
      // null means create-only; undefined is reserved for independent records.
      allowOverwrite: ifMatch !== null,
      ...(ifMatch ? { ifMatch } : {}),
      cacheControlMaxAge: 60,
      contentType: "application/json; charset=utf-8",
    });
  } catch (error) {
    if (ifMatch === null && error instanceof BlobError && /already exists/i.test(error.message)) {
      throw new BlobSnapshotConflict();
    }
    throw error;
  }
}

export function isBlobConflict(error: unknown) {
  return error instanceof BlobPreconditionFailedError || error instanceof BlobSnapshotConflict;
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
