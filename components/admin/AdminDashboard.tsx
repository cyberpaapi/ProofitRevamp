"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TeamPanel, OfferingsPanel, ContactSettingsPanel } from "./ContentManagementPanels";
import EnquiryImport from "./EnquiryImport";
import AdminImageField, { AdminUploadContext } from "./AdminImageField";
import type {
  AdminAppointment,
  AdminCaseStudy,
  AdminCareer,
  AdminEnquiryMeta,
  AdminPost,
  AdminStore,
  AdminTestimonial,
  ProofyConversation,
  SiteCopyOverride,
  StoredEnquiryRecord,
} from "@/lib/admin/types";

type AdminImage = { path: string; size: number; modifiedAt: string; url?: string; overridden?: boolean };
type SectionId = "overview" | "content" | "images" | "posts" | "careers" | "testimonials" | "cases" | "enquiries" | "proofy" | "appointments" | "team" | "services" | "contact";
type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "date" | "number" | "checkbox" | "image";
  placeholder?: string;
  rows?: number;
  read?: (item: any) => string | number | boolean;
  write?: (item: any, value: string | number | boolean) => any;
};

const navigation: { id: SectionId; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "content", label: "Site content", icon: "edit" },
  { id: "images", label: "Images", icon: "image" },
  { id: "team", label: "Founders & team", icon: "quote" },
  { id: "services", label: "Services", icon: "layers" },
  { id: "contact", label: "Contact details", icon: "edit" },
  { id: "posts", label: "Blogs", icon: "file" },
  { id: "careers", label: "Careers", icon: "briefcase" },
  { id: "testimonials", label: "Testimonials", icon: "quote" },
  { id: "cases", label: "Case studies", icon: "layers" },
  { id: "enquiries", label: "Enquiries", icon: "inbox" },
  { id: "proofy", label: "Proofy", icon: "message" },
  { id: "appointments", label: "Appointments", icon: "calendar" },
];

const fieldClass = "min-h-11 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[16px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function AdminDashboard({
  initialStore,
  initialEnquiries,
  initialImages,
}: {
  initialStore: AdminStore;
  initialEnquiries: StoredEnquiryRecord[];
  initialImages: AdminImage[];
}) {
  const router = useRouter();
  const [active, setActive] = useState<SectionId>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [store, setStore] = useState(initialStore);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [images, setImages] = useState(initialImages);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function save(nextStore = store) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store: nextStore }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not save changes.");
      setStore(result.store);
      setNotice("Changes saved.");
      window.setTimeout(() => setNotice(""), 3000);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function selectSection(id: SectionId) {
    setActive(id);
    setMenuOpen(false);
  }

  const unreadProofy = store.proofyConversations.filter((item) => !item.read).length;
  const upcoming = store.appointments.filter((item) => !["cancelled","completed"].includes(item.status) && item.date >= localDate(new Date())).length;
  const title = navigation.find((item) => item.id === active)?.label || "Admin";

  return (
    <AdminUploadContext.Provider value={{ busy: uploading || saving, setUploading, resolveImage: value => images.find(image => image.path === value)?.url || value }}>
    <div className="min-h-dvh bg-[#f4f1ec] text-ink">
      <aside className={`fixed inset-y-0 left-0 z-[120] flex w-[278px] flex-col bg-[#111214] text-white transition-transform duration-200 lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[76px] items-center border-b border-white/10 px-6">
          <Image src="/images/logo.svg" alt="Proofit" width={647} height={218} className="h-auto w-36 brightness-0 invert" priority />
          <span className="ml-3 rounded-full bg-brand px-2 py-1 text-[10px] font-bold uppercase tracking-wider">Admin</span>
        </div>
        <fieldset disabled={uploading || saving} className="contents"><nav className="proofy-scrollbar flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin sections">
          {navigation.map((item) => (
            <button key={item.id} type="button" onClick={() => selectSection(item.id)} className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 text-left text-sm font-semibold transition ${active === item.id ? "bg-brand text-white" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
              <AdminIcon name={item.icon} />
              <span className="flex-1">{item.label}</span>
              {item.id === "proofy" && unreadProofy > 0 && <span className="min-w-6 rounded-full bg-white px-1.5 py-0.5 text-center text-[11px] text-ink">{unreadProofy}</span>}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <a href="/" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white"><AdminIcon name="external" />View website</a>
          <button type="button" onClick={logout} className="mt-1 flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white"><AdminIcon name="logout" />Sign out</button>
        </div>
        </fieldset>
      </aside>
      {menuOpen && <button className="fixed inset-0 z-[110] cursor-default bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <div className="lg:pl-[278px]">
        <header className="sticky top-0 z-[90] flex h-[76px] items-center gap-3 border-b border-black/10 bg-[#f4f1ec]/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button type="button" onClick={() => setMenuOpen(true)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white lg:hidden" aria-label="Open navigation"><AdminIcon name="menu" /></button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand">Proofit workspace</p>
            <h1 className="truncate font-display text-xl font-semibold sm:text-2xl">{title}</h1>
          </div>
          <div aria-live="polite" className="hidden text-sm font-semibold sm:block">{notice && <span className="text-green-700">{notice}</span>}{error && <span className="text-red-700">{error}</span>}</div>
          <button type="button" onClick={() => void save()} disabled={saving || uploading} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-ink px-4 font-display text-sm font-semibold text-white transition hover:bg-brand disabled:cursor-wait disabled:opacity-60"><AdminIcon name="save" />{uploading ? "Uploading..." : saving ? "Saving..." : "Save changes"}</button>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          <fieldset disabled={uploading || saving} className="min-w-0">
          {(notice || error) && <div aria-live="polite" className={`mb-4 rounded-xl p-3 text-sm font-semibold sm:hidden ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{error || notice}</div>}
          {active === "overview" && <Overview store={store} enquiries={enquiries} upcoming={upcoming} unreadProofy={unreadProofy} onNavigate={selectSection} />}
          {active === "content" && <SiteContentPanel items={store.siteCopy} onChange={(siteCopy) => setStore({ ...store, siteCopy })} />}
          {active === "images" && <ImagesPanel images={images} setImages={setImages} updatedAt={store.updatedAt} onReplaced={(path, override, updatedAt) => setStore(previous => ({ ...previous, ...(updatedAt ? { updatedAt } : {}), imageOverrides: { ...previous.imageOverrides, [path]: override } }))} />}
          {active === "team" && <TeamPanel items={store.team} onChange={team => setStore({...store,team})} />}
          {active === "services" && <OfferingsPanel items={store.offerings} onChange={offerings => setStore({...store,offerings})} />}
          {active === "contact" && <ContactSettingsPanel value={store.contact} onChange={contact => setStore({...store,contact})} />}
          {active === "enquiries" && <EnquiryImport onImported={setEnquiries} />}
          {active === "posts" && <PostsPanel items={store.posts} onChange={(posts) => setStore({ ...store, posts })} />}
          {active === "careers" && <CareersPanel items={store.careers} onChange={(careers) => setStore({ ...store, careers })} />}
          {active === "testimonials" && <TestimonialsPanel items={store.testimonials} onChange={(testimonials) => setStore({ ...store, testimonials })} />}
          {active === "cases" && <CaseStudiesPanel items={store.caseStudies} onChange={(caseStudies) => setStore({ ...store, caseStudies })} />}
          {active === "enquiries" && <EnquiriesPanel enquiries={enquiries} setEnquiries={setEnquiries} />}
          {active === "proofy" && <ProofyPanel store={store} onChange={setStore} />}
          {active === "appointments" && <AppointmentsPanel items={store.appointments} onChange={(appointments) => setStore({ ...store, appointments })} />}
          </fieldset>
        </main>
      </div>
    </div>
    </AdminUploadContext.Provider>
  );
}

