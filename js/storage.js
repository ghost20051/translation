/*
 * Local-only persistence. Nothing leaves the device. Falls back to memory if storage is blocked.
 * Language / theme / chosen subject are global; scores, XP, history and achievements are kept per subject.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var KEY = 'unrev.v1';
  var mem = null;

  function freshSubj() {
    return { xp: 0, events: [], exams: {}, attempts: [], games: {}, ach: {}, flipped: {}, seq: 0 };
  }
  function fresh() { return { v: 2, lang: 'en', theme: 'auto', subject: 'un', subj: { un: freshSubj() } }; }

  function load() {
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (raw) {
      try {
        var d = JSON.parse(raw);
        if (d && d.v === 1) { // old single-subject format: keep everything as the UN subject
          var s = Object.assign(freshSubj(), d); delete s.v; delete s.lang; delete s.theme;
          return { v: 2, lang: d.lang || 'en', theme: d.theme || 'auto', subject: 'un', subj: { un: s } };
        }
        if (d && d.v === 2) return Object.assign(fresh(), d);
      } catch (e) { /* ignore */ }
    }
    return mem || fresh();
  }

  var data = load();

  // The current subject's progress object also exposes lang / theme (stored globally, not serialised there).
  function attach(s) {
    ['lang', 'theme'].forEach(function (k) {
      if (!Object.getOwnPropertyDescriptor(s, k)) {
        Object.defineProperty(s, k, { get: function () { return data[k]; }, set: function (v) { data[k] = v; }, enumerable: false, configurable: true });
      }
    });
    return s;
  }
  function subj() {
    var id = data.subject;
    if (!data.subj[id]) data.subj[id] = freshSubj();
    var s = data.subj[id], f = freshSubj();
    Object.keys(f).forEach(function (k) { if (s[k] === undefined) s[k] = f[k]; });
    return attach(s);
  }

  function save() {
    mem = data;
    try { window.localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
  }

  // Reset the CURRENT subject's progress only (language, theme and the other subject are kept).
  function reset() {
    data.subj[data.subject] = freshSubj();
    mem = null; save();
  }

  UN.store = {
    get: subj,
    save: save,
    reset: reset,
    getSubject: function () { return data.subject; },
    setSubject: function (id) { data.subject = id; save(); },
    nextId: function () { var s = subj(); s.seq = (s.seq || 0) + 1; return s.seq; }
  };
})();
