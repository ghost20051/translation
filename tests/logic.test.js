/* Run with: node tests/logic.test.js  (pure logic only; no browser needed) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
global.UN.resources = [];
['data/terms', 'data/questions', 'data/answer-keys', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };

ok('Arabic normalization: diacritics, ta marbuta, alef forms', () => {
  assert.strictEqual(UN.check.normAr('الأَمَانَةُ العَامَّةُ'), UN.check.normAr('الامانه العامه'));
  assert.ok(UN.check.matchTerm('الامانه العامه', UN.itemsById.T3, 'ar'));
  assert.ok(UN.check.matchTerm('أمانة الأمم المتحدة', UN.itemsById.T3, 'ar'));
  assert.ok(UN.check.matchTerm('مجلس الوصايه', { ar: ['مجلس الوصاية'] }, 'ar'));
  assert.ok(!UN.check.matchTerm('مجلس الامن', UN.itemsById.T17, 'ar'));
  assert.ok(!UN.check.matchTerm('', UN.itemsById.T17, 'ar'));
  assert.ok(UN.check.matchTerm('الأمانة العامة / أمانة الأمم المتحدة', UN.itemsById.T3, 'ar'), 'both forms typed together');
});
ok('English matching: case, hyphen, optional alternates', () => {
  assert.ok(UN.check.matchTerm('deputy secretary general', UN.itemsById.T5, 'en'));
  assert.ok(UN.check.matchTerm('Secretary-General', UN.itemsById.T6, 'en'));
  assert.ok(UN.check.matchTerm('speechwriter', UN.itemsById.T11, 'en'));
  assert.ok(UN.check.matchTerm('The Security Council', UN.itemsById.T2, 'en'));
  assert.ok(!UN.check.matchTerm('Security', UN.itemsById.T2, 'en'));
});
ok('Written estimate', () => {
  const k = UN.keys.written;
  assert.strictEqual(UN.check.estimateWritten(k.W3.model, k.W3.phrases).pct, 100);
  assert.strictEqual(UN.check.estimateWritten('banana', k.W3.phrases).pct, 0);
  assert.ok(UN.check.estimateWritten(k.W5.model, k.W5.phrases).pct === 100);
  assert.ok(UN.check.estimateWritten(k.W4.model, k.W4.phrases).pct === 100);
  assert.ok(UN.check.estimateWritten(k.W2.model, k.W2.phrases).pct === 100);
  assert.ok(UN.check.estimateWritten(k.W1.model, k.W1.phrases).pct === 100);
});
ok('Every item can generate every format with exactly one correct option', () => {
  UN.itemIds.forEach(id => UN.gen.formatsFor(id).concat(UN.gen.drillFormatsFor(id)).forEach(fmt => {
    for (let r = 0; r < 20; r++) {
      const q = UN.gen.make(id, fmt);
      if (q.type === 'mcq') {
        assert.strictEqual(q.options.length, 4, id + ' ' + fmt);
        assert.strictEqual(new Set(q.options.map(o => o.text)).size, 4, 'dup options ' + id + ' ' + fmt);
        assert.strictEqual(q.options.filter(o => o.id === q.answer).length, 1);
        assert.strictEqual(q.options.find(o => o.id === q.answer).text, q.correctText);
        assert.strictEqual(UN.gen.grade(q, q.answer), 1);
        assert.strictEqual(UN.gen.grade(q, q.options.find(o => o.id !== q.answer).id), 0);
      }
      if (q.type === 'tf') { assert.strictEqual(UN.gen.grade(q, q.answer), 1); assert.strictEqual(UN.gen.grade(q, !q.answer), 0); }
    }
  }));
});
ok('Term typed answers are graded from the dataset', () => {
  const q = UN.gen.make('T17', 'type-ar');
  assert.strictEqual(UN.gen.grade(q, 'مجلس الوصاية'), 1);
  assert.strictEqual(UN.gen.grade(q, 'مجلس الامن'), 0);
  const q2 = UN.gen.make('W3-neu', 'type-name');
  assert.strictEqual(UN.gen.grade(q2, 'neutrality'), 1);
  assert.strictEqual(UN.gen.grade(q2, 'objectivity'), 0);
});
ok('Approved bank answers match the approved keys', () => {
  const q = UN.gen.make('W2', 'bank:M2'); assert.strictEqual(q.correctText, '1945');
  assert.strictEqual(UN.gen.make('W4', 'bank:TF4').answer, false);
  assert.strictEqual(UN.gen.make('T17', 'bank:TF7').answer, false);
  assert.strictEqual(UN.gen.make('T2', 'bank:TF6').answer, true);
  assert.strictEqual(UN.gen.make('W2', 'bank:CL2').correctText, 'peace');
});
ok('Full exam: 30 questions, all 20 terms and 5 written once, randomized', () => {
  const a = UN.exam.buildFull(), b = UN.exam.buildFull();
  assert.strictEqual(a.qs.length, 30);
  UN.terms.forEach(t => assert.strictEqual(a.qs.filter(q => q.item === t.id).length, 1));
  UN.written.forEach(w => assert.strictEqual(a.qs.filter(q => q.item === w.id && q.type === 'written').length, 1));
  assert.strictEqual(a.qs.filter(q => q.type === 'written').length, 5);
  assert.notStrictEqual(a.qs.map(q => q.id).join(), b.qs.map(q => q.id).join());
});
ok('Scoring + self-grade + pending events excluded from stats', () => {
  const built = UN.exam.buildFull();
  const answers = {};
  built.qs.forEach((q, i) => { if (q.type === 'mcq') answers[i] = q.answer; else if (q.type === 'tf') answers[i] = q.answer; else if (q.type === 'type') answers[i] = q.correctText; else answers[i] = UN.keys.written[q.item].model; });
  const att = UN.exam.finish(1, built, answers, {});
  assert.strictEqual(UN.exam.pending(att), 5);
  assert.strictEqual(att.score, 25);
  const wr = att.rows.map((r, i) => r.type === 'written' ? i : -1).filter(i => i >= 0);
  assert.ok(!UN.adapt.rebuild().W3, 'pending written (W3 only appears as a written question) must not enter stats');
  wr.forEach(i => UN.exam.selfGrade(att.id, i, 1));
  assert.strictEqual(UN.store.get().attempts[0].pct, 100);
  assert.ok(UN.adapt.rebuild().W1.ema === 1);
});
ok('Adaptive: wrong answers rank first; exam 2 = 15 targeted + 5 general; never excludes items', () => {
  UN.store.reset();
  const built = UN.exam.buildFull();
  const wrongItems = ['T1', 'T2', 'T9', 'T13', 'W3-obj'];
  const answers = {};
  built.qs.forEach((q, i) => {
    const wrong = wrongItems.indexOf(q.item) !== -1;
    if (q.type === 'mcq') answers[i] = wrong ? q.options.find(o => o.id !== q.answer).id : q.answer;
    else if (q.type === 'tf') answers[i] = wrong ? !q.answer : q.answer;
    else if (q.type === 'type') answers[i] = wrong ? 'zzz' : q.correctText;
    else answers[i] = 'x';
  });
  const att = UN.exam.finish(1, built, answers, {});
  UN.exam.selfGrade(att.id, 0 + att.rows.findIndex(r => r.type === 'written'), 0);
  const top = UN.adapt.rank().ids;
  wrongItems.forEach(w => { if (built.qs.some(q => q.item === w)) assert.ok(top.indexOf(w) < 12, w + ' should rank high'); });
  const e2 = UN.exam.buildAdaptive();
  assert.strictEqual(e2.mode, 'adaptive'); assert.strictEqual(e2.qs.length, 20); assert.strictEqual(e2.targeted.length, 15);
  wrongItems.forEach(w => { if (built.qs.some(q => q.item === w)) assert.ok(e2.targeted.indexOf(w) !== -1, w + ' targeted'); });
  assert.strictEqual(UN.itemIds.length, 31);
});
ok('Adaptive without data falls back to full material', () => {
  UN.store.reset();
  assert.strictEqual(UN.exam.buildAdaptive().mode, 'full');
});
ok('Format variety: exam 3 prefers formats not yet seen for the same item', () => {
  UN.store.reset();
  const seen = {};
  for (let k = 0; k < 5; k++) {
    const q = UN.gen.make('T1', UN.gen.chooseFormat('T1', UN.adapt.formatCounts('T1'), null, false, ['written']));
    UN.adapt.recordEvent(1, 'T1', q.fmt, 1, 'exam1');
    assert.ok(!seen[q.fmt], 'repeated format too early: ' + q.fmt); seen[q.fmt] = 1;
  }
});
ok('Spaced repetition: correct answers raise box, a miss resets it', () => {
  UN.store.reset();
  UN.adapt.recordEvent(1, 'T3', 'x', 1, 'exam1'); UN.adapt.recordEvent(1, 'T3', 'x', 1, 'exam1');
  assert.strictEqual(UN.adapt.rebuild().T3.box, 2);
  UN.adapt.recordEvent(1, 'T3', 'x', 0, 'exam1');
  assert.strictEqual(UN.adapt.rebuild().T3.box, 0);
});
console.log('\n' + n + ' test groups passed');
