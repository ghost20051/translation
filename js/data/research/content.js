/* Subject 5: Internet Research Skills (مهارات البحث على الإنترنت): chapters 1 to 4 of the course book summarised topic by
   topic, and multiple-choice questions (one item per question). The content is Arabic, with the English terms the book uses.
   Each chapter is in ch1.js ... ch4.js (loaded before this file); this file builds the questions, topics and settings. */
(function () {
  var UN = window.UN = window.UN || {};
  var D = UN.WR = UN.WR || { chapters: [], Q: [] };
  function s(en, ar) { return { en: en, ar: ar }; }

  D.chapters.sort(function (a, b) { return a.n - b.n; });
  D.groups = {}; D.groupOrder = [];
  D.chapters.forEach(function (c) { D.groups[c.g] = s(c.en, c.short); D.groupOrder.push(c.g); });
  D.terms = []; D.confusable = []; D.written = []; D.subs = []; D.parts = {}; D.partsOrder = {}; D.lessons = [];

  /* ---------- questions, chapter by chapter: [chapter, question, options (first is listed as a, ...), key, why] ---------- */
  var LETTERS = 'abcd';
  D.qitems = []; D.bank = { mcq: [], tf: [], cloze: [] }; D.keys = { mcq: {}, tf: {}, cloze: {}, written: {} };
  D.groupOrder.forEach(function (g) {
    D.Q.filter(function (q) { return q[0] === g; }).forEach(function (q) {
      var n = D.qitems.length + 1, id = 'R' + n, bid = 'RM' + n, opts = {};
      q[2].forEach(function (o, k) { opts[LETTERS.charAt(k)] = o; });
      D.qitems.push({ id: id, n: n, group: g, q: q[1] });
      D.bank.mcq.push({ id: bid, item: id, text: q[1], opts: opts, note: q[4], lang: 'ar' });
      D.keys.mcq[bid] = q[3];
    });
  });

  /* ---------- topics (for "study this next" after an exam, and the repair lab) ---------- */
  D.resources = D.chapters.map(function (c) {
    return { id: 'r-' + c.g, group: c.g, title: D.groups[c.g], text: s(c.en, c.title), tip: s('', ''), video: null, audio: null, items: [],
      related: D.qitems.filter(function (x) { return x.group === c.g; }).map(function (x) { return x.id; }) };
  });
  D.groupLesson = {};
  D.chapters.forEach(function (c) { D.groupLesson[c.g] = s('', c.lesson); });
  D.explainNote = s('These summaries follow chapters 1 to 4 of the course book, topic by topic. Check the book for any detail.',
                    'الملخصات دي مكتوبة من الفصول من 1 لـ 4 في كتاب المادة، موضوع موضوع. ارجع للكتاب في أي تفصيلة.');

  /* ---------- settings ---------- */
  var N = D.qitems.length;
  D.cfg = {
    id: 'web',
    name: s('Internet Research Skills', 'مهارات البحث على الإنترنت'),
    short: s('Research skills', 'مهارات البحث'),
    icon: 'search', art: 'web',
    desc: s('Summaries of chapters 1 to 4 and ' + N + ' multiple-choice questions', 'ملخص الفصول من 1 إلى 4 و' + N + ' سؤال اختيار من متعدد'),
    subNoun: 'topic', parts: null, reading: false,
    termGroups: D.groupOrder, waveCap: 6, flipGoal: 10, flipDeck: 10,
    acts: ['quiz', 'speed'],
    vocabTabs: [['mcq', 'vocab.allMcq']],
    exam: { qitems: 30, terms: 0, gaps: 0, written: 0, extras: 0, extraPool: [], all: true, sample: true, adaptive: { total: 20, targeted: 15 },
      desc: {
        1: s('30 multiple-choice questions from all four chapters. It sets your starting point.',
             '30 سؤال اختيار من متعدد من الفصول الأربعة. بيحدد إنت واقف فين.'),
        2: s('Aims at your weak spots: 15 of your weakest questions plus 5 general ones (20 questions). Without data yet, it is the same as Exam 1.',
             'بيركز على نقط ضعفك: 15 سؤال من أضعف أسئلتك و5 أسئلة عامة (20 سؤال). ولو لسه مفيش بيانات، بيبقى زي الامتحان 1.'),
        3: s('The final check: a fresh set of 30 questions, avoiding the ones asked in your last exam where possible.',
             'المراجعة الأخيرة: 30 سؤال جداد، وبنحاول نبعد عن أسئلة آخر امتحان على قد ما نقدر.'),
        4: s('All ' + N + ' questions in one exam, chapter by chapter. Stop whenever you like with "Finish now": only the questions you answered are marked, and you see how many you got right and wrong.',
             'كل الـ ' + N + ' سؤال في امتحان واحد، فصل فصل. تقدر توقف في أي وقت من زرار "إنهاء الآن": بيتصحح بس اللي جاوبته، وتشوف عدد الصح والغلط.')
      } },
    text: {
      en: { 'game1.name': 'Game 1: Quick Practice', 'game1.desc': 'Quick questions and a speed round from all four chapters.',
        'vocab.title': 'All questions and answers', 'vocab.lead': 'Every multiple-choice question with its answer and a short explanation, chapter by chapter.', 'vocab.search': 'Search questions…', 'nav.vocab': 'All answers',
        'learn.lead': 'Chapters 1 to 4 summarised topic by topic. Open a topic to read it, then practise the chapter.' },
      ar: { 'game1.name': 'اللعبة 1: تدريب سريع', 'game1.desc': 'أسئلة سريعة وجولة سرعة من الفصول الأربعة.',
        'vocab.title': 'كل الأسئلة والإجابات', 'vocab.lead': 'كل أسئلة الاختيار من متعدد بإجاباتها وشرح قصير، فصل فصل.', 'vocab.search': 'ابحث في الأسئلة…', 'nav.vocab': 'كل الإجابات',
        'learn.lead': 'ملخص الفصول من 1 لـ 4 موضوع موضوع. افتح أي موضوع واقراه، وبعدين اتدرب على أسئلة الفصل.' }
    }
  };
})();
