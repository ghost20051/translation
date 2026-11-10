/*
 * Adaptive learning engine (plain JavaScript, no AI).
 * All statistics are rebuilt from the stored answer events, so a late self-grade
 * of a written answer corrects everything automatically.
 *
 * event: { a: attemptId, i: itemId, f: format, v: 0..1, s: source ('exam1'|'game1'|...), t: timestamp }
 */
(function () {
  var UN = window.UN = window.UN || {};
  var DAY = 86400000;
  var INTERVALS = [0, 1, 3, 7, 14, 30]; // days, by Leitner box

  function events() { return UN.store.get().events; }

  function rebuild() {
    var st = {};
    events().forEach(function (e) {
      if (e.p) return; // pending self-grade
      var s = st[e.i] || (st[e.i] = { n: 0, ema: null, box: 0, due: 0, miss: 0, last: 0, lastV: null, fmts: {}, lastWrong: 0, srcs: {} });
      var w = String(e.s).indexOf('exam') === 0 ? 1 : 0.6;
      s.n++;
      s.ema = s.ema == null ? e.v : s.ema * (1 - 0.5 * w) + e.v * 0.5 * w;
      if (e.v >= 0.75) s.box = Math.min(5, s.box + 1); else if (e.v < 0.4) s.box = 0;
      if (e.v < 0.4) { s.miss++; s.lastWrong = e.t; }
      s.last = e.t; s.lastV = e.v;
      s.due = e.t + INTERVALS[s.box] * DAY;
      s.fmts[e.f] = (s.fmts[e.f] || 0) + 1;
      s.srcs[e.s] = true;
    });
    return st;
  }

  function priority(id, st, now) {
    var s = st[id];
    if (!s) return 0.55;                               // never practised: medium-high
    var p = (1 - s.ema) + Math.min(s.miss, 5) * 0.06 - s.box * 0.03;
    if (s.due <= now) p += 0.15;                       // spaced repetition: due for review
    if (s.lastV != null && s.lastV < 0.4) p += 0.1;    // missed most recently
    return p;
  }

  function isMastered(s) { return !!s && s.ema >= 0.85 && s.box >= 2 && s.n >= 2; }
  function isWeak(s) { return !!s && (s.ema < 0.7 || (s.lastV != null && s.lastV < 0.4)); }

  // Items ranked from most to least in need of practice. Ties are shuffled.
  function rank(rng, now) {
    var st = rebuild();
    now = now || Date.now();
    var ids = UN.gen.shuffle(UN.itemIds, rng);
    ids.sort(function (a, b) { return priority(b, st, now) - priority(a, st, now); });
    return { ids: ids, st: st };
  }

  function hasData() { return events().length >= 5; }

  function weakIds(rng) {
    var r = rank(rng);
    return r.ids.filter(function (id) { return isWeak(r.st[id]); });
  }

  // Targeted selection: the n items needing most practice; weakest first. Never excludes anything.
  function targeted(n, rng) {
    var r = rank(rng);
    return r.ids.slice(0, n);
  }

  function categoryStats() {
    var st = rebuild(), out = {};
    UN.itemIds.forEach(function (id) {
      var it = UN.itemsById[id], g = it.group, o = out[g] || (out[g] = { items: 0, seen: 0, mastered: 0, sum: 0 });
      o.items++;
      if (st[id]) { o.seen++; o.sum += st[id].ema; }
      if (isMastered(st[id])) o.mastered++;
    });
    Object.keys(out).forEach(function (g) { out[g].avg = out[g].seen ? out[g].sum / out[g].seen : null; });
    return out;
  }

  function overall() {
    var st = rebuild(), seen = 0, mastered = 0, weak = 0;
    UN.itemIds.forEach(function (id) {
      if (st[id]) { seen++; if (isMastered(st[id])) mastered++; if (isWeak(st[id])) weak++; }
    });
    return { total: UN.itemIds.length, seen: seen, mastered: mastered, weak: weak };
  }

  function formatCounts(id) { var s = rebuild()[id]; return s ? s.fmts : {}; }

  // Which learning resources help with these items?
  function recommendResources(ids) {
    var out = [];
    (UN.resources || []).forEach(function (r) {
      var hit = r.items.concat(r.related || []).filter(function (x) { return ids.indexOf(x) !== -1; }).length;
      if (hit) out.push({ r: r, hit: hit });
    });
    out.sort(function (a, b) { return b.hit - a.hit; });
    return out.map(function (x) { return x.r; });
  }

  function recordEvent(attemptId, item, fmt, v, src, pending) {
    var ev0 = { a: attemptId, i: item, f: fmt, v: v, s: src, t: Date.now() };
    if (pending) ev0.p = 1;
    events().push(ev0);
    var ev = events();
    if (ev.length > 4000) ev.splice(0, ev.length - 4000);
  }

  function setEventValue(attemptId, item, v, fmt) {
    events().forEach(function (e) { if (e.a === attemptId && e.i === item && e.f === (fmt || 'written')) { e.v = v; delete e.p; } });
  }

  UN.adapt = {
    rebuild: rebuild, priority: priority, rank: rank, isMastered: isMastered, isWeak: isWeak, hasData: hasData,
    weakIds: weakIds, targeted: targeted, categoryStats: categoryStats, overall: overall, formatCounts: formatCounts,
    recommendResources: recommendResources, recordEvent: recordEvent, setEventValue: setEventValue
  };
})();
