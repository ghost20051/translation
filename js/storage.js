/* Local-only persistence. Nothing leaves the device. Falls back to memory if storage is blocked. */
(function () {
  var UN = window.UN = window.UN || {};
  var KEY = 'unrev.v1';
  var mem = null;

  function fresh() {
    return { v: 1, lang: 'en', theme: 'auto', xp: 0, events: [], exams: {}, attempts: [], games: {}, ach: {}, flipped: {}, seq: 0 };
  }

  function load() {
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (raw) {
      try { var d = JSON.parse(raw); if (d && d.v === 1) { return Object.assign(fresh(), d); } } catch (e) { /* ignore */ }
    }
    return mem || fresh();
  }

  var data = load();

  function save() {
    mem = data;
    try { window.localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
  }

  function reset() {
    data = fresh();
    mem = null;
    try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  UN.store = {
    get: function () { return data; },
    save: save,
    reset: reset,
    nextId: function () { data.seq = (data.seq || 0) + 1; return data.seq; }
  };
})();
