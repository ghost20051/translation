/* Run with: node tests/discourse.test.js  (Discourse Analysis subject; pure logic, no browser) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'data/tourist/definitions', 'data/tourist/help', 'data/interp/gaps', 'data/interp/bank', 'data/interp/videos', 'data/interp/videos-ar', 'data/interp/content', 'data/discourse/content', 'subjects', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };

UN.store.setSubject('disc'); UN.useSubject('disc');

ok('Subject is registered with key concepts and one multiple-choice question per item', () => {
  assert.ok(UN.subjectOrder.indexOf('disc') !== -1);
  assert.strictEqual(UN.subjectId, 'disc');
  assert.strictEqual(UN.cfg.name.en, 'Discourse Analysis'); assert.strictEqual(UN.cfg.name.ar, 'تحليل الخطاب');
  assert.ok(UN.qitems.length >= 80, 'many questions');
  assert.strictEqual(UN.bank.mcq.length, UN.qitems.length);
  assert.strictEqual(UN.itemIds.length, UN.qitems.length + UN.subs.length);
  UN.cfg.termGroups.forEach(g => assert.ok(UN.qitems.filter(q => q.group === g).length >= 10, 'questions in ' + g));
});

ok('Every question: a valid key, distinct options, an explanation; options are shuffled when asked', () => {
  UN.bank.mcq.forEach(b => {
    const key = UN.keys.mcq[b.id], opts = Object.keys(b.opts).map(k => b.opts[k]);
    assert.ok(b.opts[key], 'key ' + b.id);
    assert.strictEqual(new Set(opts.map(o => o.toLowerCase())).size, opts.length, 'duplicate option ' + b.id);
    assert.ok(opts.length >= 2 && opts.length <= 4);
    assert.ok(b.note && b.note.length > 15, 'explanation ' + b.id);
  });
  const firsts = new Set();
  for (let r = 0; r < 30; r++) { const q = UN.gen.make('D1', UN.gen.formatsFor('D1')[0]); firsts.add(q.options[0].text); assert.strictEqual(UN.gen.grade(q, q.answer), 1); assert.ok(q.extra && q.extra.note); }
  assert.ok(firsts.size > 1, 'the right answer is not always first');
});

ok('Classification questions cover all four kinds of text', () => {
  const mixKeys = UN.bank.mcq.filter(b => UN.itemsById[b.item].group === 'mix').map(b => b.opts[UN.keys.mcq[b.id]]);
  ['Cohesive and coherent', 'Cohesive but not coherent', 'Coherent but not cohesive', 'Neither cohesive nor coherent'].forEach(k => assert.ok(mixKeys.filter(x => x === k).length >= 5, k));
});

ok('Learn content: every concept has a full explanation and a short version in English and Arabic, with an example', () => {
  const AR = /[؀-ۿ]/;
  UN.subs.forEach(c => {
    assert.ok(c.full.en.length > 120 && AR.test(c.full.ar), c.name + ' full');
    assert.ok(c.short.en && AR.test(c.short.ar), c.name + ' short');
    assert.ok(c.ex.length >= 1 && c.ex.every(x => x.t && x.n.en && AR.test(x.n.ar)), c.name + ' example');
    assert.strictEqual(c.def, c.short.en);
    assert.ok(c.full.ar.toLowerCase().indexOf(c.name.toLowerCase()) !== -1, c.name + ' keeps its English name inside the Arabic');
  });
  UN.explain.forEach(s => { assert.ok(s.title.en && s.title.ar); if (s.text) assert.ok(AR.test(s.text.ar)); (s.examples || []).forEach(e => assert.ok(e.text && AR.test(e.why.ar) && Object.keys(e.tags).length)); });
  const four = UN.explain.find(s => s.id === 'x-four').examples.map(e => JSON.stringify(e.tags));
  assert.strictEqual(new Set(four).size, 4, 'the four combinations');
});

ok('Only cohesion and coherence: no acceptability, other standards or device names, and the terms are not translated word for word', () => {
  assert.deepStrictEqual(UN.subs.map(c => c.name), ['Cohesion', 'Coherence']);
  assert.deepStrictEqual(UN.cfg.termGroups, ['coh', 'cohr', 'mix']);
  const all = JSON.stringify([UN.bank.mcq, UN.subs, UN.explain, UN.groups, UN.groupLesson, UN.resources, UN.cfg.desc, UN.cfg.exam.desc, UN.cfg.text, UN.explainNote]);
  const other = /acceptab|\breference\b|substitution|ellipsis|\bconjunctions?\b|lexical|anaphor|cataphor|exophor|intentional|informativ|situational|intertext|textuality|halliday|beaugrande|cohesive device/i;
  assert.ok(!other.test(all), 'other topics: ' + (all.match(other) || [])[0]);
  const ui = require('fs').readFileSync(path.join(__dirname, '..', 'js', 'i18n-ui.js'), 'utf8');
  assert.ok(!/"da\.acc/.test(ui), 'no acceptability labels');
  const badges = (ui.match(/"da\.(coh|cohr)(No)?": "[^"]*"/g) || []).join(' ');
  assert.strictEqual((badges.match(/"da\./g) || []).length, 8, 'four labels in both languages');
  const literal = /السبك|الحبك|الاتساق|الانسجام|المقبولية|متسق|منسجم|مقبول|الإحالة|الاستبدال|الربط النحوي/;
  assert.ok(!literal.test(all + badges), 'word-for-word Arabic term: ' + ((all + badges).match(literal) || [])[0]);
});

ok('Examples use "he", never "she" (and no women in the example texts)', () => {
  const all = JSON.stringify([UN.bank.mcq, UN.subs, UN.explain]);
  assert.ok(!/\b(she|her|hers|woman|women|girl|girls)\b/i.test(all));
});

ok('Exams: 1 and 3 take 30 questions from every topic; the full exam has every question, topic by topic', () => {
  const b1 = UN.exam.build(1);
  assert.strictEqual(b1.qs.length, 30);
  b1.qs.forEach(q => assert.strictEqual(q.type, 'mcq'));
  const groups = new Set(b1.qs.map(q => UN.itemsById[q.item].group));
  assert.strictEqual(groups.size, UN.cfg.termGroups.length, 'all topics');
  assert.ok(UN.exam.hasAll());
  const b4 = UN.exam.build(4), order = UN.cfg.termGroups;
  assert.strictEqual(b4.qs.length, UN.qitems.length);
  for (let i = 1; i < b4.qs.length; i++) assert.ok(order.indexOf(UN.itemsById[b4.qs[i - 1].item].group) <= order.indexOf(UN.itemsById[b4.qs[i].item].group), 'topic order');
});

ok('Finish now: only answered questions are marked; the rest are skipped and do not count', () => {
  const b = UN.exam.build(4), ans = {};
  [0, 1, 2, 3, 4].forEach(i => { ans[i] = b.qs[i].answer; });             // five right
  [5, 6].forEach(i => { ans[i] = b.qs[i].options.find(o => o.id !== b.qs[i].answer).id; });   // two wrong
  const att = UN.exam.finish(4, b, ans, { durSec: 30, partial: true });
  assert.ok(att.partial);
  assert.strictEqual(att.rows.filter(r => r.skipped).length, b.qs.length - 7);
  assert.strictEqual(att.max, 7); assert.strictEqual(att.score, 5); assert.strictEqual(att.pct, 71);
  assert.strictEqual(UN.exam.pending(att), 0);
  // an ordinary exam still counts unanswered questions as wrong
  const b1 = UN.exam.build(1), att1 = UN.exam.finish(1, b1, { 0: b1.qs[0].answer }, { durSec: 5 });
  assert.strictEqual(att1.max, 30); assert.strictEqual(att1.score, 1);
});

ok('Games and adaptive learning work with question items', () => {
  UN.qitems.slice(0, 10).forEach(q => { const f = UN.gen.drillFormatsFor(q.id); assert.ok(f.length && f.every(x => x.indexOf('bank:') === 0)); });
  assert.strictEqual(UN.cfg.acts.indexOf('match3'), -1, 'no matching game with only three concepts');
  UN.adapt.recordEvent(999, 'D5', 'bank:DM5', 0, 'test');
  const recs = UN.adapt.recommendResources(['D5']);
  assert.ok(recs.length && recs[0].related.indexOf('D5') !== -1, 'a weak question points to its topic');
  assert.ok(UN.cfg.acts.indexOf('quiz') !== -1);
});

ok('Other subjects are unchanged: no question items there, and the SI full exam still has 120 questions', () => {
  UN.store.setSubject('si'); UN.useSubject('si');
  assert.ok(!UN.qitems || !UN.qitems.length);
  assert.strictEqual(UN.exam.build(4).qs.length, 120);
  UN.store.setSubject('un'); UN.useSubject('un');
  assert.ok(!UN.exam.hasAll());
});

console.log('\n' + n + ' discourse test groups passed');
