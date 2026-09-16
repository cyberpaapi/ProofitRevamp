const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { createHmac } = require('node:crypto');
const base = process.env.TEST_BASE_URL || 'http://localhost:3200';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const [width, height] of [[768,1024],[820,1180],[1024,768],[1180,820]]) {
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.route('**/api/admin/**', route => route.request().method() === 'GET' ? route.continue() : route.abort());
      for (const path of ['/care-plus','/careers']) {
        await page.goto(base + path);
        const hero = page.locator('.site-banner');
        const mobile = hero.locator('img').filter({ visible: true }).first();
        assert.equal((await mobile.getAttribute('src')).includes('mobile'), height > width, `${path}: portrait tablet art direction`);
        if (height > width) assert.equal(await mobile.evaluate(e=>getComputedStyle(e).objectPosition), path === '/careers' ? '50% 15%' : '50% 85%', 'Keep people in the visible tablet crop');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      await page.goto(base);
      assert.equal(await page.getByText('Move your cursor across the image to explore the thermal scan').isVisible(), false, 'No mouse-only instruction on touch screens');
      const expiry = String(Math.floor(Date.now()/1000)+3600);
      await context.addCookies([{ name: 'proofit_admin_session', value: `${expiry}.${createHmac('sha256','proofit-local-admin-session-secret').update(expiry).digest('base64url')}`, url: base }]);
      await page.goto(base + '/admin');
      assert.equal(new URL(page.url()).pathname, '/admin', 'Local test session must authenticate');
      for (const name of ['Blogs','Careers','Services','Images','Proofy','Appointments']) {
        await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
        await page.getByRole('navigation', { name: 'Admin sections' }).getByRole('button', { name, exact: true }).click();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}: ${name} must not overflow`);
        const save = await page.getByRole('button', { name:'Save changes',exact:true }).boundingBox();
        assert.ok(save.x >= 0 && save.x + save.width <= width && save.height >= 44);
      }
      console.log(`PASS touch/tablet ${width}x${height}: hero images, pointer hint, six admin panels, navigation, save control`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
