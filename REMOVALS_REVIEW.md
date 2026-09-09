# What was removed, replaced, or moved

Comparison: `ced1408` (before the PPT work) to `387631a`, followed by the corrective changes recorded alongside this review. No page files were deleted by that initial commit. This does not mean every previous interaction was preserved.

## Behaviors and presentation replaced in the PPT implementation

| Area | Previous behavior/treatment removed | Replacement/current state |
| --- | --- | --- |
| Care+ service cards on phones | One-at-a-time carousel, swipe handling, arrows and progress bar | All service cards rendered in a responsive grid |
| Why Care+ | One reason at a time, swipe handling, single black outer container | Groups of four black reason cards with page buttons |
| Care+ process | Horizontal strip of rectangular cards and arrow connectors | Numbered circles in a wrapping grid. The current localhost correction restores one horizontal scrolling path and visible orange connector lines while retaining the numbered circles |
| How Proofit Works | Five-second automatic advance, swipe handlers, old enter/exit transition implementation | Scroll-driven step changes and selectable step indicators; existing step copy retained |
| Falling pills | Rotated/angled old physics implementation | Initially replaced with an overly orderly, unrotated implementation. The current localhost revision uses Matter.js rigid-body physics: varied widths, offset piles, rotation, collisions, drag/release and keyboard nudging. The container-collapse bug is also corrected |
| Homepage About | Previous video travel distances and copy timings/layout | Three-column desktop introduction, gentler movement and staged distinction reveal |
| One Platform / Two Models | Previous large spacing and fixed-height positioning | Compact version; fixed-height overflow subsequently corrected locally with content-sized cards |
| About FAQs | Single-column native disclosures that could be opened independently | Two-column controlled layout, subsequently corrected to expand both answers in a row together; individual questions on phones. FAQ content retained |
| Methodology journey | Previous step-card layout | Alternating cards, curved dashed connectors and a scroll-following circular thermal-equipment image |
| Page-closing CTAs | Previous full-width section treatments and page-specific button labels, including “Book a Home Inspection Today” and “Get Started” | Shared inset black CTA with “Book an Inspection” and WhatsApp actions |
| Careers imagery | Trainee banner and team-inspectors image usage | Existing branded moisture-check image and branded back-view image; original image files were not deleted |
| Careers job list | Single-column list | Two-column desktop cards; one column on phones |
| Home banner | Heavy text shadow and radial copy scrim | Softer directional image overlay; text position retained |
| Footer | Previous description, narrower logo, previous spacing and homepage service targets | Revised description/layout, larger logo and direct interior service anchors |
| Proofy at footer | Widget remained visible over footer | Widget hides while footer intersects; WhatsApp stays visible and conversation state remains |
| Testimonials | Fixed quote-panel height and previous heading/map-indicator treatment | Revised spacing/indicator; current local correction reserves the tallest review's natural height so controls do not move |
| Contact Hours | Earlier position within the contact-details column | PPT implementation put Hours under the right-hand form; current local correction spans both columns beneath map and form |

## Moved into managed data, not deleted

- Homepage service definitions moved from the homepage component into admin seed/public-content helpers.
- Care+ service descriptions moved into the managed offerings model.
- Leadership names, biographies and images moved into team seed/public-content helpers.
- Public contact values are now read through managed site settings.

These migrations retain seed content when the new store fields are absent; administrators can subsequently change visibility or edit the data.

## Confirmed implementation mistakes corrected locally

1. Model outcomes exceeded the fixed card height. Cards now size to their content.
2. Falling-pill containers collapsed to zero height because of `flex-1`. They now preserve their measured height and both groups of eight pills are visible and draggable again.
3. Care+ connector lines retained a zero scale despite the attempted reveal transform, and were hidden below the small-screen breakpoint. They now render without that conflicting scale and continue across a sideways-scrolling path.
4. Hours did not span beneath the map. It now spans the full desktop grid width.

5. Long pills could become near-circular and crowd their rounded ends. Width now grows based on measured text height, with additional padding and matching collision shapes.
6. The Mumbai map had an embedded marker in addition to the animated marker. A regenerated clean map and shared image/overlay coordinates keep all animated marker positions inside the coastline.
7. Expanding one desktop FAQ left an empty neighbouring card. Row pairs now open together, and Services is the last footer Links item.

This list distinguishes actual removals/replacements from code relocated into shared components or managed content; it is not a claim that every visual detail matches the earlier design.
