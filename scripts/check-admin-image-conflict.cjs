const assert = require('node:assert/strict');
const sharp = require('sharp');
const createLoader = require('./test-helpers/load-ts.cjs');
let store = { updatedAt:'new-visitor-activity', imageOverrides:{} }, removed = [], upload = 0;
const load = createLoader({
  'next/server': { NextResponse:{ json:(body,init)=>Response.json(body,init) } },
  '@/lib/admin/auth': { isAdminAuthenticated:async()=>true },
  '@/lib/admin/blob': {
    mediaBlobToken:()=> 'mock',
    uploadPublicMedia:async()=>({url:`https://test.public.blob.vercel-storage.com/${++upload}.webp`,pathname:`${upload}.webp`}),
    deletePublicMedia:async url=>removed.push(url),
  },
  '@/lib/admin/store': {
    StaleAdminStoreError:class extends Error{},
    getAdminStore:async()=>structuredClone(store),
    updateAdminStore:async updater=>{store=updater(structuredClone(store));return store;},
  },
});
const { POST } = load('app/api/admin/upload/route.ts');
(async()=>{
  const input=await sharp({create:{width:20,height:20,channels:3,background:'#ed902f'}}).png().toBuffer();
  async function replace(expectedImage) {
    const form=new FormData();
    form.set('file',new File([input],'test.png',{type:'image/png'}));
    form.set('target','/images/test.webp');
    form.set('updatedAt','old-dashboard-timestamp');
    form.set('expectedImage',JSON.stringify(expectedImage));
    return POST(new Request('http://localhost:3200/api/admin/upload',{method:'POST',body:form}));
  }
  let response=await replace(null);
  assert.equal(response.status,200,'Unrelated activity must not block an image replacement');
  const first=structuredClone(store.imageOverrides['/images/test.webp']);
  response=await replace(null);
  assert.equal(response.status,409,'Replacing an image changed by another edit must conflict');
  assert.deepEqual(store.imageOverrides['/images/test.webp'],first);
  assert.ok(removed.includes('https://test.public.blob.vercel-storage.com/2.webp'),'Failed new upload is cleaned up');
  assert.ok(!removed.includes(first.url),'Current live image must remain');
  response=await replace(first);
  assert.equal(response.status,200);
  assert.ok(removed.includes(first.url),'Successful replacement removes superseded media');
  console.log('PASS per-image baseline: background activity, overlapping edit, retry, safe cleanup. All storage mocked.');
})().catch(error=>{console.error(error);process.exitCode=1});
