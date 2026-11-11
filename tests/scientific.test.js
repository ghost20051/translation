/* Run with: node tests/scientific.test.js  (Scientific Translation subject; pure logic, no browser) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'data/tourist/definitions', 'data/tourist/help', 'data/interp/gaps', 'data/interp/bank', 'data/interp/videos', 'data/interp/videos-ar', 'data/interp/content', 'data/discourse/content', 'data/research/ch1', 'data/research/ch2', 'data/research/ch3', 'data/research/ch4', 'data/research/content', 'data/scientific/terms', 'data/scientific/reading', 'data/scientific/content', 'subjects', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };
const AR = /[؀-ۿ]/;

UN.store.setSubject('sci'); UN.useSubject('sci');

ok('Subject is registered with the word list in letter groups', () => {
  assert.ok(UN.subjectOrder.indexOf('sci') !== -1);
  assert.strictEqual(UN.subjectId, 'sci');
  assert.strictEqual(UN.cfg.name.ar, 'الترجمة العلمية');
  assert.ok(UN.terms.length >= 560, 'the whole word list');
  UN.cfg.termGroups.forEach(g => assert.ok(UN.terms.filter(t => t.group === g).length >= 25, 'words in ' + g));
  assert.strictEqual(UN.terms.filter(t => UN.cfg.termGroups.indexOf(t.group) === -1).length, 0);
});

ok('Every word: English, Arabic as shown, the meanings that count, and no duplicates', () => {
  const seen = new Set();
  UN.terms.forEach(t => {
    assert.ok(/^[A-Za-z]/.test(t.en), 'English ' + t.id);
    assert.ok(AR.test(t.arShow) && t.ar.length && t.ar.every(a => a && AR.test(a)), 'Arabic ' + t.en);
    assert.ok(!/[)(]{2}|^[)،]|[(،]$/.test(t.arShow), 'broken brackets or commas in ' + t.en);
    assert.ok(!seen.has(t.en.toLowerCase()), 'duplicate ' + t.en); seen.add(t.en.toLowerCase());
  });
  const find = en => UN.terms.find(t => t.en === en);
  assert.strictEqual(find('absorb').arShow, 'امتص، تشرب');
  assert.strictEqual(find('category').arShow, 'فئة، صنف، فصيلة');
  assert.ok(/مقياس سلسيوس/.test(find('Celsius (°C)').arShow));
  assert.ok(/المجرة/.test(find('Milky Way').arShow));
});

ok('Games and exams use the words: multiple choice both ways, typed answers accept any meaning', () => {
  const q = UN.gen.make('X1', 'mcq-en2ar');
  assert.strictEqual(new Set(q.options.map(o => o.text)).size, q.options.length);
  assert.strictEqual(UN.gen.grade(q, q.answer), 1);
  const typed = UN.gen.make('X14', 'type-ar');   // alternate: several meanings
  assert.strictEqual(UN.gen.grade(typed, 'متناوب'), 1);
  assert.strictEqual(UN.gen.grade(typed, 'تعاقب'), 1);
  const b1 = UN.exam.build(1);
  assert.strictEqual(b1.qs.length, 30);
  b1.qs.forEach(x => assert.ok(UN.itemsById[x.item].kind === 'term'));
  assert.deepStrictEqual(UN.cfg.acts, ['flip', 'match1', 'match2', 'speed']);
});

ok('Texts: each paragraph has its translation, the smoking text uses the lecture translation, no text twice', () => {
  const P = UN.reading.passages;
  assert.ok(P.length >= 6);
  assert.strictEqual(new Set(P.map(p => p.id)).size, P.length);
  P.forEach(p => {
    assert.ok(p.paras.length >= 2, p.id);
    p.paras.forEach(pair => {
      const src = p.dir === 'en2ar' ? pair[0] : pair[1], ar = p.dir === 'en2ar' ? pair[1] : pair[0];
      assert.ok(/[A-Za-z]/.test(src) && AR.test(ar), p.id + ': ' + pair[0].slice(0, 30));
    });
  });
  const smoke = P.find(p => p.id === 'smoke');
  assert.ok(smoke.lecture && P.filter(p => p.lecture).length === 1);
  assert.strictEqual(smoke.paras[1][1], 'A statistical study released in London on Saturday revealed that 6.3 million people had died in Britain from smoking-related diseases over the past fifty years.');
  assert.strictEqual(smoke.paras[5][1], 'The study added that these deaths reached their peak in the 1960s, when tobacco smoking was responsible for half of all deaths among middle-aged men.');
  const firsts = P.map(p => p.paras[1][0].slice(0, 40)); assert.strictEqual(new Set(firsts).size, firsts.length, 'no duplicate texts');
});

ok('Slides: every point in English with a simple Arabic translation', () => {
  const S = UN.reading.summaries;
  assert.ok(S.length >= 8);
  S.forEach(sec => { assert.ok(sec.title.en && AR.test(sec.title.ar)); sec.points.forEach(p => assert.ok(p.en && AR.test(p.ar), p.en.slice(0, 40))); });
  const all = JSON.stringify(S);
  ['Arabization', 'calque', 'Naturalization', 'Cross-cultural recognized', 'atomic number', 'العدد الذري'].forEach(w => assert.ok(all.indexOf(w) !== -1, w));
});

ok('Other subjects are unchanged', () => {
  UN.store.setSubject('tour'); UN.useSubject('tour');
  assert.ok(UN.reading.passages.every(p => !p.paras), 'tourist passages keep their own format');
  UN.store.setSubject('si'); UN.useSubject('si');
  assert.strictEqual(UN.exam.build(4).qs.length, 120);
  UN.store.setSubject('un'); UN.useSubject('un');
});

console.log('\n' + n + ' scientific test groups passed');
