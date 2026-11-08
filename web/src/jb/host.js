'use strict';
// Page side of the JetBrains host. The plugin serves this page from its private origin http://zovo-model/.
// Only the editor tab that opened the model knows its token, and every request goes through /t/<token>/...

const CHUNK = 8 * 1024 * 1024; // bytes per range request; the IDE never holds more than this per read

function cfg() { return (typeof window !== 'undefined' && window.ZOVO) || {}; }
function tokenPath(token) { return '/t/' + encodeURIComponent(token) + '/'; }

/** URL of a file in the model's folder, as the viewer core sees it. The core resolves .mtl, .bin and textures against it. */
function modelSrc(origin, token, name) { return origin + tokenPath(token) + 'f/' + encodeURIComponent(name); }

/** True when a GET to this URL should be read by range (the model and the files next to it). */
function isFileUrl(url, origin, token) {
  let u;
  try { u = new URL(url, origin + '/'); } catch { return false; }
  return u.origin === origin && u.pathname.startsWith(tokenPath(token) + 'f/') && !u.search;
}

/**
 * Reads one file by byte range and returns a streaming Response. The first request tells the size
 * (header X-File-Size), the rest come one chunk at a time, so a 200 MB STL never sits whole in the IDE.
 */
async function rangedResponse(fetchImpl, path, chunk = CHUNK) {
  const first = await fetchImpl(path + '?offset=0&length=' + chunk);
  if (!first.ok) return first; // 404 for a missing neighbour: the loaders show their own message
  const size = Number(first.headers.get('X-File-Size'));
  const head = new Uint8Array(await first.arrayBuffer());
  if (!Number.isFinite(size) || size < head.length) throw new Error('The viewer got no file size for ' + path + '.');
  let offset = head.length;
  let sentHead = false;
  const stream = new ReadableStream({
    async pull(ctrl) {
      if (!sentHead) { sentHead = true; if (head.length) { ctrl.enqueue(head); return; } }
      if (offset >= size) { ctrl.close(); return; }
      const want = Math.min(chunk, size - offset);
      const r = await fetchImpl(path + '?offset=' + offset + '&length=' + want);
      if (!r.ok) { ctrl.error(new Error('Could not read bytes ' + offset + ' to ' + (offset + want) + ' (HTTP ' + r.status + ').')); return; }
      const part = new Uint8Array(await r.arrayBuffer());
      if (part.length !== want) { ctrl.error(new Error('Short read at ' + offset + ': wanted ' + want + ' bytes, got ' + part.length + '.')); return; }
      offset += part.length;
      ctrl.enqueue(part);
    },
  });
  return new Response(stream, { status: 200, headers: { 'Content-Length': String(size), 'Content-Type': first.headers.get('Content-Type') || 'application/octet-stream' } });
}

/** Wraps window.fetch: model files go through rangedResponse, everything else is unchanged. */
function patchFetch(win, token) {
  const real = win.fetch.bind(win);
  const origin = win.location.origin;
  win.fetch = (input, opts) => {
    const url = typeof input === 'string' ? input : input && input.url;
    const method = String((opts && opts.method) || (input && typeof input === 'object' && input.method) || 'GET').toUpperCase();
    if (method !== 'GET' || !isFileUrl(url, origin, token)) return real(input, opts);
    const u = new URL(url, origin + '/');
    return rangedResponse(real, u.pathname);
  };
  return real;
}

async function post(fetchImpl, token, path, body) {
  const r = await fetchImpl(tokenPath(token) + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
  const text = await r.text();
  let data; try { data = JSON.parse(text); } catch { data = { error: text }; }
  if (!r.ok) throw new Error(data.error || ('HTTP ' + r.status));
  return data;
}

function fmtSize(n) {
  if (!Number.isFinite(n) || n < 0) return '?';
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1073741824) return `${(n / 1048576).toFixed(1)} MB`;
  return `${(n / 1073741824).toFixed(1)} GB`;
}

const LIMIT_MB = 1024;
/** Same rule as the VS Code version (1 GB), with text for the IDE. */
function sizePlan(size) {
  if (size > LIMIT_MB * 1048576) {
    return { load: false, limitMB: LIMIT_MB, message: `This file is ${fmtSize(size)}. STL Viewer opens files up to ${fmtSize(LIMIT_MB * 1048576)} so the IDE stays responsive. The file was not read.` };
  }
  return { load: true, limitMB: LIMIT_MB };
}

function bytesToBase64(u8) {
  let s = '';
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s);
}

module.exports = { CHUNK, cfg, tokenPath, modelSrc, isFileUrl, rangedResponse, patchFetch, post, fmtSize, sizePlan, bytesToBase64 };
