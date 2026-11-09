/* Run with: node tests/tourist.test.js  (Tourist Translation subject + subject switching; pure logic, no browser) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'data/tourist/definitions', 'data/tourist/help', 'data/interp/gaps', 'data/interp/bank', 'data/interp/videos', 'data/interp/content', 'subjects', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };
const answerFor = q => (q.type === 'mcq' || q.type === 'tf') ? q.answer : (q.type === 'type' ? q.correctText.split(' / ')[0] : 'x');

ok('Subjects are registered; UN stays the default and keeps its size', () => {
  assert.deepStrictEqual(UN.subjectOrder, ['un', 'tour', 'si']);
  assert.strictEqual(UN.subjectId, 'un');
  assert.strictEqual(UN.itemIds.length, 31);
});

UN.useSubject('tour');

ok('Tourist data: enough terms, unique ids, Arabic present, no duplicate English', () => {
  assert.ok(UN.terms.length >= 250, 'terms: ' + UN.terms.length);
  assert.strictEqual(new Set(UN.itemIds).size, UN.itemIds.length);
  const seen = {};
  UN.terms.forEach(x => {
    assert.ok(x.en && x.ar.length && x.ar.every(a => a.trim()), 'bad term ' + x.id);
    assert.ok(UN.groups[x.group], 'unknown group ' + x.group);
    const k = UN.check.normEn(x.en);
    assert.ok(!seen[k], 'duplicate English: ' + x.en);
    seen[k] = x.id;
  });
  UN.terms.forEach(x => (x.enAlt || []).forEach(a => {
    const k = UN.check.normEn(a);
    assert.ok(!seen[k] || seen[k] === x.id, 'alternate English clashes with another term: ' + a);
  }));
});

ok('Tourist data: every question has a key and points at an existing item', () => {
  UN.bank.mcq.forEach(q => { assert.ok(UN.itemsById[q.item], q.id); assert.ok(UN.keys.mcq[q.id] in q.opts, q.id); });
  UN.bank.tf.forEach(q => { assert.ok(UN.itemsById[q.item], q.id); assert.strictEqual(typeof UN.keys.tf[q.id], 'boolean', q.id); });
  UN.written.forEach(w => {
    const k = UN.keys.written[w.id];
    assert.ok(k && k.model && k.phrases.length, w.id);
    assert.strictEqual(UN.check.estimateWritten(k.model, k.phrases).pct, 100, 'model must match its own key phrases: ' + w.id);
    assert.ok(UN.gen.formatsFor(w.id).length > 1, 'no objective question for ' + w.id);
  });
});

ok('Tourist: every format of every item is valid; distractors never share the correct Arabic', () => {
  UN.itemIds.forEach(id => {
    const it = UN.itemsById[id];
    UN.gen.formatsFor(id).concat(UN.gen.drillFormatsFor(id)).forEach(fmt => {
      for (let r = 0; r < 3; r++) {
        const q = UN.gen.make(id, fmt);
        if (q.type === 'mcq') {
          assert.strictEqual(q.options.length, 4, id + ' ' + fmt);
          assert.strictEqual(new Set(q.options.map(o => o.text)).size, 4, 'duplicate option ' + id + ' ' + fmt);
          assert.strictEqual(UN.gen.grade(q, q.answer), 1);
          if (fmt === 'mcq-en2ar' || fmt === 'mcq-ar2en') {
            const same = new Set(it.same || []);
            q.options.filter(o => o.id !== q.answer).forEach(o => {
              const other = UN.terms.find(x => (fmt === 'mcq-en2ar' ? x.arShow : x.en) === o.text);
              assert.ok(other && !same.has(other.id), 'ambiguous distractor for ' + id);
            });
          }
        }
        if (q.type === 'tf') { assert.strictEqual(UN.gen.grade(q, q.answer), 1); assert.strictEqual(UN.gen.grade(q, !q.answer), 0); }
      }
    });
  });
});

ok('Typed answers: both Arabic names together, accents, terms sharing an Arabic word', () => {
  const tour = UN.terms.find(x => x.en === 'Tour');
  const q = UN.gen.make(tour.id, 'type-en');
  assert.strictEqual(UN.gen.grade(q, 'trip'), 1, 'trip and tour both mean رحلة');
  assert.strictEqual(UN.gen.grade(q, 'tour'), 1);
  assert.strictEqual(UN.gen.grade(q, 'hotel'), 0);
  const alc = UN.gen.make(UN.terms.find(x => x.en === 'A la carte menu').id, 'type-en');
  assert.strictEqual(UN.gen.grade(alc, 'à la carte menu'), 1);
  const agency = UN.terms.find(x => x.en === 'Travel agency');
  assert.ok(UN.check.matchTerm('شركة سياحة / وكالة سفر / وكالة السفر', agency, 'ar'));
  assert.ok(UN.check.matchTerm('وكالة سفر', agency, 'ar'));
});

ok('Tourist exam: 40 questions, balanced across categories; Exam 3 asks different terms', () => {
  UN.store.reset();
  const e1 = UN.exam.buildFull();
  assert.strictEqual(e1.qs.length, 40);
  assert.strictEqual(e1.qs.filter(q => q.fmt === 'written').length, 4);
  const termQs = e1.qs.filter(q => UN.itemsById[q.item].kind === 'term');
  assert.strictEqual(termQs.length, 28);
  assert.strictEqual(new Set(termQs.map(q => q.item)).size, 28, 'terms must be unique');
  assert.strictEqual(new Set(termQs.map(q => UN.itemsById[q.item].group)).size, UN.cfg.termGroups.length, 'every category covered');
  const answers = {};
  e1.qs.forEach((q, i) => { answers[i] = answerFor(q); });
  const att = UN.exam.finish(1, e1, answers, {});
  assert.strictEqual(att.max, 40);
  const t1 = termQs.map(q => q.item);
  const t3 = UN.exam.buildFull().qs.filter(q => UN.itemsById[q.item].kind === 'term').map(q => q.item);
  assert.strictEqual(t3.filter(x => t1.indexOf(x) !== -1).length, 0, 'Exam 3 should use fresh terms when possible');
});

ok('Tourist adaptive exam: 20 questions, 15 from the weakest items', () => {
  UN.store.reset();
  const built = UN.exam.buildFull();
  const wrong = built.qs.filter(q => q.type === 'mcq').slice(0, 6).map(q => q.item);
  const ans = {};
  built.qs.forEach((q, i) => { ans[i] = (q.type === 'mcq' && wrong.indexOf(q.item) !== -1) ? q.options.find(o => o.id !== q.answer).id : answerFor(q); });
  UN.exam.finish(1, built, ans, {});
  const e2 = UN.exam.buildAdaptive();
  assert.strictEqual(e2.mode, 'adaptive');
  assert.strictEqual(e2.qs.length, 20);
  assert.strictEqual(e2.targeted.length, 15);
  wrong.forEach(w => assert.ok(e2.targeted.indexOf(w) !== -1, 'missed item should be targeted: ' + w));
});

ok('Progress is kept separately for each subject', () => {
  UN.store.reset();
  UN.store.setSubject('tour'); UN.useSubject('tour');
  UN.adapt.recordEvent(1, UN.terms[0].id, 'mcq-en2ar', 1, 'game1'); UN.prog.addXP(50);
  UN.store.setSubject('un'); UN.useSubject('un');
  assert.strictEqual(UN.store.get().events.length, 0);
  assert.strictEqual(UN.store.get().xp, 0);
  UN.store.setSubject('tour'); UN.useSubject('tour');
  assert.strictEqual(UN.store.get().events.length, 1);
  assert.strictEqual(UN.store.get().xp, 50);
  UN.store.reset();
  assert.strictEqual(UN.store.get().events.length, 0);
});

ok('Tourist lessons and resources point at real items; every term is in a lesson', () => {
  UN.lessons.forEach(l => l.steps.forEach(st => {
    (st.ids || []).forEach(id => assert.ok(UN.itemsById[id], l.id + ' ' + id));
    if (st.q) assert.ok(UN.itemsById[st.q] && UN.keys.written[st.q], l.id + ' ' + st.q);
  }));
  UN.resources.forEach(r => r.items.forEach(id => assert.ok(UN.itemsById[id], r.id + ' ' + id)));
  UN.lessons.forEach(l => assert.ok(UN.resources.some(r => r.id === l.res), l.id));
  const covered = new Set();
  UN.lessons.forEach(l => l.steps.forEach(st => { if (st.t === 'pairs') st.ids.forEach(i => covered.add(i)); }));
  assert.strictEqual(covered.size, UN.terms.length, 'every term appears in a lesson');
});

ok('Reading data: 9 passages, both directions, with translations', () => {
  const p = UN.reading.passages;
  assert.strictEqual(p.length, 9);
  assert.ok(p.every(x => x.source.length > 50 && x.target.length > 50));
  assert.strictEqual(p.filter(x => x.dir === 'en2ar').length, 4);
  assert.strictEqual(p.filter(x => x.dir === 'ar2en').length, 5);
});
ok('Definitions: original kept verbatim, short simple version, translations present, define questions graded', () => {
  const withOrig = UN.itemIds.map(i => UN.itemsById[i]).filter(x => x.orig);
  assert.ok(withOrig.length >= 14 + 15, 'definitions with an original: ' + withOrig.length);
  UN.subs.forEach(x => {
    assert.ok(x.orig && x.def && x.origOther && x.defOther, 'missing parts ' + x.id);
    assert.ok(x.def.length <= x.orig.length, 'simple version must not be longer than the original: ' + x.id);
    assert.ok(x.def.split(' ').length <= 20, 'simple version too long: ' + x.id);
  });
  withOrig.filter(x => x.kind === 'term').forEach(x => assert.ok(x.origOther && x.defOther, 'term translation ' + x.id));
  const sub = UN.subs[0], q = UN.gen.make(sub.id, 'define');
  assert.strictEqual(q.type, 'written');
  assert.strictEqual(q.correctText, sub.def);
  assert.strictEqual(UN.check.estimateBy(sub.def, [sub.def, sub.orig]), 100);
  assert.strictEqual(UN.check.estimateBy(sub.orig, [sub.def, sub.orig]), 100);
  assert.strictEqual(UN.check.estimateBy('hotel room', [sub.def, sub.orig]), 0);
  const term = withOrig.find(x => x.kind === 'term');
  assert.strictEqual(UN.check.estimateBy(term.def, [term.def, term.orig]), 100);
  UN.store.reset();
  const att = UN.exam.finish(1, { mode: 'full', qs: [q], extras: [], writtenIds: [], targeted: [] }, { 0: sub.def }, {});
  assert.strictEqual(att.rows[0].est, 100);
  assert.strictEqual(att.rows[0].orig, sub.orig);
  assert.strictEqual(att.rows[0].graded, false);
  UN.store.reset();
});


ok('Typos in typed terms: English and Arabic', () => {
  const rec = UN.terms.find(x => x.en === 'Reception');
  assert.ok(UN.check.matchTerm('Recepsion', rec, 'en'));
  assert.ok(!UN.check.matchTerm('Receipt', rec, 'en'));
  const land = UN.terms.find(x => x.en === 'Land');
  assert.ok(!UN.check.matchTerm('Hand', land, 'en'), 'short words stay exact');
  const agency = UN.terms.find(x => x.en === 'Travel agency');
  assert.ok(UN.check.matchTerm('travel agancy', agency, 'en'));
  assert.ok(UN.check.matchTerm('وكاله سفر', agency, 'ar'), 'normalisation still works');
  assert.ok(UN.check.matchTerm('وكالة سفرر', agency, 'ar'), 'one extra Arabic letter on a long answer');
  assert.ok(!UN.check.matchTerm('مطعم', agency, 'ar'));
});

console.log('\n' + n + ' tourist test groups passed');