function Overview({ store, enquiries, upcoming, unreadProofy, onNavigate }: { store: AdminStore; enquiries: StoredEnquiryRecord[]; upcoming: number; unreadProofy: number; onNavigate: (id: SectionId) => void }) {
  const cards: { label: string; value: number; section: SectionId; hint: string }[] = [
    { label: "Enquiries", value: enquiries.length, section: "enquiries", hint: `${enquiries.filter((item) => item.status === "new").length} new` },
    { label: "Proofy chats", value: store.proofyConversations.length, section: "proofy", hint: `${unreadProofy} unread` },
    { label: "Appointments", value: store.appointments.length, section: "appointments", hint: `${upcoming} upcoming` },
    { label: "Published blogs", value: store.posts.filter((item) => item.published).length, section: "posts", hint: `${store.posts.length} total` },
  ];
  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-[24px] bg-ink p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Content and operations</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl">Everything important, without touching the website code.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">Manage Proofit's content, website images, enquiries, conversations and inspection appointments from this local workspace.</p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <button type="button" key={card.label} onClick={() => onNavigate(card.section)} className="group min-h-36 cursor-pointer rounded-2xl border border-black/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md"><p className="text-sm font-semibold text-ink/55">{card.label}</p><p className="mt-3 font-display text-4xl font-semibold">{card.value}</p><p className="mt-2 text-xs font-semibold text-brand-deep">{card.hint}</p></button>)}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Inspection status" subtitle="Upcoming visits and recently completed inspections">
          <div className="space-y-3">{[...store.appointments].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6).map(item=><button type="button" onClick={()=>onNavigate("appointments")} key={item.id} className="flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border border-line p-3 text-left text-sm"><span><strong>{item.name || "Untitled"}</strong><span className="block text-xs">{item.date} · {item.time}</span></span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status==="completed"?"bg-green-100 text-green-800":item.status==="cancelled"?"bg-red-100 text-red-800":item.status==="confirmed"?"bg-blue-100 text-blue-800":"bg-amber-100 text-amber-900"}`}>{item.status==="scheduled"?"Pending":capitalise(item.status)}</span></button>)}{!store.appointments.length&&<p className="text-sm text-ink/60">No appointments yet.</p>}</div>
        </Panel>
        <Panel title="Content inventory" subtitle="Published website content">
          <div className="grid grid-cols-2 gap-3">
            {[["Blogs", store.posts.length], ["Careers", store.careers.length], ["Testimonials", store.testimonials.length], ["Case studies", store.caseStudies.length]].map(([label, value]) => <div key={String(label)} className="rounded-xl bg-[#f5f2ed] p-4"><p className="text-xs font-semibold text-ink/50">{label}</p><p className="mt-1 font-display text-2xl font-semibold">{value}</p></div>)}
          </div>
        </Panel>
        <Panel title="Quick actions" subtitle="Common admin tasks">
          <div className="grid gap-2 sm:grid-cols-2">
            {[{ id: "posts", label: "Create a blog" }, { id: "images", label: "Replace an image" }, { id: "appointments", label: "Add appointment" }, { id: "content", label: "Edit site copy" }].map((action) => <button type="button" key={action.id} onClick={() => onNavigate(action.id as SectionId)} className="min-h-12 cursor-pointer rounded-xl border border-black/10 px-4 text-left text-sm font-semibold transition hover:border-brand hover:bg-brand/[.06]">{action.label}</button>)}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function SiteContentPanel({ items, onChange }: { items: SiteCopyOverride[]; onChange: (items: SiteCopyOverride[]) => void }) {
  const [selected, setSelected] = useState(items[0]?.id || "");
  const current = items.find((item) => item.id === selected);
  function add() {
    const item: SiteCopyOverride = { id: crypto.randomUUID(), page: "*", original: "", replacement: "", enabled: true };
    onChange([...items, item]); setSelected(item.id);
  }
  function update(patch: Partial<SiteCopyOverride>) { onChange(items.map((item) => item.id === selected ? { ...item, ...patch } : item)); }
  function remove() { if (!current || !window.confirm("Delete this content override?")) return; onChange(items.filter((item) => item.id !== current.id)); setSelected(""); }
  return <SplitPanel title="Site-wide content" subtitle="Replace visible wording without changing layout. Use * for every page, or enter a path such as /about." action={<PrimaryButton onClick={add}>Add override</PrimaryButton>} list={<>{items.length === 0 && <EmptyState title="No content overrides" text="Add an override using the exact wording currently visible on the website." />}{items.map((item) => <ListButton key={item.id} active={item.id === selected} onClick={() => setSelected(item.id)} title={item.replacement || item.original || "Untitled override"} subtitle={item.page === "*" ? "All pages" : item.page} />)}</>} editor={current ? <div className="space-y-4"><FieldLabel label="Page path"><input className={fieldClass} value={current.page} onChange={(e) => update({ page: e.target.value })} placeholder="* or /about" /></FieldLabel><FieldLabel label="Current visible text"><textarea className={fieldClass} rows={5} value={current.original} onChange={(e) => update({ original: e.target.value })} placeholder="Paste the exact current text" /></FieldLabel><FieldLabel label="Replacement text"><textarea className={fieldClass} rows={5} value={current.replacement} onChange={(e) => update({ replacement: e.target.value })} placeholder="Enter the new wording" /></FieldLabel><label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-black/10 px-4"><input type="checkbox" checked={current.enabled} onChange={(e) => update({ enabled: e.target.checked })} className="h-5 w-5 accent-brand" /><span className="text-sm font-semibold">Enabled</span></label><DangerButton onClick={remove}>Delete override</DangerButton></div> : <EmptyState title="Select an override" text="Choose an item or create a new content override." />} />;
}

function ImagesPanel({ images, setImages, onReplaced, updatedAt }: { updatedAt: string; images: AdminImage[]; setImages: (items: AdminImage[]) => void; onReplaced: (path: string, override: AdminStore["imageOverrides"][string], updatedAt?: string) => void }) {
  const uploadContext = useContext(AdminUploadContext);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(images[0]?.path || "");
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const filtered = images.filter((item) => item.path.toLowerCase().includes(search.toLowerCase()));
  const current = images.find((item) => item.path === selected);
  async function upload(event: FormEvent) {
    event.preventDefault(); if (!file || !current) return;
    setUploading(true); uploadContext.setUploading(true); setMessage("");
    try {
    const form = new FormData(); form.set("file", file); form.set("target", current.path); form.set("updatedAt", updatedAt);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Upload failed. Please try again.");
    setImages(images.map((item) => item.path === result.image.path ? result.image : item));
    if (result.override) onReplaced(result.image.path, result.override, result.updatedAt);
    setFile(undefined); setMessage("Image replaced and optimized. This change is already live wherever this image is used.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false); uploadContext.setUploading(false);
    }
  }
  return <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]"><Panel title="Website images" subtitle={`${images.length} image assets`} action={<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images" className={`${fieldClass} max-w-64`} />}><div className="grid max-h-[72dvh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">{filtered.map((item) => <button type="button" key={item.path} onClick={() => { setSelected(item.path); setMessage(""); }} className={`group cursor-pointer overflow-hidden rounded-xl border bg-[#eeeae4] text-left ${selected === item.path ? "border-brand ring-2 ring-brand/20" : "border-black/10 hover:border-brand/50"}`}><div className="relative aspect-square"><Image src={item.url || `${item.path}?v=${encodeURIComponent(item.modifiedAt)}`} alt="" fill sizes="180px" className="object-contain p-2" unoptimized /></div><p className="truncate border-t border-black/10 bg-white px-2 py-2 text-[11px] font-semibold" title={item.path}>{item.path.split("/").pop()}{item.overridden ? " · replaced" : ""}</p></button>)}</div></Panel><Panel title="Replace image" subtitle="Select a thumbnail, then choose a replacement from your device. This updates every page using that image immediately. For a new blog, service or review, upload inside its editor instead.">{current ? <form onSubmit={upload} className="space-y-4"><div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#eeeae4]"><Image src={current.url || `${current.path}?v=${encodeURIComponent(current.modifiedAt)}`} alt="Selected website asset" fill sizes="380px" className="object-contain p-3" unoptimized /></div><p className="break-all rounded-xl bg-[#f5f2ed] p-3 text-xs font-semibold">{current.path}</p><p className="text-xs text-ink/55">Current size: {formatBytes(current.size)}{current.overridden ? " · Stored in Vercel Blob" : ""}</p><FieldLabel label="Replacement file"><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} className="block w-full cursor-pointer rounded-xl border border-black/15 bg-white p-2 text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:font-semibold file:text-white" /></FieldLabel><p className="text-xs leading-relaxed text-ink/50">Uploads are optimized and must be under 4 MB.</p>{message && <p className="rounded-xl bg-brand/[.08] p-3 text-sm font-semibold">{message}</p>}<button disabled={!file || uploading} className="min-h-11 w-full cursor-pointer rounded-xl bg-ink px-4 text-sm font-semibold text-white hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40">{uploading ? "Optimizing..." : "Replace image"}</button></form> : <EmptyState title="Select an image" text="Choose an asset from the library." />}</Panel></div>;
}

function PostsPanel({ items, onChange }: { items: AdminPost[]; onChange: (items: AdminPost[]) => void }) {
  const fields: Field[] = [
    { key: "title", label: "Title" }, { key: "slug", label: "URL slug" }, { key: "excerpt", label: "Excerpt", type: "textarea", rows: 3 },
    { key: "date", label: "Publication date", type: "date" }, { key: "readMins", label: "Read time (minutes)", type: "number" }, { key: "tag", label: "Category" },
    { key: "image", label: "Featured image", type: "image" },
    { key: "bodyText", label: "Article body", type: "textarea", rows: 14, read: (item) => blocksToText(item.body), write: (item, value) => ({ ...item, body: textToBlocks(String(value)) }) },
    { key: "published", label: "Published", type: "checkbox" },
  ];
  const create = (): AdminPost => ({ id: crypto.randomUUID(), slug: "new-article", title: "New article", excerpt: "", date: localDate(new Date()), readMins: 5, image: "", tag: "Insights", body: [{ p: "Start writing here." }], published: false });
  return <CollectionPanel title="Blogs" subtitle="Create, edit, publish or remove articles." items={items} onChange={onChange} createItem={create} titleKey="title" subtitleKey="tag" fields={fields} />;
}

function CareersPanel({ items, onChange }: { items: AdminCareer[]; onChange: (items: AdminCareer[]) => void }) {
  const fields: Field[] = [{ key: "title", label: "Job title" }, { key: "type", label: "Location and employment type" }, { key: "desc", label: "Description, responsibilities and requirements", type: "textarea", rows: 10 }, { key: "order", label: "Display order", type: "number" }, { key: "active", label: "Role is open", type: "checkbox" }];
  const create = (): AdminCareer => ({ id: crypto.randomUUID(), title: "New role", type: "Full-time · Mumbai", desc: "", active: false, order: items.length });
  return <CollectionPanel title="Careers" subtitle="Manage open and closed roles." items={items} onChange={onChange} createItem={create} titleKey="title" subtitleKey="type" fields={fields} />;
}

function TestimonialsPanel({ items, onChange }: { items: AdminTestimonial[]; onChange: (items: AdminTestimonial[]) => void }) {
  const fields: Field[] = [{ key: "name", label: "Name" }, { key: "author", label: "Designation" }, { key: "organisation", label: "Organisation / context" }, { key: "image", label: "Customer portrait", type: "image" }, { key: "quote", label: "Testimonial", type: "textarea", rows: 10 }, { key: "order", label: "Display order", type: "number" }, { key: "visible", label: "Visible on website", type: "checkbox" }];
  const create = (): AdminTestimonial => ({ id: crypto.randomUUID(), name: "New customer", image: "", quote: "", author: "", organisation: "", visible: false, order: items.length });
  return <CollectionPanel title="Testimonials" subtitle="Manage reviews and customer portraits." items={items} onChange={onChange} createItem={create} titleKey="name" subtitleKey="author" fields={fields} />;
}

function CaseStudiesPanel({ items, onChange }: { items: AdminCaseStudy[]; onChange: (items: AdminCaseStudy[]) => void }) {
  const fields: Field[] = [{ key: "title", label: "Title" }, { key: "slug", label: "URL slug" }, { key: "location", label: "Location" }, { key: "service", label: "Service" }, { key: "image", label: "Cover image", type: "image" }, { key: "problem", label: "The problem", type: "textarea", rows: 5 }, { key: "approach", label: "What we did", type: "textarea", rows: 5 }, { key: "outcome", label: "The outcome", type: "textarea", rows: 5 }, { key: "statsText", label: "Statistics (one Label :: Value per line)", type: "textarea", rows: 5, read: (item) => item.stats.map((stat: any) => `${stat.label} :: ${stat.value}`).join("\n"), write: (item, value) => ({ ...item, stats: String(value).split("\n").filter(Boolean).map((line) => { const [label, ...valueParts] = line.split("::"); return { label: label.trim(), value: valueParts.join("::").trim() }; }) }) }, { key: "order", label: "Display order", type: "number" }, { key: "published", label: "Published", type: "checkbox" }];
  const create = (): AdminCaseStudy => ({ id: crypto.randomUUID(), slug: "new-case-study", title: "New case study", location: "Mumbai", service: "Home Inspection", image: "", problem: "", approach: "", outcome: "", stats: [], published: false, order: items.length });
  return <CollectionPanel title="Case studies" subtitle="Create and publish inspection outcomes." items={items} onChange={onChange} createItem={create} titleKey="title" subtitleKey="location" fields={fields} />;
}

function CollectionPanel<T extends { id: string }>({ title, subtitle, items, onChange, createItem, titleKey, subtitleKey, fields }: { title: string; subtitle: string; items: T[]; onChange: (items: T[]) => void; createItem: () => T; titleKey: keyof T; subtitleKey: keyof T; fields: Field[] }) {
  const [selected, setSelected] = useState(items[0]?.id || "");
  const current = items.find((item) => item.id === selected) as any;
  function add() { const item = createItem(); onChange([...items, item]); setSelected(item.id); }
  function update(field: Field, value: string | number | boolean) { onChange(items.map((item) => item.id === selected ? (field.write ? field.write(item, value) : { ...item, [field.key]: value }) : item)); }
  function remove() { if (!current || !window.confirm(`Delete ${String(current[titleKey])}?`)) return; onChange(items.filter((item) => item.id !== selected)); setSelected(""); }
  return <SplitPanel title={title} subtitle={`${subtitle} Changes publish when you click Save changes.`} action={<PrimaryButton onClick={add}>Add new</PrimaryButton>} list={<>{items.length === 0 && <EmptyState title={`No ${title.toLowerCase()}`} text="Create the first item." />}{[...items].sort((a: any, b: any) => Number(a.order || 0) - Number(b.order || 0)).map((item: any) => <ListButton key={item.id} active={item.id === selected} onClick={() => setSelected(item.id)} title={String(item[titleKey] || "Untitled")} subtitle={String(item[subtitleKey] || "")} badge={("published" in item ? item.published : "active" in item ? item.active : "visible" in item ? item.visible : true) ? "Live" : "Hidden"} />)}</>} editor={current ? <div className="space-y-4">{fields.map((field) => { const value = field.read ? field.read(current) : current[field.key]; if (field.type === "image") return <AdminImageField key={`${current.id}-${field.key}`} label={field.label} value={String(value || "")} onChange={value => update(field, value)} />; if (field.type === "checkbox") return <label key={field.key} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-black/10 px-4"><input type="checkbox" checked={Boolean(value)} onChange={(e) => update(field, e.target.checked)} className="h-5 w-5 accent-brand" /><span className="text-sm font-semibold">{field.label}</span></label>; if (field.type === "textarea") return <FieldLabel key={field.key} label={field.label}><textarea rows={field.rows || 5} className={fieldClass} value={String(value ?? "")} onChange={(e) => update(field, e.target.value)} placeholder={field.placeholder} /></FieldLabel>; return <FieldLabel key={field.key} label={field.label}><input type={field.type || "text"} className={fieldClass} value={String(value ?? "")} onChange={(e) => update(field, field.type === "number" ? Number(e.target.value) : e.target.value)} placeholder={field.placeholder} /></FieldLabel>; })}<DangerButton onClick={remove}>Delete permanently</DangerButton></div> : <EmptyState title="Select an item" text="Choose an item from the list or create a new one." />} />;
}

function EnquiriesPanel({ enquiries, setEnquiries }: { enquiries: StoredEnquiryRecord[]; setEnquiries: (items: StoredEnquiryRecord[]) => void }) {
  const [source, setSource] = useState("all"); const [search, setSearch] = useState(""); const [status, setStatus] = useState("all"); const [selected, setSelected] = useState(enquiries[0]?.id || ""); const [saving, setSaving] = useState(false);
  const filtered = enquiries.filter((item) => (source === "all" || (source === "landing" ? /landing/i.test(item.source || "") : source === "proofy" ? /proofy/i.test(item.source || "") : !/landing|proofy/i.test(item.source || ""))) && (status === "all" || item.status === status) && `${item.name} ${item.email} ${item.phone} ${item.service}`.toLowerCase().includes(search.toLowerCase()));
  const current = enquiries.find((item) => item.id === selected);
  function patch(values: Partial<StoredEnquiryRecord>) { setEnquiries(enquiries.map((item) => item.id === selected ? { ...item, ...values } : item)); }
  async function saveMeta() { if (!current) return; setSaving(true); const meta: AdminEnquiryMeta = { status: current.status || "new", assignee: current.assignee || "", notes: current.notes || "", source: current.source || "Website enquiry form" }; const response = await fetch("/api/admin/data", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ enquiry: { id: current.id, meta } }) }); const result = await response.json().catch(() => ({})); if (response.ok && result.enquiries) setEnquiries(result.enquiries); setSaving(false); }
  function exportCsv() { const headers = ["Received", "Name", "Email", "Phone", "Service", "Property", "Status", "Source", "Message"]; const rows = filtered.map((item) => [item.receivedAt, item.name, item.email, item.phone, item.service, item.property, item.status || "new", item.source || "", item.message]); const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"); const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); link.download = `proofit-enquiries-${localDate(new Date())}.csv`; link.click(); URL.revokeObjectURL(link.href); }
  return <SplitPanel title="Forms and enquiries" subtitle={`${filtered.length} submissions shown`} action={<button onClick={exportCsv} className="min-h-11 cursor-pointer rounded-xl border border-black/15 bg-white px-4 text-sm font-semibold hover:border-brand">Export CSV</button>} filters={<div className="grid gap-2 sm:grid-cols-3"><select aria-label="Enquiry source" className={fieldClass} value={source} onChange={e=>setSource(e.target.value)}><option value="all">All sources</option><option value="landing">Landing pages</option><option value="website">Website</option><option value="proofy">Proofy</option></select><input className={fieldClass} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search enquiries" /><select className={fieldClass} value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All statuses</option>{["new", "contacted", "qualified", "closed", "spam"].map((value) => <option key={value} value={value}>{capitalise(value)}</option>)}</select></div>} list={<>{filtered.length === 0 && <EmptyState title="No enquiries found" text="Try changing the filters." />}{filtered.map((item) => <ListButton key={item.id} active={item.id === selected} onClick={() => setSelected(item.id)} title={item.name} subtitle={`${item.service || "General"} · ${formatDateTime(item.receivedAt)}`} badge={capitalise(item.status || "new")} />)}</>} editor={current ? <div className="space-y-4"><div className="rounded-xl bg-[#f5f2ed] p-4"><p className="font-display text-xl font-semibold">{current.name}</p><p className="mt-1 text-sm text-ink/60">{current.email} · {current.phone}</p></div><Detail label="Received" value={formatDateTime(current.receivedAt)} /><Detail label="Service" value={current.service || "Not provided"} /><Detail label="Property" value={current.property || "Not provided"} /><Detail label="Original source" value={current.source || "Website enquiry form"} /><Detail label="Message" value={current.message || "Not provided"} multiline /><FieldLabel label="Status"><select className={fieldClass} value={current.status || "new"} onChange={(e) => patch({ status: e.target.value as any })}>{["new", "contacted", "qualified", "closed", "spam"].map((value) => <option key={value} value={value}>{capitalise(value)}</option>)}</select></FieldLabel><FieldLabel label="Assigned to"><input className={fieldClass} value={current.assignee || ""} onChange={(e) => patch({ assignee: e.target.value })} /></FieldLabel><FieldLabel label="Internal notes"><textarea className={fieldClass} rows={5} value={current.notes || ""} onChange={(e) => patch({ notes: e.target.value })} /></FieldLabel><button onClick={() => void saveMeta()} disabled={saving} className="min-h-11 w-full cursor-pointer rounded-xl bg-ink text-sm font-semibold text-white hover:bg-brand disabled:opacity-50">{saving ? "Saving..." : "Save enquiry"}</button></div> : <EmptyState title="Select an enquiry" text="Choose an enquiry to review its details." />} />;
}

function ProofyPanel({ store, onChange }: { store: AdminStore; onChange: (store: AdminStore) => void }) {
  const [selected, setSelected] = useState(store.proofyConversations[0]?.id || "");
  const current = store.proofyConversations.find((item) => item.id === selected);
  function updateConversation(patch: Partial<ProofyConversation>) { onChange({ ...store, proofyConversations: store.proofyConversations.map((item) => item.id === selected ? { ...item, ...patch } : item) }); }
  function remove() { if (!current || !window.confirm("Delete this Proofy conversation?")) return; onChange({ ...store, proofyConversations: store.proofyConversations.filter((item) => item.id !== selected) }); setSelected(""); }
  function createAppointment() { if (!current) return; const appointment: AdminAppointment = { id: crypto.randomUUID(), conversationId: current.id, name: current.customerName || "Proofy visitor", email: current.customerEmail || "", phone: current.customerPhone || "", service: "Property inspection", property: "Home/Apartment", area: "", concern: current.messages.filter((m) => m.role === "user").map((m) => m.text).join("\n"), date: localDate(new Date(Date.now() + 86400000)), time: "10:00", inspector: "", notes: "Created from Proofy conversation", status: "scheduled", createdAt: new Date().toISOString() }; onChange({ ...store, appointments: [appointment, ...store.appointments] }); }
  return <div className="space-y-5"><Panel title="Proofy settings" subtitle="Only the welcome message and three quick replies are editable in this simplified setup."><div className="grid gap-4 lg:grid-cols-2"><FieldLabel label="Welcome message"><textarea rows={4} className={fieldClass} value={store.proofySettings.welcomeMessage} onChange={(e) => onChange({ ...store, proofySettings: { ...store.proofySettings, welcomeMessage: e.target.value } })} /></FieldLabel><div className="space-y-2"><p className="text-sm font-semibold">Quick replies</p>{[0, 1, 2].map((index) => <input key={index} className={fieldClass} value={store.proofySettings.quickReplies[index] || ""} onChange={(e) => { const quickReplies = [...store.proofySettings.quickReplies]; quickReplies[index] = e.target.value; onChange({ ...store, proofySettings: { ...store.proofySettings, quickReplies: quickReplies.slice(0, 3) } }); }} />)}</div></div></Panel><SplitPanel title="Proofy conversations" subtitle={`${store.proofyConversations.length} saved conversations`} list={<>{store.proofyConversations.length === 0 && <EmptyState title="No conversations yet" text="New Proofy exchanges will appear here automatically." />}{store.proofyConversations.map((item) => <ListButton key={item.id} active={item.id === selected} onClick={() => { setSelected(item.id); if (!item.read) onChange({ ...store, proofyConversations: store.proofyConversations.map((entry) => entry.id === item.id ? { ...entry, read: true } : entry) }); }} title={item.customerName || item.messages.find((message) => message.role === "user")?.text || "Anonymous visitor"} subtitle={`${item.page || "/"} · ${formatDateTime(item.updatedAt)}`} badge={item.read ? "Read" : "New"} />)}</>} editor={current ? <div className="space-y-4"><div className="rounded-xl bg-[#f5f2ed] p-4"><p className="text-xs font-semibold uppercase tracking-wider text-brand">Origin page</p><p className="mt-1 break-all text-sm font-semibold">{current.page || "/"}</p></div><FieldLabel label="Assigned to"><input className={fieldClass} value={current.assignee} onChange={(e) => updateConversation({ assignee: e.target.value })} /></FieldLabel><div className="max-h-[430px] space-y-3 overflow-y-auto rounded-xl border border-black/10 bg-[#f5f2ed] p-3">{current.messages.map((message, index) => <div key={`${message.at}-${index}`} className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-ink text-white" : "bg-white text-ink"}`}><p>{message.text}</p><p className={`mt-1 text-[10px] ${message.role === "user" ? "text-white/50" : "text-ink/40"}`}>{formatDateTime(message.at)}</p></div>)}</div><PrimaryButton onClick={createAppointment}>Create appointment</PrimaryButton><DangerButton onClick={remove}>Delete conversation</DangerButton></div> : <EmptyState title="Select a conversation" text="Choose a Proofy conversation to review it." />} /></div>;
}

function AppointmentsPanel({ items, onChange }: { items: AdminAppointment[]; onChange: (items: AdminAppointment[]) => void }) {
  const [month, setMonth] = useState(() => { const date = new Date(); return new Date(date.getFullYear(), date.getMonth(), 1); });
  const [selected, setSelected] = useState<string>("");
  const [hoveredDate, setHoveredDate] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState("");
  const current = items.find((item) => item.id === selected);
  const cells = calendarCells(month);
  function add(date = localDate(new Date())) { const item: AdminAppointment = { id: crypto.randomUUID(), name: "", email: "", phone: "", service: "Pre-Possession Home Inspection", property: "Home/Apartment", area: "", concern: "", date, time: "10:00", inspector: "", notes: "", status: "scheduled", createdAt: new Date().toISOString() }; onChange([item, ...items]); setSelected(item.id); }
  function update(patch: Partial<AdminAppointment>) { onChange(items.map((item) => item.id === selected ? { ...item, ...patch } : item)); }
  function remove() { if (!current || !window.confirm("Delete this appointment?")) return; onChange(items.filter((item) => item.id !== selected)); setSelected(""); }
  return <div className="space-y-5"><Panel title="Appointments calendar" subtitle="Hover for a summary. Click a date or appointment to open its side panel." action={<PrimaryButton onClick={() => add()}>New appointment</PrimaryButton>}><div className="mb-4 flex items-center justify-between"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-black/10" aria-label="Previous month"><AdminIcon name="left" /></button><h2 className="font-display text-xl font-semibold">{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</h2><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-black/10" aria-label="Next month"><AdminIcon name="right" /></button></div><div className="grid grid-cols-7 border-l border-t border-black/10">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day} className="border-b border-r border-black/10 bg-[#f5f2ed] p-2 text-center text-[11px] font-bold uppercase tracking-wider text-ink/50">{day}</div>)}{cells.map((date, index) => { if (!date) return <div key={`empty-${index}`} className="min-h-28 border-b border-r border-black/10 bg-black/[.025]" />; const key = localDate(date); const dayItems = items.filter((item) => item.date === key); return <button type="button" key={key} onMouseEnter={() => setHoveredDate(key)} onMouseLeave={() => setHoveredDate("")} onClick={() => {setSelected("");setSelectedDay(key);}} className="relative min-h-28 cursor-pointer border-b border-r border-black/10 bg-white p-2 text-left transition hover:bg-brand/[.05]"><span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${key === localDate(new Date()) ? "bg-brand text-white" : ""}`}>{date.getDate()}</span><div className="mt-1 space-y-1">{dayItems.slice(0, 3).map((item) => <span key={item.id} onClick={(event) => { event.stopPropagation(); setSelected(item.id); }} className={`block truncate rounded-md px-2 py-1 text-[10px] font-semibold ${item.status === "cancelled" ? "bg-red-50 text-red-700 line-through" : item.status === "completed" ? "bg-green-100 text-green-800" : item.status === "confirmed" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-900"}`}>{item.time} {item.name || "Untitled"} · {item.status}</span>)}{dayItems.length > 3 && <span className="text-[10px] font-semibold text-brand-deep">+{dayItems.length - 3} more</span>}</div>{hoveredDate === key && dayItems.length > 0 && <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-xl bg-ink p-3 text-xs text-white shadow-xl"><strong>{dayItems.length} appointment{dayItems.length === 1 ? "" : "s"}</strong>{dayItems.slice(0, 4).map((item) => <span key={item.id} className="mt-1 block truncate text-white/70">{item.time} · {item.name || item.service}</span>)}</span>}</button>; })}</div></Panel>{selectedDay && !current && <SideDrawer title={`Appointments · ${selectedDay}`} onClose={()=>setSelectedDay("")}><p className="mb-4 text-sm">Multiple appointments may share the same date and time.</p><div className="space-y-3">{items.filter(item=>item.date===selectedDay).sort((a,b)=>a.time.localeCompare(b.time)).map(item=><button type="button" className="min-h-16 w-full rounded-xl border border-line bg-white p-4 text-left" key={item.id} onClick={()=>setSelected(item.id)}><strong>{item.time} · {item.name || "Untitled"}</strong><span className="block text-sm">{item.service} · {capitalise(item.status)}</span></button>)}<PrimaryButton onClick={()=>add(selectedDay)}>Add another appointment</PrimaryButton></div></SideDrawer>}{current && <SideDrawer title={current.name || "New appointment"} onClose={() => setSelected("")}><div className="space-y-4"><FieldLabel label="Customer name"><input className={fieldClass} value={current.name} onChange={(e) => update({ name: e.target.value })} /></FieldLabel><div className="grid gap-3 sm:grid-cols-2"><FieldLabel label="Email"><input type="email" className={fieldClass} value={current.email} onChange={(e) => update({ email: e.target.value })} /></FieldLabel><FieldLabel label="Phone"><input className={fieldClass} value={current.phone} onChange={(e) => update({ phone: e.target.value })} /></FieldLabel></div><div className="grid gap-3 sm:grid-cols-2"><FieldLabel label="Date"><input type="date" className={fieldClass} value={current.date} onChange={(e) => update({ date: e.target.value })} /></FieldLabel><FieldLabel label="Time"><input type="time" className={fieldClass} value={current.time} onChange={(e) => update({ time: e.target.value })} /></FieldLabel></div><FieldLabel label="Service"><input className={fieldClass} value={current.service} onChange={(e) => update({ service: e.target.value })} /></FieldLabel><FieldLabel label="Property type"><input className={fieldClass} value={current.property} onChange={(e) => update({ property: e.target.value })} /></FieldLabel><FieldLabel label="Area / locality"><input className={fieldClass} value={current.area} onChange={(e) => update({ area: e.target.value })} /></FieldLabel><FieldLabel label="Inspector"><input className={fieldClass} value={current.inspector} onChange={(e) => update({ inspector: e.target.value })} /></FieldLabel><FieldLabel label="Status"><select className={fieldClass} value={current.status} onChange={(e) => update({ status: e.target.value as any })}>{["scheduled", "confirmed", "completed", "cancelled"].map((value) => <option key={value} value={value}>{capitalise(value)}</option>)}</select></FieldLabel><FieldLabel label="Property concern"><textarea rows={4} className={fieldClass} value={current.concern} onChange={(e) => update({ concern: e.target.value })} /></FieldLabel><FieldLabel label="Internal notes"><textarea rows={4} className={fieldClass} value={current.notes} onChange={(e) => update({ notes: e.target.value })} /></FieldLabel><DangerButton onClick={remove}>Delete appointment</DangerButton></div></SideDrawer>}</div>;
}

function Panel({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) { return <section className="rounded-2xl border border-black/10 bg-white shadow-sm"><header className="flex flex-col gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-xl font-semibold">{title}</h2>{subtitle && <p className="mt-1 text-sm text-ink/55">{subtitle}</p>}</div>{action}</header><div className="p-5">{children}</div></section>; }
function SplitPanel({ title, subtitle, action, filters, list, editor }: { title: string; subtitle?: string; action?: ReactNode; filters?: ReactNode; list: ReactNode; editor: ReactNode }) { return <section className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"><header className="flex flex-col gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-xl font-semibold">{title}</h2>{subtitle && <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink/55">{subtitle}</p>}</div>{action}</header>{filters && <div className="border-b border-black/10 p-4">{filters}</div>}<div className="grid min-h-[620px] lg:grid-cols-[minmax(280px,38%)_1fr]"><div className="max-h-[72dvh] space-y-2 overflow-y-auto border-b border-black/10 p-3 lg:border-b-0 lg:border-r">{list}</div><div className="p-5 sm:p-6">{editor}</div></div></section>; }
function ListButton({ active, onClick, title, subtitle, badge }: { active: boolean; onClick: () => void; title: string; subtitle?: string; badge?: string }) { return <button type="button" onClick={onClick} className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition ${active ? "border-brand bg-brand/[.07] ring-1 ring-brand/20" : "border-transparent hover:border-black/10 hover:bg-black/[.03]"}`}><div className="flex items-start gap-3"><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-semibold leading-snug">{title}</p>{subtitle && <p className="mt-1 truncate text-xs text-ink/50">{subtitle}</p>}</div>{badge && <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${badge === "Live" || badge === "New" ? "bg-brand text-white" : "bg-black/5 text-ink/55"}`}>{badge}</span>}</div></button>; }
function FieldLabel({ label, children }: { label: string; children: ReactNode }) { return <label className="block"><span className="mb-1.5 block text-sm font-semibold">{label}</span>{children}</label>; }
function PrimaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) { return <button type="button" onClick={onClick} className="min-h-11 cursor-pointer rounded-xl bg-ink px-4 text-sm font-semibold text-white transition hover:bg-brand">{children}</button>; }
function DangerButton({ onClick, children }: { onClick: () => void; children: ReactNode }) { return <button type="button" onClick={onClick} className="min-h-11 cursor-pointer rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100">{children}</button>; }
function EmptyState({ title, text }: { title: string; text: string }) { return <div className="rounded-xl border border-dashed border-black/15 p-8 text-center"><p className="font-display font-semibold">{title}</p><p className="mt-2 text-sm leading-relaxed text-ink/50">{text}</p></div>; }
function Detail({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) { return <div><p className="text-xs font-semibold uppercase tracking-wider text-ink/45">{label}</p><p className={`mt-1 text-sm leading-relaxed ${multiline ? "whitespace-pre-line rounded-xl bg-[#f5f2ed] p-3" : ""}`}>{value}</p></div>; }
function SideDrawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <><button className="fixed inset-0 z-[150] cursor-default bg-black/45" onClick={onClose} aria-label="Close appointment editor" /><aside className="fixed inset-y-0 right-0 z-[160] w-full max-w-lg overflow-y-auto bg-white shadow-2xl"><header className="sticky top-0 z-10 flex min-h-[76px] items-center justify-between border-b border-black/10 bg-white px-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-brand">Appointment</p><h2 className="mt-1 font-display text-xl font-semibold">{title}</h2></div><button onClick={onClose} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-black/10" aria-label="Close"><AdminIcon name="close" /></button></header><div className="p-5 sm:p-6">{children}</div></aside></>; }

type IconName = "grid" | "edit" | "image" | "file" | "briefcase" | "quote" | "layers" | "inbox" | "message" | "calendar" | "external" | "logout" | "save" | "menu" | "left" | "right" | "close";
function AdminIcon({ name }: { name: IconName }) { const paths: Record<IconName, ReactNode> = { grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>, edit: <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.5 7.5 3 3"/></>, image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-4-4L5 20"/></>, file: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>, briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18"/></>, quote: <><path d="M4 18v-6a5 5 0 0 1 5-5v4a2 2 0 0 0-2 2h3v5H4ZM14 18v-6a5 5 0 0 1 5-5v4a2 2 0 0 0-2 2h3v5h-6Z"/></>, layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>, inbox: <><path d="M4 4h16v14H4z"/><path d="M4 13h4l2 3h4l2-3h4"/></>, message: <><path d="M4 5h16v12H9l-5 4V5Z"/><path d="M8 9h8M8 13h5"/></>, calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>, external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></>, logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10"/></>, save: <><path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/></>, menu: <path d="M4 7h16M4 12h16M4 17h16"/>, left: <path d="m15 18-6-6 6-6"/>, right: <path d="m9 18 6-6-6-6"/>, close: <path d="m6 6 12 12M18 6 6 18"/> };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>; }

function blocksToText(blocks: { h?: string; p: string }[]) { return blocks.map((block) => `${block.h ? `## ${block.h}\n` : ""}${block.p}`).join("\n\n"); }
function textToBlocks(value: string) { return value.split(/\n\s*\n/).filter(Boolean).map((section) => { const lines = section.trim().split("\n"); if (lines[0]?.startsWith("## ")) return { h: lines[0].slice(3).trim(), p: lines.slice(1).join(" ").trim() }; return { p: lines.join(" ").trim() }; }); }
function localDate(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function calendarCells(month: Date) { const first = new Date(month.getFullYear(), month.getMonth(), 1); const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); const start = (first.getDay() + 6) % 7; return [...Array(start).fill(null), ...Array.from({ length: count }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1))]; }
function formatBytes(value: number) { if (value < 1024) return `${value} B`; if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`; return `${(value / 1024 / 1024).toFixed(1)} MB`; }
function formatDateTime(value: string) { try { return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); } catch { return value; } }
function capitalise(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }
function csvCell(value: unknown) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }
