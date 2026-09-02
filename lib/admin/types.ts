export type SiteCopyOverride = {
  id: string;
  page: string;
  original: string;
  replacement: string;
  enabled: boolean;
};

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  image: string;
  tag: string;
  body: { h?: string; p: string }[];
  published: boolean;
};

export type AdminCareer = {
  id: string;
  title: string;
  type: string;
  desc: string;
  active: boolean;
  order: number;
};

export type AdminTestimonial = {
  id: string;
  name: string;
  image: string;
  quote: string;
  author: string;
  organisation: string;
  visible: boolean;
  order: number;
};

export type AdminCaseStudy = {
  id: string;
  slug: string;
  title: string;
  location: string;
  service: string;
  image: string;
  problem: string;
  approach: string;
  outcome: string;
  stats: { label: string; value: string }[];
  published: boolean;
  order: number;
};

export type EnquiryStatus = "new" | "contacted" | "qualified" | "closed" | "spam";

export type AdminEnquiryMeta = {
  status: EnquiryStatus;
  assignee: string;
  notes: string;
  source: string;
};

export type ProofyMessage = {
  role: "user" | "assistant";
  text: string;
  at: string;
};

export type ProofyConversation = {
  id: string;
  interactionId?: string;
  page: string;
  startedAt: string;
  updatedAt: string;
  read: boolean;
  assignee: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  messages: ProofyMessage[];
};

export type AppointmentStatus = "scheduled" | "confirmed" | "completed" | "cancelled";

export type AdminAppointment = {
  id: string;
  enquiryId?: string;
  conversationId?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  property: string;
  area: string;
  concern: string;
  date: string;
  time: string;
  inspector: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type ProofySettings = {
  welcomeMessage: string;
  quickReplies: string[];
};

export type ImageOverride = {
  url: string;
  pathname: string;
  size: number;
  modifiedAt: string;
};

export type AdminStore = {
  version: number;
  updatedAt: string;
  siteCopy: SiteCopyOverride[];
  posts: AdminPost[];
  careers: AdminCareer[];
  testimonials: AdminTestimonial[];
  caseStudies: AdminCaseStudy[];
  enquiryMeta: Record<string, AdminEnquiryMeta>;
  proofyConversations: ProofyConversation[];
  proofySettings: ProofySettings;
  appointments: AdminAppointment[];
  imageOverrides: Record<string, ImageOverride>;
};

export type StoredEnquiryRecord = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  property: string;
  message: string;
  status?: EnquiryStatus;
  assignee?: string;
  notes?: string;
  source?: string;
};
