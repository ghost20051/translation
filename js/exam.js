/*
 * Examination logic: building, scoring, saving. No UI here.
 * Exam 1 and 3: whole material (20 terms + 5 written + 5 extra checks) = 30 questions.
 * Exam 2: 20 questions, about 15 from the weakest items and 5 general (or whole material if there is no data yet).
 */
(function () {
  var UN = window.UN = window.UN || {};
  var G = function () { return UN.gen; };

  var EXTRA_POOL = ['W3-acc', 'W3-cla', 'W3-obj', 'W3-con', 'W3-neu', 'W3-cnf', 'W1', 'W2', 'W4', 'W5'];

  function qFor(id, rng, avoid) {
    var fmt = G().chooseFormat(id, UN.adapt.formatCounts(id), rng, false, avoid);
    return G().make(id, fmt, rng);
  }

  function lastFullExtras() {
    var a = UN.store.get().attempts;
    for (var i = a.length - 1; i >= 0; i--) if (a[i].kind === 'exam' && a[i].extras) return a[i].extras;
    return [];
  }

  function buildFull(rng) {
    var qs = [];
    UN.terms.forEach(function (t) { qs.push(qFor(t.id, rng, ['written'])); });
    UN.written.forEach(function (w) { qs.push(G().make(w.id, 'written', rng)); });

    var r = UN.adapt.rank(rng), prev = lastFullExtras();
    var cands = r.ids.filter(function (id) { return EXTRA_POOL.indexOf(id) !== -1; });
    var fresh = cands.filter(function (id) { return prev.indexOf(id) === -1; });
    var extras = fresh.concat(cands.filter(function (id) { return fresh.indexOf(id) === -1; })).slice(0, 5);
    extras.forEach(function (id) { qs.push(qFor(id, rng, ['written'])); });
    return { mode: 'full', qs: G().shuffle(qs, rng), extras: extras, targeted: [] };
  }

  function buildAdaptive(rng) {
    if (!UN.adapt.hasData()) return buildFull(rng);
    var r = UN.adapt.rank(rng);
    var targeted = r.ids.slice(0, 15);
    var general = G().shuffle(r.ids.slice(15), rng).slice(0, 5);
    var qs = targeted.concat(general).map(function (id) { return qFor(id, rng); });
    return { mode: 'adaptive', qs: G().shuffle(qs, rng), extras: [], targeted: targeted };
  }

  function build(no, rng) { return no === 2 ? buildAdaptive(rng) : buildFull(rng); }

  // Score of one answered question (written items are 0 until self-graded).
  function valueOf(q, given) {
    if (q.type === 'written' || q.type === 'recall') return 0;
    return G().grade(q, given);
  }

  function totals(rows) {
    var s = 0; rows.forEach(function (r) { s += r.v; });
    return { score: s, max: rows.length, pct: rows.length ? Math.round(100 * s / rows.length) : 0 };
  }

  function givenText(q, given) {
    if (given == null || given === '') return '';
    if (q.type === 'mcq') { var o = q.options.filter(function (x) { return x.id === given; })[0]; return o ? o.text : ''; }
    if (q.type === 'tf') return given ? 'True' : 'False';
    return String(given);
  }

  // Save an exam sitting. answers: { index: given }. Returns the stored attempt.
  function finish(no, built, answers, meta) {
    var store = UN.store.get(), id = UN.store.nextId();
    var rows = built.qs.map(function (q, i) {
      var given = answers[i];
      var row = { item: q.item, fmt: q.fmt, type: q.type, prompt: q.prompt, pl: q.promptLang, given: givenText(q, given),
        correct: q.correctText, v: valueOf(q, given), est: null, graded: q.type !== 'written' };
      if (q.type === 'written') row.est = UN.check.estimateWritten(given || '', UN.keys.written[q.item].phrases).pct;
      return row;
    });
    var att = { id: id, kind: 'exam', no: no, ts: Date.now(), mode: built.mode, rows: rows, extras: built.extras, targeted: built.targeted, durSec: meta && meta.durSec };
    var t = totals(rows); att.score = t.score; att.max = t.max; att.pct = t.pct;
    store.attempts.push(att);
    rows.forEach(function (r) { UN.adapt.recordEvent(id, r.item, r.fmt, r.v, 'exam' + no, !r.graded); });
    var e = store.exams[no] || (store.exams[no] = { history: [] });
    e.history.push({ id: id, pct: att.pct, ts: att.ts });
    UN.prog.addXP(rows.reduce(function (a, r) { return a + (r.v >= 1 ? 10 : 0); }, 0) + 40);
    UN.store.save();
    return att;
  }

  // Student self-grade for a written answer: v in {1, 0.5, 0}
  function selfGrade(attId, rowIndex, v) {
    var store = UN.store.get(), att = store.attempts.filter(function (a) { return a.id === attId; })[0];
    if (!att) return null;
    var row = att.rows[rowIndex];
    row.v = v; row.graded = true;
    UN.adapt.setEventValue(attId, row.item, v);
    var t = totals(att.rows); att.score = t.score; att.pct = t.pct;
    var h = store.exams[att.no].history.filter(function (x) { return x.id === attId; })[0];
    if (h) h.pct = att.pct;
    UN.store.save();
    return att;
  }

  function pending(att) { return att.rows.filter(function (r) { return !r.graded; }).length; }

  UN.exam = { build: build, buildFull: buildFull, buildAdaptive: buildAdaptive, finish: finish, selfGrade: selfGrade, totals: totals, pending: pending, valueOf: valueOf };
})();
