'use strict';
// JetBrains host helpers: range reads into a streaming Response, URL checks, size plan.
const test = require('node:test');
const assert = require('node:assert/strict');
const H = require('../src/jb/host.js');

const ORIGIN = 'http://zovo-model';
const TOKEN = 'abc123';

/** A fake plugin route: /t/<token>/f/<name>?offset=&length= with the clamp rule and X-File-Size. */
function fakeServer(files, log) {
  return async url => {
    log && log.push(url);
    const u = new URL(url, ORIGIN + '/');
    const m = /^\/t\/abc123\/f\/(.+)$/.exec(u.pathname);
    const data = m && files[decodeURIComponent(m[1])];
    if (!data) return new Response('not found', { status: 404 });
    const off = Number(u.searchParams.get('offset')), len = Number(u.searchParams.get('length'));
    if (off > data.length) return new Response('', { status: 416 });
    const part = data.subarray(off, Math.min(data.length, off + len));
    return new Response(part, { status: 200, headers: { 'X-File-Size': String(data.length), 'Content-Type': 'application/octet-stream' } });
  };
}

const bytes = n => { const b = new Uint8Array(n); for (let i = 0; i < n; i++) b[i] = (i * 31 + 7) & 255; return b; };

test('rangedResponse returns the exact bytes in chunks, one request per chunk', async () => {
  const data = bytes(1000 * 3 + 17);
  const log = [];
  const r = await H.rangedResponse(fakeServer({ 'part.stl': data }, log), '/t/abc123/f/part.stl', 1000);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('Content-Length'), String(data.length));
  const got = new Uint8Array(await r.arrayBuffer());
  assert.deepEqual(got, data);
  assert.equal(log.length, 4);
  assert.match(log[3], /offset=3000&length=17$/);
});

test('rangedResponse: empty file, file smaller than a chunk, missing file', async () => {
  const srv = fakeServer({ 'e.stl': new Uint8Array(0), 's.obj': bytes(10) });
  assert.equal((await (await H.rangedResponse(srv, '/t/abc123/f/e.stl', 64)).arrayBuffer()).byteLength, 0);
  assert.deepEqual(new Uint8Array(await (await H.rangedResponse(srv, '/t/abc123/f/s.obj', 64)).arrayBuffer()), bytes(10));
  const missing = await H.rangedResponse(srv, '/t/abc123/f/nope.mtl', 64);
  assert.equal(missing.status, 404);
});

test('rangedResponse: a short read errors instead of giving a wrong model', async () => {
  const data = bytes(300);
  const srv = async url => {
    const u = new URL(url, ORIGIN + '/');
    const off = Number(u.searchParams.get('offset'));
    const part = off === 0 ? data.subarray(0, 100) : data.subarray(off, off + 10);
    return new Response(part, { headers: { 'X-File-Size': '300' } });
  };
  const r = await H.rangedResponse(srv, '/t/abc123/f/x.stl', 100);
  await assert.rejects(r.arrayBuffer(), /Short read/);
});

test('isFileUrl: only GETs of the model folder of this token', () => {
  assert.equal(H.isFileUrl(ORIGIN + '/t/abc123/f/a.stl', ORIGIN, TOKEN), true);
  assert.equal(H.isFileUrl('/t/abc123/f/tex/wood%20grain.png', ORIGIN, TOKEN), true);
  assert.equal(H.isFileUrl(ORIGIN + '/t/other/f/a.stl', ORIGIN, TOKEN), false);
  assert.equal(H.isFileUrl(ORIGIN + '/t/abc123/f/a.stl?offset=0&length=9', ORIGIN, TOKEN), false, 'own range requests pass through');
  assert.equal(H.isFileUrl('https://example.com/t/abc123/f/a.stl', ORIGIN, TOKEN), false);
  assert.equal(H.isFileUrl('data:application/octet-stream;base64,AAAA', ORIGIN, TOKEN), false);
  assert.equal(H.isFileUrl(ORIGIN + '/t/abc123/f/../file', ORIGIN, TOKEN), false, '.. is resolved by URL first');
});

test('modelSrc encodes the name so the core finds neighbours next to it', () => {
  const src = H.modelSrc(ORIGIN, TOKEN, 'my part #2.obj');
  assert.equal(src, 'http://zovo-model/t/abc123/f/my%20part%20%232.obj');
  assert.equal(src.slice(0, src.lastIndexOf('/') + 1), 'http://zovo-model/t/abc123/f/');
});

test('sizePlan: 1 GB limit with IDE wording', () => {
  assert.deepEqual(H.sizePlan(200 * 1048576), { load: true, limitMB: 1024 });
  const big = H.sizePlan(1.5 * 1073741824);
  assert.equal(big.load, false);
  assert.match(big.message, /1\.5 GB/);
  assert.match(big.message, /the IDE stays responsive/);
  assert.doesNotMatch(big.message, /VS Code|modelViewer\./);
});

test('bytesToBase64 round trip', () => {
  const b = bytes(70000);
  assert.deepEqual(new Uint8Array(Buffer.from(H.bytesToBase64(b), 'base64')), b);
});
