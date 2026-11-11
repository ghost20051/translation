/* Run with: node tests/code.test.js  (static checks on the scripts themselves; no browser)
   A helper defined twice in the same file silently replaces the first one (the later declaration wins), which once turned
   every word list into "X 1, X 2 ..." when a new helper reused the name termTable. Inner helpers of different pages may
   share a name, so only the top level of each file (two-space indent inside its wrapper) is checked. */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };
const root = path.join(__dirname, '..', 'js');
const files = [];
(function walk(dir) { fs.readdirSync(dir).forEach(f => { const p = path.join(dir, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.js')) files.push(p); }); })(root);

ok('No script defines the same top-level helper twice', () => {
  files.forEach(f => {
    const names = (fs.readFileSync(f, 'utf8').match(/^ {2}function [A-Za-z_$][\w$]*/gm) || []).map(s => s.trim().slice(9));
    const dup = names.filter((x, i) => names.indexOf(x) !== i);
    assert.deepStrictEqual(dup, [], path.relative(root, f) + ' defines twice: ' + dup.join(', '));
  });
});

ok('Every script the page loads exists and is in the offline cache', () => {
  const html = fs.readFileSync(path.join(root, '..', 'index.html'), 'utf8'), sw = fs.readFileSync(path.join(root, '..', 'sw.js'), 'utf8');
  const srcs = (html.match(/<script src="([^"]+)"/g) || []).map(s => s.slice(13, -1));
  assert.ok(srcs.length > 30);
  srcs.forEach(s => {
    assert.ok(fs.existsSync(path.join(root, '..', s)), 'missing file ' + s);
    assert.ok(sw.indexOf("'" + s + "'") !== -1, 'not in sw.js FILES: ' + s);
  });
});

console.log('\n' + n + ' code test groups passed');
