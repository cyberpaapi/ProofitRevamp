# Careers, contact and navigation update

- Careers and Our Process both used `bathroom-moisture-check.webp`. Our Process keeps that image; Careers now has an original mentoring scene with matching phone artwork.
- Removed only the four-step numbered connected careers strip above Open roles. The Why Proofit content, benefits, job cards and application links remain.
- Contact uses two stretching columns. The map is at least 320px tall (previously 256px), expands with the form, and shares its bottom edge on desktop. Hours remains full width beneath both. On phones, direct contact and map precede the form.
- Header and footer use `lib/navigation.ts` for the same nine page names and ordering. Services and Case Studies expand in both. Case study children come from published admin content, not a separate hardcoded list. Campaign landing pages remain excluded. The six highlighted service links in the footer are preserved.
- Menu supports Escape, focus containment, and unfocusable collapsed submenus.

## Generated assets

Built-in image-generation tool used (no CLI/API-key fallback). Reference: `public/images/logo-black.png`. Desktop generated first; that result was the reference for the phone version. Outputs optimized to WebP without changing the artwork.

- `public/images/careers-mentoring-banner.webp` (1672 x 941)
- `public/images/careers-mentoring-banner-mobile.webp` (850 x 1838)

### Desktop prompt

Use case: photorealistic-natural. Asset type: Proofit careers webpage hero, wide 16:9 landscape. Create a premium, natural editorial photograph of two Indian home-inspection professionals learning together at an apartment inspection. A senior inspector and a younger trainee stand together near a window in a modern Mumbai apartment, quietly reviewing a handheld moisture meter and a tablet. Both wear orange cotton polo shirts with white sleeve-end bands and a narrow orange stripe through the middle of each band, and dark trousers. Their shirts have the supplied complete black Proofit brand mark as a small realistic print on the wearer's RIGHT chest above nipple level, not the collar or shoulder. Image 1 is the logo reference only: use its full square check icon, lowercase proofit wordmark and double underline swoosh together, no text-only substitution. No other logos. Place the pair on the RIGHT half, both heads fully visible in upper-middle area; leave softly lit neutral apartment wall and restrained negative space on the LEFT for website headline overlay. Natural warm daylight, tactile fabric, credible Indian residential interior, orange/charcoal/cream brand palette. Professional, welcoming mentoring atmosphere, not posed corporate handshake, not a bathroom photo. No baked-in headlines, captions, watermarks or extra people. Compose so a centre-right portrait crop can retain the two faces.

### Mobile prompt

Use case: identity-preserve. Asset type: mobile portrait careers hero for the same Proofit website. Image 1 is the accepted desktop banner reference. Create its matching portrait version, approximately 1:2 aspect ratio, with the SAME two Indian inspectors, same orange polos, small black right-chest Proofit mark, white sleeve cuffs with orange stripe, same moisture meter and tablet, same warm apartment. Recompose them close together, senior slightly behind and left of trainee, both heads completely visible with generous space ABOVE their hair; place their faces and the mentoring activity in the upper half. Lower half should be quiet apartment / dark trousers area for website headline overlay. Preserve natural realistic skin, proper hands, understated black branding that sits on fabric. Keep complete mark as a single small unit. Not a collage or grid, no embedded headline, no extra people, no watermark. The result is a tall realistic photograph suitable for a 376x812 full-bleed phone banner.

## Verification

Production build and TypeScript checked. Browser checks cover desktop, tablet, phone and landscape, reduced motion, larger text, navigation parity, dropdown children, contact map/form alignment and removal of the careers strip. No live form submissions or production content writes were used for testing. Changes remain local until a separate push request.
