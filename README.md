# Proofit Website

Marketing, enquiry and single-admin CMS for Proofit (proofitcompany.com) - Next.js 16 (App Router), Tailwind CSS v4, TypeScript.

## Run locally (no keys needed)

```bash
npm install
npm run dev        # http://localhost:3000
```

Everything works without environment variables:
- Enquiry form submissions are validated and stored in `data/enquiries.json`.
- Admin content is stored in `data/admin-store.json`.
- Image replacements write to `public/images`.
- Email sending is skipped (a console log notes it) until a Resend key is provided.

These files are localhost fallbacks only. Production uses two Vercel Blob stores.

## Production

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `ADMIN_BLOB_READ_WRITE_TOKEN` or `ADMIN_READ_WRITE_TOKEN` | Token for the **private** Vercel Blob store containing CMS data, enquiries, appointments and Proofy conversations |
| `MEDIA_BLOB_READ_WRITE_TOKEN`, `MEDIA_READ_WRITE_TOKEN` or `BLOB_READ_WRITE_TOKEN` | Token for the **public** Vercel Blob store containing uploaded replacement images |
| `ADMIN_PASSWORD` | Fixed password for the single `/admin` account |
| `ADMIN_SESSION_SECRET` | Long random value used to sign the administrator session cookie |
| `RESEND_API_KEY` | Enables acknowledgement email to the enquirer + notification email to the team ([resend.com/api-keys](https://resend.com/api-keys)) |
| `RESEND_FROM` | Verified sender, e.g. `Proofit <hello@proofitcompany.com>` (use `onboarding@resend.dev` while testing) |
| `ENQUIRY_INBOX` | Team inbox that receives new-enquiry notifications |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap/OG tags |
| `GEMINI_API_KEY` | Server-only Google Gemini API key used by the Proofy AI assistant |
| `GEMINI_MODEL` | Optional Proofy model override; defaults to `gemini-3.6-flash` |

See [`ADMIN_README.md`](ADMIN_README.md) for the complete deployment checklist.

## Editing content

Seed copy lives in two files; deployed content can be managed at `/admin`:

- [lib/content.ts](lib/content.ts) - services, process steps, FAQs, blog posts, case studies, careers, testimonials, stats, founder bios
- [lib/site.ts](lib/site.ts) - phone, email, WhatsApp link, service area

Images live in `public/images/` (WebP, pre-optimized).

## Structure

- `app/` - routes (home, about with FAQs, process, services/[slug], blog/[slug], careers, case-studies, contact)
- `app/api/enquiry/route.ts` - enquiry pipeline: validate → store → email
- `components/` - Header, Footer, Reveal (scroll animations), Counter, EnquiryForm, etc.
- SEO: per-page metadata, `app/sitemap.ts`, `app/robots.ts`, JSON-LD (LocalBusiness, FAQPage, BlogPosting), `public/og.jpg`, `public/icon.svg`
