import type { AdminStore } from './types';

export class AdminEditConflict extends Error {
  constructor(public readonly field: string) {
    super(`Another edit changed ${field}. Your draft is still here. Reload the latest data and reapply that change.`);
    this.name = 'AdminEditConflict';
  }
}

type JsonObject = Record<string, unknown>;
const object = (value: unknown): value is JsonObject => value !== null && typeof value === 'object' && !Array.isArray(value);
export function sameValue(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((item, index) => sameValue(item, b[index]));
  if (object(a) && object(b)) return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => Object.hasOwn(b, key) && sameValue(a[key], b[key]));
  return false;
}

function identified(items: unknown[]): items is (JsonObject & { id: string })[] {
  return items.every(item => object(item) && typeof item.id === 'string') && new Set(items.map(item => (item as JsonObject).id)).size === items.length;
}

function merge(base: unknown, draft: unknown, latest: unknown, field: string): unknown {
  if (sameValue(base, draft) || sameValue(draft, latest)) return latest;
  if (sameValue(base, latest)) return draft;
  if (Array.isArray(base) && Array.isArray(draft) && Array.isArray(latest) && identified(base) && identified(draft) && identified(latest)) {
    const originals = new Map(base.map(item => [item.id, item]));
    const edits = new Map(draft.map(item => [item.id, item]));
    const current = new Map(latest.map(item => [item.id, item]));
    // Preserve incoming records and their current order; append only genuinely new editor records.
    const ids = new Set([...current.keys(), ...edits.keys(), ...originals.keys()]);
    return [...ids].map(id => merge(originals.get(id), edits.get(id), current.get(id), `${field} / ${id}`)).filter(item => item !== undefined);
  }
  if (object(base) && object(draft) && object(latest)) {
    const keys = new Set([...Object.keys(latest), ...Object.keys(draft), ...Object.keys(base)]);
    return Object.fromEntries([...keys].map(key => [key, merge(base[key], draft[key], latest[key], `${field} / ${key}`)]).filter(([, value]) => value !== undefined));
  }
  // Includes delete-versus-update and edit-versus-delete conflicts.
  throw new AdminEditConflict(field);
}

const editableKeys = ['team', 'offerings', 'contact', 'siteCopy', 'posts', 'careers', 'testimonials', 'caseStudies', 'proofySettings', 'proofyConversations', 'appointments'] as const;

export function mergeAdminEdits(base: AdminStore, draft: AdminStore, latest: AdminStore): AdminStore {
  const edits = Object.fromEntries(editableKeys.map(key => [key, merge(base[key], draft[key], latest[key], key)]));
  const result = { ...latest, ...edits } as AdminStore;
  result.proofyConversations = result.proofyConversations.map(conversation => {
    const original = base.proofyConversations.find(item => item.id === conversation.id);
    const current = latest.proofyConversations.find(item => item.id === conversation.id);
    // Reading the old snapshot must not mark unseen new messages as read.
    if (original && current && !sameValue(original.messages, current.messages)) return { ...conversation, read: current.read };
    return conversation;
  });
  // Image overrides and enquiry metadata have dedicated update endpoints; never copy stale values back.
  return result;
}
