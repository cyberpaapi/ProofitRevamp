# Admin saves, footer, Careers branding and iPad implementation plan

> Execute inline with test-first checks and verification. The user approved the scope and explicitly waived routine confirmation checkpoints. Keep all work in the existing `proofit_ppt_changes` worktree.

**Goal:** Reliable admin saves during visitor activity, a shorter footer, accurate Careers branding, and usable portrait/landscape iPad layouts.

**Architecture:** Retain the current Next.js/Vercel Blob implementation. Merge the difference between the editor's original snapshot and its draft into the latest server state, with Blob conditional writes and retries. Reject only real overlapping edits. Reuse current components and responsive styles; retain existing scroll interactions.

**Tech stack:** Next.js, React, TypeScript, Tailwind, Vercel Blob, Sharp, Node test runner, Playwright.

**Spec:** Approved scope in the September 16 conversation; no redesign, no production data changes during testing, no push requested this turn.

## Tasks

- [x] Admin persistence: add `lib/admin/merge-store.ts`, regression tests in `scripts/check-admin-merge.cjs`, integrate the baseline in `AdminDashboard.tsx`, `api/admin/data/route.ts`, `store.ts`. Replace image-upload global timestamp comparison with per-image baseline comparison. Test unrelated activity, same-field conflicts, deletions, retries, and preserving new messages.
- [x] Footer: use two independently flowing Links columns in reading order and a single vertical Services list. Preserve all links, numbering and dropdowns. Verify tablet/mobile wrapping and footer height.
- [x] Careers assets: regenerate existing desktop and mobile scenes using the complete supplied mark. Preserve small right-chest placement, shirt cuff pattern, people and framing. Inspect and optimize to WebP. Record prompts and files.
- [x] Tablet audit: exercise every public route family at iPad portrait and landscape sizes, including expanded menu, contact forms, sticky cards, physics pills, report preview and Proofy. Audit admin screens with local test data only. Fix observed overflow, clipping and cramped breakpoints without removing effects.
- [x] Verification: run merge/storage/upload regression checks, tablet and report browser checks, TypeScript/production build, and inspect screenshots. Summarize changes and any remaining limitations. Leave uncommitted pending a push request.

## Regression contracts

1. A blog edit succeeds if Proofy receives a message after the admin opens; the new message remains.
2. A second edit to the same field produces a specific conflict and keeps the draft in the browser.
3. Deleting a record never deletes concurrent unseen updates silently.
4. Retried Blob writes re-merge against latest state; no stale full-store overwrite.
5. Replacing one image is independent of new appointments and other image changes.
6. Both footer submenus remain keyboard/touch accessible and retain shared navigation order.
7. Public/admin tablet pages have no unintended horizontal overflow or off-screen controls.
