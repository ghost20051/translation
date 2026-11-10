/* Run with: node tests/research.test.js  (Internet Research Skills subject; pure logic, no browser) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'data/tourist/definitions', 'data/tourist/help', 'data/interp/gaps', 'data/interp/bank', 'data/interp/videos', 'data/interp/videos-ar', 'data/interp/content', 'data/discourse/content', 'data/research/ch1', 'data/research/ch2', 'data/research/ch3', 'data/research/ch4', 'data/research/content', 'subjects', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };
const AR = /[؀-ۿ]/;

UN.store.setSubject('web'); UN.useSubject('web');

ok('Subject is registered with four chapters and one multiple-choice question per item', () => {
  assert.ok(UN.subjectOrder.indexOf('web') !== -1);
  assert.strictEqual(UN.subjectId, 'web');
  assert.strictEqual(UN.cfg.name.ar, 'مهارات البحث على الإنترنت');
  assert.deepStrictEqual(UN.chapters.map(c => c.n), [1, 2, 3, 4]);
  assert.deepStrictEqual(UN.cfg.termGroups, ['c1', 'c2', 'c3', 'c4']);
  assert.ok(UN.qitems.length >= 200, 'many questions');
  assert.strictEqual(UN.bank.mcq.length, UN.qitems.length);
  assert.strictEqual(UN.itemIds.length, UN.qitems.length);
  UN.cfg.termGroups.forEach(g => assert.ok(UN.qitems.filter(q => q.group === g).length >= 40, 'questions in ' + g));
});

ok('Chapter summaries: every chapter has a title, an introduction, topics and a conclusion, all in Arabic', () => {
  UN.chapters.forEach(c => {
    assert.ok(AR.test(c.title) && AR.test(c.intro) && AR.test(c.sum) && AR.test(c.lesson), 'chapter ' + c.n);
    assert.ok(c.topics.length >= 8, 'topics in chapter ' + c.n);
    c.topics.forEach(tp => {
      assert.ok(AR.test(tp.title), tp.title);
      assert.ok(tp.text || (tp.points && tp.points.length) || (tp.items && tp.items.length), 'content of ' + tp.title);
      (tp.items || []).forEach(it => assert.ok(it.name && AR.test(it.text), it.name));
    });
  });
});

ok('Every question: Arabic, a valid key, distinct options, an explanation; shown right to left', () => {
  UN.bank.mcq.forEach(b => {
    const key = UN.keys.mcq[b.id], opts = Object.keys(b.opts).map(k => b.opts[k]);
    assert.ok(b.opts[key], 'key ' + b.id);
    assert.strictEqual(new Set(opts).size, opts.length, 'duplicate option ' + b.id);
    assert.ok(opts.length >= 2 && opts.length <= 4);
    assert.ok(AR.test(b.text) && b.note && b.note.length >= 3, 'text and note ' + b.id);
    assert.strictEqual(b.lang, 'ar');
    assert.ok(b.id.indexOf('SM') !== 0, 'not the SI bank prefix');
  });
  const texts = UN.bank.mcq.map(b => b.text);
  assert.strictEqual(new Set(texts).size, texts.length, 'no question twice');
  const firsts = new Set();
  for (let r = 0; r < 30; r++) {
    const q = UN.gen.make('R1', UN.gen.formatsFor('R1')[0]);
    assert.strictEqual(q.promptLang, 'ar'); assert.ok(q.options.every(o => o.lang === 'ar'));
    firsts.add(q.options[0].text); assert.strictEqual(UN.gen.grade(q, q.answer), 1); assert.ok(q.extra && q.extra.note);
  }
  assert.ok(firsts.size > 1, 'the right answer is not always first');
});

ok('True or false questions are two-choice questions with both answers used', () => {
  const tf = UN.bank.mcq.filter(b => /^صح أم خطأ/.test(b.text));
  assert.ok(tf.length >= 25, 'true or false questions');
  tf.forEach(b => assert.deepStrictEqual(Object.keys(b.opts).map(k => b.opts[k]), ['صح', 'خطأ']));
  const keys = new Set(tf.map(b => UN.keys.mcq[b.id]));
  assert.ok(keys.has('a') && keys.has('b'));
});

ok('Chapter facts follow the book', () => {
  const ans = re => { const b = UN.bank.mcq.find(x => re.test(x.text)); assert.ok(b, String(re)); return b.opts[UN.keys.mcq[b.id]]; };
  assert.strictEqual(ans(/ما الترتيب الصحيح لمراحل عمل محرك البحث الكبير/), 'الزحف ثم الفهرسة ثم الترتيب');
  assert.strictEqual(ans(/ما العمليات الثلاث الرئيسية لعمل محرك البحث كما يسميها هذا الفصل/), 'الاكتشاف ← الفهرسة ← الاسترجاع والترتيب');
  assert.strictEqual(ans(/ما المحاور الخمسة لمعيار CRAAP/), 'Currency وRelevance وAuthority وAccuracy وPurpose');
  assert.strictEqual(ans(/بماذا تبدأ أكثر بادئات DOI شيوعًا/), '10');
  assert.strictEqual(ans(/أي وكالة تختص بتسجيل DOI لبيانات البحث/), 'DataCite');
  assert.strictEqual(ans(/من كم رقمًا ورمزًا يتكون معرف ORCID/), '16');
  assert.strictEqual(ans(/بموجب أي ترخيص يُدار ROR/), 'CC0');
});

ok('Examples use "he": no feminine forms, and nothing says where the questions come from', () => {
  const all = JSON.stringify([UN.bank.mcq, UN.chapters, UN.cfg, UN.explainNote]);
  assert.ok(!/(^|[^؀-ۿ])(باحثة|طالبة|امرأة|سيدة|فتاة)([^؀-ۿ]|$)/.test(all), 'feminine form');
  assert.ok(!/\b(she|her|hers|woman|women|girl|girls)\b/i.test(all));
  assert.ok(!/الدكتور(?!اه)|الامتحان النهائي|بنك أسئلة|بنك الأسئلة/.test(all), 'no word about the exam or the question bank');
});

ok('Exams: 1 takes 30 questions from every chapter; the full exam has every question, chapter by chapter', () => {
  const b1 = UN.exam.build(1);
  assert.strictEqual(b1.qs.length, 30);
  assert.strictEqual(new Set(b1.qs.map(q => UN.itemsById[q.item].group)).size, 4, 'all chapters');
  assert.ok(UN.exam.hasAll());
  const b4 = UN.exam.build(4), order = UN.cfg.termGroups;
  assert.strictEqual(b4.qs.length, UN.qitems.length);
  for (let i = 1; i < b4.qs.length; i++) assert.ok(order.indexOf(UN.itemsById[b4.qs[i - 1].item].group) <= order.indexOf(UN.itemsById[b4.qs[i].item].group), 'chapter order');
  const ans = {}; [0, 1, 2].forEach(i => { ans[i] = b4.qs[i].answer; });
  const att = UN.exam.finish(4, b4, ans, { durSec: 20, partial: true });
  assert.strictEqual(att.max, 3); assert.strictEqual(att.score, 3);
});

ok('Practice and adaptive learning work by chapter', () => {
  UN.adapt.recordEvent(999, 'R5', 'bank:RM5', 0, 'test');
  const recs = UN.adapt.recommendResources(['R5']);
  assert.ok(recs.length && recs[0].id === 'r-c1', 'a weak question points to its chapter');
  assert.ok(UN.groupLesson.c1.ar && !UN.groupLesson.c1.en);
  assert.deepStrictEqual(UN.cfg.acts, ['quiz', 'speed']);
});

ok('Other subjects are unchanged: English bank questions stay English, the SI full exam still has 120 questions', () => {
  UN.store.setSubject('disc'); UN.useSubject('disc');
  assert.ok(!UN.chapters);
  const q = UN.gen.make('D1', UN.gen.formatsFor('D1')[0]);
  assert.strictEqual(q.promptLang, 'en'); assert.ok(q.options.every(o => o.lang === 'en'));
  UN.store.setSubject('si'); UN.useSubject('si');
  assert.strictEqual(UN.exam.build(4).qs.length, 120);
  UN.store.setSubject('un'); UN.useSubject('un');
  assert.ok(!UN.exam.hasAll());
});

console.log('\n' + n + ' research test groups passed');
