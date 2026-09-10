"use client";

import Image from "next/image";
import { createContext, useContext, useId, useRef, useState } from "react";

export const AdminUploadContext = createContext({
  busy: false,
  setUploading: (_uploading: boolean) => {},
  resolveImage: (value: string) => value,
});

/** Uploads a new asset without replacing any image used by another record. */
export default function AdminImageField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const picker = useRef<HTMLInputElement>(null);
  const { busy, setUploading, resolveImage } = useContext(AdminUploadContext);
  const [uploading, setLocalUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [failedImage, setFailedImage] = useState("");
  const [link, setLink] = useState(value);
  const source = resolveImage(value);

  async function upload(file?: File) {
    if (!file || busy) return;
    setError(""); setMessage("");
    if (!/^image\/(jpeg|png|webp|avif|gif)$/.test(file.type)) {
      setError("Choose a JPG, PNG, WebP, AVIF or GIF image."); return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("This image is over 4 MB. Export a smaller version and try again."); return;
    }
    setLocalUploading(true); setUploading(true);
    try {
      const form = new FormData(); form.set("file", file); form.set("mode", "new");
      const response = await fetch("/api/admin/upload", { method: "POST", body: form, signal: AbortSignal.timeout(60000) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Upload failed. Please try again.");
      const url = result.image?.url || result.image?.path;
      if (!url) throw new Error("The upload did not return an image. Please try again.");
      onChange(url); setLink(url); setFailedImage("");
      setMessage("Image uploaded and selected. Click Save changes to publish it.");
    } catch (error) {
      setError(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Upload timed out. Please try again.");
    } finally {
      setLocalUploading(false); setUploading(false);
      if (picker.current) picker.current.value = "";
    }
  }

  function applyLink() {
    const next = link.trim();
    let allowed = /^\/images\/[A-Za-z0-9_./+()-]+\.(webp|png|jpe?g|avif|svg|gif)$/i.test(next) && !next.includes("..");
    try { const url = new URL(next); allowed ||= url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com"); } catch { /* Local image path. */ }
    if (!allowed) {
      setError("Use a link from your Proofit media storage, or choose a file with Upload image."); return;
    }
    onChange(next); setError(""); setMessage("Image selected. Click Save changes to publish it.");
  }

  return <section aria-labelledby={`${id}-label`} aria-busy={uploading} className="min-w-0 rounded-2xl border border-black/15 bg-[#faf8f5] p-4">
    <h3 id={`${id}-label`} className="text-sm font-semibold">{label}</h3>
    <div className="mt-3 grid min-w-0 gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white p-3">
        {value && failedImage !== source ? <Image key={source} src={source} alt={`${label} preview`} fill sizes="160px" unoptimized className="object-contain p-2" onError={() => setFailedImage(source)} /> : <p className="text-center text-sm text-ink/65">{value ? "Preview unavailable. Choose a replacement below." : "No image selected yet"}</p>}
      </div>
      <div className="min-w-0 space-y-3">
        <p className="text-sm leading-relaxed text-ink/70">Choose an image from your device. We optimize it for faster loading and fill in the details for you.</p>
        <input ref={picker} id={`${id}-file`} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="sr-only" tabIndex={-1} aria-label={`Upload ${label.toLowerCase()}`} disabled={busy} onChange={event => { void upload(event.target.files?.[0]); event.target.value = ""; }} />
        <button type="button" disabled={busy} onClick={() => picker.current?.click()} className="min-h-11 cursor-pointer rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60">{uploading ? "Uploading and optimizing..." : value ? "Upload replacement" : "Upload image"}</button>
        <p id={`${id}-help`} className="text-xs leading-relaxed text-ink/65">JPG, PNG, WebP, AVIF or GIF. Up to 4 MB. The first frame of animated images is used. Uploads do not change the website until you save.</p>
      </div>
    </div>
    {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <p role="status" className="mt-3 text-sm text-green-800">{message}</p>
    <details className="mt-2 text-sm">
      <summary className="min-h-11 cursor-pointer py-3 text-ink/65">Already have an image link? (optional)</summary>
      <label htmlFor={`${id}-link`} className="block font-semibold">Image link</label>
      <div className="mt-2 flex flex-wrap gap-2">
        <input id={`${id}-link`} value={link} onChange={event => setLink(event.target.value)} disabled={busy} placeholder="https://..." className="min-h-11 min-w-0 flex-[1_1_180px] rounded-xl border border-black/15 bg-white px-3 text-base focus:outline-brand" />
        <button type="button" disabled={busy} onClick={applyLink} className="min-h-11 rounded-xl border border-black/20 px-4 font-semibold hover:border-brand">Use link</button>
      </div>
    </details>
  </section>;
}
