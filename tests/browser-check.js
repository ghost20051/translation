/* Browser check: clicks through the real site like a student and reports anything that looks broken.
   Not part of the site (index.html never loads it). To use it, open the site, then in the browser console:
     var s = document.createElement('script'); s.src = 'tests/browser-check.js'; document.head.appendChild(s);
     await siteCheck.subject('sci')      // one subject: every page, game activity, exam, lesson, text and video
     await siteCheck.all()               // every subject
   It reports script errors, empty pages, "undefined" / "NaN" on screen, words shown as one letter or as an id
   (the "X 1, X 2" bug), and pages wider than the screen. Exams are started, a few questions answered, then left. */
(function () {
  if (window.siteCheck) return;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var errs = [];
  window.addEventListener('error', function (e) { errs.push((e.message || 'error') + ' (' + location.hash + ')'); });
  window.addEventListener('unhandledrejection', function (e) { errs.push('promise: ' + ((e.reason && e.reason.message) || e.reason) + ' (' + location.hash + ')'); });

  function app() { return document.getElementById('app'); }
  function t(k) { return UN.ui.t(k); }
  function openAll() { document.querySelectorAll('#app details').forEach(function (d) { d.open = true; }); }
  function find(sel, re) { return Array.prototype.find.call(app().querySelectorAll(sel), function (b) { return !b.disabled && (!re || re.test(b.textContent)); }); }
  async function go(hash, ms) { if (location.hash === hash) location.hash = '#/'; await wait(30); location.hash = hash; await wait(ms || 400); }

  function check(where, issues) {
    var a = app(), text = a ? a.innerText : '';
    if (text.replace(/\s+/g, '').length < 15) issues.push(where + ': page looks empty');
    var bad = text.match(/.{0,25}(\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b).{0,25}/);
    if (bad) issues.push(where + ': shows "' + bad[0].trim() + '"');
    document.querySelectorAll('#app .terms .term .en, #app .terms .term .ar, #app .trow .te, #app .trow .ta, #app .big-term, #app .vterm').forEach(function (el) {
      var s = el.textContent.trim();
      if (s.length === 1 || /^[A-Z]{1,3}\d+$/.test(s)) issues.push(where + ': a word shows as "' + s + '"');
    });
    var de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) issues.push(where + ': wider than the screen (' + de.scrollWidth + ' > ' + de.clientWidth + ')');
    errs.splice(0).forEach(function (e) { issues.push(where + ': script error: ' + e); });
  }

  // play a started activity for a few steps: flip, answer, match, then go on
  async function play(where, issues, steps) {
    for (var i = 0; i < steps; i++) {
      check(where + ' step ' + (i + 1), issues);
      var a = app(), card = a.querySelector('.flipcard');
      if (card) {
        var faces = card.querySelectorAll('.face'); faces.forEach(function (f) { if (f.innerText.trim().length < 2) issues.push(where + ': empty flip card side'); });
        card.click(); await wait(150); var know = find('button', /✔/); if (know) { know.click(); await wait(250); } continue;
      }
      var lab = find('.btn.primary', /🔧/); if (lab) { lab.click(); await wait(300); continue; }
      var m = a.querySelectorAll('.mbtn:not([disabled])');
      if (m.length > 1) { m[0].click(); await wait(120); m[m.length - 1].click(); await wait(250); continue; }
      var opt = find('.opt');
      var txt = a.querySelector('input.txt:not([disabled]), textarea.txt:not([disabled])');
      if (opt) { opt.click(); await wait(250); }
      else if (txt) {
        txt.value = 'test'; txt.dispatchEvent(new Event('input', { bubbles: true }));
        var chk = find('.qbox .btn.primary') || find('.btn.primary', new RegExp(t('check') || 'Check'));
        if (chk) chk.click(); else txt.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await wait(250);
      }
      var next = find('.btn.primary', new RegExp('(' + t('next') + '|' + t('finish') + ')'));
      if (next) { next.click(); await wait(300); }
    }
    check(where + ' end', issues);
  }

  async function subject(id) {
    var issues = [], steps = 0;
    await go('#/subject/' + id, 900);
    if (UN.subjectId !== id) return { subject: id, issues: ['could not switch to ' + id] };
    var lang = document.documentElement.lang;
    var pages = Array.prototype.map.call(document.querySelectorAll('#side a[data-r]'), function (a) { return a.getAttribute('data-r'); });
    var tag = id + ' [' + lang + ']';

    // every page in the menu, with every topic opened
    for (var p of pages) { await go('#/' + p, 450); openAll(); await wait(120); check(tag + ' /' + p, issues); steps++; }

    // subject list: every subject must be visible or reachable
    var sb = document.querySelector('.subjbtn');
    if (sb) {
      sb.click(); await wait(400); document.getAnimations().forEach(function (an) { an.finish(); });
      var sh = document.querySelector('.subjsheet'), r = sh.getBoundingClientRect(), rows = sh.querySelectorAll('.subjrow');
      if (r.top < -1 || r.bottom > innerHeight + 1) issues.push(tag + ' subject list: goes off the screen');
      if (rows.length !== UN.subjectOrder.length) issues.push(tag + ' subject list: shows ' + rows.length + ' of ' + UN.subjectOrder.length);
      sh.scrollTop = sh.scrollHeight; await wait(80);
      var last = rows[rows.length - 1].getBoundingClientRect(); if (last.bottom > Math.min(r.bottom, innerHeight) + 1) issues.push(tag + ' subject list: last subject cut off');
      rows.forEach(function (row) { if (row.querySelector('b').textContent.trim().length < 3) issues.push(tag + ' subject list: empty name'); });
      document.querySelector('.overlay').click(); await wait(200);
    }

    if (pages.indexOf('games') !== -1) {
      await go('#/game/1', 450);
      var nAct = app().querySelectorAll('.card.act').length;
      if (!nAct) issues.push(tag + ' game 1: no activities');
      for (var k = 0; k < nAct; k++) {
        await go('#/games', 250); await go('#/game/1', 400);
        var act = app().querySelectorAll('.card.act')[k], name = act.querySelector('b').textContent;
        act.click(); await wait(450); await play(tag + ' game 1 "' + name + '"', issues, 5); steps += 5;
      }
      for (var g of [2, 3]) {
        await go('#/games', 250); await go('#/game/' + g, 450); check(tag + ' game ' + g + ' menu', issues);
        var mode = find('.card.mode') || find('.btn.primary.big') || find('.btn.primary');
        if (!mode) { issues.push(tag + ' game ' + g + ': nothing to start'); continue; }
        mode.click(); await wait(450); await play(tag + ' game ' + g, issues, 5); steps += 5;
      }
    }

    if (pages.indexOf('exams') !== -1) {
      await go('#/exams', 450);
      var exams = Array.prototype.map.call(app().querySelectorAll('a[href^="#/exam/"]'), function (a) { return a.getAttribute('href'); }).filter(function (x, i, arr) { return arr.indexOf(x) === i; });
      if (!exams.length) issues.push(tag + ' exams: none listed');
      for (var ex of exams) {
        await go(ex, 500); check(tag + ' ' + ex + ' start page', issues);
        var begin = find('.btn.primary.big');
        if (!begin) { issues.push(tag + ' ' + ex + ': no start button'); continue; }
        begin.click(); await wait(700);
        for (var q = 0; q < 3; q++) {
          check(tag + ' ' + ex + ' question ' + (q + 1), issues); steps++;
          var o = find('.opt'), tx = app().querySelector('input.txt:not([disabled]), textarea.txt:not([disabled])');
          if (o) { o.click(); await wait(200); } else if (tx) { tx.value = 'test'; tx.dispatchEvent(new Event('input', { bubbles: true })); await wait(100); }
          var nx = find('.btn.primary', new RegExp(t('next'))); if (nx) { nx.click(); await wait(300); }
        }
        if (UN.state.exam && UN.state.exam.running) UN.exam_ui.abandon();
        await go('#/exams', 300);
      }
    }

    if (pages.indexOf('lessons') !== -1) {
      await go('#/lessons', 450);
      var ls = app().querySelector('a[href^="#/lesson/"]');
      if (ls) {
        await go(ls.getAttribute('href'), 500);
        for (var s = 0; s < 6; s++) { check(tag + ' lesson step ' + (s + 1), issues); steps++; var c = find('.btn.primary') || find('.opt'); if (!c) break; c.click(); await wait(300); }
      }
    }

    if (pages.indexOf('reading') !== -1) {
      await go('#/reading', 500);
      var tabs = app().querySelectorAll('.tab');
      for (var ti = 0; ti < Math.max(1, tabs.length); ti++) {
        var tb = app().querySelectorAll('.tab')[ti]; if (tb) { tb.click(); await wait(300); }
        check(tag + ' reading tab ' + (ti + 1), issues); steps++;
        var views = app().querySelectorAll('.readview button');
        for (var vi = 0; vi < views.length; vi++) { app().querySelectorAll('.readview button')[vi].click(); await wait(250); check(tag + ' reading tab ' + (ti + 1) + ' view ' + (vi + 1), issues); steps++; }
        var hide = find('.btn.small.ghost'); if (hide) { hide.click(); await wait(200); check(tag + ' reading translation hidden', issues); hide.click(); await wait(150); }
      }
    }

    if (pages.indexOf('videos') !== -1) {
      await go('#/videos', 450);
      var vl = app().querySelector('a[href^="#/video/"]');
      if (vl) { await go(vl.getAttribute('href'), 700); check(tag + ' video page', issues); steps++; }
    }

    if (UN.chapters && !UN.cfg.summaryOnly) { await go('#/practice/' + UN.chapters[0].g, 500); await play(tag + ' chapter practice', issues, 3); steps += 3; }
    if (!UN.cfg.summaryOnly) { await go('#/revise', 400); check(tag + ' /revise', issues); steps++; }

    // a summaries-only subject must keep every other page on Learn
    if (UN.cfg.summaryOnly) {
      for (var hsh of ['#/home', '#/games', '#/exams', '#/exam/1', '#/vocab', '#/progress']) { await go(hsh, 350); if (location.hash !== '#/learn') issues.push(tag + ' ' + hsh + ' did not open Learn'); }
    }
    return { subject: id, lang: lang, pages: pages, steps: steps, issues: issues };
  }

  async function all() {
    var out = [];
    for (var id of UN.subjectOrder) out.push(await subject(id));
    return out;
  }

  window.siteCheck = { subject: subject, all: all, check: check };
})();
