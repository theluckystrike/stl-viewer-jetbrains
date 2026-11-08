// Entry of the viewer page. Checks WebGL first: without it the page shows the file facts that the
// plugin reads in Kotlin (triangle count from the STL header, and so on) and an Open in Default App button.
import { cfg, tokenPath } from './host.js';

function hasWebGL() {
  try {
    if (localStorage.getItem('zovo.forceNoWebGL') === '1') return false; // gate check of the fallback
  } catch { /* storage off */ }
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    return true;
  } catch { return false; }
}

function el(tag, attrs, text) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, v);
  if (text != null) e.textContent = text;
  return e;
}

async function showFallback() {
  const Z = cfg();
  const base = tokenPath(Z.token);
  const app = document.getElementById('app');
  app.textContent = '';
  const box = el('div', { class: 'fallback' });
  box.append(el('h1', {}, Z.name || 'Model'));
  box.append(el('p', {}, 'WebGL is turned off in this IDE (some remote and Linux setups), so the 3D view cannot be drawn. These are the facts read from the file.'));
  const pre = el('pre', { class: 'facts' }, 'Reading the file...');
  box.append(pre);
  const open = el('button', { type: 'button' }, 'Open in Default App');
  open.addEventListener('click', () => { fetch(base + 'openDefault', { method: 'POST', body: '{}' }).catch(() => {}); });
  box.append(open);
  app.append(box);
  const more = document.getElementById('zovo-more');
  if (more) { box.append(more); more.hidden = false; }
  try {
    const r = await fetch(base + 'describe');
    pre.textContent = await r.text();
  } catch (e) { pre.textContent = 'The file facts could not be read: ' + ((e && e.message) || e); }
}

if (hasWebGL()) {
  import('./shim.js').then(async shim => {
    await import('../webview/main.js');
    shim.placeMoreTools();
  });
} else {
  import('./shim.js').then(() => showFallback());
  window.zovoFallback = true;
}
