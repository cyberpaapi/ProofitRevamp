import "server-only";
import { seedTeam, seedOfferings } from "./offering-seeds";
import { migrateOfferingOrder, offeringOrderVersion } from "./offering-order";
import { site } from "@/lib/site";
import { proofyWelcomeMessage } from "@/lib/proofy-copy";

import { promises as fs } from "fs";
import path from "path";
import { caseStudies, openings, posts } from "@/lib/content";
import {
  adminBlobToken,
  isBlobConflict,
  listPrivateJson,
  readPrivateJson,
  readPrivateJsonRecord,
  requireDurableStorage,
  writePrivateJson,
} from "@/lib/admin/blob";
import type {
  AdminAppointment,
  AdminCaseStudy,
  AdminCareer,
  AdminEnquiryMeta,
  AdminPost,
  AdminStore,
  AdminTestimonial,
  ProofyConversation,
  StoredEnquiryRecord,
} from "@/lib/admin/types";

const dataDirectory = path.join(process.cwd(), "data");
const storeFile = path.join(dataDirectory, "admin-store.json");
const enquiryFile = path.join(dataDirectory, "enquiries.json");
const storeBlob = "store/admin-store.json";
const enquiryBlobPrefix = "enquiries/";

export class StaleAdminStoreError extends Error {
  constructor() {
    super("New website activity arrived while this dashboard was open. Refresh the admin page and apply the change again.");
    this.name = "StaleAdminStoreError";
  }
}

const seededTestimonials: AdminTestimonial[] = [
  {
    id: "testimonial-rahul-mehta",
    name: "Rahul Mehta",
    image: "/images/testimonials/rahul-mehta.webp",
    quote: "As a developer, post-handover complaints were becoming a recurring issue for us, especially around seepage and bathroom slopes. PROOFIT's structured inspection before possession helped us identify technical gaps early and fix them systematically. The result was fewer escalations, smoother handovers, and stronger buyer confidence.",
    author: "Project Director",
    organisation: "Residential Development Firm",
    visible: true,
    order: 0,
  },
  {
    id: "testimonial-neha-kapoor",
    name: "Neha Kapoor",
    image: "/images/testimonials/neha-kapoor.webp",
    quote: "We manage multiple commercial assets, and inconsistent quality checks were increasing maintenance costs. PROOFIT brought a standardized, data-backed inspection framework that highlighted drainage, waterproofing, and electrical risks across units. It has helped us move from reactive maintenance to preventive asset management.",
    author: "Head of Facilities",
    organisation: "Commercial Office Portfolio",
    visible: true,
    order: 1,
  },
  {
    id: "testimonial-rohan-shah",
    name: "Rohan Shah",
    image: "/images/testimonials/rohan-shah.webp",
    quote: "We were about to close on a resale apartment that looked flawless. PROOFIT's inspection revealed concealed moisture and improper balcony slopes that would have led to seepage in monsoon. Their report gave us leverage to negotiate corrective work before payment. It changed the outcome completely.",
    author: "Homebuyer",
    organisation: "Secondary Market",
    visible: true,
    order: 2,
  },
  {
    id: "testimonial-aditi-desai",
    name: "Aditi Desai",
    image: "/images/testimonials/aditi-desai.webp",
    quote: "After renovation, everything appeared fine visually, but we wanted technical validation. PROOFIT identified plumbing pressure inconsistencies and minor waterproofing gaps that our contractor had overlooked. Fixing them early prevented long-term damage and unnecessary future expenses.",
    author: "Homeowner",
    organisation: "Post-Renovation",
    visible: true,
    order: 3,
  },
  {
    id: "testimonial-vikram-malhotra",
    name: "Vikram Malhotra",
    image: "/images/testimonials/vikram-malhotra.webp",
    quote: "Tenant complaints around dampness were affecting our rental yield. PROOFIT's detailed assessment helped us trace the issue to improper drainage flow and waterproofing failure. Their structured report allowed us to address the root cause instead of patchwork fixes.",
    author: "Landlord & Property Investor",
    organisation: "",
    visible: true,
    order: 4,
  },
  {
    id: "testimonial-priya-nair",
    name: "Priya Nair",
    image: "/images/testimonials/priya-nair.webp",
    quote: "What stood out was the clarity of their reporting. Every issue was documented with evidence, severity grading, and precise location tagging. It removed guesswork and gave us a technical basis to hold contractors accountable without confrontation.",
    author: "Corporate Real Estate Manager",
    organisation: "",
    visible: true,
    order: 5,
  },
];

