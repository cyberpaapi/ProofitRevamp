# Admin saves and iPad fixes - 16 September 2026

## Root cause
The dashboard saved a full snapshot guarded by one global updatedAt timestamp. Proofy conversations, appointments and image replacements update the same store, so unrelated visitor activity invalidated the editor snapshot immediately. Refreshing could not reliably resolve an active stream of new activity.

## Changes
- Admin saves send their original baseline and draft. The server merges only changed fields/records into the latest data, with conditional Blob writes and retries.
- New chats, appointments, image overrides and enquiry metadata survive unrelated content saves. Genuine overlapping edits and deletion of newly changed records still return a conflict; the browser retains the draft.
- Final merged candidates are validated on every write/retry, preventing independently valid edits from producing duplicate service anchors or invalid publish/image combinations. Accepted image overrides refresh admin previews together with their baselines.
- Existing-image replacement compares that specific image, not the whole website timestamp.
- Local read/modify/write cycles are serialized.
- Footer Links split into two independent columns in the existing navigation sequence. Services are one vertical list.
- Careers desktop and portrait images regenerated against the real black logo reference, optimized and assigned versioned filenames.
- Portrait tablet banners use portrait sources where available, with image-specific vertical crop positions to preserve faces. Interior hero headlines have an intermediate tablet size.
- Admin sidebar collapses below 1280px so landscape iPads retain editor width. Feedback uses its own row, not the Save button's horizontal space.
- Mouse-only thermal instructions hidden on touch/reduced-motion devices.
- Preserved the existing local report-preview viewport sizing and golden border change.

## Image generation
Mode: built-in image generation/edit tool. Original photo plus full black logo reference; white reference background was for legibility only. Compressed with Sharp WebP quality 85.
- public/images/careers-mentoring-banner-v2.webp: 1672 x 941, 98,130 bytes.
- public/images/careers-mentoring-banner-mobile-v2.webp: 850 x 1838, 154,608 bytes.
Original assets retained. AI-generated branding was visually reviewed; it is not asserted to be a pixel-identical vector transfer.

### Desktop prompt
Use case: precise-object-edit. Asset: photorealistic Proofit careers desktop hero. Image 1 is the photo to correct; Image 2 is the exact black Proofit logo reference shown on white purely for legibility. Correct ONLY the two small shirt chest logos in Image 1. Replace the incorrect upright text and straight underline bars with the COMPLETE exact brand mark from Image 2: tilted open square with check extending beyond the top-right corner and its three short rays, bold lowercase italic 'proofit' wordmark, and TWO tapered sweeping underline swooshes. Transfer this as a single intact graphic, not a typed approximation. Remove old branding completely. Keep current small physical print width (about 8cm), same right chest position above nipple level; both marks must have same proportions and consistent scale relative to each wearer, naturally conforming to fabric perspective and folds. Ignore white background of reference: black ink directly on orange cotton. Preserve the two men's identities, all faces, poses, hands, device, tablet, warm apartment background, light, original wide 16:9 framing, and blank area on left. Preserve white sleeve end bands with orange stripe running through middle. No other text or logos, no shoulder/collar branding, no enlarged logos, no extra lines. Accurate supplied logo geometry and typography are the sole requested correction.

### Portrait prompt
Use case: precise-object-edit. Image 1 is the portrait Proofit careers hero to correct, image 2 is the exact black brandmark reference (white background is not part of mark). Change ONLY the two small chest logos. Completely remove the existing upright generic text and straight horizontal bars. Place the precise complete graphic from Image 2 on each orange polo: tilted open square and outward-extending check with three rays, bold italic lowercase 'proofit' and TWO tapered sweeping curved underline swooshes. Do not typeset or simplify. Transfer the supplied single graphic preserving its proportions, black ink directly on fabric without white box, subtle fabric folds and perspective. Keep same small width and same wearer's right-chest positions; consistent size relative to each torso. No shoulder or collar logos. Preserve exact portrait 850:1838 aspect ratio, both men's faces and poses, devices, apartment, lighting and headroom, white cuff bands with orange centre stripe, full bodies. No other alterations, no additional text or watermark.

## Verification
- check-admin-merge.cjs: eight real-store-code regression cases using isolated mocked Blob storage, including merged validation and conditional-write retry validation.
- check-admin-image-conflict.cjs: unrelated activity, same-image conflict, retry, cleanup; no real writes.
- check-admin-save-ui.cjs: baseline transmission/refresh, conflict draft retention, retry, tablet feedback layout; intercepted writes.
- check-tablet-layout.cjs: 768x1024, 820x1180, 1024x768, 1180x820; hero source selection, touch hint, six admin panels.
- Public-page audit: 14 route families across four tablet dimensions, five scroll positions each; no global horizontal overflow or JS exceptions.
- Footer: 375, 768, 820, 1024, 1180, 1440px, including both expanded navigation dropdowns.
- Report preview: both service pages, six viewport/text-size cases each.
- Existing contact/menu consistency and physics-pill shape tests passed.
- Existing sticky-card/headline tests passed across eight desktop/mobile/tablet viewports. Proofy opens/closes within portrait and landscape tablet bounds without submitting questions.
- TypeScript and production build passed.
- Chromium touch emulation used. WebKit runtime is not installed; actual iPad Safari was not tested.
- No production content, enquiries, messages or storage were modified during tests. No commit/push/deployment performed for this task.
