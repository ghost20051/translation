/* Run with: node tests/sports.test.js  (Sports Translation subject: chapter summaries only; pure logic, no browser) */
'use strict';
const assert = require('assert');
const path = require('path');
global.window = global;
global.UN = {};
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
['data/terms', 'data/questions', 'data/answer-keys', 'data/resources', 'data/lessons', 'data/tourist/terms', 'data/tourist/content', 'data/tourist/reading', 'data/tourist/definitions', 'data/tourist/help', 'data/interp/gaps', 'data/interp/bank', 'data/interp/videos', 'data/interp/videos-ar', 'data/interp/content', 'data/discourse/content', 'data/research/ch1', 'data/research/ch2', 'data/research/ch3', 'data/research/ch4', 'data/research/content', 'data/scientific/terms', 'data/scientific/reading', 'data/scientific/content', 'data/sports/ch5', 'data/sports/ch6', 'data/sports/ch7', 'data/sports/content', 'subjects', 'check', 'storage', 'generator', 'adaptive', 'progress', 'exam']
  .forEach(f => require(path.join('..', 'js', f + '.js')));

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('ok -', name); };
const AR = /[؀-ۿ]/;
// English words that may appear inside the Arabic lines (the term being explained); anything else Latin is a copying slip
const LATIN_OK = new Set(['FITT', 'HIIT', 'Conditioning', 'sprain', 'strain', 'fracture', 'tendinitis', 'tendinopathy', 'World', 'Cup']);

UN.store.setSubject('sport'); UN.useSubject('sport');
const C = UN.chapters;

// every Arabic text in the subject, with where it came from
function arabicFields() {
  const out = [];
  C.forEach(c => {
    out.push([c.g + ' title', c.titleAr], [c.g + ' intro', c.introAr], [c.g + ' summary', c.sumAr]);
    c.topics.forEach(tp => {
      out.push([tp.title, tp.titleAr], [tp.title + ' (Arabic line)', tp.ar]);
      (tp.items || []).forEach(it => { if (it.ar) out.push([it.name, it.ar]); });
      (tp.terms || []).forEach(r => out.push([r[0], r[1]]));
    });
  });
  return out;
}

ok('Subject is registered as summaries only, in English, chapters 5 to 7 in order', () => {
  assert.ok(UN.subjectOrder.indexOf('sport') !== -1);
  assert.strictEqual(UN.subjectId, 'sport');
  assert.strictEqual(UN.cfg.name.ar, 'الترجمة الرياضية');
  assert.strictEqual(UN.cfg.summaryOnly, true);
  assert.strictEqual(UN.cfg.chapterLang, 'en');
  assert.deepStrictEqual(C.map(c => c.n), [5, 6, 7]);
  assert.deepStrictEqual(C.map(c => c.title), ['Chapter 5: Sports Training and Conditioning', 'Chapter 6: Sports Injuries, Prevention, and Rehabilitation', 'Chapter 7: Sports Journalism and Media Translation']);
  C.forEach(c => assert.ok(UN.groups[c.g].en && AR.test(UN.groups[c.g].ar), 'chapter chip ' + c.g));
});

ok('No questions, games or exams for this subject', () => {
  assert.strictEqual(UN.qitems.length, 0);
  assert.strictEqual(UN.terms.length, 0);
  assert.strictEqual(UN.bank.mcq.length, 0);
  assert.deepStrictEqual(UN.cfg.acts, []);
});

ok('Every chapter and topic: English text, an Arabic title and a short Arabic line', () => {
  C.forEach(c => {
    assert.ok(c.intro && c.sum && /Key principle/.test(c.sum), 'intro and summary ' + c.g);
    assert.ok(c.topics.length >= 9, 'topics in ' + c.g);
    c.topics.forEach(tp => {
      assert.ok(/^\d\.\d+/.test(tp.title) && !AR.test(tp.title), 'English title ' + tp.title);
      assert.ok(tp.text || tp.items || tp.points || tp.terms, 'content in ' + tp.title);
      assert.ok(tp.ar && tp.titleAr, 'Arabic line and title in ' + tp.title);
      [tp.text].concat(tp.points || [], (tp.items || []).map(it => it.text || '')).filter(Boolean).forEach(x =>
        assert.ok(!AR.test(x.replace(/تمزق/g, '')), 'Arabic inside English text: ' + x.slice(0, 50)));
      (tp.items || []).forEach(it => assert.ok(it.name && !AR.test(it.name), 'item name ' + it.name));
    });
  });
});