function createSeedStore(): AdminStore {
  const now = new Date().toISOString();
  return {
    version: offeringOrderVersion,
    team: seedTeam,
    offerings: seedOfferings,
    contact: { phones: site.phones.map(item => item.label), email: site.email },
    updatedAt: now,
    siteCopy: [],
    posts: posts.map<AdminPost>((post) => ({ ...post, id: `post-${post.slug}`, published: true })),
    careers: openings.map<AdminCareer>((opening, order) => ({
      ...opening,
      id: `career-${order + 1}`,
      active: true,
      order,
    })),
    testimonials: seededTestimonials,
    caseStudies: caseStudies.map<AdminCaseStudy>((study, order) => ({
      ...study,
      id: `case-${study.slug}`,
      published: true,
      order,
    })),
    enquiryMeta: {},
    proofyConversations: [],
    proofySettings: {
      welcomeMessage: proofyWelcomeMessage,
      quickReplies: [
        "Which inspection service do I need?",
        "How does a Proofit inspection work?",
        "When will I receive my report?",
      ],
    },
    appointments: [],
    imageOverrides: {},
  };
}

function normaliseStore(value: Partial<AdminStore>): AdminStore {
  const seed = createSeedStore();
  return {
    ...seed,
    ...value,
    team: Array.isArray(value.team) ? value.team : seed.team,
    version: Math.max(value.version ?? 0, offeringOrderVersion),
    offerings: Array.isArray(value.offerings) ? migrateOfferingOrder(value.offerings, value.version ?? 0) : seed.offerings,
    contact: value.contact || seed.contact,
    siteCopy: Array.isArray(value.siteCopy) ? value.siteCopy : seed.siteCopy,
    posts: Array.isArray(value.posts) ? value.posts : seed.posts,
    careers: Array.isArray(value.careers) ? value.careers : seed.careers,
    testimonials: Array.isArray(value.testimonials) ? value.testimonials : seed.testimonials,
    caseStudies: Array.isArray(value.caseStudies) ? value.caseStudies : seed.caseStudies,
    enquiryMeta: value.enquiryMeta || {},
    proofyConversations: Array.isArray(value.proofyConversations) ? value.proofyConversations : [],
    proofySettings: value.proofySettings || seed.proofySettings,
    appointments: Array.isArray(value.appointments) ? value.appointments : [],
    imageOverrides: value.imageOverrides || {},
  };
}

export async function getAdminStore(): Promise<AdminStore> {
  if (adminBlobToken()) {
    const stored = await readPrivateJson<Partial<AdminStore>>(storeBlob);
    if (stored) return normaliseStore(stored);
    const seed = createSeedStore();
    await writePrivateJson(storeBlob, seed);
    return seed;
  }
  requireDurableStorage("admin");
  try {
    const parsed = JSON.parse(await fs.readFile(storeFile, "utf8")) as Partial<AdminStore>;
    return normaliseStore(parsed);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    // Read-only local requests need not race to create the same seed file.
    return createSeedStore();
  }
}

