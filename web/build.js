'use strict';
// Builds the viewer page bundle into ../src/main/resources/web (committed, so the Gradle build needs no Node).
// The viewer core (src/core, src/webview) is the VS Code "STL Viewer, OBJ, PLY, GLB & glTF Preview" 0.1.7 code, unchanged.
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const root = __dirname;
const out = path.join(root, '..', 'src', 'main', 'resources', 'web');
fs.mkdirSync(out, { recursive: true });
esbuild.build({
  entryPoints: ['src/jb/page.js'], outfile: path.join(out, 'model.js'), absWorkingDir: root,
  bundle: true, minify: true, sourcemap: false, legalComments: 'none', logLevel: 'warning',
  platform: 'browser', format: 'iife', target: 'chrome120', metafile: true,
}).then(r => {
  const pkgs = new Set();
  for (const f of Object.keys(r.metafile.inputs)) { const m = /node_modules\/((?:@[^/]+\/)?[^/]+)/.exec(f); if (m) pkgs.add(m[1]); }
  if ([...pkgs].some(p => p !== 'three')) throw new Error('unexpected bundled package: ' + [...pkgs].join(', '));
  const css = fs.readFileSync(path.join(root, 'src/webview/webview.css'), 'utf8') + '\n' + fs.readFileSync(path.join(root, 'src/jb/jb.css'), 'utf8');
  fs.writeFileSync(path.join(out, 'model.css'), css);
  for (const f of fs.readdirSync(out)) console.log(f.padEnd(14), fs.statSync(path.join(out, f)).size);
  console.log('bundled packages:', [...pkgs].join(', '));
}, e => { console.error(e && e.message); process.exit(1); });
