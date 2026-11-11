/*
 * Scientific Translation (الترجمة العلمية): settings, topics and the empty parts of the shared engine.
 * The words are in terms.js; the texts, their translations and the key points are in reading.js (both loaded first).
 * Only the words are used in games and exams: the texts are for reading (no questions are made from them).
 */
(function () {
  var UN = window.UN = window.UN || {};
  var X = UN.X = UN.X || {};
  function s(en, ar) { return { en: en, ar: ar }; }

  X.subs = []; X.written = []; X.lessons = []; X.parts = {}; X.partsOrder = {};
  X.bank = { mcq: [], tf: [], cloze: [] };
  X.keys = { mcq: {}, tf: {}, cloze: {}, written: {} };

  /* ---------- topics on the Learn page: the words, letter by letter ---------- */
  X.resources = X.termGroups.map(function (g) {
    var items = X.terms.filter(function (t) { return t.group === g; }).map(function (t) { return t.id; });
    return { id: 'r-' + g, group: g, items: items, title: X.groups[g],
      text: s('Learn these ' + items.length + ' words, then test yourself with the flip cards and the matching game.', 'احفظ الـ ' + items.length + ' كلمة دول، وبعدين اختبر نفسك بالبطاقات ولعبة التوصيل.'),
      tip: s('Say the English word, cover the Arabic, and remember one meaning.', 'قول الكلمة الإنجليزي، غطّي العربي، وافتكر معنى واحد على الأقل.'), video: null, audio: null };
  });

  /* ---------- settings ---------- */
  var N = X.terms.length, P = X.reading.passages.length;
  X.cfg = {
    id: 'sci',
    name: s('Scientific Translation', 'الترجمة العلمية'),
    short: s('Scientific', 'العلمية'),
    icon: 'zap', art: 'sci',
    desc: s(P + ' texts with their translations, the key points, and ' + N + ' scientific words', P + ' نصوص مع ترجمتها، وأهم النقاط، و' + N + ' كلمة علمية'),
    subNoun: 'word',
    exam: { terms: 30, written: 0, extras: 0, extraPool: [], sample: true, adaptive: { total: 20, targeted: 15 }, fullTotal: 30 },
    flipGoal: 20, flipDeck: 20, termGroups: X.termGroups, reading: true, readingFirst: 'tr', waveCap: 6,
    acts: ['flip', 'match1', 'match2', 'speed'],
    text: {
      en: { 'reading.title': 'Texts & translations', 'reading.lead': 'Each text with its translation, paragraph by paragraph or as a whole, and the key points in English and Arabic.',
        'reading.tabSum': 'Key points', 'reading.tabTr': 'Texts', 'reading.bannerSub': P + ' texts with their translations, and the key points',
        'game1.desc': 'Flip cards, matching and a speed round with the scientific words.' },
      ar: { 'reading.title': 'النصوص والترجمة', 'reading.lead': 'كل نص مع ترجمته، فقرة بفقرة أو النص كامل، وأهم النقاط بالإنجليزي والعربي.',
        'reading.tabSum': 'أهم النقاط', 'reading.tabTr': 'النصوص', 'reading.bannerSub': P + ' نصوص مع ترجمتها، وأهم النقاط',
        'game1.desc': 'بطاقات وتوصيل وجولة سرعة بالكلمات العلمية.' }
    }
  };
})();
