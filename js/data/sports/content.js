/* Subject 7: Sports Translation (الترجمة الرياضية): chapters 5, 6 and 7 summarised topic by topic, in English with the Arabic
   equivalent of each key term and a short line in Arabic under each topic. Summaries only: no questions, games or exams,
   so the menu shows just Learn and Settings (cfg.summaryOnly). Each chapter is in ch5.js ... ch7.js (loaded before this file). */
(function () {
  var UN = window.UN = window.UN || {};
  var P = UN.SP = UN.SP || { chapters: [] };
  function s(en, ar) { return { en: en, ar: ar }; }

  P.chapters.sort(function (a, b) { return a.n - b.n; });
  P.groups = {}; P.groupOrder = [];
  P.chapters.forEach(function (c) { P.groups[c.g] = s(c.en, c.short); P.groupOrder.push(c.g); });

  // the shared engine still reads these, so they exist but stay empty
  P.terms = []; P.confusable = []; P.written = []; P.subs = []; P.qitems = []; P.resources = []; P.lessons = []; P.parts = {}; P.partsOrder = {};
  P.bank = { mcq: [], tf: [], cloze: [] };
  P.keys = { mcq: {}, tf: {}, cloze: {}, written: {} };
  P.explainNote = s('Everything here is AI-generated. If you spot a mistake, tell us so we can fix it.', 'كل المحتوى هنا متولّد بالذكاء الاصطناعي. لو لاحظت أي غلطة، قولنا وهنصلحها.');

  /* ---------- settings ---------- */
  P.cfg = {
    id: 'sport',
    name: s('Sports Translation', 'الترجمة الرياضية'),
    short: s('Sports', 'الرياضية'),
    icon: 'trophy', art: 'sport',
    desc: s('Chapters 5, 6 and 7 summarized: sports training, sports injuries and sports journalism', 'ملخص الفصول 5 و6 و7: التدريب الرياضي، والإصابات الرياضية، والصحافة الرياضية'),
    summaryOnly: true, chapterLang: 'en',
    subNoun: 'topic',
    exam: { terms: 0, written: 0, extras: 0, extraPool: [], sample: true, adaptive: { total: 0, targeted: 0 }, fullTotal: 0 },
    flipGoal: 20, flipDeck: 20, termGroups: [], reading: false, waveCap: 6, acts: [],
    text: {
      en: { 'learn.lead': 'Chapters 5, 6 and 7, summarized topic by topic, with the Arabic equivalent of each key term.' },
      ar: { 'learn.lead': 'ملخص الفصول 5 و6 و7 موضوعًا موضوعًا، مع المقابل العربي لكل مصطلح مهم.' }
    }
  };
})();
