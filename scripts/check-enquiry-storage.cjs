const assert = require('node:assert/strict');
const createLoader = require('./test-helpers/load-ts.cjs');
let lead, appointment, failLead = false, failAppointment = false;
delete process.env.RESEND_API_KEY; // Never send mail in this test.
const load = createLoader({
  '@/lib/admin/store': {
    appendEnquiry: async value => { if (failLead) throw Error('test storage failure'); lead = value; },
    appendAppointment: async value => { if (failAppointment) throw Error('test appointment failure'); appointment = value; },
    setEnquiryMeta: async () => { throw Error('Default metadata must not write to shared CMS'); },
  },
});
const { POST } = load('app/api/enquiry/route.ts');
const body = { name: 'Storage Test', email: 'test@example.invalid', phone: '9999999999', source: 'Isolated test', message: 'Test only' };
const submit = value => POST(new Request('http://localhost/api/enquiry', { method: 'POST', body: JSON.stringify(value) }));
(async () => {
  let response = await submit(body);
  assert.equal(response.status, 200);
  assert.equal(lead.source, 'Isolated test');
  console.log('PASS new lead saves without updating shared CMS defaults');
  failAppointment = true;
  response = await submit({ ...body, appointment: { preferredDate: '2026-09-24', preferredTime: '11:00', area: 'Test area', concern: 'Test concern' } });
  assert.equal(response.status, 200);
  assert.match(lead.message, /2026-09-24 at 11:00/);
  assert.match(lead.message, /Test area/);
  assert.equal(appointment, undefined);
  console.log('PASS appointment details remain in saved lead if calendar update fails');
  failAppointment = false;
  response = await submit({ ...body, appointment: { preferredDate: '2026-09-24', preferredTime: '11:00' } });
  assert.equal(response.status, 200);
  assert.equal(appointment.date, '2026-09-24');
  response = await submit({ ...body, appointment: { preferredDate: '2026-09-27' } });
  assert.equal(response.status, 400);
  failLead = true;
  response = await submit(body);
  assert.equal(response.status, 500);
  console.log('PASS calendar works, Sunday restriction preserved, failed lead is not falsely acknowledged');
})().catch(error => { console.error(error); process.exitCode = 1; });
