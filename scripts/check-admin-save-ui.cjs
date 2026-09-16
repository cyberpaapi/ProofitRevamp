const { chromium } = require('playwright');
const { createHmac } = require('node:crypto');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel:'chrome',headless:true });
  try {
    const context = await browser.newContext({ viewport:{width:1024,height:768},hasTouch:true });
    const expiry = String(Math.floor(Date.now()/1000)+3600);
    await context.addCookies([{name:'proofit_admin_session',value:`${expiry}.${createHmac('sha256','proofit-local-admin-session-secret').update(expiry).digest('base64url')}`,url:'http://localhost:3200'}]);
    const page=await context.newPage();
    let previous, count=0;
    await page.route('**/api/admin/data',async route=>{
      assert.equal(route.request().method(),'PUT');
      const {store,baseline}=route.request().postDataJSON();
      assert.ok(baseline && baseline.updatedAt,'Every save includes its original baseline');
      assert.notEqual(store.careers[0].title,baseline.careers[0].title);
      count++;
      if(previous) assert.equal(baseline.updatedAt,previous.updatedAt,'Successful response becomes next baseline');
      if(count===2) return route.fulfill({status:409,json:{error:'Another edit changed this career. Your draft is still here.'}});
      previous={...store,updatedAt:`saved-${count}`};
      const image=store.posts[0].image;
      previous.imageOverrides={...store.imageOverrides,[image]:{url:image+'?new-image=1',size:100,modifiedAt:'new-version',pathname:image}};
      await route.fulfill({json:{ok:true,store:previous}});
    });
    await page.goto('http://localhost:3200/admin');
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();
    await page.getByRole('navigation',{name:'Admin sections'}).getByRole('button',{name:'Careers',exact:true}).click();
    const panel=page.locator('main section');
    await panel.getByRole('button').filter({hasText:/Live|Hidden/}).first().click();
    const title=panel.locator('input[type=text]').first();
    await title.fill('Inspector test one');
    await page.getByRole('button',{name:'Save changes',exact:true}).click();
    await page.getByText('Changes saved.',{exact:true}).waitFor();
    await title.fill('Inspector test two');
    await page.getByRole('button',{name:'Save changes',exact:true}).click();
    await page.getByText('Another edit changed this career. Your draft is still here.',{exact:true}).waitFor();
    assert.equal(await title.inputValue(),'Inspector test two','Conflict retains unsaved draft');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.getByRole('button',{name:'Save changes',exact:true}).click();
    await page.getByText('Changes saved.',{exact:true}).waitFor();
    assert.equal(count,3);
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();
    await page.getByRole('navigation',{name:'Admin sections'}).getByRole('button',{name:'Blogs',exact:true}).click();
    await panel.getByRole('button').filter({hasText:/Live|Hidden/}).first().click();
    assert.match(await page.getByRole('img',{name:'Featured image preview',exact:true}).getAttribute('src'), /new-image=1/, 'Image previews reflect accepted concurrent replacements');
    console.log('PASS admin save UI: baseline sent/refreshed, draft retained on conflict, retry, tablet error layout. All writes intercepted.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
