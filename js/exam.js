/*
 * Examination logic: building, scoring, saving. No UI here. Sizes come from the subject's config (UN.cfg.exam).
 *   Exam 1 and 3: whole material. UN: every term + every written question + extras. Tourist: a balanced sample
 *     across all categories (different items each time where possible).
 *   Exam 2: weak items first (targeted) plus a few general ones, or the whole-material exam when there is no data yet.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var G = function () { return UN.gen; };
  function cfg() { return UN.cfg.exam; }

  function qFor(id, rng, avoid) {
    // fill-in-the-gap questions in an exam are always typed; the multiple-choice version is for practice only
    if (cfg().typedGaps && UN.itemsById[id].kind === 'gap') avoid = (avoid || []).concat(['mcq-gap']);
    var fmt = G().chooseFormat(id, UN.adapt.formatCounts(id), rng, false, avoid);
    return G().make(id, fmt, rng);
  }

  function lastFull() {
    var a = UN.store.get().attempts;
    for (var i = a.length - 1; i >= 0; i--) if (a[i].kind === 'exam' && a[i].mode === 'full') return a[i];
    return null;
  }

  // n terms spread evenly over the term groups, weakest / least-seen first, preferring items not asked last time
  function stratified(n, r, prev, kind, skip) {
    var byGroup = {}, order = [];
    r.ids.forEach(function (id) {
      var it = UN.itemsById[id];
      if (it.kind !== (kind || 'term')) return;
      if (skip && skip[id]) return;
      if (!byGroup[it.group]) { byGroup[it.group] = []; order.push(it.group); }
      byGroup[it.group].push(id);
    });
    var total = 0, quota = {}, used = 0;
    order.forEach(function (g) { total += byGroup[g].length; });
    order.forEach(function (g) { var exact = n * byGroup[g].length / total; quota[g] = { q: Math.floor(exact), rem: exact - Math.floor(exact) }; used += quota[g].q; });
    order.slice().sort(function (a, b) { return quota[b].rem - quota[a].rem; }).forEach(function (g) { if (used < n) { quota[g].q++; used++; } });
    var out = [];
    order.forEach(function (g) {
      var fresh = byGroup[g].filter(function (id) { return !prev[id]; }), old = byGroup[g].filter(function (id) { return prev[id]; });
      out = out.concat(fresh.concat(old).slice(0, quota[g].q));
    });
    return out;
  }

  // number the questions inside each part: Part 1 Q1, Q2 ... then Part 2 Q1 ...
  function labelParts(qs) {
    var cnt = {};
    qs.forEach(function (q) { var p = G().partOf(q); if (p) { q.part = p.part; q.pn = cnt[p.part] = (cnt[p.part] || 0) + 1; } });
    return qs;
  }
  function inParts(qs, rng) {
    var by = {};
    qs.forEach(function (q) { var p = G().partOf(q); var k = p ? p.part : 9; (by[k] = by[k] || []).push(q); });
    var out = [];
    Object.keys(by).sort().forEach(function (k) { out = out.concat(G().shuffle(by[k], rng)); });
    return labelParts(out);
  }
  function bankFor(id) { return UN.bank.mcq.filter(function (b) { return b.item === id; })[0]; }

  // Exam 1 / 3 for a subject made of parts: Part 1 fill in the gap, Part 2 multiple choice, Part 3 written
  function buildParts(rng, r, prev, prevWritten, prevMcq) {
    var p = cfg().plan;
    var mcqIds = r.ids.filter(function (id) { return UN.itemsById[id].kind === 'gap' && bankFor(id); });
    var freshM = mcqIds.filter(function (id) { return !prevMcq[id]; });
    mcqIds = freshM.concat(mcqIds.filter(function (id) { return freshM.indexOf(id) === -1; })).slice(0, p.mcq);
    var skip = {}; mcqIds.forEach(function (id) { skip[id] = 1; });
    var gapIds = stratified(p.gap, r, prev, 'gap', skip);
    var allW = r.ids.filter(function (id) { return UN.itemsById[id].kind === 'wq'; });
    var freshW = allW.filter(function (id) { return prevWritten.indexOf(id) === -1; });
    var wIds = freshW.concat(allW.filter(function (id) { return freshW.indexOf(id) === -1; })).slice(0, p.written);
    var q1 = gapIds.map(function (id) {
      var avoid = G().formatsFor(id).filter(function (f) { return f.indexOf('bank:') === 0; }).concat(['written']);
      return qFor(id, rng, avoid);
    });
    var q2 = mcqIds.map(function (id) { return G().make(id, 'bank:' + bankFor(id).id, rng); });
    var q3 = wIds.map(function (id) { return G().make(id, 'written', rng); });
    return { mode: 'full', qs: inParts(q1.concat(q2, q3), rng), extras: [], writtenIds: wIds, targeted: [] };
  }

  function buildFull(rng) {
    var c = cfg(), r = UN.adapt.rank(rng), last = lastFull(), prevTerms = {}, prevMcq = {}, prevExtras = [], prevWritten = [];
    if (last) {
      last.rows.forEach(function (row) { prevTerms[row.item] = 1; if (String(row.fmt).indexOf('bank:') === 0) prevMcq[row.item] = 1; });
      prevExtras = last.extras || []; prevWritten = last.writtenIds || [];
    }
    if (c.plan) return buildParts(rng, r, prevTerms, prevWritten, prevMcq);
    var termIds = c.terms === 'all' ? UN.terms.map(function (t) { return t.id; }) : (c.terms ? stratified(c.terms, r, prevTerms, 'term') : []);
    var gapIds = c.gaps ? stratified(c.gaps, r, prevTerms, 'gap') : [];

    var allW = r.ids.filter(function (id) { return UN.itemsById[id].kind === 'wq'; });
    var wIds = allW;
    if (c.written !== 'all') {
      var freshW = allW.filter(function (id) { return prevWritten.indexOf(id) === -1; });
      wIds = freshW.concat(allW.filter(function (id) { return freshW.indexOf(id) === -1; })).slice(0, c.written);
    }

    var cands = r.ids.filter(function (id) { return c.extraPool.indexOf(id) !== -1; });
    var freshE = cands.filter(function (id) { return prevExtras.indexOf(id) === -1; });
    var extras = freshE.concat(cands.filter(function (id) { return freshE.indexOf(id) === -1; })).slice(0, c.extras);

    var qs = [];
    termIds.concat(gapIds).forEach(function (id) { qs.push(qFor(id, rng, ['written'])); });
    wIds.forEach(function (id) { qs.push(G().make(id, 'written', rng)); });
    extras.forEach(function (id) { qs.push(qFor(id, rng, ['written'])); });
    return { mode: 'full', qs: G().shuffle(qs, rng), extras: extras, writtenIds: wIds, targeted: [] };
  }

  function buildAdaptive(rng) {
    if (!UN.adapt.hasData()) return buildFull(rng);
    var a = cfg().adaptive, r = UN.adapt.rank(rng);
    var targeted = r.ids.slice(0, a.targeted);
    var general = G().shuffle(r.ids.slice(a.targeted), rng).slice(0, a.total - a.targeted);
    var qs = targeted.concat(general).map(function (id) { return qFor(id, rng); });
    return { mode: 'adaptive', qs: UN.cfg.parts ? inParts(qs, rng) : G().shuffle(qs, rng), extras: [], writtenIds: [], targeted: targeted };
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
      var row = { part: q.part || null, pn: q.pn || null, typo: null, item: q.item, fmt: q.fmt, type: q.type, prompt: q.prompt, pl: q.promptLang, given: givenText(q, given),
        correct: q.correctText, v: valueOf(q, given), est: null, graded: q.type !== 'written', note: q.extra && q.extra.note || null, gapQ: q.extra && q.extra.q || null, gapA: q.extra && q.extra.ans || null };
      if (q.type === 'type' && row.v >= 0.99) row.typo = UN.check.fuzzy ? UN.check.fuzzy() : null;
      if (q.type === 'written') {
        if (q.fmt === 'define') { var di = UN.itemsById[q.item]; row.est = UN.check.estimateBy(given || '', [di.def, di.orig]); row.orig = di.orig; }
        else row.est = UN.check.estimateWritten(given || '', UN.keys.written[q.item].phrases).pct;
      }
      return row;
    });
    var att = { id: id, kind: 'exam', no: no, ts: Date.now(), mode: built.mode, rows: rows, extras: built.extras, writtenIds: built.writtenIds, targeted: built.targeted, durSec: meta && meta.durSec };
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
