/* Examination screens: hub, intro, running exam, results. Exam mode shows no hints, audio, videos or Arabic glosses. */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, L = ui.L;
  var S = function () { return UN.store.get(); };

  function examDesc(n) {
    var d = UN.cfg.exam.desc; if (d && d[n]) return d[n][S().lang] || d[n].en;
    return t('exam' + n + '.desc' + (UN.cfg.exam.sample && n !== 2 ? '.s' : '')); }
  function best(no) { var p = UN.prog.examPcts(no); return p.length ? Math.max.apply(null, p) : null; }

  UN.routes.exams = function () {
    var page = h('div', { class: 'page' }, h('h1', null, t('exams.title')), h('p', { class: 'lead' }, t('exams.lead')));
    var grid = h('div', { class: 'grid3' });
    [1, 2, 3].forEach(function (n) {
      var b = best(n);
      grid.appendChild(h('div', { class: 'card exam-card e' + n },
        h('div', { class: 'big-emoji' }, ['📝', '🎯', '🏁'][n - 1]),
        h('h2', null, t('exam' + n + '.name')), h('p', null, examDesc(n)),
        h('div', { class: 'muted' }, b == null ? t('exams.notTaken') : t('exams.best') + ': ' + b + '%'),
        h('a', { class: 'btn primary', href: '#/exam/' + n }, b == null ? t('exams.start') : t('exams.retake'))));
    });
    page.appendChild(grid);
    page.appendChild(h('p', { class: 'muted' }, t('exams.free')));
    return page;
  };

  UN.routes.exam = function (arg) {
    var no = +arg || 1;
    var data = no === 2 && UN.adapt.hasData();
    var sel = h('select', { id: 'limit', 'aria-label': t('exam.limit') },
      [[0, t('exam.nolimit')], [15, '15 ' + t('exam.min')], [30, '30 ' + t('exam.min')], [45, '45 ' + t('exam.min')]].map(function (o) { return h('option', { value: o[0] }, o[1]); }));
    var hist = UN.prog.examPcts(no);
    return h('div', { class: 'page narrow' },
      h('h1', null, t('exam' + no + '.name')),
      h('div', { class: 'card stack' },
        h('p', null, examDesc(no)),
        no === 2 ? h('p', { class: 'note' }, data ? '🎯 ' + t('exam2.adaptiveOn') : 'ℹ️ ' + t('exam2.adaptiveOff')) : null,
        h('h3', null, t('exam.rules')),
        h('ul', { class: 'rules' }, ['exam.r1', 'exam.r2', 'exam.r3', 'exam.r4'].map(function (k) { return h('li', null, t(k)); })),
        hist.length ? h('p', { class: 'muted' }, t('exams.best') + ': ' + Math.max.apply(null, hist) + '% · ' + t('exam.attempts', { n: hist.length })) : null,
        h('label', { for: 'limit' }, t('exam.limit')), sel,
        h('div', { class: 'row' },
          h('button', { class: 'btn primary big', onclick: function () { start(no, +sel.value); } }, '▶ ' + t('exam.begin')),
          h('a', { class: 'btn ghost', href: '#/exams' }, t('back')))));
  };

  function start(no, limitMin) {
    var built = UN.exam.build(no);
    UN.state.exam = { no: no, built: built, answers: {}, idx: 0, running: true, startedAt: Date.now(), limitSec: limitMin * 60 };
    ui.go('#/exam-run');
  }

  function abandon() { UN.state.exam = null; }

  function submit() {
    var ex = UN.state.exam; if (!ex) return;
    ex.running = false;
    var att = UN.exam.finish(ex.no, ex.built, ex.answers, { durSec: Math.round((Date.now() - ex.startedAt) / 1000) });
    UN.state.exam = null;
    if (UN.sfx) UN.sfx.play('finish');
    ui.afterProgress();
    ui.go('#/exam-result/' + att.id);
  }

  UN.routes['exam-run'] = function () {
    var ex = UN.state.exam;
    if (!ex) return UN.routes.exams();
    var qs = ex.built.qs, page = h('div', { class: 'page exam' });
    var head = h('div', { class: 'exam-head card' });
    var timer = h('span', { class: 'timer' });
    var prog = ui.bar(0);
    var nav = h('div', { class: 'qnav' });
    var area = h('div', { class: 'card qarea' });
    var ctrl = h('div', { class: 'row between' });
    page.appendChild(head); page.appendChild(nav); page.appendChild(area); page.appendChild(ctrl);

    function answered(i) { var a = ex.answers[i]; return a !== undefined && a !== '' && a !== null; }
    function drawNav() {
      nav.textContent = '';
      qs.forEach(function (q, i) {
        nav.appendChild(h('button', { type: 'button', class: 'dot' + (i === ex.idx ? ' cur' : '') + (answered(i) ? ' done' : ''), 'aria-label': t('exam.goto', { n: i + 1 }),
          onclick: function () { ex.idx = i; show(); } }, String(i + 1)));
      });
    }
    function show() {
      var q = qs[ex.idx];
      head.textContent = '';
      head.appendChild(h('div', { class: 'row between' }, h('b', null, t('exam' + ex.no + '.name')), h('span', null, t('exam.qof', { i: ex.idx + 1, n: qs.length })), timer));
      var done = qs.filter(function (x, i) { return answered(i); }).length;
      head.appendChild(ui.bar(done / qs.length, 'good'));
      area.textContent = '';
      area.appendChild(h('div', { class: 'qtype' }, t('qt.' + q.type)));
      area.appendChild(UN.qview.render(q, { mode: 'exam', value: ex.answers[ex.idx], onChange: function (v) { ex.answers[ex.idx] = v; drawNav(); var d = qs.filter(function (x, i) { return answered(i); }).length; head.lastChild.querySelector('.fill').style.width = (100 * d / qs.length) + '%'; } }));
      ctrl.textContent = '';
      ctrl.appendChild(h('button', { class: 'btn ghost', disabled: ex.idx === 0, onclick: function () { ex.idx--; show(); } }, [ui.ic('arrow-left'), t('prev')]));
      if (ex.idx < qs.length - 1) ctrl.appendChild(h('button', { class: 'btn primary', onclick: function () { ex.idx++; show(); } }, [t('next'), ui.ic('arrow-right')]));
      else ctrl.appendChild(h('button', { class: 'btn ok', onclick: confirmSubmit }, '✔ ' + t('exam.submit')));
      drawNav();
    }
    function confirmSubmit() {
      var left = qs.filter(function (x, i) { return !answered(i); }).length;
      ui.confirmDialog(left ? t('exam.unanswered', { n: left }) : t('exam.sure'), t('exam.submit'), submit);
    }
    function tick() {
      var el = Math.floor((Date.now() - ex.startedAt) / 1000);
      if (ex.limitSec) {
        var rem = ex.limitSec - el;
        if (rem <= 0) { ui.setText(timer, '0:00'); submit(); return; }
        ui.setText(timer, '⏱ ' + Math.floor(rem / 60) + ':' + ('0' + (rem % 60)).slice(-2));
        timer.classList.toggle('low', rem <= 60);
      } else ui.setText(timer, '⏱ ' + Math.floor(el / 60) + ':' + ('0' + (el % 60)).slice(-2));
    }
    show(); tick(); ui.every(tick, 1000);
    return page;
  };

  function groupOf(item) { return UN.itemsById[item].group; }

  UN.routes['exam-result'] = function (arg) {
    var id = +arg, att = S().attempts.filter(function (a) { return a.id === id; })[0];
    if (!att) return UN.routes.exams();
    var page = h('div', { class: 'page' });
    var pend = UN.exam.pending(att);
    var lbl = att.pct >= 85 ? 'res.great' : att.pct >= 65 ? 'res.good' : att.pct >= 50 ? 'res.ok' : 'res.low';
    var hist = S().exams[att.no].history, idx = hist.map(function (x) { return x.id; }).indexOf(att.id);
    var prevPct = idx > 0 ? hist[idx - 1].pct : null;
    var otherNo = att.no > 1 ? UN.prog.examPcts(att.no - 1) : [];
    page.appendChild(h('h1', null, t('exam' + att.no + '.name') + ' — ' + t('res.title')));
    if (UN.fun) page.appendChild(h('p', { class: 'quip' }, UN.fun.band(att.pct)));
    page.appendChild(h('section', { class: 'card result' },
      h('div', { class: 'ring', style: '--p:' + att.pct }, h('span', null, att.pct + '%')),
      h('div', null, h('h2', null, t(lbl)), h('p', null, t('res.score', { s: att.score % 1 ? att.score.toFixed(1) : att.score, n: att.max })),
        pend ? h('p', { class: 'note' }, '✍️ ' + t('res.pending', { n: pend })) : null,
        prevPct != null ? h('p', null, t('res.vsPrev') + ': ' + (att.pct - prevPct >= 0 ? '▲ +' : '▼ ') + (att.pct - prevPct) + '%') : null,
        otherNo.length ? h('p', null, t('res.vsExam', { n: att.no - 1 }) + ': ' + (att.pct - otherNo[otherNo.length - 1] >= 0 ? '▲ +' : '▼ ') + (att.pct - otherNo[otherNo.length - 1]) + '%') : null)));

    // by category
    var cat = {}; att.rows.forEach(function (r) { var g = groupOf(r.item), c = cat[g] || (cat[g] = { s: 0, n: 0 }); c.s += r.v; c.n++; });
    var cb = h('div', { class: 'card' });
    Object.keys(cat).forEach(function (g) {
      var r = cat[g].s / cat[g].n;
      cb.appendChild(h('div', { class: 'exrow' }, h('span', { class: 'exn' }, UN.groups[g][S().lang]), ui.bar(r, r < 0.6 ? 'warn' : 'good'), h('span', { class: 'exv' }, ui.pct(r))));
    });
    page.appendChild(h('section', null, h('h2', null, t('res.byCat')), cb));

    // revision recommendation
    var weakIds = att.rows.filter(function (r) { return r.graded && r.v < 0.75; }).map(function (r) { return r.item; });
    var recs = UN.adapt.recommendResources(weakIds);
    var next = att.no === 1 ? ['#/game/2', 'game2.name'] : att.no === 2 ? ['#/game/3', 'game3.name'] : ['#/dashboard', 'nav.progress'];
    page.appendChild(h('section', { class: 'card' }, h('h2', null, '🎯 ' + t('res.next')),
      weakIds.length ? h('p', null, t('res.weakCount', { n: weakIds.length })) : h('p', null, t('res.noWeak')),
      recs.length ? h('ul', { class: 'list' }, recs.map(function (r) { return h('li', null, h('a', { href: '#/lesson/' + r.id }, '📚 ' + r.title[S().lang])); })) : null,
      h('div', { class: 'row' }, h('a', { class: 'btn primary', href: next[0] }, '▶ ' + t(next[1])), h('a', { class: 'btn ghost', href: '#/exams' }, t('nav.exams')),
        h('a', { class: 'btn ghost', href: '#/dashboard' }, t('nav.progress')))));

    // corrections
    page.appendChild(h('h2', null, t('res.corrections')));
    var list = h('div', { class: 'stack' });
    att.rows.forEach(function (r, i) {
      var cls = !r.graded ? 'pending' : r.v >= 0.99 ? 'ok' : r.v > 0 ? 'part' : 'bad';
      var card = h('div', { class: 'card corr ' + cls },
        h('div', { class: 'row between' }, h('b', null, '#' + (i + 1) + ' · ' + t('qt.' + r.type)), h('span', { class: 'badge ' + cls }, !r.graded ? '✍️' : r.v >= 0.99 ? '✅' : r.v > 0 ? '🟡' : '❌')),
        h('div', { class: 'qprompt' }, r.pl === 'ar' ? L(r.prompt, 'ar') : ui.mixed(r.prompt)));
      if (r.type === 'written') {
        card.appendChild(h('div', { class: 'given' }, h('small', null, t('res.yours')), h('div', { class: 'quote' }, r.given ? L(r.given, 'en') : h('i', null, t('res.blank')))));
        card.appendChild(h('div', { class: 'est' }, t('res.estimate') + ': ', h('b', null, (r.est || 0) + '%'), ' ', h('span', { class: 'muted small' }, '(' + t('res.estimateNote') + ')')));
        card.appendChild(h('div', { class: 'given' }, h('small', null, t('res.model')), h('div', { class: 'quote model' }, L(r.correct, r.pl === 'ar' ? 'en' : (r.orig && /[؀-ۿ]/.test(r.correct) ? 'ar' : 'en')))));
        if (r.orig) card.appendChild(h('div', { class: 'given' }, h('small', null, t('def.original')), h('div', { class: 'quote' }, L(r.orig, /[؀-ۿ]/.test(r.orig) ? 'ar' : 'en'))));
        card.appendChild(h('div', { class: 'row grade' }, h('span', { class: 'muted' }, t('q.selfGrade')),
          [[1, 'sg.yes', 'ok'], [0.5, 'sg.part', 'part'], [0, 'sg.no', 'bad']].map(function (g) {
            return h('button', { class: 'btn small ' + (r.graded && r.v === g[0] ? g[2] : 'ghost'), onclick: function () {
              UN.exam.selfGrade(att.id, i, g[0]); ui.afterProgress(); var y = window.scrollY; ui.render(); window.scrollTo(0, y); } }, t(g[1]));
          })));
      } else {
        card.appendChild(h('div', { class: 'given' }, h('small', null, t('res.yours')), ' ', r.given ? ui.mixed(r.given) : h('i', null, t('res.blank'))));
        if (r.v < 0.99) card.appendChild(h('div', { class: 'given right' }, h('small', null, t('fb.answer')), ' ', ui.mixed(String(r.correct))));
        if (r.gapQ) card.appendChild(h('div', { class: 'gapfull' }, ui.gapSentence(r.gapQ, r.gapA)));
        if (r.note) card.appendChild(h('div', { class: 'muted small' }, r.note));
      }
      list.appendChild(card);
    });
    page.appendChild(list);
    return page;
  };

  UN.exam_ui = { abandon: abandon };
})();