ok('Arabic lines are clean: Arabic script, no broken marks or stray English from copying', () => {
  arabicFields().forEach(([where, ar]) => {
    assert.ok(ar && AR.test(ar), 'Arabic missing: ' + where);
    assert.ok(!/^[ً-ٰٟ.,،؛:!?)]/.test(ar), 'starts with a mark or punctuation: ' + where);
    (ar.match(/[A-Za-z]+/g) || []).forEach(w => assert.ok(LATIN_OK.has(w), 'stray English "' + w + '" in: ' + where));
  });
});

ok('Term tables: English with its Arabic equivalent, nothing listed twice in a chapter', () => {
  C.forEach(c => {
    const seen = new Set();
    c.topics.forEach(tp => {
      (tp.terms || []).forEach(r => {
        assert.strictEqual(r.length, 2);
        assert.ok(/[A-Za-z]/.test(r[0]) && !AR.test(r[0]), 'English side ' + r[0]);
        const k = r[0].toLowerCase(); assert.ok(!seen.has(k), 'listed twice in ' + c.g + ': ' + r[0]); seen.add(k);
      });
      (tp.items || []).forEach(it => { const k = it.name.toLowerCase(); assert.ok(!seen.has(k), 'listed twice in ' + c.g + ': ' + it.name); seen.add(k); });
    });
  });
});

ok('The equivalents match the chapters', () => {
  const all = {};
  C.forEach(c => c.topics.forEach(tp => {
    (tp.terms || []).forEach(r => { all[r[0]] = r[1]; });
    (tp.items || []).forEach(it => { if (it.ar) all[it.name] = it.ar; });
  }));
  assert.strictEqual(all['Specificity'], 'الخصوصية / التخصصية');
  assert.strictEqual(all['Training load'], 'الحمل التدريبي');
  assert.strictEqual(all['Tapering'], 'خفض الحمل التدريبي تدريجيًا / التخفيف التدريجي للتدريب');
  assert.strictEqual(all['Sprain'], 'التواء / التواء رباطي');
  assert.strictEqual(all['Anterior cruciate ligament (ACL)'], 'الرباط الصليبي الأمامي');
  assert.strictEqual(all['Delayed Onset Muscle Soreness (DOMS)'], 'ألم العضلات المتأخر الظهور');
  assert.strictEqual(all['Return to play'], 'العودة إلى اللعب');
  assert.strictEqual(all['Injury time'], 'الوقت المحتسب بدل الضائع');
  assert.strictEqual(all['Throw in the towel'], 'الاستسلام');
  assert.strictEqual(all['Literal (avoid)'], 'كان المهاجم مشتعلاً');
});

ok('Site wording: everything is AI-generated, no mention of where the content came from', () => {
  const text = JSON.stringify([C, UN.cfg, UN.explainNote]);
  assert.ok(!/lecture|textbook|course ?book|question bank|doctor|professor|\bthe book\b/i.test(text));
  assert.ok(/AI-generated/.test(UN.explainNote.en) && /الذكاء الاصطناعي/.test(UN.explainNote.ar));
});

ok('Other subjects are unchanged', () => {
  UN.store.setSubject('web'); UN.useSubject('web');
  assert.ok(!UN.cfg.summaryOnly && !UN.cfg.chapterLang);
  assert.ok(UN.chapters.every(c => AR.test(c.title)) && UN.qitems.length > 200, 'research chapters stay Arabic with their questions');
  UN.store.setSubject('sci'); UN.useSubject('sci');
  assert.ok(UN.terms.length >= 560 && !UN.chapters);
  UN.store.setSubject('un'); UN.useSubject('un');
});

console.log('\n' + n + ' sports test groups passed');
