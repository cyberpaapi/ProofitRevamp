# Mumbai map correction

Included in the responsive-layout corrections following the client presentation update.

- Replaced the displayed map with `public/images/mumbai-map-clean.webp` (1047 x 1502, 54,348 bytes). The previous asset is preserved.
- Generated with the built-in image-generation tool, then encoded as WebP with Sharp.
- The SVG marker overlay shares the map's exact aspect ratio and coordinate system. All six marker positions and their maximum 36-pixel pulse radius lie inside the coastline. A pixel-based flood-fill test verifies this against the actual generated image.
- Reduced desktop heading size to fit one line; phone/tablet headings can wrap naturally for readability.
- Preserved testimonial content and stable navigation-button positioning. Reduced-motion settings disable the pulse animation.

## Final generation prompt

Use case: precise-object-edit. Edit target: supplied orange Mumbai outline map website asset. Regenerate this same map asset with ONLY the entire embedded central location dot, large circle, dotted ring and all orange glow removed. Fill the whole interior and background uniformly with solid #101010. Preserve the exact coastline silhouette, thin orange outline, placement, orientation and full island including southern tip. Make the complete outline clearly visible in consistent warm orange #F7941D instead of fading to invisible at the top. Portrait same proportions as source 666x956. Absolutely no dots, circles, markers, pins, glow, symbols, labels, typography or extra lines anywhere. Clean crisp map outline on uniform near-black, ready for a separately coded animated dot.

Reference: `public/images/mumbai-map-orange.png`.
