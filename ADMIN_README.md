# Proofit admin workspace

This folder is an isolated, production-capable copy of the Proofit website. It has no Git history and does not change or deploy the original `proofitRevamp` repository.

## Local access

- Website: `http://localhost:3200`
- Admin: `http://localhost:3200/admin`
- Local password: `proofit-admin`

The password and signed-session secret are stored only in this copy's ignored `.env.local`. Before any hosted deployment, replace both `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` with strong private values in the hosting environment.

## Included admin tools

- Site-wide visible text overrides by page path
- Website image library and optimized image replacement
- Blog create/edit/delete and draft/published state
- Careers create/edit/delete and open/closed state
- Testimonial create/edit/delete, portrait path, visibility and ordering
- Case-study create/edit/delete, statistics, ordering and publishing
- Enquiry search, filtering, status, assignment, notes, source and CSV export
- Proofy welcome message, three quick replies, saved conversations, assignment, deletion and appointment conversion
- Appointment month calendar, hover summary and click/tap side editor

## Persistence

- Production CMS data, enquiries, Proofy conversations and appointments: private Vercel Blob store
- Production replacement images: public Vercel Blob store
- Local CMS fallback: `data/admin-store.json`
- Local enquiry fallback: `data/enquiries.json`
- Local replacement-image fallback: `public/images`

The application refuses to use Vercel's temporary filesystem when either required Blob token is missing. Localhost continues to use files when Blob is not configured.

## Vercel setup

1. Create a **Private** Vercel Blob store named `proofit-admin-data`.
2. Create a **Public** Vercel Blob store named `proofit-media`.
3. Connect the stores to the project. The private token may be `ADMIN_BLOB_READ_WRITE_TOKEN` or `ADMIN_READ_WRITE_TOKEN`. The public token may be `MEDIA_BLOB_READ_WRITE_TOKEN`, `MEDIA_READ_WRITE_TOKEN` or Vercel's default `BLOB_READ_WRITE_TOKEN`.
4. Add a strong `ADMIN_PASSWORD` and a separately generated `ADMIN_SESSION_SECRET`.
5. Add the existing Resend and Gemini variables from `.env.example`.
6. Set `NEXT_PUBLIC_SITE_URL` to the deployed production URL.
7. Deploy, sign in at `/admin`, make a harmless draft change, redeploy, and confirm that the change remains.

Keep both Blob tokens server-only. Do not prefix them with `NEXT_PUBLIC_`.

To preserve the current local admin state and local enquiries, add the private-store token to `.env.local` and run this once before the first production test:

```powershell
npm run storage:migrate
```

## Commands

```powershell
npm install
npm run build
npm run start -- --port 3200
```
