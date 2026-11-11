/*
 * Subject registry. The study engine (games, exams, adaptive learning, lessons) is shared;
 * each subject only supplies content: terms, written questions, answer keys, resources, lessons.
 * useSubject(id) points the shared engine at one subject's content.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var FIELDS = ['cfg', 'groups', 'confusable', 'terms', 'written', 'subs', 'bank', 'keys', 'resources', 'lessons', 'parts', 'partsOrder', 'reading', 'gaps', 'videos', 'qitems', 'explain', 'explainNote', 'groupLesson', 'chapters'];

  UN.subjects = {};
  UN.subjectOrder = [];

  UN.registerSubject = function (id, def) {
    UN.subjects[id] = def;
    if (UN.subjectOrder.indexOf(id) === -1) UN.subjectOrder.push(id);
  };

  // Subject 1: UN Translation (content files already loaded into the UN.* globals)
  var un = {};
  FIELDS.forEach(function (f) { un[f] = UN[f]; });
  un.cfg = {
    id: 'un',
    name: { en: 'UN Translation', ar: 'ترجمة الأمم المتحدة' },
    short: { en: 'UN', ar: 'الأمم المتحدة' },
    icon: 'landmark', art: 'un',
    desc: { en: 'United Nations bodies, offices, documents and written answers', ar: 'هيئات الأمم المتحدة ومكاتبها ووثائقها والإجابات المقالية' },
    subNoun: 'characteristic',
    exam: { terms: 'all', written: 'all', extras: 5, extraPool: ['W3-acc', 'W3-cla', 'W3-obj', 'W3-con', 'W3-neu', 'W3-cnf', 'W1', 'W2', 'W4', 'W5'], sample: false, adaptive: { total: 20, targeted: 15 }, fullTotal: 30 },
    flipGoal: 20, flipDeck: 20, termGroups: ['organs', 'sgoffice', 'offices', 'docs', 'translation'],
    bodyGroups: ['organs', 'sgoffice', 'offices'], bodyKey: 'g1.body', reading: false, waveCap: 7
  };
  UN.registerSubject('un', un);

  // Subject 2: Tourist Translation (content in UN.T, loaded from js/data/tourist/*.js)
  if (UN.T) {
    var tour = {};
    FIELDS.forEach(function (f) { tour[f] = UN.T[f]; });
    UN.registerSubject('tour', tour);
  }

  // Subject 3: Simultaneous Interpretation (fill-in-the-gap questions, content in UN.SI)
  if (UN.SI) {
    var si = {};
    FIELDS.forEach(function (f) { si[f] = UN.SI[f]; });
    si.cfg = UN.SI.cfg;
    UN.registerSubject('si', si);
  }

  // Subject 4: Discourse Analysis (one multiple-choice question per item, explanations; content in UN.DA)
  if (UN.DA) {
    var da = {};
    FIELDS.forEach(function (f) { da[f] = UN.DA[f]; });
    UN.registerSubject('disc', da);
  }

  // Subject 5: Internet Research Skills (chapter summaries, one multiple-choice question per item; content in UN.WR)
  if (UN.WR && UN.WR.cfg) {
    var wr = {};
    FIELDS.forEach(function (f) { wr[f] = UN.WR[f]; });
    UN.registerSubject('web', wr);
  }

  // Subject 6: Scientific Translation (words, and texts with their translations; content in UN.X)
  if (UN.X && UN.X.cfg) {
    var sci = {};
    FIELDS.forEach(function (f) { sci[f] = UN.X[f]; });
    UN.registerSubject('sci', sci);
  }

  // Subject 7: Sports Translation (chapter summaries only, no questions; content in UN.SP)
  if (UN.SP && UN.SP.cfg) {
    var sport = {};
    FIELDS.forEach(function (f) { sport[f] = UN.SP[f]; });
    UN.registerSubject('sport', sport);
  }

  UN.useSubject = function (id) {
    var s = UN.subjects[id] || UN.subjects.un;
    FIELDS.forEach(function (f) { UN[f] = s[f]; });
    UN.subjectId = UN.subjects[id] ? id : 'un';
    if (UN.gen && UN.gen.rebuildIndex) UN.gen.rebuildIndex();
  };

  UN.useSubject('un');
})();
