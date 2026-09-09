# Public-site layout consistency update

Implemented locally in `proofit_ppt_changes`. Not committed or pushed.

## Changes

- Shared public-page section padding: 64px above/below on phones, 96px from tablet upwards.
- Shared 1408px maximum outer container, with 20px phone, 24px tablet and 32px desktop gutters. Headers, footer, CTA boxes, models and regular page sections use this alignment.
- Shared section-heading spacing: 32px before content on phones, 48px on larger screens; heading/body gaps 16px / 24px. Removed negative-margin adjustments in About and Methodology copy. Standardized section-title line height to 1.15 and banner-title line height to 1.12.
- Public banners use the requested reference geometry: 1440 × 810 desktop and 376 × 812 mobile. Home, both landing pages, About, Care+, services, Methodology, Careers, Contact, Blog and case-study pages share it. Tablet sizing and larger desktops interpolate responsively; long/enlarged text may increase the height instead of being clipped.
- Landing page 1 keeps all enquiry fields, with a compact two-column desktop form and the form below the image on phones. Removed the old extra outer banner padding.
- Blog index now has a generic home-interior banner using the existing optimized `hero-house.webp` asset. Article banners also use the shared geometry and a localized overlay.
- Added bottom-aligned **Read more →** labels to the three requested blog cards, plus labels on related-article links. Whole-card links remain accessible, with keyboard focus styling.
- Proofy nudge: **Need help navigating? Ask Proofy!**
- Proofy default opening message: **Not sure which Proofit service you need?** followed by **Proofy can help you find the right inspection for your property.**
- New and existing seeded Proofy greetings use the new copy. A deliberately customized admin greeting is preserved; no stored admin data was overwritten.
- Inset CTA panels now follow the common outer container. Care+ headings use the shared heading component. CTA controls stack on narrower screens to avoid crowding.
- Reduced excessive internal spacing in the home About detail panel after finding a small short-desktop clipping issue.

## Interpretation and preserved behavior

- The requested banner dimensions describe the rendered banner at the reference viewport widths, not stretching every original image file to a fixed pixel size. Images retain their proportions and use cover cropping.
- Readable article body widths remain narrower than the outer page container intentionally. Full-bleed imagery, compact statistic strips, nested cards and scroll-animation stages are not forced into identical internal padding or fixed heights.
- The earlier `ProofitChanges.pptx` was reviewed using the presentation skill. Its inset CTA, connected path, card feedback and spacing references informed this pass; later user instructions take precedence over older PPT directions.
- The UI/UX skill informed shared responsive spacing, keyboard affordances and preserving readable content rather than clipping it to a fixed frame.
- PPT references to separately emailed replacement photographs remain unresolved because those files are not supplied. Existing images were retained except for the newly added generic Blog banner.
- No sections, blog content, fields, pills, reviews or animations were removed. The pill physics, model/card stacking, thermal scan, paired FAQ behavior, full-width Hours block and stable testimonial controls remain.

## Verification

- Production build and TypeScript passed.
- 56 route/viewport checks across 376, 768, 1440 and 1920px: banner geometry, shared section padding, outer container width, no horizontal overflow, Proofy copy and three Read more labels.
- 84 scrolling overflow checks across desktop, tablet, phone and landscape. The two small home/landing-page-2 About clipping findings were fixed and both routes passed a targeted recheck.
- All 16 pill shapes and text checked at 320, 375, 390, 768, 1024 and 1440px, including 150% text sizing.
- Model-card containment and stable testimonial controls passed seven viewport/text-size combinations.
- FAQ keyboard/paired-row behavior, footer ordering, connected-path scrolling and full-width Hours regression tests passed.
- Pill dragging/release/collisions, keyboard movement, reduced-motion behavior and no-JavaScript fallback passed.
- Desktop/mobile screenshots inspected for Blog, About, landing-page form, Read more cards and Proofy.

Preview: http://localhost:3200/
