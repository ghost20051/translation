/* XP, levels and achievements. Everything is derived from locally stored progress. */
(function () {
  var UN = window.UN = window.UN || {};
  var PER_LEVEL = 120;

  function S() { return UN.store.get(); }
  function g() { var s = S(); s.games = s.games || {}; return s.games; }

  function addXP(n) { S().xp += Math.max(0, Math.round(n)); UN.store.save(); }
  function xpInfo() {
    var xp = S().xp;
    return { xp: xp, level: Math.floor(xp / PER_LEVEL) + 1, into: xp % PER_LEVEL, per: PER_LEVEL };
  }

  function examPcts(no) { var e = S().exams[no]; return e ? e.history.map(function (h) { return h.pct; }) : []; }
  function bestAny() { var m = 0; [1, 2, 3].forEach(function (n) { examPcts(n).forEach(function (p) { m = Math.max(m, p); }); }); return m; }
  function actsDone() { var a = (g().g1 || {}).acts || {}; return Object.keys(a).length; }

  UN.achievements = [
    { id: 'first_steps', test: function () { return S().events.length > 0; } },
    { id: 'game1_done',  test: function () { return actsDone() >= 3; } },
    { id: 'flipper',     test: function () { return Object.keys(S().flipped || {}).length >= UN.terms.length; } },
    { id: 'combo10',     test: function () { return (g().maxCombo || 0) >= 10; } },
    { id: 'exam_first',  test: function () { return [1, 2, 3].some(function (n) { return examPcts(n).length; }); } },
    { id: 'sharp',       test: function () { return bestAny() >= 80; } },
    { id: 'perfect',     test: function () { return bestAny() >= 100; } },
    { id: 'improver',    test: function () {
        var p1 = examPcts(1), p2 = examPcts(2), p3 = examPcts(3), l = function (a) { return a[a.length - 1]; };
        return (p1.length && p2.length && l(p2) > l(p1)) || (p2.length && p3.length && l(p3) > l(p2)) || (p1.length && p3.length && l(p3) > l(p1));
      } },
    { id: 'fixer',       test: function () { return (g().repaired || 0) >= 5; } },
    { id: 'boss',        test: function () { return (g().bossWins || 0) >= 1; } },
    { id: 'all_exams',   test: function () { return [1, 2, 3].every(function (n) { return examPcts(n).length; }); } },
    { id: 'mastery10',   test: function () { return UN.adapt.overall().mastered >= 10; } },
    { id: 'student',    test: function () { return Object.keys(g().lessons || {}).length >= 3; } },
    { id: 'xp500',       test: function () { return S().xp >= 500; } }
  ];

  // Returns ids of newly unlocked achievements.
  function checkAch() {
    var s = S(), fresh = [];
    UN.achievements.forEach(function (a) {
      if (!s.ach[a.id] && a.test()) { s.ach[a.id] = Date.now(); fresh.push(a.id); }
    });
    if (fresh.length) UN.store.save();
    return fresh;
  }

  function accuracy() {
    var ev = S().events.filter(function (e) { return !e.p; });
    if (!ev.length) return null;
    return ev.reduce(function (a, e) { return a + e.v; }, 0) / ev.length;
  }
  function dayKey(ts) { var d = new Date(ts); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
  // consecutive days (ending today or yesterday) with any activity
  function streak() {
    var days = {};
    S().events.forEach(function (e) { days[dayKey(e.t)] = 1; });
    var n = 0, d = new Date();
    if (!days[dayKey(d.getTime())]) d.setDate(d.getDate() - 1);
    while (days[dayKey(d.getTime())]) { n++; d.setDate(d.getDate() - 1); }
    return { days: n, today: !!days[dayKey(Date.now())] };
  }
  // last n sessions: events grouped by attempt id
  function recent(n) {
    var map = {}, order = [];
    S().events.forEach(function (e) {
      if (e.p && String(e.s).indexOf('exam') !== 0) return;
      var g = map[e.a];
      if (!g) { g = map[e.a] = { a: e.a, src: e.s, n: 0, sum: 0, t: e.t }; order.push(g); }
      g.n++; g.sum += e.v; g.t = Math.max(g.t, e.t);
    });
    order.sort(function (a, b) { return b.t - a.t; });
    return order.slice(0, n);
  }

  UN.prog = { accuracy: accuracy, streak: streak, recent: recent, addXP: addXP, xpInfo: xpInfo, checkAch: checkAch, examPcts: examPcts, actsDone: actsDone, g: g };
})();
