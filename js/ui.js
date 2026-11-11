/* UI core: DOM helpers, theme, router, app shell (top bar, sidebar, bottom nav) and the main pages. No innerHTML anywhere. */
(function () {
  var UN = window.UN = window.UN || {};
  var S = function () { return UN.store.get(); };
  UN.state = { exam: null, timers: [] };
  UN.routes = {};

  /* ---------- helpers ---------- */
  function append(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { append(el, x); }); return; }
    if (typeof c === 'object') { el.appendChild(c); return; }
    c = String(c);
    if (UN.icons.hasIcon(c)) { UN.icons.nodes(c).forEach(function (n) { n.classList && n.classList.remove('flip'); el.appendChild(n); }); return; }
    el.appendChild(document.createTextNode(c));
  }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'style') el.setAttribute('style', v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function ic(name, cls) { return UN.icons.icon(name, cls); }
  function setText(el, str) { el.textContent = ''; append(el, str); }
  function t(key, vars) {
    var lang = S().lang, d = UN.i18n[lang] || {}, s = d[key];
    var ov = UN.cfg && UN.cfg.text && (UN.cfg.text[lang] || UN.cfg.text.en);
    if (ov && ov[key] != null) s = ov[key];
    if (s == null) s = (UN.i18n.en || {})[key];
    if (s == null) return key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  // text in a fixed language (exam content keeps its own language whatever the interface language is)
  function L(text, lang, cls) { return h('span', { lang: lang, dir: lang === 'ar' ? 'rtl' : 'ltr', class: 'bidi ' + (cls || '') }, text); }
  var AR_RUN = /([؀-ۿ][؀-ۿ\s\/]*[؀-ۿ]|[؀-ۿ])/;
  function mixed(text) {
    var out = h('span', { dir: 'ltr', lang: 'en', class: 'bidi' });
    String(text).split(AR_RUN).forEach(function (p, i) {
      if (!p) return;
      out.appendChild(i % 2 ? h('bdi', { dir: 'rtl', lang: 'ar' }, p) : document.createTextNode(p));
    });
    return out;
  }
  // text that may be Arabic with English terms inside ("عامل OR"): mostly Arabic reads right to left, anything else as mixed()
  function smart(text) {
    var s = String(text == null ? '' : text), ar = (s.match(/[؀-ۿ]/g) || []).length, la = (s.match(/[A-Za-z]/g) || []).length;
    return ar && ar >= la ? L(s, 'ar') : mixed(s);
  }
  // "Part 1 · Fill in the gap · Q12" (full) or "Part 1 · Q12"
  function partText(info, full) {
    if (!info || !UN.cfg.parts) return '';
    var lang = S().lang, p = UN.cfg.parts[info.part - 1], q = lang === 'ar' ? 'س' : 'Q';
    if (info.part === 4) return p.name[lang] + (info.n != null ? ' · ' + info.n : '');
    if (info.part === 5) return (lang === 'ar' ? 'الجزء 1 · ' : 'Part 1 · ') + p.name[lang] + (info.n != null ? ' · ' + q + info.n : '');
    return (lang === 'ar' ? 'الجزء ' : 'Part ') + info.part + (full ? ' · ' + p.name[lang] : '') + (info.n != null ? ' · ' + q + info.n : '');
  }
  // "Watch the video" links for the questions a short video explains (Simultaneous Interpretation)
  function videoLink(kind, n) {
    var list = UN.videoFor ? UN.videoFor(kind, n) : [];
    if (!list.length) return null;
    return h('div', { class: 'vlinks' }, list.map(function (v) { return h('a', { class: 'vlink', href: '#/video/' + v.id }, ic('play-circle'), t('vid.watch') + ': ' + v.title); }));
  }
  // A fill-in-the-gap sentence: a visible blank box, or (when the answer is given) the answer in colour.
  function gapSentence(text, ans) {
    var parts = String(text).split('__');
    var mid = ans != null ? h('mark', { class: 'gans' }, ans) : h('span', { class: 'gblank', role: 'img', 'aria-label': 'blank' }, ' ');
    return h('span', { class: 'gapline', lang: 'en', dir: 'ltr' }, parts[0], mid, parts[1] || '');
  }
  function promptNode(q) {
    if ((q.fmt === 'mcq-gap' || q.fmt === 'type-gap') && q.extra && q.extra.q) return gapSentence(q.extra.q);
    return q.promptLang === 'ar' ? L(q.prompt, 'ar') : mixed(q.prompt);
  }
  function termLabel(id) {
    var it = UN.itemsById[id];
    if (it.kind === 'term') return h('span', null, L(it.en, 'en'), ' · ', L(it.arShow, 'ar'));
    if (it.kind === 'sub') return L(it.name, 'en');
    if (it.kind === 'gap') return gapSentence(it.q);
    if (it.kind === 'q') return mixed(it.q.length > 90 ? it.q.slice(0, 88) + '…' : it.q);
    return L(it.q, 'en');
  }
  function later(fn, ms) { var id = setTimeout(fn, ms); UN.state.timers.push(id); return id; }
  function every(fn, ms) { var id = setInterval(fn, ms); UN.state.timers.push(id); return id; }
  function clearTimers() { UN.state.timers.forEach(function (id) { clearTimeout(id); clearInterval(id); }); UN.state.timers = []; }
  function pct(n) { return Math.round(n * 100) + '%'; }
  function bar(value, cls) { return h('div', { class: 'bar ' + (cls || ''), role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(value * 100)) }, h('div', { class: 'fill', style: 'width:' + Math.max(0, Math.min(100, value * 100)) + '%' })); }
  function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
  function tile(name, tone) { return h('span', { class: 'tile ' + (tone || 'blue') }, ic(name)); }

  function toast(msg, kind) {
    var box = document.getElementById('toasts');
    var el = h('div', { class: 'toast ' + (kind || ''), role: 'status' }, kind === 'ach' ? ic('trophy') : null, msg);
    box.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 400); }, 3200);
  }

  function confirmDialog(text, yesLabel, onYes, danger) {
    var overlay = h('div', { class: 'overlay', role: 'dialog', 'aria-modal': 'true' });
    var close = function () { overlay.remove(); };
    overlay.appendChild(h('div', { class: 'dialog card' },
      h('p', null, text),
      h('div', { class: 'row end' },
        h('button', { class: 'btn ghost', onclick: close }, t('cancel')),
        h('button', { class: 'btn ' + (danger ? 'danger' : 'primary'), onclick: function () { close(); onYes(); } }, yesLabel))));
    document.body.appendChild(overlay);
  }

  function speak(text, lang) {
    if (UN.state.exam && UN.state.exam.running) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text); u.lang = lang === 'ar' ? 'ar-EG' : 'en-US'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) { /* audio is optional */ }
  }
  function speakBtn(text) {
    if (!('speechSynthesis' in window)) return null;
    return h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen'), title: t('listen'), onclick: function (e) { e.stopPropagation(); speak(text, 'en'); } }, ic('volume'));
  }

  function afterProgress() {
    UN.prog.checkAch().forEach(function (id) { toast(t('ach.' + id + '.t'), 'ach'); if (UN.sfx) UN.sfx.play('ach'); });
    refreshChrome();
  }

  /* ---------- language / theme ---------- */
  function applyLang() {
    var lang = S().lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t('app.title');
  }
  function resolvedTheme() {
    var th = S().theme;
    if (th === 'light' || th === 'dark') return th;
    try { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }
  function applyTheme() {
    var r = resolvedTheme();
    document.documentElement.setAttribute('data-theme', r);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', r === 'dark' ? '#0b1120' : '#2563eb');
  }
  function animateTheme(fn) {
    var root = document.documentElement; root.classList.add('theme-anim'); fn();
    setTimeout(function () { root.classList.remove('theme-anim'); }, 350);
  }
  function toggleTheme() { animateTheme(function () { S().theme = resolvedTheme() === 'dark' ? 'light' : 'dark'; UN.store.save(); applyTheme(); refreshChrome(); }); }
  function setTheme(th) { animateTheme(function () { S().theme = th; UN.store.save(); applyTheme(); }); render(); }
  function switchSubject(id) {
    UN.store.setSubject(id); UN.useSubject(id);
    UN.state.exam = null; go('#/home');
  }
  // a direct link to a subject: #/subject/<id> switches to it and opens its Learn page; #/subject/<id>/<page>[/<arg>] opens that page.
  // 404.html turns the short form /subject/sci/learn into this. Plain names work too: /subject/scientific/read
  var SUBJ_ALIAS = { scientific: 'sci', science: 'sci', research: 'web', internet: 'web', discourse: 'disc', interpretation: 'si', simultaneous: 'si', interpreting: 'si', tourist: 'tour', tourism: 'tour', sports: 'sport', physical: 'sport' };
  var PAGE_ALIAS = { read: 'reading', texts: 'reading', words: 'vocab', vocabulary: 'vocab', answers: 'vocab', dashboard: 'home', game: 'games', exam: 'exams', lesson: 'lessons', video: 'videos' };
  UN.routes.subject = function (arg) {
    var id = String(arg || '').toLowerCase(), bits = location.hash.split('/').slice(3);
    var page = String(bits[0] || '').toLowerCase(), rest = bits.slice(1).join('/');
    id = SUBJ_ALIAS[id] || id;
    if (UN.subjects[id]) { UN.store.setSubject(id); UN.useSubject(id); UN.state.exam = null; }
    if (!rest) page = PAGE_ALIAS[page] || page;
    var ok = page && page !== 'subject' && UN.routes[page] && (page !== 'reading' || UN.cfg.reading) && (!/^videos?$/.test(page) || (UN.videos && UN.videos.length));
    setTimeout(function () { location.replace('#/' + (ok ? page + (rest ? '/' + rest : '') : 'learn')); }, 0);
    return h('div', { class: 'page' });
  };
  function toggleSound() { if (UN.sfx) { UN.sfx.setEnabled(!UN.sfx.enabled()); refreshChrome(); } }
  function setLang(l) { S().lang = l; UN.store.save(); applyLang(); render(); }
  try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (S().theme === 'auto') { applyTheme(); refreshChrome(); } }); } catch (e) { /* older browsers */ }

  /* ---------- app shell ---------- */
  var NAV_BASE = [['home', 'layout-dashboard', 'nav.dashboard'], ['learn', 'book-open', 'nav.learn'], ['games', 'gamepad', 'nav.games'], ['exams', 'file-text', 'nav.exams'],
    ['progress', 'bar-chart', 'nav.progress'], ['lessons', 'lightbulb', 'nav.lessons'], ['vocab', 'languages', 'nav.vocab'], ['achievements', 'trophy', 'nav.achievements'], ['settings', 'settings', 'nav.settings']];
  function navItems() {
    if (UN.cfg && UN.cfg.summaryOnly) return NAV_BASE.filter(function (n) { return n[0] === 'learn' || n[0] === 'settings'; });   // summaries only: no games, exams or progress
    var n = NAV_BASE.slice();
    if (UN.cfg && UN.cfg.reading) n.splice(6, 0, ['reading', 'book-open', 'nav.reading']);
    if (UN.videos && UN.videos.length) n.splice(6, 0, ['videos', 'play-circle', 'nav.videos']);
    return n;
  }
  var BOTTOM = ['home', 'learn', 'games', 'exams'];

  function navLink(n, cls) { return h('a', { href: '#/' + n[0], 'data-r': n[0], class: cls || '' }, ic(n[1]), h('span', { class: 'nt' }, t(n[2]))); }

  function buildChrome() {
    var hdr = document.getElementById('hdr'), side = document.getElementById('side'), nav = document.getElementById('nav');
    hdr.textContent = ''; side.textContent = ''; nav.textContent = '';
    var inExam = !!(UN.state.exam && UN.state.exam.running);
    document.body.classList.toggle('exam-mode', inExam);

    hdr.appendChild(h('a', { class: 'brand', href: inExam ? '#/exam-run' : '#/home' }, h('span', { class: 'logo' }, UN.art ? UN.art.make('brand', 38) : ic('globe')),
      h('span', { class: 'bt' }, h('b', null, t('app.short')), h('small', null, t('brand.tag')))));
    var lang = S().lang, dark = resolvedTheme() === 'dark';
    hdr.appendChild(h('div', { class: 'tools' },
      (inExam || UN.subjectOrder.length < 2) ? null : h('button', { type: 'button', class: 'subjbtn', 'aria-haspopup': 'dialog', title: t('subject.pick'), 'aria-label': t('subject.pick') + ': ' + UN.cfg.name[lang], onclick: openSubjects },
        UN.art ? UN.art.make(UN.cfg.art, 24) : ic(UN.cfg.icon || 'book-open'), h('span', { class: 'sn sn-long' }, UN.cfg.name[lang]), h('span', { class: 'sn sn-short' }, (UN.cfg.short || UN.cfg.name)[lang]), ic('chevron-right', 'down')),
      h('div', { class: 'seg lang', role: 'group', 'aria-label': t('set.lang') },
        [['en', 'English'], ['ar', 'العربية']].map(function (o) { return h('button', { type: 'button', lang: o[0], class: o[0] === lang ? 'on' : '', 'aria-pressed': String(o[0] === lang), onclick: function () { if (o[0] !== S().lang) setLang(o[0]); } }, o[1]); })),
      h('button', { class: 'icon-btn round', type: 'button', 'data-nosfx': '1', 'aria-pressed': String(!UN.sfx || UN.sfx.enabled()), onclick: toggleSound, 'aria-label': t('sfx.toggle'), title: t('sfx.toggle') }, ic(UN.sfx && !UN.sfx.enabled() ? 'volume-x' : 'volume')),
      h('button', { class: 'icon-btn round', type: 'button', onclick: toggleTheme, 'aria-label': t('theme.toggle'), title: t('theme.toggle') }, ic(dark ? 'sun' : 'moon')),
      inExam ? null : h('a', { class: 'avatar', href: '#/settings', 'aria-label': t('nav.settings'), title: t('nav.settings') }, ic('user'))));
    if (inExam) return;

    side.appendChild(h('div', { class: 'side-nav' }, navItems().map(function (n) { return navLink(n); })));
    var xp = UN.prog.xpInfo();
    side.appendChild(h('div', { class: 'levelcard' }, h('span', { class: 'tile amber' }, ic('trophy')), h('b', null, t('lvl.label', { n: xp.level })),
      h('small', null, t('lvl.sub')), bar(xp.into / xp.per), h('small', { class: 'xpnum', dir: 'ltr' }, xp.into + ' / ' + xp.per + ' XP')));

    var items = navItems(), bottom = UN.cfg.summaryOnly ? items : NAV_BASE.filter(function (n) { return BOTTOM.indexOf(n[0]) !== -1; });
    bottom.forEach(function (n) { nav.appendChild(navLink(n)); });
    if (items.length > bottom.length) nav.appendChild(h('button', { type: 'button', class: 'morebtn', 'data-r': 'more', onclick: openMore }, ic('more'), h('span', { class: 'nt' }, t('nav.more'))));
  }
  // Subject picker: a list with the full subject names, so it still reads clearly with four or more subjects.
  function openSubjects() {
    var lang = S().lang, overlay = h('div', { class: 'overlay sheet-wrap' }), close = function () { overlay.remove(); };
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.appendChild(h('div', { class: 'sheet card subjsheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('subject.pick') },
      h('h2', null, t('subject.pick')),
      UN.subjectOrder.map(function (id, i) {
        var c = UN.subjects[id].cfg, cur = id === UN.subjectId;
        return h('button', { type: 'button', class: 'subjrow' + (cur ? ' on' : ''), 'aria-pressed': String(cur), onclick: function () { close(); if (!cur) switchSubject(id); } },
          UN.art ? UN.art.make(c.art, 44) : tile(c.icon || 'book-open', ['blue', 'green', 'purple', 'amber'][i % 4]),
          h('span', { class: 'sjt' }, h('b', null, c.name[lang]), h('small', { class: 'muted' }, (c.desc && c.desc[lang]) || '')),
          cur ? h('span', { class: 'pill good' }, ic('check'), t('subject.current')) : ic('chevron-right', 'flip'));
      })));
    document.body.appendChild(overlay);
  }
  function openMore() {
    var overlay = h('div', { class: 'overlay sheet-wrap' }), close = function () { overlay.remove(); };
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.appendChild(h('div', { class: 'sheet card', role: 'dialog', 'aria-modal': 'true' },
      navItems().filter(function (n) { return BOTTOM.indexOf(n[0]) === -1; }).map(function (n) { var a = navLink(n, 'sheet-link'); a.addEventListener('click', close); return a; })));
    document.body.appendChild(overlay);
  }
  function refreshChrome() { buildChrome(); markNav(); }
  function curRoute() {
    var cur = (location.hash.replace('#/', '').split('/')[0]) || 'home';
    if (cur === 'lesson') cur = 'lessons'; if (cur === 'video') cur = 'videos'; if (cur === 'game') cur = 'games'; if (cur === 'exam' || cur === 'exam-run' || cur === 'exam-result') cur = 'exams'; if (cur === 'dashboard') cur = 'progress';
    return cur;
  }
  function markNav() {
    var cur = curRoute();
    Array.prototype.forEach.call(document.querySelectorAll('#side a, #nav a'), function (a) {
      var on = a.getAttribute('data-r') === cur; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var more = document.querySelector('#nav .morebtn');
    if (more) more.classList.toggle('on', ['progress', 'lessons', 'vocab', 'reading', 'videos', 'achievements', 'settings'].indexOf(cur) !== -1);
  }

  /* ---------- router ---------- */
  var suppress = false;
  function parse() {
    var raw = (location.hash || '#/home').replace(/^#\/?/, '');
    var parts = raw.split('/');
    return { name: parts[0] || 'home', arg: parts[1] };
  }
  function render() {
    clearTimers();
    var r = parse(), fn = UN.routes[r.name] || UN.routes.home;
    // a subject with summaries only has no dashboard, games or exams: any other page opens its Learn page
    if (UN.cfg.summaryOnly && ['learn', 'settings', 'subject'].indexOf(r.name) === -1) { location.replace('#/learn'); return; }
    var ex = UN.state.exam;
    if (ex && ex.running && r.name !== 'exam-run') { fn = UN.routes['exam-run']; }
    if (!(ex && ex.running) && r.name === 'exam-run') fn = UN.routes.exams;
    buildChrome(); markNav();
    var app = document.getElementById('app');
    app.textContent = '';
    var view = fn(r.arg);
    view.classList.add('view');
    app.appendChild(view);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () {
    if (suppress) { suppress = false; return; }
    var ex = UN.state.exam, r = parse();
    if (ex && ex.running && r.name !== 'exam-run') {
      var target = location.hash;
      suppress = true; location.hash = '#/exam-run';
      confirmDialog(t('exam.leave'), t('exam.leaveYes'), function () { UN.exam_ui.abandon(); go(target); }, true);
      return;
    }
    render();
  });

  /* ---------- shared widgets ---------- */
  function stepState(n) {
    var p = UN.prog;
    if (n === 'g1') return p.actsDone() >= 3 ? 'done' : (p.actsDone() ? 'part' : 'todo');
    if (n === 'g2') return (p.g().g2 || 0) ? 'done' : 'todo';
    if (n === 'g3') return (p.g().g3 || 0) ? 'done' : 'todo';
    var no = +n.slice(1), a = p.examPcts(no);
    return a.length ? 'done' : 'todo';
  }
  function journey() {
    var steps = [['g1', 'gamepad', 'game1.name', '#/game/1'], ['e1', 'file-text', 'exam1.name', '#/exam/1'], ['g2', 'wrench', 'game2.name', '#/game/2'],
      ['e2', 'file-text', 'exam2.name', '#/exam/2'], ['g3', 'swords', 'game3.name', '#/game/3'], ['e3', 'flag', 'exam3.name', '#/exam/3']];
    var wrap = h('ol', { class: 'journey' });
    steps.forEach(function (s) {
      var st = stepState(s[0]), score = '';
      if (s[0].charAt(0) === 'e') { var a = UN.prog.examPcts(+s[0].slice(1)); if (a.length) score = a[a.length - 1] + '%'; }
      wrap.appendChild(h('li', { class: 'step ' + st },
        h('a', { href: s[3] }, h('span', { class: 'bubble' }, ic(st === 'done' ? 'check' : s[1])), h('span', { class: 'sl' }, t(s[2])), score ? h('span', { class: 'sc' }, score) : null)));
    });
    return wrap;
  }
  function nextStep() {
    var order = [['g1', '#/game/1', 'game1.name'], ['e1', '#/exam/1', 'exam1.name'], ['g2', '#/game/2', 'game2.name'], ['e2', '#/exam/2', 'exam2.name'], ['g3', '#/game/3', 'game3.name'], ['e3', '#/exam/3', 'exam3.name']];
    for (var i = 0; i < order.length; i++) if (stepState(order[i][0]) !== 'done') return order[i];
    return ['rev', '#/progress', 'nav.progress'];
  }
  function pageHead(title, sub, extra) {
    return h('div', { class: 'pagehead' }, h('div', null, h('h1', null, title), sub ? h('p', { class: 'lead' }, sub) : null), extra || null);
  }
  function stat(icon, tone, label, value, sub) {
    return h('div', { class: 'card stat' }, tile(icon, tone), h('div', { class: 'sbody' }, h('small', null, label), h('b', { class: 'num' }, value), sub ? h('span', { class: 'ssub ' + (sub[1] || '') }, sub[0]) : null));
  }
  function ring(value, label) {
    return h('div', { class: 'ring', style: '--p:' + Math.round(value * 100), role: 'img', 'aria-label': label }, h('span', null, Math.round(value * 100) + '%'), h('small', null, label));
  }
  function empty(icon, title, text, action) {
    return h('div', { class: 'empty' }, h('span', { class: 'tile slate big' }, ic(icon)), h('b', null, title), h('p', { class: 'muted' }, text), action || null);
  }
  function ago(ts) {
    var m = Math.round((Date.now() - ts) / 60000);
    if (m < 1) return t('ago.now'); if (m < 60) return t('ago.min', { n: m });
    var hr = Math.round(m / 60); if (hr < 24) return t('ago.hr', { n: hr });
    return t('ago.day', { n: Math.round(hr / 24) });
  }

  /* ---------- page: dashboard (home) ---------- */
  UN.routes.home = function () {
    var info = UN.prog.xpInfo(), o = UN.adapt.overall(), acc = UN.prog.accuracy(), sk = UN.prog.streak(), cats = UN.adapt.categoryStats();
    var page = h('div', { class: 'page' });

    page.appendChild(h('section', { class: 'card welcome' }, h('div', null, h('h1', null, t('dash.welcome')), h('p', { class: 'lead' }, t('dash.welcomeSub')),
      UN.subjectOrder.length < 2 ? null : h('div', { class: 'subjnow' }, h('span', { class: 'muted' }, t('subject.now') + ':'), h('b', null, UN.cfg.name[S().lang]),
        h('button', { type: 'button', class: 'btn ghost small', onclick: openSubjects }, t('subject.change')))),
      h('span', { class: 'emblem', 'aria-hidden': 'true' }, UN.art ? UN.art.make(UN.cfg.art, 76) : ic(UN.cfg.icon || 'globe'))));

    page.appendChild(h('section', { class: 'grid4' },
      stat('star', 'amber', t('stat.xp'), String(info.xp), [t('xp.next', { n: info.per - info.into }), 'muted']),
      stat('trophy', 'blue', t('stat.level'), String(info.level), [t('lvl.sub'), 'blue']),
      stat('target', 'green', t('stat.accuracy'), acc == null ? '—' : pct(acc), [acc == null ? t('stat.noacc') : acc >= 0.75 ? t('stat.acc.good') : t('stat.acc.keep'), acc != null && acc >= 0.75 ? 'green' : 'muted']),
      stat('flame', 'purple', t('stat.streak'), t('stat.days', { n: sk.days }), [sk.today ? t('stat.today') : t('stat.startToday'), 'muted'])));

    var left = h('div', { class: 'stack' }), right = h('div', { class: 'stack' });
    var cont = h('div', { class: 'grid3 tight' });
    [[1, 'gamepad', 'blue'], [2, 'target', 'green'], [3, 'trophy', 'purple']].forEach(function (g) {
      cont.appendChild(h('div', { class: 'card gcard tone-' + g[2] }, tile(g[1], g[2]), h('b', null, t('game' + g[0] + '.short')), h('small', { class: 'muted' }, t('game' + g[0] + '.tag')),
        h('a', { class: 'btn small ' + g[2], href: '#/game/' + g[0] }, t('games.play'))));
    });
    left.appendChild(h('section', null, h('h2', null, t('dash.continue')), cont));

    var weak = UN.adapt.weakIds(), rec = UN.adapt.recommendResources(weak).slice(0, 4);
    var recGrid = h('div', { class: 'grid2' });
    if (rec.length) rec.forEach(function (r) {
      recGrid.appendChild(h('a', { class: 'card rcard', href: '#/lesson/' + r.id }, tile('lightbulb', 'amber'), h('b', null, r.title[S().lang]), h('small', { class: 'muted' }, t('dash.basedOnExam')), h('span', { class: 'link' }, t('dash.startNow'), ic('chevron-right'))));
    });
    else {
      var nx = nextStep();
      recGrid.appendChild(h('a', { class: 'card rcard', href: nx[1] }, tile('play-circle', 'blue'), h('b', null, t(nx[2])), h('small', { class: 'muted' }, t('dash.suggested')), h('span', { class: 'link' }, t('dash.startNow'), ic('chevron-right'))));
      recGrid.appendChild(h('a', { class: 'card rcard', href: '#/vocab' }, tile('languages', 'green'), h('b', null, t('nav.vocab')), h('small', { class: 'muted' }, t('vocab.lead')), h('span', { class: 'link' }, t('dash.startNow'), ic('chevron-right'))));
    }
    left.appendChild(h('section', null, h('h2', null, t('dash.recommended')), recGrid));

    var recent = UN.prog.recent(5), rl = h('ul', { class: 'activity' });
    recent.forEach(function (g) {
      var src = String(g.src), isExam = src.indexOf('exam') === 0, no = src.replace(/\D/g, '');
      var isLesson = src === 'lesson';
      var label = isExam ? t('exam' + no + '.name') : isLesson ? t('nav.lessons') : t('game' + no + '.short');
      var detail = isExam ? Math.round(100 * g.sum / g.n) + '%' : t('act.detail', { n: g.n, c: Math.round(g.sum) });
      rl.appendChild(h('li', null, tile(isExam ? 'file-text' : isLesson ? 'lightbulb' : 'gamepad', isExam ? 'blue' : isLesson ? 'amber' : 'green'), h('div', null, h('b', null, label), h('small', { class: 'muted' }, detail)), h('small', { class: 'muted when' }, ago(g.t))));
    });
    left.appendChild(h('section', { class: 'card' }, h('h2', null, t('dash.recent')), recent.length ? rl : empty('clock', t('dash.noRecent'), t('dash.noRecentText'))));

    var ccount = Object.keys(UN.groups).filter(function (g) { return cats[g]; }).slice(0, 4);
    var prog = h('section', { class: 'card' }, h('div', { class: 'row between' }, h('h2', null, t('dash.yourProgress')), h('a', { class: 'link small', href: '#/progress' }, t('dash.viewDetails'))),
      h('div', { class: 'progress-split' }, ring(o.total ? o.mastered / o.total : 0, t('dash.overall')),
        h('div', { class: 'catlist' }, ccount.map(function (g) {
          var c = cats[g];
          return h('div', { class: 'catrow' }, h('span', null, UN.groups[g][S().lang]), h('b', null, c.avg == null ? '—' : pct(c.avg)), bar(c.avg == null ? 0 : c.avg, c.avg != null && c.avg < 0.6 ? 'warn' : ''));
        }))));
    right.appendChild(prog);

    var goals = [];
    goals.push([t('goal.game2'), 'target', Math.min(1, UN.prog.g().g2 || 0), 1]);
    var ne = [1, 2, 3].filter(function (n) { return !UN.prog.examPcts(n).length; })[0];
    goals.push([ne ? t('goal.exam', { name: t('exam' + ne + '.name') }) : t('goal.examAll'), 'file-text', ne ? 0 : 1, 1]);
    goals.push([t('goal.master'), 'trophy', Math.min(10, o.mastered), 10]);
    right.appendChild(h('section', { class: 'card' }, h('h2', null, t('dash.goals')),
      h('ul', { class: 'goals' }, goals.map(function (g) {
        return h('li', null, tile(g[1], g[2] >= g[3] ? 'green' : 'blue'), h('div', null, h('b', null, g[0]), bar(g[2] / g[3], g[2] >= g[3] ? 'good' : '')), h('b', { class: 'gcount', dir: 'ltr' }, g[2] + '/' + g[3]));
      }))));
    right.appendChild(h('section', { class: 'card quote' }, ic('quote'), h('p', null, t('quote.text')), h('small', { class: 'muted' }, '— ' + t('quote.by'))));

    page.appendChild(h('div', { class: 'cols' }, left, right));
    page.appendChild(aiNote());
    return page;
  };
  // small note on the home page and the dashboard: how the material was made, and asking to report mistakes
  function aiNote() { return h('p', { class: 'ainote' }, ic('sparkles'), ' ', t('foot.ai')); }

  /* ---------- page: learn ---------- */
  /* A definition shown exactly as in the course material, with two optional helpers:
     "simple version" (short exam-ready wording) and "translation" (the other language). */
  function helpBox(it) {
    var box = h('div', { class: 'defbox' }), body = h('div', { class: 'dbody' }), on = false;
    var btn = h('button', { type: 'button', class: 'dbtn', 'aria-pressed': 'false' }, ic('lightbulb'), t('def.explain'));
    btn.onclick = function () {
      on = !on; btn.setAttribute('aria-pressed', String(on)); btn.classList.toggle('on', on); body.textContent = '';
      if (on) {
        if (it.help.ar) body.appendChild(h('div', { class: 'dpart simple' }, h('small', { class: 'dlbl' }, t('def.explainLbl')), h('div', { class: 'dtext' }, L(it.help.ar, 'ar')), h('div', { class: 'dtext dtr' }, L(it.help.en, 'en'))));
        if (it.help.suggest) body.appendChild(h('div', { class: 'dpart tr' }, h('small', { class: 'dlbl' }, t('def.suggest')), h('div', { class: 'dtext' }, L(it.help.suggest, 'ar'))));
      }
    };
    box.appendChild(body); box.appendChild(h('div', { class: 'dbtns' }, btn));
    return box;
  }
  function defBox(it) {
    var lang = it.origLang || 'en', other = lang === 'en' ? 'ar' : 'en';
    var box = h('div', { class: 'defbox' });
    if (!it.orig && it.help) return helpBox(it);
    if (!it.orig) { box.appendChild(h('div', { class: 'dtext' }, L(it.def, lang))); return box; }
    var showSimple = false, showTr = false;
    var body = h('div', { class: 'dbody' }), bar = h('div', { class: 'dbtns' });
    var bSimple = h('button', { type: 'button', class: 'dbtn', 'aria-pressed': 'false' }, ic('lightbulb'), t('def.simple'));
    var bTr = h('button', { type: 'button', class: 'dbtn', 'aria-pressed': 'false' }, ic('languages'), t(other === 'ar' ? 'def.toAr' : 'def.toEn'));
    function draw() {
      bSimple.setAttribute('aria-pressed', String(showSimple)); bSimple.classList.toggle('on', showSimple);
      bTr.setAttribute('aria-pressed', String(showTr)); bTr.classList.toggle('on', showTr);
      body.textContent = '';
      body.appendChild(h('div', { class: 'dpart' }, h('small', { class: 'dlbl' }, t('def.original')), h('div', { class: 'dtext' }, L(it.orig, lang))));
      if (showTr && it.origOther) body.appendChild(h('div', { class: 'dpart tr' }, h('small', { class: 'dlbl' }, t('def.translation')), h('div', { class: 'dtext' }, L(it.origOther, other))));
      if (showSimple) {
        var p = h('div', { class: 'dpart simple' }, h('small', { class: 'dlbl' }, t('def.simpleLbl')), h('div', { class: 'dtext' }, L(it.def, lang)));
        if (showTr && it.defOther) p.appendChild(h('div', { class: 'dtext dtr' }, L(it.defOther, other)));
        p.appendChild(h('small', { class: 'muted dnudge' }, t('def.nudge')));
        body.appendChild(p);
      }
    }
    bSimple.onclick = function () { showSimple = !showSimple; draw(); };
    bTr.onclick = function () { showTr = !showTr; draw(); };
    bar.appendChild(bSimple); bar.appendChild(bTr);
    box.appendChild(body); box.appendChild(bar); draw();
    return box;
  }
  function termTable(ids) {
    var tb = h('div', { class: 'terms' });
    ids.forEach(function (id) {
      var it = UN.itemsById[id];
      if (it.kind === 'sub') { tb.appendChild(h('div', { class: 'term defrow' }, h('div', { class: 'en' }, L(it.name, 'en')), defBox(it))); return; }
      if (it.kind === 'gap') { tb.appendChild(h('div', { class: 'term defrow' }, h('div', { class: 'gapfull' }, gapSentence(it.q, it.answer)), h('div', { class: 'muted small' }, it.note))); return; }
      if (it.kind !== 'term') return;
      tb.appendChild(h('div', { class: 'term' + ((it.orig || it.help) ? ' withdef' : '') }, h('div', { class: 'en' }, L(it.en, 'en'), speakBtn(it.en)), h('div', { class: 'ar' }, L(it.arShow, 'ar')), (it.orig || it.help) ? defBox(it) : null));
    });
    return tb;
  }
  function mediaBlock(r) {
    var m = h('div', { class: 'media' });
    if (r.video) m.appendChild(h('video', { controls: true, preload: 'none', playsinline: true, src: r.video, 'aria-label': r.title[S().lang] }));
    if (r.audio) m.appendChild(h('audio', { controls: true, preload: 'none', src: r.audio }));
    if (!r.video && !r.audio) return null;
    return m;
  }
  function resourceCard(r, open) {
    var lang = S().lang;
    var d = h('details', { class: 'card res', id: r.id });
    if (open) d.setAttribute('open', '');
    d.appendChild(h('summary', null, h('span', { class: 'rt' }, r.title[lang]), h('span', { class: 'pill' }, t('learn.items', { n: r.items.length })), ic('chevron-right', 'caret')));
    d.appendChild(h('p', null, r.text[lang]));
    d.appendChild(h('div', { class: 'tip' }, ic('lightbulb'), h('span', null, r.tip[lang])));
    d.appendChild(termTable(r.items));
    var mb = mediaBlock(r); if (mb) d.appendChild(mb);
    return d;
  }
  // Learn page of a subject made of explanations (Discourse Analysis): understand it first with labelled examples, then every
  // concept with a full explanation and a short version. Both languages are shown: the interface language first.
  function explainLearn(arg) {
    var lang = S().lang, other = lang === 'ar' ? 'en' : 'ar';
    var page = h('div', { class: 'page' }, pageHead(t('learn.title'), t('learn.lead')));
    var revCard = UN.revise ? UN.revise.card() : null; if (revCard) page.appendChild(revCard);
    function two(o, cls) {
      return h('div', { class: 'bi ' + (cls || '') }, h('p', { lang: lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }, o[lang]), h('p', { class: 'bi2', lang: other, dir: other === 'ar' ? 'rtl' : 'ltr' }, o[other]));
    }
    function badges(tags) {
      return h('div', { class: 'xbadges' }, Object.keys(tags).map(function (k) { var v = tags[k]; return h('span', { class: 'xbadge ' + (v ? 'yes' : 'no'), lang: 'en', dir: 'ltr' }, (v ? '✓ ' : '✗ ') + t('da.' + k + (v ? '' : 'No'))); }));
    }
    if (UN.explainNote) page.appendChild(h('p', { class: 'xnote' }, ic('info'), ' ', UN.explainNote[lang]));
    page.appendChild(h('h2', null, t('da.understand')));
    UN.explain.forEach(function (sec, k) {
      var d = h('details', { class: 'card res xsec', id: sec.id });
      if (k === 0) d.setAttribute('open', '');
      d.appendChild(h('summary', null, h('span', { class: 'rt' }, sec.title[lang], sec.title[other] !== sec.title[lang] ? h('small', { class: 'muted xalt', dir: other === 'ar' ? 'rtl' : 'ltr' }, sec.title[other]) : null), ic('chevron-right', 'caret')));
      if (sec.text) d.appendChild(two(sec.text));
      if (sec.points) d.appendChild(h('ul', { class: 'xpoints' }, sec.points.map(function (p) { return h('li', null, two(p)); })));
      if (sec.examples) d.appendChild(h('div', { class: 'xexamples' }, sec.examples.map(function (e) {
        return h('div', { class: 'xex' }, e.context ? h('small', { class: 'xctx' }, t('da.context') + ': ' + e.context[lang]) : null,
          h('div', { class: 'quote xtext', lang: 'en', dir: 'ltr' }, e.text), badges(e.tags), two(e.why, 'xwhy'));
      })));
      if (sec.items) d.appendChild(h('div', { class: 'xitems' }, sec.items.map(function (it) {
        return h('div', { class: 'xitem' }, h('div', { class: 'xchead' }, h('b', { lang: 'en' }, it.name.en), it.name.ar !== it.name.en ? h('span', { class: 'xar', lang: 'ar', dir: 'rtl' }, it.name.ar) : null), two(it.text),
          it.ex ? h('ul', { class: 'xexlist', lang: 'en', dir: 'ltr' }, it.ex.map(function (x) { return h('li', null, x); })) : null);
      })));
      if (sec.remember) d.appendChild(h('div', { class: 'tip xremember' }, ic('lightbulb'), two(sec.remember)));
      page.appendChild(d);
    });
    page.appendChild(h('h2', null, t('da.concepts')));
    (UN.cfg.termGroups || []).forEach(function (g) {
      var subs = UN.subs.filter(function (x) { return x.group === g; });
      if (!subs.length) return;
      // a topic with one concept of the same name needs no heading of its own (the anchor stays for links to the topic)
      var same = subs.length === 1 && subs[0].name === UN.groups[g].en;
      page.appendChild(same ? h('span', { id: 'r-' + g }) : h('h3', { class: 'xgroup', id: 'r-' + g }, UN.groups[g][lang]));
      subs.forEach(function (c) {
        page.appendChild(h('div', { class: 'card xconcept', id: c.id },
          h('div', { class: 'xchead' }, h('b', { lang: 'en' }, c.name), c.arName ? h('span', { class: 'xar', lang: 'ar', dir: 'rtl' }, c.arName) : null),
          h('small', { class: 'dlbl' }, t('da.full')), two(c.full),
          h('small', { class: 'dlbl' }, t('da.short')), two(c.short, 'xshort'),
          c.ex && c.ex.length ? h('div', { class: 'xexamples' }, h('small', { class: 'dlbl' }, t('da.examples')), c.ex.map(function (x) {
            return h('div', { class: 'xex' }, h('div', { class: 'quote xtext', lang: 'en', dir: 'ltr' }, x.t), two(x.n, 'xwhy'));
          })) : null));
      });
    });
    page.appendChild(h('section', { class: 'card xpractise' }, h('h2', null, t('da.practise')), h('div', { class: 'row' },
      h('a', { class: 'btn primary', href: '#/game/1' }, '🎮 ' + t('game1.name')),
      UN.exam && UN.exam.hasAll() ? h('a', { class: 'btn ghost', href: '#/exam/4' }, '📚 ' + t('exam4.name')) : null,
      h('a', { class: 'btn ghost', href: '#/vocab' }, '📋 ' + t('nav.vocab')))));
    if (arg) later(function () { var el = document.getElementById(arg); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    return page;
  }
  // Learn page of a subject made of chapter summaries (Internet Research Skills): every chapter with its topics, its
  // conclusion and a button that practises its questions. The chapter blocks are Arabic in both interface languages.
  // English term and its Arabic equivalent, side by side (chapter summaries written in English)
  function termTable(rows) {
    return h('div', { class: 'tlist' }, rows.map(function (r) {
      return h('div', { class: 'trow' }, h('span', { class: 'te', lang: 'en', dir: 'ltr' }, r[0]), h('span', { class: 'ta', lang: 'ar', dir: 'rtl' }, r[1]));
    }));
  }
  function chapterLearn(arg) {
    var lang = S().lang, en = UN.cfg.chapterLang === 'en', only = UN.cfg.summaryOnly;
    // English summaries carry a short line in Arabic under the intro, each topic and the chapter summary
    var gist = function (ar) { return ar ? h('p', { class: 'chgist', lang: 'ar', dir: 'rtl' }, h('b', null, 'بالعربي:'), ' ', ar) : null; };
    var page = h('div', { class: 'page' }, pageHead(t('learn.title'), t('learn.lead')));
    var revCard = !only && UN.revise ? UN.revise.card() : null; if (revCard) page.appendChild(revCard);
    if (UN.explainNote) page.appendChild(h('p', { class: 'xnote' }, ic('info'), ' ', smart(UN.explainNote[lang] || UN.explainNote.ar)));
    page.appendChild(h('nav', { class: 'row chnav' }, UN.chapters.map(function (c) { return h('a', { class: 'chipbtn', href: '#/learn/r-' + c.g }, UN.groups[c.g][lang]); })));
    UN.chapters.forEach(function (c) {
      var n = UN.qitems.filter(function (q) { return q.group === c.g; }).length;
      var sec = h('section', { class: 'chapter', id: 'r-' + c.g, lang: en ? 'en' : 'ar', dir: en ? 'ltr' : 'rtl' }, h('h2', null, c.title));
      if (c.titleAr) sec.appendChild(h('p', { class: 'muted chby', lang: 'ar', dir: 'rtl' }, c.titleAr));
      if (c.by) sec.appendChild(h('p', { class: 'muted chby' }, c.by));
      if (c.intro) sec.appendChild(h('p', null, c.intro));
      if (c.introAr) sec.appendChild(gist(c.introAr));
      c.topics.forEach(function (tp, k) {
        var d = h('details', { class: 'card res xsec', id: c.g + '-' + (k + 1) });
        d.appendChild(h('summary', null, h('span', { class: 'rt' }, tp.title, tp.titleAr ? h('small', { class: 'xalt muted', lang: 'ar', dir: 'rtl' }, tp.titleAr) : null), ic('chevron-right', 'caret')));
        if (tp.text) d.appendChild(h('p', null, tp.text));
        if (tp.items) d.appendChild(h('div', { class: 'xitems' }, tp.items.map(function (it) {
          return h('div', { class: 'xitem' }, h('div', { class: 'xchead' }, h('b', null, it.name), it.ar ? h('span', { class: 'xar', lang: 'ar', dir: 'rtl' }, it.ar) : null),
            it.text ? h('p', null, it.text) : null, it.ex ? h('div', { class: 'quote xtext', dir: 'auto' }, it.ex) : null);
        })));
        if (tp.points) d.appendChild(h('ul', { class: 'xpoints' }, tp.points.map(function (p) { return h('li', null, p); })));
        if (tp.terms) d.appendChild(termTable(tp.terms));
        if (tp.ar) d.appendChild(gist(tp.ar));
        sec.appendChild(d);
      });
      if (c.sum) {
        var sumP = h('p', null, h('b', null, en ? 'Chapter summary:' : 'خلاصة الفصل:'), ' ', c.sum);
        sec.appendChild(h('div', { class: 'tip xremember' }, ic('lightbulb'), c.sumAr ? h('div', null, sumP, gist(c.sumAr)) : sumP));
      }
      if (n) sec.appendChild(h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/practice/' + c.g }, '🎯 ' + t('ch.practise', { n: n }))));
      page.appendChild(sec);
    });
    if (!only) page.appendChild(h('section', { class: 'card xpractise' }, h('h2', null, t('da.practise')), h('div', { class: 'row' },
      h('a', { class: 'btn primary', href: '#/game/1' }, '🎮 ' + t('game1.name')),
      UN.exam && UN.exam.hasAll() ? h('a', { class: 'btn ghost', href: '#/exam/4' }, '📚 ' + t('exam4.name')) : null,
      h('a', { class: 'btn ghost', href: '#/vocab' }, '📋 ' + t('nav.vocab')))));
    if (arg) later(function () { var el = document.getElementById(arg); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    return page;
  }
  // Every question in its original order, part by part (Part 1 fill in the gap 1-80, Part 2 MCQ, Part 3 written),
  // with a tick on each number so a student always knows where they stopped.
  function learnParts() {
    var s = S(), lang = s.lang, qn = lang === 'ar' ? 'س' : 'Q';
    var done = s.learnDone = s.learnDone || {};
    var tabs = [
      { k: 'p1', label: partText({ part: 1 }, true), items: UN.gaps.map(function (it) { return { id: it.id, n: it.n }; }) },
      { k: 'p2', label: partText({ part: 2 }, true), items: UN.bank.mcq.map(function (b, i) { return { id: b.id, n: i + 1 }; }) },
      { k: 'p3', label: partText({ part: 3 }, true), items: UN.written.map(function (w, i) { return { id: w.id, n: i + 1 }; }) }
    ];
    if (UN.subs.length && UN.cfg.parts[3]) tabs.push({ k: 'p4', label: UN.cfg.parts[3].name[lang], items: UN.subs.map(function (x, i) { return { id: x.id, n: i + 1 }; }) });
    var cur = tabs.some(function (x) { return x.k === s.learnPart; }) ? s.learnPart : 'p1';
    var bar = h('div', { class: 'tabs lptabs', role: 'tablist' }), status = h('div', { class: 'lpstatus' }), list = h('div', { class: 'stack lplist' });
    function tab() { return tabs.filter(function (x) { return x.k === cur; })[0]; }
    function count(T) { return T.items.filter(function (x) { return done[x.id]; }).length; }
    function drawTabs() {
      bar.textContent = '';
      tabs.forEach(function (x) {
        bar.appendChild(h('button', { type: 'button', role: 'tab', 'aria-selected': String(x.k === cur), class: 'tab' + (x.k === cur ? ' on' : ''),
          onclick: function () { cur = x.k; s.learnPart = cur; UN.store.save(); drawTabs(); drawList(); } }, x.label, h('small', null, ' ' + count(x) + '/' + x.items.length)));
      });
    }
    function drawStatus() {
      var T = tab(), c = count(T), next = T.items.filter(function (x) { return !done[x.id]; })[0];
      status.textContent = '';
      status.appendChild(h('span', { class: 'pill' + (c === T.items.length ? ' good' : '') }, ic('check'), t('learn.studied', { n: c, total: T.items.length })));
      if (next) status.appendChild(h('button', { type: 'button', class: 'btn small primary', onclick: function () {
        var el = document.getElementById('lp-' + next.id); if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); later(function () { el.classList.remove('flash'); }, 1600);
      } }, t('learn.continue', { n: qn + next.n }), ic('chevron-right', 'flip')));
      else status.appendChild(h('span', { class: 'muted' }, t('learn.allStudied')));
      if (c) status.appendChild(h('button', { type: 'button', class: 'btn small ghost', onclick: function () { T.items.forEach(function (x) { delete done[x.id]; }); UN.store.save(); drawTabs(); drawList(); } }, t('learn.reset')));
    }
    // the question number is the "studied" switch; only its own row changes, so open answers stay open
    function row(id, n, body) {
      var r = h('div', { class: 'vrow card def lprow' + (done[id] ? ' studied' : ''), id: 'lp-' + id });
      var b = h('button', { type: 'button', class: 'lpnum' + (done[id] ? ' done' : ''), title: t('learn.mark'), 'aria-pressed': String(!!done[id]) }, String(n));
      b.addEventListener('click', function () {
        if (done[id]) delete done[id]; else done[id] = true;
        UN.store.save();
        b.classList.toggle('done', !!done[id]); b.setAttribute('aria-pressed', String(!!done[id])); r.classList.toggle('studied', !!done[id]);
        drawTabs(); drawStatus();
      });
      r.appendChild(b); r.appendChild(body);
      return r;
    }
    function drawList() {
      drawStatus(); list.textContent = '';
      if (cur === 'p1') UN.gaps.forEach(function (it) {
        list.appendChild(row(it.id, it.n, h('div', { class: 'vdef' }, h('div', { class: 'gapfull' }, gapSentence(it.q, it.answer)), h('div', { class: 'muted small' }, it.note), videoLink('gaps', it.n))));
      });
      else if (cur === 'p2') UN.bank.mcq.forEach(function (b, i) {
        var key = UN.keys.mcq[b.id];
        list.appendChild(row(b.id, i + 1, h('div', { class: 'vdef' }, h('b', null, b.text),
          h('ul', { class: 'mopts' }, Object.keys(b.opts).map(function (k) { return h('li', { class: k === key ? 'right' : '' }, h('span', { class: 'letter' }, k.toUpperCase()), k === key ? h('mark', { class: 'gans' }, b.opts[k]) : b.opts[k]); })),
          videoLink('mcq', i + 1))));
      });
      else if (cur === 'p3') UN.written.forEach(function (w, i) {
        var k = UN.keys.written[w.id];
        list.appendChild(row(w.id, i + 1, h('details', { class: 'vdef' }, h('summary', null, h('b', null, L(w.q, 'en'))), h('p', { class: 'quote model' }, L(k.model, 'en')),
          k.trick ? h('div', { class: 'tip' }, ic('lightbulb'), h('span', null, k.trick)) : null, videoLink('essay', i + 1))));
      });
      else UN.subs.forEach(function (x, i) { list.appendChild(row(x.id, i + 1, h('div', { class: 'vdef' }, h('b', null, x.name), h('div', null, x.def)))); });
    }
    drawTabs(); drawList();
    return h('section', { class: 'lparts', id: 'parts' }, h('h2', null, t('learn.byPart')), h('p', { class: 'muted' }, t('learn.byPartLead')), bar, status, list);
  }
  UN.routes.learn = function (arg) {
    if (UN.chapters) return chapterLearn(arg);
    if (UN.explain) return explainLearn(arg);
    var page = h('div', { class: 'page' }, pageHead(t('learn.title'), t('learn.lead')));
    if (UN.videos && UN.videos.length) page.appendChild(h('a', { class: 'card vbanner', href: '#/videos' }, UN.art ? UN.art.make('si', 40) : ic('play-circle'), h('span', { class: 'vbt' }, h('b', null, t('vid.title')), h('small', { class: 'muted' }, t('vid.bannerSub', { n: UN.videos.length }))), ic('chevron-right', 'flip')));
    if (UN.cfg.reading && UN.reading) page.appendChild(h('a', { class: 'card vbanner', href: '#/reading' }, ic('book-open'), h('span', { class: 'vbt' }, h('b', null, t('reading.title')), h('small', { class: 'muted' }, t('reading.bannerSub'))), ic('chevron-right', 'flip')));
    var revCard = UN.revise ? UN.revise.card() : null; if (revCard) page.appendChild(revCard);
    var byPart = UN.cfg.parts && UN.gaps && UN.gaps.length;
    if (byPart) page.appendChild(learnParts());
    var weak = UN.adapt.weakIds();
    var rec = weak.length ? UN.adapt.recommendResources(weak) : [];
    if (rec.length) {
      page.appendChild(h('section', null, h('h2', null, t('learn.recommended')),
        h('div', { class: 'stack' }, rec.slice(0, 3).map(function (r) { return resourceCard(r, r.id === arg); }))));
    }
    page.appendChild(h('h2', null, t(byPart ? 'learn.topics' : 'learn.all')));
    var stack = h('div', { class: 'stack' });
    UN.resources.forEach(function (r) { if (rec.slice(0, 3).indexOf(r) === -1) stack.appendChild(resourceCard(r, r.id === arg)); });
    page.appendChild(stack);
    if (!UN.written.length || byPart) { if (arg) later(function () { var el = document.getElementById(arg); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50); return page; }
    page.appendChild(h('h2', null, t('learn.written')));
    var wst = h('div', { class: 'stack' });
    UN.written.forEach(function (w) {
      wst.appendChild(h('details', { class: 'card res' }, h('summary', null, h('span', { class: 'rt' }, L(w.q, 'en')), ic('chevron-right', 'caret')), h('p', { class: 'quote model' }, L(UN.keys.written[w.id].model, 'en')), UN.keys.written[w.id].trick ? h('div', { class: 'tip' }, ic('lightbulb'), h('span', null, UN.keys.written[w.id].trick)) : null));
    });
    page.appendChild(wst);
    if (arg) later(function () { var el = document.getElementById(arg); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    return page;
  };

  /* ---------- page: vocabulary ---------- */
  UN.routes.vocab = function () {
    var gapMode = UN.cfg.flipKind === 'gap', tab = gapMode ? 'gaps' : (UN.cfg.vocabTabs ? UN.cfg.vocabTabs[0][0] : 'terms'), q = '', grp = 'all', lang = S().lang;
    var page = h('div', { class: 'page' }, pageHead(t('vocab.title'), t('vocab.lead')));
    var tabs = h('div', { class: 'tabs', role: 'tablist' }), chips = h('div', { class: 'chips-row' }), list = h('div', { class: 'vlist' });
    var search = h('input', { type: 'search', class: 'txt', placeholder: t('vocab.search'), 'aria-label': t('vocab.search'), autocomplete: 'off' });
    var searchBox = h('div', { class: 'searchbox' }, ic('search'), search);
    page.appendChild(h('div', { class: 'toolbar' }, tabs, searchBox)); page.appendChild(chips); page.appendChild(list);
    function norm(s) { return UN.check.normEn(s) + ' ' + UN.check.normAr(s); }
    function drawTabs() {
      tabs.textContent = '';
      (gapMode ? [['gaps', 'vocab.part1'], ['mcq', 'vocab.part2'], ['written', 'vocab.part3'], ['defs', 'vocab.part4']] : (UN.cfg.vocabTabs || [['terms', 'vocab.terms'], ['defs', 'vocab.defs'], ['written', 'vocab.written']])).forEach(function (x) {
        tabs.appendChild(h('button', { type: 'button', role: 'tab', 'aria-selected': String(tab === x[0]), class: 'tab' + (tab === x[0] ? ' on' : ''), onclick: function () { tab = x[0]; draw(); } }, t(x[1])));
      });
    }
    function drawChips() {
      chips.textContent = '';
      if (tab !== 'terms' && tab !== 'gaps' && !(gapMode && tab === 'written')) return;
      [['all']].concat(UN.cfg.termGroups.map(function (g) { return [g]; })).forEach(function (x) {
        chips.appendChild(h('button', { type: 'button', class: 'chipbtn' + (grp === x[0] ? ' on' : ''), onclick: function () { grp = x[0]; draw(); } }, x[0] === 'all' ? t('vocab.all') : UN.groups[x[0]][lang]));
      });
    }
    function draw() {
      drawTabs(); drawChips(); list.textContent = '';
      var needle = norm(q), n = 0;
      if (tab === 'mcq') {
        UN.bank.mcq.forEach(function (b, i) {
          var key = UN.keys.mcq[b.id];
          if (needle && norm(b.text + ' ' + Object.keys(b.opts).map(function (k) { return b.opts[k]; }).join(' ')).indexOf(needle) === -1) return;
          n++;
          list.appendChild(h('div', { class: 'vrow card def mcqrow' }, h('span', { class: 'vnum' }, i + 1), h('div', { class: 'vdef', lang: b.lang || null, dir: b.lang === 'ar' ? 'rtl' : null }, h('b', null, b.text),
            h('ul', { class: 'mopts' }, Object.keys(b.opts).map(function (k) { return h('li', { class: k === key ? 'right' : '' }, h('span', { class: 'letter' }, k.toUpperCase()), k === key ? h('mark', { class: 'gans' }, b.opts[k]) : b.opts[k]); })), b.note ? h('div', { class: 'muted small' }, b.note) : null)));
        });
      } else if (tab === 'gaps') {
        UN.gaps.forEach(function (it) {
          if (grp !== 'all' && it.group !== grp) return;
          if (needle && norm(it.q + ' ' + it.answer + ' ' + it.note).indexOf(needle) === -1) return;
          n++;
          list.appendChild(h('div', { class: 'vrow card def' }, h('span', { class: 'vnum' }, it.n), h('div', { class: 'vdef' }, h('div', { class: 'gapfull' }, gapSentence(it.q, it.answer)), h('div', { class: 'muted small' }, it.note), videoLink('gaps', it.n)), h('span', { class: 'pill' }, UN.groups[it.group][lang])));
        });
      } else if (tab === 'terms') {
        UN.terms.forEach(function (it) {
          if (grp !== 'all' && it.group !== grp) return;
          if (needle && norm(it.en + ' ' + it.arShow).indexOf(needle) === -1) return;
          n++;
          list.appendChild(h('div', { class: 'vrow card' }, h('span', { class: 'vnum' }, it.id.slice(1)), h('div', { class: 'ven' }, L(it.en, 'en'), speakBtn(it.en)), h('div', { class: 'var' }, L(it.arShow, 'ar')), h('span', { class: 'pill' }, UN.groups[it.group][lang]), (it.orig || it.help) ? defBox(it) : null));
        });
      } else if (tab === 'defs') {
        UN.subs.forEach(function (s) {
          if (needle && norm(s.name + ' ' + s.def).indexOf(needle) === -1) return;
          n++;
          list.appendChild(h('div', { class: 'vrow card def' }, tile('book', 'purple'), h('div', { class: 'vdef' }, h('b', null, L(s.name, 'en')), defBox(s))));
        });
      } else {
        UN.written.forEach(function (w) {
          var m = UN.keys.written[w.id].model;
          if (gapMode && grp !== 'all' && w.group !== grp) return;
          if (needle && norm(w.q + ' ' + m).indexOf(needle) === -1) return;
          n++;
          list.appendChild(h('div', { class: 'card' }, h('b', null, w.n ? w.n + '. ' : '', L(w.q, 'en')), h('p', { class: 'quote model' }, L(m, 'en')), UN.keys.written[w.id].trick ? h('div', { class: 'tip' }, ic('lightbulb'), h('span', null, UN.keys.written[w.id].trick)) : null));
        });
      }
      if (!n) list.appendChild(empty('search', t('vocab.none'), t('vocab.noneText')));
    }
    search.addEventListener('input', function () { q = search.value; draw(); });
    draw();
    return page;
  };

  /* ---------- page: videos & audio ---------- */
  UN.routes.media = function () {
    if (UN.routes.lessons) return UN.routes.lessons();
    var filter = 'all', lang = S().lang;
    var page = h('div', { class: 'page' }, pageHead(t('media.title'), t('media.lead')));
    var tabs = h('div', { class: 'tabs', role: 'tablist' }), list = h('div', { class: 'grid2' });
    page.appendChild(tabs); page.appendChild(list);
    function draw() {
      tabs.textContent = ''; list.textContent = '';
      [['all', 'media.all'], ['video', 'media.video'], ['audio', 'media.audio']].forEach(function (x) {
        tabs.appendChild(h('button', { type: 'button', role: 'tab', 'aria-selected': String(filter === x[0]), class: 'tab' + (filter === x[0] ? ' on' : ''), onclick: function () { filter = x[0]; draw(); } }, t(x[1])));
      });
      var items = UN.resources.filter(function (r) { return filter === 'all' ? (r.video || r.audio) : r[filter]; });
      if (!items.length) { list.className = ''; list.appendChild(empty('play-circle', t('media.empty'), t('media.emptyText'), h('a', { class: 'btn primary', href: '#/learn' }, t('nav.learn')))); return; }
      list.className = 'grid2';
      items.forEach(function (r) {
        list.appendChild(h('div', { class: 'card mcard' }, h('div', { class: 'row between' }, h('b', null, r.title[lang]), h('span', { class: 'pill' }, t(r.video ? 'media.video' : 'media.audio'))),
          h('p', { class: 'muted' }, r.text[lang]), mediaBlock(r), h('a', { class: 'link', href: '#/learn/' + r.id }, t('media.openTopic'), ic('chevron-right'))));
      });
    }
    draw();
    return page;
  };

  /* ---------- page: achievements ---------- */
  UN.routes.achievements = function () {
    var got = UN.achievements.filter(function (a) { return S().ach[a.id]; }).length;
    var page = h('div', { class: 'page' }, pageHead(t('ach.title'), t('ach.unlocked', { n: got, m: UN.achievements.length })));
    page.appendChild(bar(got / UN.achievements.length, 'good'));
    var ag = h('div', { class: 'ach-grid' });
    UN.achievements.forEach(function (a) {
      var on = S().ach[a.id];
      ag.appendChild(h('div', { class: 'ach card' + (on ? ' got' : '') }, tile(on ? 'trophy' : 'lock', on ? 'amber' : 'slate'), h('div', null, h('b', null, t('ach.' + a.id + '.t')), h('div', { class: 'muted small' }, t('ach.' + a.id + '.d', { n: UN.cfg.flipGoal })))));
    });
    page.appendChild(ag);
    return page;
  };

  /* ---------- page: progress ---------- */
  function wrongRows() {
    var seen = {}, out = [], a = S().attempts;
    for (var i = a.length - 1; i >= 0 && out.length < 10; i--) {
      a[i].rows.forEach(function (r) { if (r.graded && r.v < 0.75 && !seen[r.item] && out.length < 10) { seen[r.item] = 1; out.push(r); } });
    }
    return out;
  }
  UN.routes.progress = UN.routes.dashboard = function () {
    var info = UN.prog.xpInfo(), o = UN.adapt.overall(), st = UN.adapt.rebuild(), cats = UN.adapt.categoryStats();
    var page = h('div', { class: 'page' }, pageHead(t('dash.title')));

    page.appendChild(h('section', { class: 'grid3' },
      stat('star', 'amber', t('level') + ' ' + info.level, info.xp + ' XP', [t('xp.next', { n: info.per - info.into }), 'muted']),
      stat('check-circle', 'green', t('stat.mastered'), o.mastered + '/' + o.total),
      stat('alert-circle', 'amber', t('stat.weak'), String(o.weak))));
    page.appendChild(h('section', null, h('h2', null, t('home.journey')), h('p', { class: 'muted' }, t('home.free')), journey()));

    var ex = h('div', { class: 'card' }), any = false, prev = null;
    [1, 2, 3].forEach(function (n) {
      var p = UN.prog.examPcts(n), last = p.length ? p[p.length - 1] : null, delta = '';
      if (last != null) { any = true; if (prev != null) { var d = last - prev; delta = (d > 0 ? '+' : '') + d + '%'; } prev = last; }
      ex.appendChild(h('div', { class: 'exrow' }, h('span', { class: 'exn' }, t('exam' + n + '.name')),
        bar(last == null ? 0 : last / 100, last != null && last >= 70 ? 'good' : last != null && last < 50 ? 'warn' : ''),
        h('span', { class: 'exv' }, last == null ? '—' : last + '%'), h('span', { class: 'delta' }, delta)));
    });
    page.appendChild(h('section', null, h('h2', null, t('dash.exams')), ex, any ? null : h('p', { class: 'muted' }, t('dash.noexam'))));

    var cc = h('div', { class: 'card' });
    Object.keys(UN.groups).forEach(function (g) {
      var c = cats[g]; if (!c) return;
      cc.appendChild(h('div', { class: 'exrow' }, h('span', { class: 'exn' }, UN.groups[g][S().lang]),
        bar(c.avg == null ? 0 : c.avg, c.avg != null && c.avg < 0.6 ? 'warn' : 'good'), h('span', { class: 'exv' }, c.avg == null ? '—' : pct(c.avg))));
    });
    page.appendChild(h('section', null, h('h2', null, t('dash.categories')), cc));

    var ranked = UN.adapt.rank().ids.filter(function (id) { return UN.adapt.isWeak(st[id]); });
    var weakBox = h('div', { class: 'card' });
    if (!ranked.length) weakBox.appendChild(empty('check-circle', t('dash.noweak'), t('dash.noweakText')));
    else {
      [['term', 'dash.weakTerms'], ['sub', 'dash.weakDefs'], ['wq', 'dash.weakConcepts']].forEach(function (k) {
        var ids = ranked.filter(function (id) { return UN.itemsById[id].kind === k[0]; });
        if (!ids.length) return;
        weakBox.appendChild(h('h3', null, t(k[1])));
        weakBox.appendChild(h('ul', { class: 'list' }, ids.map(function (id) {
          return h('li', null, termLabel(id), h('span', { class: 'pill warn' }, pct(st[id].ema)), st[id].miss > 1 ? h('span', { class: 'pill' }, t('dash.repeat', { n: st[id].miss })) : null);
        })));
      });
      weakBox.appendChild(h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/game/2' }, ic('wrench'), t('game2.name')), h('a', { class: 'btn ghost', href: '#/learn' }, ic('book-open'), t('nav.learn'))));
    }
    page.appendChild(h('section', null, h('h2', null, t('dash.weak')), weakBox));

    var rec = UN.adapt.recommendResources(ranked);
    if (rec.length) {
      page.appendChild(h('section', null, h('h2', null, t('dash.revision')),
        h('div', { class: 'card' }, h('ul', { class: 'list' }, rec.map(function (r) { return h('li', null, h('a', { class: 'link', href: '#/lesson/' + r.id }, r.title[S().lang])); })))));
    }
    var wr = wrongRows();
    page.appendChild(h('section', null, h('h2', null, t('dash.prevWrong')),
      h('div', { class: 'card' }, wr.length ? h('ul', { class: 'list wrong' }, wr.map(function (r) {
        return h('li', null, h('div', { class: 'q' }, r.pl === 'ar' ? L(r.prompt, 'ar') : mixed(r.prompt)), h('div', { class: 'ans' }, ic('check'), mixed(r.correct)));
      })) : empty('check-circle', t('dash.noWrong'), ''))));
    page.appendChild(h('section', null, h('a', { class: 'btn ghost', href: '#/achievements' }, ic('trophy'), t('ach.title'))));
    page.appendChild(aiNote());
    return page;
  };

  /* ---------- page: settings ---------- */
  UN.routes.settings = function () {
    var s = S();
    var seg = function (opts, cur, on) {
      return h('div', { class: 'seg wide' }, opts.map(function (o) { return h('button', { type: 'button', class: o[0] === cur ? 'on' : '', 'aria-pressed': String(o[0] === cur), onclick: function () { on(o[0]); } }, o[1]); }));
    };
    return h('div', { class: 'page narrow' }, pageHead(t('nav.settings')),
      h('div', { class: 'card stack' },
        h('label', null, t('set.lang')), seg([['en', 'English'], ['ar', 'العربية']], s.lang, setLang),
        h('label', null, t('set.theme')), seg([['auto', t('set.auto')], ['light', t('set.light')], ['dark', t('set.dark')]], s.theme, setTheme)),
      h('div', { class: 'card stack' }, h('h2', null, t('set.privacy')), h('p', null, t('set.privacyText'))),
      h('div', { class: 'card stack' }, h('h2', null, t('set.reset')), h('p', null, t('set.resetText')),
        h('button', { class: 'btn danger', onclick: function () {
          confirmDialog(t('set.resetConfirm'), t('set.resetYes'), function () { UN.store.reset(); applyLang(); applyTheme(); toast(t('set.resetDone')); go('#/home'); }, true);
        } }, ic('trash'), t('set.reset'))));
  };

  UN.ui = { h: h, ic: ic, t: t, L: L, mixed: mixed, smart: smart, promptNode: promptNode, termLabel: termLabel, later: later, every: every, bar: bar, pct: pct, go: go, toast: toast, setText: setText,
    partText: partText, videoLink: videoLink, gapSentence: gapSentence, openSubjects: openSubjects, confirmDialog: confirmDialog, speak: speak, speakBtn: speakBtn, afterProgress: afterProgress, render: render, refreshChrome: refreshChrome, journey: journey, resourceCard: resourceCard,
    defBox: defBox, applyLang: applyLang, applyTheme: applyTheme, tile: tile, pageHead: pageHead, empty: empty };
})();