export async function writeAdminStore(store: AdminStore): Promise<AdminStore> {
  const next = normaliseStore({ ...store, updatedAt: new Date().toISOString() });
  if (adminBlobToken()) {
    const current = await readPrivateJsonRecord<Partial<AdminStore>>(storeBlob);
    if (current?.value.updatedAt && current.value.updatedAt !== store.updatedAt) throw new StaleAdminStoreError();
    try {
      await writePrivateJson(storeBlob, next, current?.etag);
    } catch (error) {
      if (isBlobConflict(error)) throw new StaleAdminStoreError();
      throw error;
    }
    return next;
  }
  requireDurableStorage("admin");
  await fs.mkdir(dataDirectory, { recursive: true });
  const temporaryFile = `${storeFile}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(temporaryFile, JSON.stringify(next, null, 2), "utf8");
  await fs.rename(temporaryFile, storeFile);
  return next;
}

export async function updateAdminStore(
  updater: (store: AdminStore) => AdminStore | Promise<AdminStore>,
): Promise<AdminStore> {
  if (adminBlobToken()) {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const record = await readPrivateJsonRecord<Partial<AdminStore>>(storeBlob);
      const current = normaliseStore(record?.value || createSeedStore());
      const next = normaliseStore({ ...(await updater(current)), updatedAt: new Date().toISOString() });
      try {
        await writePrivateJson(storeBlob, next, record?.etag);
        return next;
      } catch (error) {
        if (isBlobConflict(error) && attempt < 3) continue;
        throw error;
      }
    }
    throw new Error("Could not save admin data after several concurrent updates.");
  }
  const current = await getAdminStore();
  return writeAdminStore(await updater(current));
}

export async function getEnquiries(): Promise<StoredEnquiryRecord[]> {
  let enquiries: StoredEnquiryRecord[] = [];
  if (adminBlobToken()) {
    enquiries = await listPrivateJson<StoredEnquiryRecord>(enquiryBlobPrefix);
  } else {
    requireDurableStorage("admin");
    try {
      const parsed = JSON.parse(await fs.readFile(enquiryFile, "utf8"));
      if (Array.isArray(parsed)) enquiries = parsed as StoredEnquiryRecord[];
    } catch {
      enquiries = [];
    }
  }
  const store = await getAdminStore();
  return enquiries
    .map((enquiry) => ({
      ...enquiry,
      status: store.enquiryMeta[enquiry.id]?.status || enquiry.status || "new",
      assignee: store.enquiryMeta[enquiry.id]?.assignee || enquiry.assignee || "",
      notes: store.enquiryMeta[enquiry.id]?.notes || enquiry.notes || "",
      source: store.enquiryMeta[enquiry.id]?.source || enquiry.source || inferSource(enquiry.message),
    }))
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function appendEnquiry(enquiry: StoredEnquiryRecord) {
  if (adminBlobToken()) {
    await writePrivateJson(`${enquiryBlobPrefix}${enquiry.receivedAt}-${enquiry.id}.json`, enquiry);
    return;
  }
  requireDurableStorage("admin");
  await fs.mkdir(dataDirectory, { recursive: true });
  let all: StoredEnquiryRecord[] = [];
  try {
    const parsed = JSON.parse(await fs.readFile(enquiryFile, "utf8"));
    if (Array.isArray(parsed)) all = parsed as StoredEnquiryRecord[];
  } catch {
    // First local enquiry.
  }
  all.push(enquiry);
  await fs.writeFile(enquiryFile, JSON.stringify(all, null, 2), "utf8");
}

function inferSource(message: string) {
  return message?.includes("Proofy") ? "Proofy appointment form" : "Website enquiry form";
}

export async function setEnquiryMeta(id: string, meta: AdminEnquiryMeta) {
  return updateAdminStore((store) => ({
    ...store,
    enquiryMeta: { ...store.enquiryMeta, [id]: meta },
  }));
}

export async function appendProofyExchange(input: {
  conversationId: string;
  interactionId?: string;
  page: string;
  userMessage: string;
  assistantMessage: string;
}) {
  return updateAdminStore((store) => {
    const now = new Date().toISOString();
    const index = store.proofyConversations.findIndex((item) => item.id === input.conversationId);
    const exchange = [
      { role: "user" as const, text: input.userMessage, at: now },
      { role: "assistant" as const, text: input.assistantMessage, at: now },
    ];
    const conversations = [...store.proofyConversations];
    if (index >= 0) {
      conversations[index] = {
        ...conversations[index],
        interactionId: input.interactionId || conversations[index].interactionId,
        updatedAt: now,
        read: false,
        messages: [...conversations[index].messages, ...exchange],
      };
    } else {
      const conversation: ProofyConversation = {
        id: input.conversationId,
        interactionId: input.interactionId,
        page: input.page,
        startedAt: now,
        updatedAt: now,
        read: false,
        assignee: "",
        messages: exchange,
      };
      conversations.unshift(conversation);
    }
    return { ...store, proofyConversations: conversations };
  });
}

export async function appendAppointment(appointment: AdminAppointment) {
  return updateAdminStore((store) => ({
    ...store,
    appointments: [appointment, ...store.appointments.filter((item) => item.id !== appointment.id)],
  }));
}

export async function listPublicImages() {
  const root = path.join(process.cwd(), "public", "images");
  const store = await getAdminStore();
  const results: { path: string; size: number; modifiedAt: string; url?: string; overridden?: boolean }[] = [];
  async function visit(directory: string) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else if (/\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name)) {
        const stat = await fs.stat(absolute);
        results.push({
          path: `/${path.relative(path.join(process.cwd(), "public"), absolute).replaceAll("\\", "/")}`,
          size: stat.size,
          modifiedAt: stat.mtime.toISOString(),
        });
      }
    }
  }
  await visit(root);
  return results
    .map((image) => {
      const override = store.imageOverrides[image.path];
      return override
        ? { ...image, size: override.size, modifiedAt: override.modifiedAt, url: override.url, overridden: true }
        : image;
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}
