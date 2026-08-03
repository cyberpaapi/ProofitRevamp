# Proofit Website

Marketing + enquiry site for Proofit (proofitcompany.com) - Next.js 15 (App Router), Tailwind CSS v4, TypeScript.

## Run locally (no keys needed)

```bash
npm install
npm run dev        # http://localhost:3000
```

Everything works without environment variables:
- Enquiry form submissions are validated and stored in `data/enquiries.json`.
- Email sending is skipped (a console log notes it) until a Resend key is provided.

The local JSON file is only a development fallback. Production deployments on
Vercel must use Supabase for durable enquiry storage.

## Production

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL used by the server-side enquiry API |
| `SUPABASE_SECRET_KEY` | Server-only Supabase secret key used to insert enquiries (never expose with a `NEXT_PUBLIC_` prefix) |
| `RESEND_API_KEY` | Enables acknowledgement email to the enquirer + notification email to the team ([resend.com/api-keys](https://resend.com/api-keys)) |
| `RESEND_FROM` | Verified sender, e.g. `Proofit <hello@proofitcompany.com>` (use `onboarding@resend.dev` while testing) |
| `ENQUIRY_INBOX` | Team inbox that receives new-enquiry notifications |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap/OG tags |
| `GEMINI_API_KEY` | Server-only Google Gemini API key used by the Proofy AI assistant |
| `GEMINI_MODEL` | Optional Proofy model override; defaults to `gemini-3.6-flash` |

Run [`supabase/migrations/20260802000000_create_enquiries.sql`](supabase/migrations/20260802000000_create_enquiries.sql)
once in the Supabase SQL Editor before enabling the production variables. The
table denies browser roles and is written only through the server-side API.

## Editing content

All copy lives in two files - no component changes needed for routine updates:

- [lib/content.ts](lib/content.ts) - services, process steps, FAQs, blog posts, case studies, careers, testimonials, stats, founder bios
- [lib/site.ts](lib/site.ts) - phone, email, WhatsApp link, service area

Images live in `public/images/` (WebP, pre-optimized).

## Structure

- `app/` - routes (home, about with FAQs, process, services/[slug], blog/[slug], careers, case-studies, contact)
- `app/api/enquiry/route.ts` - enquiry pipeline: validate → store → email
- `components/` - Header, Footer, Reveal (scroll animations), Counter, EnquiryForm, etc.
- SEO: per-page metadata, `app/sitemap.ts`, `app/robots.ts`, JSON-LD (LocalBusiness, FAQPage, BlogPosting), `public/og.jpg`, `public/icon.svg`
