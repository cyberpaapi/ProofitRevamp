const assert = require('node:assert/strict');
const createLoader = require('./test-helpers/load-ts.cjs');
const clone = structuredClone;
let stored, revision = 0, beforeWrite;
class Conflict extends Error {}
const blob = {
  adminBlobToken: () => 'isolated-test-token',
  requireDurableStorage: () => 'isolated-test-token',
  readPrivateJson: async () => clone(stored),
  readPrivateJsonRecord: async () => stored ? { value: clone(stored), etag: String(revision) } : null,
  writePrivateJson: async (_path, value, etag) => {
    if (beforeWrite) { const hook = beforeWrite; beforeWrite = undefined; hook(); }
    if (etag && etag !== String(revision)) throw new Conflict();
    stored = clone(value); revision++;
  },
  isBlobConflict: error => error instanceof Conflict,
};
const load = createLoader({ '@/lib/admin/blob': blob });
const { getAdminStore, writeAdminStore, appendProofyExchange, appendAppointment } = load('lib/admin/store.ts');
const { validateAdminStore } = load('lib/admin/validate-store.ts');
const chat = () => appendProofyExchange({ conversationId: 'visitor-1', page: '/', userMessage: 'Test question', assistantMessage: 'Test reply' });

(async () => {
  const base = await getAdminStore();
  const draft = clone(base); draft.careers[0].title = 'Senior inspector';
  await chat();
  let saved = await writeAdminStore(draft, base);
  assert.equal(saved.careers[0].title, 'Senior inspector');
  assert.equal(saved.proofyConversations[0].messages.length, 2);
  console.log('PASS content save preserves a conversation received after opening admin');

  const baseline = clone(saved), next = clone(saved);
  next.careers[0].desc = 'New role description';
  beforeWrite = () => { stored.appointments.push({ id: 'new-appointment', name: 'Test only' }); stored.updatedAt = 'background-write'; revision++; };
  saved = await writeAdminStore(next, baseline);
  assert.equal(saved.appointments[0].id, 'new-appointment');
  assert.equal(saved.careers[0].desc, 'New role description');
  console.log('PASS conditional-write retry re-merges latest appointments');

  const readBase = clone(saved), readDraft = clone(saved);
  readDraft.proofyConversations[0].read = true;
  readDraft.proofyConversations[0].assignee = 'Inspector';
  await chat();
  saved = await writeAdminStore(readDraft, readBase);
  assert.equal(saved.proofyConversations[0].messages.length, 4);
  assert.equal(saved.proofyConversations[0].read, false);
  assert.equal(saved.proofyConversations[0].assignee, 'Inspector');
  console.log('PASS new unseen chat messages remain unread while assignment saves');

  const conflictBase = clone(saved), one = clone(saved), two = clone(saved);
  one.careers[0].title = 'First edit'; two.careers[0].title = 'Second edit';
  await writeAdminStore(one, conflictBase);
  await assert.rejects(writeAdminStore(two, conflictBase), /careers|conflict|changed/i);
  assert.equal(stored.careers[0].title, 'First edit');
  two.careers[0].title = conflictBase.careers[0].title;
  two.careers[0].desc = 'Independent field';
  saved = await writeAdminStore(two, conflictBase);
  assert.equal(saved.careers[0].title, 'First edit');
  assert.equal(saved.careers[0].desc, 'Independent field');
  console.log('PASS real same-field conflicts reject without blocking unrelated fields');

  const deleteBase = clone(saved), deleteDraft = clone(saved);
  deleteDraft.proofyConversations = [];
  await chat();
  await assert.rejects(writeAdminStore(deleteDraft, deleteBase), /conflict|changed|conversation/i);
  assert.equal(stored.proofyConversations[0].messages.length, 6);
  console.log('PASS deletion cannot discard unseen conversation activity');

  const imageBase = await getAdminStore(), imageDraft = clone(imageBase);
  imageDraft.careers[0].active = false;
  stored.imageOverrides['/images/test.webp'] = { url: 'https://test.public.blob.vercel-storage.com/new.webp' };
  stored.enquiryMeta['new-enquiry'] = { status: 'contacted' }; revision++;
  saved = await writeAdminStore(imageDraft, imageBase);
  assert.ok(saved.imageOverrides['/images/test.webp']);
  assert.equal(saved.enquiryMeta['new-enquiry'].status, 'contacted');
  assert.equal(saved.careers[0].active, false);
  console.log('PASS image replacements and enquiry updates survive editor saves');

  const slugBase = await getAdminStore(), slugOne = clone(slugBase), slugTwo = clone(slugBase);
  slugOne.offerings[0].slug = 'shared-concurrent-slug';
  slugTwo.offerings[1].slug = 'shared-concurrent-slug';
  validateAdminStore(slugOne); validateAdminStore(slugTwo);
  await writeAdminStore(slugOne, slugBase, validateAdminStore);
  await assert.rejects(writeAdminStore(slugTwo, slugBase, validateAdminStore), /Duplicate service anchor/);
  assert.equal(stored.offerings.filter(item=>item.slug==='shared-concurrent-slug').length,1);
  console.log('PASS independently valid drafts cannot merge into duplicate service anchors');

  const retryBase=await getAdminStore(), retryDraft=clone(retryBase);
  retryDraft.offerings[1].slug='collision-during-retry';
  beforeWrite=()=>{stored.offerings[0].slug='collision-during-retry';revision++;};
  await assert.rejects(writeAdminStore(retryDraft,retryBase,validateAdminStore), /Duplicate service anchor/);
  assert.equal(stored.offerings.filter(item=>item.slug==='collision-during-retry').length,1);
  console.log('PASS merged validation runs again after a conditional-write race');
})().catch(error => { console.error(error); process.exitCode = 1; });
