'use strict';
// The committed bundle and the core files.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const web = path.join(__dirname, '..');
const res = path.join(web, '..', 'src', 'main', 'resources', 'web');
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

test('bundle: present, built from the current sources, uses the plugin routes', () => {
  const js = fs.readFileSync(path.join(res, 'model.js'), 'utf8');
  assert.ok(js.length > 300000 && js.length < 1500000, 'size ' + js.length);
  assert.match(js, /acquireVsCodeApi/);
  assert.match(js, /X-File-Size/);
  assert.match(js, /UNITS\.stl="mm"/);
  assert.doesNotMatch(js, /\bimport\(/, 'dynamic imports are inlined');
  const newest = ['src/jb/page.js', 'src/jb/shim.js', 'src/jb/host.js', 'src/webview/main.js', 'src/core/protocol.js', 'src/core/stats.js']
    .map(f => fs.statSync(path.join(web, f)).mtimeMs).reduce((a, b) => Math.max(a, b));
  assert.ok(fs.statSync(path.join(res, 'model.js')).mtimeMs >= newest - 1000, 'run npm run bundle after changing web/src');
  const css = fs.readFileSync(path.join(res, 'model.css'), 'utf8');
  assert.ok(css.includes(fs.readFileSync(path.join(web, 'src/webview/webview.css'), 'utf8')));
});

test('core files are the VS Code viewer files, unchanged', t => {
  const vs = path.join(web, '..', '..', 'model-viewer-vscode');
  if (!fs.existsSync(vs)) { t.skip('model-viewer-vscode is not next to this repo'); return; }
  for (const [mine, theirs] of [['src/core/protocol.js', 'src/core/protocol.js'], ['src/core/stats.js', 'src/core/stats.js'], ['src/webview/main.js', 'src/webview/main.js'], ['src/webview/webview.css', 'media/webview.css']])
    assert.equal(sha(path.join(web, mine)), sha(path.join(vs, theirs)), mine);
});
