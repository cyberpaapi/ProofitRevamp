import { readFile } from "node:fs/promises";
import { put } from "@vercel/blob";

const token = process.env.ADMIN_BLOB_READ_WRITE_TOKEN?.trim() || process.env.ADMIN_READ_WRITE_TOKEN?.trim();
if (!token) throw new Error("ADMIN_BLOB_READ_WRITE_TOKEN or ADMIN_READ_WRITE_TOKEN is not set.");

async function readJson(pathname, fallback) {
  try {
    return JSON.parse(await readFile(new URL(pathname, import.meta.url), "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJson(pathname, value) {
  await put(`proofit-admin/${pathname}`, JSON.stringify(value), {
    access: "private",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json; charset=utf-8",
  });
}

const store = await readJson("../data/admin-store.json", null);
if (store) {
  store.imageOverrides ||= {};
  await writeJson("store/admin-store.json", store);
  console.log("Uploaded the local admin store.");
}

const enquiries = await readJson("../data/enquiries.json", []);
for (const enquiry of enquiries) {
  if (!enquiry?.id || !enquiry?.receivedAt) continue;
  await writeJson(`enquiries/${enquiry.receivedAt}-${enquiry.id}.json`, enquiry);
}
console.log(`Uploaded ${enquiries.length} local enquiry record(s).`);
