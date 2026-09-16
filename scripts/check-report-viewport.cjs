// Run against a local server: BASE_URL=http://localhost:3200 node scripts/check-report-viewport.cjs
// Requires Playwright (or a shared runtime supplied through NODE_PATH).
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const slug of ['home-inspection', 'water-inspection']) {
      for (const [width, height, largeText] of [[1440, 900], [1366, 768], [768, 1024], [375, 812], [812, 375], [375, 812, true]]) {
        const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
        await page.goto(`${process.env.BASE_URL || 'http://localhost:3200'}/services/${slug}`);
        if (largeText) await page.addStyleTag({ content: 'html { font-size: 24px !important; }' });
        const report = page.getByRole('img', { name: /^Sample Proofit inspection ledger/ });
        await report.scrollIntoViewIfNeeded();
        await report.evaluate(img => img.decode());
        await report.evaluate(img => window.scrollTo({ top: scrollY + img.getBoundingClientRect().top - 96, behavior: 'instant' }));
        const metrics = await report.evaluate(img => {
          const rect = img.getBoundingClientRect();
          const style = getComputedStyle(img);
          const border = parseFloat(style.borderTopWidth);
          return { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width,
            ratio: (rect.width - border * 2) / (rect.height - border * 2),
            naturalRatio: img.naturalWidth / img.naturalHeight, border,
            borderStyle: style.borderTopStyle, fit: style.objectFit,
            overflow: document.documentElement.scrollWidth > innerWidth };
        });
        assert.ok(metrics.height <= height - 160, `${slug} ${width}x${height}: report exceeds usable viewport (${metrics.height}px)`);
        assert.ok(metrics.top >= 80 && metrics.bottom <= height - 64, 'Entire report must fit below the header and above floating buttons');
        assert.ok(Math.abs(metrics.ratio - metrics.naturalRatio) < 0.01, 'Report must keep its original proportions');
        assert.notEqual(metrics.fit, 'cover', 'Report must not crop');
        assert.ok(metrics.border >= 1 && metrics.borderStyle === 'solid', 'Report must have a visible frame');
        assert.equal(metrics.overflow, false, 'No horizontal overflow');
        if (process.env.REPORT_SCREENSHOTS) await page.screenshot({ path: `.review-deck/report-${slug}-${width}${largeText ? '-large-text' : ''}.png` });
        console.log(`PASS ${slug} ${width}x${height}${largeText ? ' large text' : ''}: ${metrics.width.toFixed(0)}x${metrics.height.toFixed(0)}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
