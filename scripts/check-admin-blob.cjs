// Exercise the real @vercel/blob SDK and our adapter at the HTTP boundary.
// All network access is disabled; no production token or data is used.
const assert = require('node:assert/strict');
const { MockAgent, getGlobalDispatcher, setGlobalDispatcher } = require('undici');
const createLoader = require('./test-helpers/load-ts.cjs');
const previous = getGlobalDispatcher();
const mock = new MockAgent();
mock.disableNetConnect();
setGlobalDispatcher(mock);
process.env.ADMIN_BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_teststore_fake';
process.env.VERCEL_BLOB_API_URL = 'https://blob-api.test';
process.env.VERCEL_BLOB_RETRIES = '0';
const sdk = require('@vercel/blob');
const load = createLoader();
const adapter = load('lib/admin/blob.ts');
const pathname = 'proofit-admin/store/admin-store.json';
let etag = '"revision-1"', deliveryTag, stored = { bio: 'Original' }, puts = 0;
let changeDuringDownload = false, missing = false, failWrites = false;
const api = mock.get('https://blob-api.test');
const delivery = mock.get('https://teststore.private.blob.vercel-storage.com');
const metadata = () => ({ pathname, etag, url: `https://teststore.private.blob.vercel-storage.com/${pathname}`, size: 20, uploadedAt: new Date().toISOString() });
api.intercept({ path: /.*/, method: 'GET' }).reply(() => missing
  ? { statusCode: 404, data: { error: { code: 'not_found' } } }
  : { statusCode: 200, data: metadata() }).persist();
delivery.intercept({ path: /.*/, method: 'GET' }).reply(options => {
  assert.ok(options.path.includes('cache=0'), 'must bypass CDN cache');
  if (changeDuringDownload) { changeDuringDownload = false; etag = '"revision-new"'; }
  const headers = new Headers(options.headers);
  const tag = deliveryTag || (headers.get('accept-encoding') === 'identity' ? etag : `W/${etag}`);
  return { statusCode: 200, data: JSON.stringify(stored), responseOptions: { headers: { etag: tag, 'content-type': 'application/json' } } };
}).persist();
api.intercept({ path: /.*/, method: 'PUT' }).reply(options => {
  puts++;
  const headers = new Headers(options.headers);
  if (failWrites || (headers.get('x-if-match') && headers.get('x-if-match') !== etag)) {
    return { statusCode: 412, data: { error: { code: 'precondition_failed' } } };
  }
  if (!missing && headers.get('x-allow-overwrite') === '0') {
    return { statusCode: 400, data: { error: { code: 'bad_request', message: 'This blob already exists' } } };
  }
  stored = JSON.parse(options.body); missing = false;
  return { statusCode: 200, data: metadata() };
}).persist();

(async () => {
  // Reproduce the old adapter: a download validator is not necessarily a
  // storage-write validator, even though both refer to the same content.
  const old = await sdk.get(pathname, { access: 'private', token: process.env.ADMIN_BLOB_READ_WRITE_TOKEN, useCache: false });
  await new Response(old.stream).text();
  await assert.rejects(sdk.put(pathname, '{}', { access: 'private', token: process.env.ADMIN_BLOB_READ_WRITE_TOKEN, allowOverwrite: true, ifMatch: old.blob.etag }), sdk.BlobPreconditionFailedError);
  let record = await adapter.readPrivateJsonRecord('store/admin-store.json');
  await adapter.writePrivateJson('store/admin-store.json', { bio: 'Changed' }, record.etag);
  assert.equal(stored.bio, 'Changed');
  console.log('PASS real SDK: old weak validator fails; canonical metadata validator saves');

  deliveryTag = `W/${etag}`;
  record = await adapter.readPrivateJsonRecord('store/admin-store.json');
  assert.equal(record.etag, etag);
  await adapter.writePrivateJson('store/admin-store.json', stored, record.etag);
  console.log('PASS weak delivery validator is never forwarded as a write validator');

  deliveryTag = '"stale-revision"';
  const before = puts;
  await assert.rejects(adapter.readPrivateJsonRecord('store/admin-store.json'), adapter.BlobSnapshotConflict);
  assert.equal(puts, before);
  deliveryTag = undefined; changeDuringDownload = true;
  await assert.rejects(adapter.readPrivateJsonRecord('store/admin-store.json'), adapter.BlobSnapshotConflict);
  console.log('PASS stale content and metadata/download races cannot overwrite current data');

  missing = true;
  assert.equal(await adapter.readPrivateJsonRecord('store/admin-store.json'), null);
  await adapter.writePrivateJson('store/admin-store.json', { bio: 'First' }, null);
  await assert.rejects(adapter.writePrivateJson('store/admin-store.json', { bio: 'Overwrite' }, null), adapter.BlobSnapshotConflict);
  assert.equal(stored.bio, 'First');
  console.log('PASS first-write race is create-only and preserves the first record');

  failWrites = true;
  const { updateAdminStore, AdminStorageBusyError } = load('lib/admin/store.ts');
  await assert.rejects(updateAdminStore(store => store), AdminStorageBusyError);
  assert.equal(stored.bio, 'First');
  console.log('PASS exhausted real SDK conflicts return a recoverable error without overwriting');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  setGlobalDispatcher(previous);
  await mock.close();
});
