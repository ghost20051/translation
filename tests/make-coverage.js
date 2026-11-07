/* Regenerates COVERAGE.md from the data files: node tests/make-coverage.js */
'use strict';
const fs = require('fs');
const path = require('path');
global.window = global; global.UN = {};
global.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'subjects', 'check', 'storage', 'generator']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let md = '# Content coverage checklist\n\nGenerated from the data files in `js/data/` by `node tests/make-coverage.js`. Every approved item is reachable in games, in the exams (UN: every item; Tourist: a balanced sample that changes each time), in the Memory Lessons and in the learning center. Nothing is ever excluded.\n';
UN.subjectOrder.forEach(id => {
  UN.useSubject(id);
  md += '\n## ' + UN.cfg.name.en + ' (' + UN.itemIds.length + ' items)\n\n';
  md += '| Item | Category | Content | Question formats |\n|---|---|---|---|\n';
  UN.itemIds.forEach(i => {
    const it = UN.itemsById[i];
    const label = it.kind === 'term' ? it.en + ' = ' + it.arShow : it.kind === 'sub' ? it.name + ': ' + it.def : it.q;
    md += '| ' + i + ' | ' + it.group + ' | ' + label.replace(/\|/g, '/') + ' | ' + UN.gen.formatsFor(i).join(', ') + ' |\n';
  });
});
fs.writeFileSync(path.join(__dirname, '..', 'COVERAGE.md'), md);
console.log('COVERAGE.md written');
