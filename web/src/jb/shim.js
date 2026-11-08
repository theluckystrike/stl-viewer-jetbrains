'use strict';
// Replaces the VS Code extension host for the unchanged viewer core (src/webview/main.js).
// main.js calls acquireVsCodeApi().postMessage(...) and listens for window "message" events; this file
// answers those messages with the plugin's routes: range reads, the IDE save dialog, the clipboard.
const P = require('../core/protocol.js');
const H = require('./host.js');

// STL files carry no unit; slicers and CAD tools read them as millimetres, as 3MF is. OBJ and PLY stay "units".
P.UNITS.stl = 'mm';

const Z = H.cfg();
const token = Z.token;
const realFetch = H.patchFetch(window, token);
const post = (path, body) => H.post(realFetch, token, path, body);
const deliver = data => window.dispatchEvent(new MessageEvent('message', { data }));

let counted = false;
let rendered = false;

async function handle(raw) {
  const v = P.validateWebviewMessage(raw);
  if (!v.ok) return;
  const msg = v.msg;
  try {
    switch (msg.type) {
      case 'ready': {
        const size = Number(Z.size) || 0;
        deliver({
          type: 'init', name: Z.name, format: P.formatOf(Z.name), size, sizeText: H.fmtSize(size), plan: H.sizePlan(size),
          src: H.modelSrc(window.location.origin, token, Z.name), background: 'theme', upAxis: 'auto',
        });
        return;
      }
      case 'needBytes':
        // Our fetch already reads by range; this only happens when the file went away or could not be read.
        deliver({ type: 'error', message: 'The file could not be read. It may have been moved or deleted. Close the tab and open the file again.' });
        return;
      case 'rendered':
        rendered = true;
        if (!counted) {
          counted = true;
          const r = await post('rendered', {});
          if (r && r.showRate) showRateLink();
        }
        return;
      case 'failed':
        return;
      case 'copy':
        await post('copy', { text: msg.text });
        deliver({ type: 'copied' });
        return;
      case 'screenshot': {
        const base = String(Z.name || 'model').replace(/\.[^.]+$/, '') || 'model';
        const r = await post('save', { name: base + '.png', kind: 'base64', data: H.bytesToBase64(msg.data), filters: ['png'] });
        if (r.cancelled) deliver({ type: 'saved', cancelled: true });
        else deliver({ type: 'saved', path: r.file, bytes: r.bytes });
        return;
      }
    }
  } catch (e) {
    deliver({ type: 'error', message: (e && e.message) || String(e), soft: msg.type !== 'ready' });
  }
}

window.acquireVsCodeApi = () => ({
  postMessage: m => { Promise.resolve().then(() => handle(m)); return true; },
  getState: () => null,
  setState: s => s,
});

// ---------- support line and More tools (links come from the plugin, see Support.kt) ----------
function showRateLink() {
  const a = document.getElementById('zovo-rate');
  if (a) { a.hidden = false; const sep = a.nextElementSibling; if (sep) sep.hidden = false; }
}

/** Moves the More tools section into the side panel once main.js has built it. */
function placeMoreTools() {
  const more = document.getElementById('zovo-more');
  const side = document.querySelector('aside.side');
  if (more && side) { side.append(more); more.hidden = false; }
}

// Links open in the system browser, never inside the editor tab.
document.addEventListener('click', ev => {
  const a = ev.target && ev.target.closest && ev.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  ev.preventDefault();
  if (href === '#rate') { post('rate', {}).catch(() => {}); return; }
  if (href === '#more') {
    const side = document.querySelector('aside.side');
    const panelBtn = document.querySelector('.toolbar .grow + button');
    if (side && side.hidden && panelBtn) panelBtn.click();
    const more = document.getElementById('zovo-more');
    if (more) more.scrollIntoView({ block: 'end' });
    return;
  }
  if (/^https:\/\//.test(href)) post('open', { url: href }).catch(() => {});
}, true);

// Probe for the real-IDE gate (read-only).
window.zovoShim = () => ({ token: !!token, rendered, counted, rateShown: !!(document.getElementById('zovo-rate') && !document.getElementById('zovo-rate').hidden) });

module.exports = { placeMoreTools, handle };
