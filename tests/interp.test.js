/* Run with: node tests/interp.test.js  (Simultaneous Interpretation subject; pure logic, no browser) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'data/tourist/definitions', 'data/tourist/help', 'data/interp/gaps', 'data/interp/bank', 'data/interp/videos', 'data/interp/videos-ar', 'data/interp/content', 'subjects', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };
const answerFor = q => (q.type === 'mcq' || q.type === 'tf') ? q.answer : (q.type === 'type' ? q.correctText : 'x');

UN.useSubject('si');

ok('Subject is registered with 80 fill-in-the-gap items in 5 topics', () => {
  assert.ok(UN.subjectOrder.indexOf('si') !== -1);
  assert.strictEqual(UN.subjectId, 'si');
  assert.strictEqual(UN.gaps.length, 80);
  assert.strictEqual(UN.itemIds.length, 80 + 20 + 10, 'gaps + essays + key concepts');
  assert.strictEqual(new Set(UN.itemIds).size, 110);
  UN.gaps.forEach((g, i) => {
    assert.strictEqual(g.n, i + 1);
    assert.ok(UN.groups[g.group], 'unknown group ' + g.id);
    assert.ok(g.answer && g.note && g.q.split('__').length === 2, 'bad item ' + g.id);
  });
  const counts = {}; UN.gaps.forEach(g => { counts[g.group] = (counts[g.group] || 0) + 1; });
  assert.deepStrictEqual(counts, { segm: 13, study: 12, time: 15, evs: 16, bil: 24 });
  assert.strictEqual(UN.written.length, 20);
  assert.strictEqual(UN.subs.length, 10);
  assert.strictEqual(UN.bank.mcq.length, 20);
});

ok('Source answers are kept exactly as supplied (spot checks)', () => {
  const a = i => UN.gaps[i - 1].answer;
  assert.strictEqual(a(1), 'Comprehension'); assert.strictEqual(a(8), 'Syntactic'); assert.strictEqual(a(16), 'EVS');
  assert.strictEqual(a(23), 'Removed'); assert.strictEqual(a(48), 'Balanced'); assert.strictEqual(a(61), 'Décalage');
  assert.strictEqual(a(64), '2 seconds'); assert.strictEqual(a(65), '10 seconds'); assert.strictEqual(a(66), 'Source-language');
  assert.strictEqual(a(72), 'Longer'); assert.strictEqual(a(79), 'Early'); assert.strictEqual(a(80), 'Performance');
  assert.ok(/early sequential/i.test(UN.gaps[78].note));
});

ok('Typed answers: exact, case, plural, "the", listed alternatives; wrong answers rejected', () => {
  UN.gaps.forEach(g => {
    const q = UN.gen.make(g.id, 'type-gap');
    assert.strictEqual(UN.gen.grade(q, g.answer), 1, g.id + ' own answer');
    assert.strictEqual(UN.gen.grade(q, g.answer.toUpperCase()), 1, g.id + ' upper case');
    g.alt.forEach(a => assert.strictEqual(UN.gen.grade(q, a), 1, g.id + ' alt ' + a));
    assert.strictEqual(UN.gen.grade(q, ''), 0);
    assert.strictEqual(UN.gen.grade(q, 'zebra'), 0);
  });
  const g4 = UN.gen.make('G4', 'type-gap');
  assert.strictEqual(UN.gen.grade(g4, 'interpreter'), 1, 'singular accepted');
  const g3 = UN.gen.make('G3', 'type-gap');
  assert.strictEqual(UN.gen.grade(g3, 'the storage'), 1);
  assert.strictEqual(UN.gen.grade(UN.gen.make('G64', 'type-gap'), 'two'), 1);
  assert.strictEqual(UN.gen.grade(UN.gen.make('G64', 'type-gap'), '6'), 0);
  assert.strictEqual(UN.gen.grade(UN.gen.make('G66', 'type-gap'), 'source language'), 1);
  assert.strictEqual(UN.gen.grade(UN.gen.make('G79', 'type-gap'), 'early'), 1);
  assert.strictEqual(UN.gen.grade(UN.gen.make('G79', 'type-gap'), 'simultaneous'), 0, 'the book says early sequential');
  ['Décalage', 'decalage', 'time delay'].forEach(x => assert.strictEqual(UN.gen.grade(UN.gen.make('G61', 'type-gap'), x), 1, 'G61 ' + x));
  assert.strictEqual(UN.gen.grade(UN.gen.make('G65', 'type-gap'), 'ten'), 1);
  assert.strictEqual(UN.gen.grade(UN.gen.make('G65', 'type-gap'), '6 seconds'), 0);
});

ok('Multiple choice: 4 distinct options, one correct, no clashing distractors, a/an fits, no numbers as distractors', () => {
  const clash = (x, y) => UN.cfg.clash.some(s => s.indexOf(UN.check.normEn(x)) !== -1 && s.indexOf(UN.check.normEn(y)) !== -1);
  UN.gaps.forEach(g => {
    for (let r = 0; r < 25; r++) {
      const q = UN.gen.make(g.id, 'mcq-gap');
      assert.strictEqual(q.type, 'mcq');
      assert.strictEqual(q.options.length, 4, g.id);
      assert.strictEqual(new Set(q.options.map(o => o.text.toLowerCase())).size, 4, 'duplicate option ' + g.id);
      assert.strictEqual(UN.gen.grade(q, q.answer), 1);
      assert.strictEqual(q.options.find(o => o.id === q.answer).text, g.answer);
      const wrong = q.options.filter(o => o.id !== q.answer).map(o => o.text);
      wrong.forEach(w => {
        assert.ok(!clash(w, g.answer), 'clashing distractor ' + w + ' for ' + g.id);
        if (!/^\d/.test(g.answer)) assert.ok(!/^\d/.test(w), 'numeric distractor for ' + g.id);
        if (/\ba __/.test(g.q)) assert.ok(!/^[aeiou]/i.test(w), '"a" gives away ' + g.id);
        if (/\ban __/.test(g.q)) assert.ok(/^[aeiou]/i.test(w), '"an" gives away ' + g.id);
      });
      assert.ok(q.prompt.indexOf('______') !== -1 && q.prompt.indexOf('__') === q.prompt.indexOf('______'));
      assert.ok(q.extra.note && q.extra.q === g.q && q.extra.ans === g.answer);
    }
  });
});

ok('Exam 1: Part 1 fill in the gap (24), Part 2 multiple choice (12), Part 3 written (4), in that order and numbered', () => {
  UN.store.reset();
  const e1 = UN.exam.buildFull();
  assert.strictEqual(e1.qs.length, 40);
  assert.strictEqual(new Set(e1.qs.map(q => q.item)).size, 40, 'every question asks a different item');
  const part = p => e1.qs.filter(q => q.part === p);
  assert.strictEqual(part(1).length, 24); assert.strictEqual(part(2).length, 12); assert.strictEqual(part(3).length, 4);
  assert.deepStrictEqual(e1.qs.map(q => q.part), [].concat(Array(24).fill(1), Array(12).fill(2), Array(4).fill(3)), 'parts come in order');
  assert.deepStrictEqual(part(1).map(q => q.pn), Array.from({ length: 24 }, (_, i) => i + 1), 'numbered 1..24 inside the part');
  assert.deepStrictEqual(part(2).map(q => q.pn), Array.from({ length: 12 }, (_, i) => i + 1));
  assert.ok(part(1).every(q => q.fmt === 'type-gap' && q.type === 'type'), 'Part 1 is typed, never multiple choice');
  assert.ok(part(2).every(q => q.fmt.indexOf('bank:') === 0 && q.type === 'mcq'));
  assert.ok(part(3).every(q => q.fmt === 'written'));
  const per = {}; part(1).forEach(q => { const g = UN.itemsById[q.item].group; per[g] = (per[g] || 0) + 1; });
  assert.strictEqual(Object.keys(per).length, 5, 'every topic is in Part 1: ' + JSON.stringify(per));
  const answers = {}; e1.qs.forEach((q, i) => { answers[i] = answerFor(q); });
  const att = UN.exam.finish(1, e1, answers, {});
  assert.strictEqual(att.max, 40);
  assert.ok(att.rows.every(r => r.part && r.pn), 'rows keep their part and number');
  assert.ok(att.rows.filter(r => r.type !== 'written').every(r => r.note));
  assert.strictEqual(att.rows.filter(r => r.type === 'written').length, 4);
  const firstGap = new Set(part(1).map(q => q.item)), firstMcq = new Set(part(2).map(q => q.item));
  const e3 = UN.exam.buildFull();
  assert.strictEqual(e3.qs.filter(q => q.part === 1 && firstGap.has(q.item)).length, 0, 'Exam 3 Part 1 is fresh');
  assert.ok(e3.qs.filter(q => q.part === 2 && !firstMcq.has(q.item)).length >= 8, 'Exam 3 Part 2 uses the 8 MCQs not asked before');
  UN.store.reset();
});

ok('Gap questions with choices are labelled as practice, typed ones as Part 1', () => {
  UN.gaps.forEach(g => {
    assert.deepStrictEqual(UN.gen.partOf({ item: g.id, fmt: 'mcq-gap' }), { part: 5, n: g.n });
    assert.deepStrictEqual(UN.gen.partOf({ item: g.id, fmt: 'type-gap' }), { part: 1, n: g.n });
  });
  assert.strictEqual(UN.cfg.parts.length, 5);
});

ok('Part labels: every question knows its part and number', () => {
  UN.gaps.forEach(g => assert.deepStrictEqual(UN.gen.partOf({ item: g.id, fmt: 'type-gap' }), { part: 1, n: g.n }));
  UN.bank.mcq.forEach((b, i) => assert.deepStrictEqual(UN.gen.partOf({ item: b.item, fmt: 'bank:' + b.id }), { part: 2, n: i + 1 }));
  UN.written.forEach(w => assert.deepStrictEqual(UN.gen.partOf({ item: w.id, fmt: 'written' }), { part: 3, n: w.n }));
  assert.deepStrictEqual(UN.gen.partOf({ item: 'SK3', fmt: 'mcq-def' }), { part: 4, n: 3 });
  UN.useSubject('tour'); assert.strictEqual(UN.gen.partOf({ item: 'R1', fmt: 'mcq-en2ar' }), null, 'other subjects have no parts'); UN.useSubject('si');
});

ok('Fill-in-the-gap questions are never multiple choice in any exam, many times over', () => {
  for (let r = 0; r < 25; r++) {
    UN.store.reset();
    const a = UN.exam.buildFull(), b = UN.exam.buildAdaptive();
    [a, b].forEach(e => e.qs.forEach(q => assert.notStrictEqual(q.fmt, 'mcq-gap', 'exam asked a gap as multiple choice')));
    assert.ok(a.qs.filter(q => q.part === 1).every(q => q.type === 'type'));
  }
  // adaptive exam after some history
  UN.store.reset();
  const built = UN.exam.buildFull(); const ans = {}; built.qs.forEach((q, i) => { ans[i] = q.type === 'mcq' ? q.options.find(o => o.id !== q.answer).id : 'zzz'; });
  UN.exam.finish(1, built, ans, {});
  for (let r = 0; r < 25; r++) UN.exam.buildAdaptive().qs.forEach(q => assert.notStrictEqual(q.fmt, 'mcq-gap'));
  UN.store.reset();
});

ok('Practice still offers the multiple-choice version of a gap (games, lessons)', () => {
  assert.ok(UN.gen.formatsFor('G1').indexOf('mcq-gap') !== -1);
  assert.ok(UN.gen.drillFormatsFor('G1').indexOf('mcq-gap') !== -1);
});

ok('Exam 2 targets missed items', () => {
  UN.store.reset();
  const built = UN.exam.buildFull();
  const wrong = built.qs.filter(q => q.type !== 'written').slice(0, 6).map(q => q.item);
  const ans = {};
  built.qs.forEach((q, i) => { ans[i] = wrong.indexOf(q.item) !== -1 ? 'zzz' : answerFor(q); });
  UN.exam.finish(1, built, ans, {});
  const e2 = UN.exam.buildAdaptive();
  assert.strictEqual(e2.qs.length, 20); assert.strictEqual(e2.targeted.length, 15);
  wrong.forEach(w => assert.ok(e2.targeted.indexOf(w) !== -1, 'missed item targeted: ' + w));
  UN.store.reset();
});

ok('Every format of every item works in drills too (games use them)', () => {
  UN.gaps.forEach(g => {
    const f = UN.gen.formatsFor(g.id);
    assert.ok(f.indexOf('mcq-gap') !== -1 && f.indexOf('type-gap') !== -1);
    UN.gen.drillFormatsFor(g.id).forEach(x => assert.ok(UN.gen.make(g.id, x)));
  });
  UN.written.forEach(w => { UN.gen.make(w.id, 'written'); UN.gen.make(w.id, 'recall'); });
  UN.subs.forEach(s => UN.gen.formatsFor(s.id).forEach(x => { const q = UN.gen.make(s.id, x); if (q.type === 'mcq') assert.strictEqual(UN.gen.grade(q, q.answer), 1); }));
});

ok('The 20 multiple-choice questions match the supplied answers', () => {
  const exp = ['b','b','a','c','b','c','a','b','c','c','b','c','a','c','c','a','b','b','c','b'];
  UN.bank.mcq.forEach((b, i) => {
    assert.strictEqual(UN.keys.mcq[b.id], exp[i], b.id);
    assert.ok(UN.itemsById[b.item] && UN.itemsById[b.item].kind === 'gap', 'attached to a gap item ' + b.id);
    assert.ok(UN.gen.formatsFor(b.item).indexOf('bank:' + b.id) !== -1);
    const q = UN.gen.make(b.item, 'bank:' + b.id);
    assert.strictEqual(q.options.find(o => o.id === q.answer).text, b.opts[exp[i]]);
    assert.strictEqual(UN.gen.grade(q, q.answer), 1);
  });
});

ok('Essays: model answers match their own key phrases, memory tricks present, both exam formats work', () => {
  UN.written.forEach(w => {
    const k = UN.keys.written[w.id];
    assert.ok(k.model && k.trick && k.phrases.length >= 3, w.id);
    assert.strictEqual(UN.check.estimateWritten(k.model, k.phrases).pct, 100, 'model must match its own key phrases: ' + w.id);
    assert.strictEqual(UN.check.estimateWritten('banana pizza', k.phrases).pct, 0);
    assert.ok(UN.groups[w.group]);
  });
  const w1 = UN.keys.written.SW1;
  assert.ok(UN.check.estimateWritten('It is listening and interpreting at the same time and it is difficult to measure because the gap keeps changing', w1.phrases).pct >= 75);
});

ok('Resources and Memory Lessons cover all 80 items and point at real ones', () => {
  const inRes = new Set(); UN.resources.forEach(r => r.items.forEach(i => { assert.ok(UN.itemsById[i]); inRes.add(i); }));
  assert.strictEqual(inRes.size, 110);
  assert.strictEqual(UN.lessons.length, 6);
  const inLesson = new Set();
  UN.lessons.forEach(l => {
    assert.ok(UN.resources.some(r => r.id === l.res), l.id);
    assert.strictEqual(l.steps[l.steps.length - 1].t, 'check', 'a lesson ends with a check');
    l.steps.forEach(st => (st.ids || []).forEach(i => { assert.ok(UN.itemsById[i], l.id + ' ' + i); if (st.t === 'gaps') inLesson.add(i); }));
  });
  assert.strictEqual(inLesson.size, 80);
});

ok('Progress is kept separately for each subject', () => {
  UN.store.reset();
  UN.store.setSubject('si'); UN.useSubject('si');
  UN.adapt.recordEvent(1, 'G1', 'mcq-gap', 1, 'game1'); UN.prog.addXP(30);
  UN.store.setSubject('tour'); UN.useSubject('tour');
  assert.strictEqual(UN.store.get().events.length, 0);
  UN.store.setSubject('si'); UN.useSubject('si');
  assert.strictEqual(UN.store.get().events.length, 1);
  assert.strictEqual(UN.store.get().xp, 30);
  UN.store.reset();
});

ok('Typos: a small spelling slip still counts; short or different words do not', () => {
  const g = id => UN.gen.make(id, 'type-gap');
  assert.strictEqual(UN.gen.grade(g('G1'), 'Comprehention'), 1);
  assert.strictEqual(UN.check.fuzzy(), 'Comprehension');
  assert.strictEqual(UN.gen.grade(g('G1'), 'Comprehension'), 1);
  assert.strictEqual(UN.check.fuzzy(), null, 'exact answers report no typo');
  assert.strictEqual(UN.gen.grade(g('G8'), 'sintactic'), 1);
  assert.strictEqual(UN.gen.grade(g('G14'), 'outpt'), 1);
  assert.strictEqual(UN.gen.grade(g('G74'), 'desicions'), 1);
  assert.strictEqual(UN.gen.grade(g('G16'), 'EVZ'), 0, 'three-letter answers must be exact');
  assert.strictEqual(UN.gen.grade(g('G9'), 'Lexicon'), 0, 'a different word two letters away');
  assert.strictEqual(UN.gen.grade(g('G14'), 'Input'), 0, 'the opposite word is still wrong');
  assert.strictEqual(UN.gen.grade(g('G20'), 'Output'), 0);
  assert.strictEqual(UN.gen.grade(g('G1'), 'Strategy'), 0);
  assert.strictEqual(UN.check.nearMiss('hand', 'land', false), false, 'four-letter words must be exact');
  // no two different gap answers are within typo distance of each other, so a typo can never turn into another answer
  const all = Array.from(new Set(UN.gaps.map(x => x.answer.toLowerCase())));
  all.forEach(a => all.forEach(b => { if (a !== b && a.replace(/s$/, '') !== b.replace(/s$/, '')) assert.ok(!UN.check.nearMiss(a, b, false), a + ' / ' + b); }));
});

function sc0(v) { return v.scenes[0]; }
ok('Videos: 19 short explainers with valid scenes, narration and question links; every question is explained somewhere', () => {
  const V = UN.videos, TYPES = ['title', 'def', 'lanes', 'chunks', 'compare', 'steps', 'picture', 'recap', 'story', 'example'];
  assert.strictEqual(V.length, 19);
  assert.strictEqual(new Set(V.map(v => v.id)).size, 19);
  V.forEach((v, i) => {
    assert.strictEqual(v.id, 'v' + ('0' + (i + 1)).slice(-2));
    assert.ok(v.title && /[\u0600-\u06FF]/.test(v.ar), v.id + ' needs a title and an Arabic summary line');
    assert.strictEqual(v.scenes[0].t, 'title'); assert.strictEqual(v.scenes[v.scenes.length - 1].t, 'recap');
    let words = 0;
    v.scenes.forEach(sc => {
      assert.ok(TYPES.indexOf(sc.t) !== -1, v.id + ' unknown scene ' + sc.t);
      const w = sc.say.split(/\s+/).length; words += w;
      assert.ok(w >= 3 && w <= 75, v.id + ' scene narration length ' + w);
      if (sc.t === 'chunks') (sc.groups || []).forEach(g => assert.ok(g.from <= g.to && g.to < sc.words.length, v.id + ' chunk group'));
      if (sc.t === 'picture') assert.ok(sc.caption && (sc.emoji || sc.art));
      if (sc.t === 'compare') assert.ok(sc.left.items.length && sc.right.items.length);
    });
    assert.ok(words >= 50 && words <= 320, v.id + ' total narration ' + words);
    // a worked example in every video, and an Arabic narration line for every scene
    const ex = v.scenes.filter(s => s.t === 'example');
    assert.ok(ex.length >= 1, v.id + ' needs a worked example');
    ex.forEach(s => s.rows.forEach(r => assert.ok(['src', 'tgt', 'good', 'bad', 'note'].indexOf(r.who) !== -1 && r.text, v.id + ' example row')));
    const ar = UN.SI.videosAr[v.id];
    assert.ok(ar && ar.length === v.scenes.length, v.id + ' Arabic narration lines ' + (ar && ar.length) + ' vs scenes ' + v.scenes.length);
    ar.forEach((line, i) => assert.ok(/[\u0600-\u06FF]/.test(line) && line.length > 8 && line.length <= 400, v.id + ' Arabic line ' + i + ' (max 400 characters for the Arabic voice tool)'));
    assert.ok(v.gist && /\?$|:/.test(v.title) || v.id === 'v19', v.id + ' title should be a clear question');
    if (sc0(v).say.indexOf('Video ') !== 0) assert.fail(v.id + ' title narration');
    (v.scenes.filter(s => s.t === 'story')).forEach(s => s.beats.forEach(b => assert.ok(['speaker', 'interp', 'audience', 'note'].indexOf(b.who) !== -1 && b.text, v.id + ' story beat')));
    v.refs.gaps.forEach(n => assert.ok(n >= 1 && n <= 80)); v.refs.mcq.forEach(n => assert.ok(n >= 1 && n <= 20)); v.refs.essay.forEach(n => assert.ok(n >= 1 && n <= 20));
  });
  const cov = { gaps: new Set(), mcq: new Set(), essay: new Set() };
  V.forEach(v => Object.keys(cov).forEach(k => v.refs[k].forEach(n => cov[k].add(n))));
  assert.strictEqual(cov.gaps.size, 80, 'every fill-in-the-gap question has a video');
  // every photo used exists in the registry and on disk, and has a licence and an author
  const fsx = require('fs'), P = UN.SI.photos;
  Object.keys(P).forEach(k => { assert.ok(P[k].license && P[k].by && /^https:\/\/commons\.wikimedia\.org\//.test(P[k].source), k); assert.ok(fsx.existsSync(path.join(__dirname, '..', 'media', 'img', 'si', P[k].file)), 'missing photo file ' + k); });
  V.forEach(v => v.scenes.forEach(sc => { if (sc.photo) assert.ok(P[sc.photo], v.id + ' unknown photo ' + sc.photo); }));
  V.forEach(v => { if (v.cover) assert.ok(P[v.cover], v.id + ' unknown cover ' + v.cover); });
  assert.ok(V.filter(v => v.scenes.some(sc => sc.photo) || v.cover).length >= 17, 'most videos use a real photo'); assert.strictEqual(cov.mcq.size, 20); assert.strictEqual(cov.essay.size, 20);
});

console.log('\n' + n + ' interpretation test groups passed');
