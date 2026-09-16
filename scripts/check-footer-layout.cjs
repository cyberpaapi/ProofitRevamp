const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [375, 768, 820, 1024, 1180, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1024 }, reducedMotion: 'reduce' });
      await page.goto('http://localhost:3200/contact');
      const footer = page.locator('[data-site-footer]');
      await footer.scrollIntoViewIfNeeded();
      const columns = footer.getByRole('navigation', { name: 'Footer pages' }).locator(':scope > ul');
      assert.equal(await columns.count(), 2, 'Links must use two independently flowing columns');
      const links = await columns.locator(':scope > li').allTextContents();
      assert.equal(links.length, 9, 'All page groups must remain');
      const serviceRows = await footer.locator('h3').filter({ hasText: /^Services$/ }).locator('..').locator('li').evaluateAll(items => items.map(item => item.getBoundingClientRect().left));
      assert.ok(serviceRows.every(left => Math.abs(left - serviceRows[0]) < 1), 'Services must be one vertical list');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      for (const label of ['Services', 'Case Studies']) {
        await footer.locator('summary').filter({ hasText: label }).click();
      }
      assert.equal(await footer.locator('details[open]').count(), 2);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (process.env.REPORT_SCREENSHOTS) await footer.screenshot({ path: `.review-deck/footer-${width}.png` });
      console.log(`PASS footer ${width}px`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
