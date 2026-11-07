/* Memory Lessons: list page and the step-by-step player. Learning only: not reachable during an exam. */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, L = ui.L, ic = ui.ic;
  var S = function () { return UN.store.get(); };
  var TONES = ['blue', 'green', 'purple', 'amber'];

  function lessonsDone() { var g = UN.prog.g(); g.lessons = g.lessons || {}; return g.lessons; }
  function pick(o) { return o[S().lang] || o.en; }
  // text that may mix Arabic and English words
  function rich(o) { var txt = pick(o); return S().lang === 'ar' ? L(txt, 'ar') : ui.mixed(txt); }
  function delay(i) { return 'animation-delay:' + (i * 90) + 'ms'; }

  /* ---------- list ---------- */
  UN.routes.lessons = function () {
    var page = h('div', { class: 'page' }, ui.pageHead(t('lessons.title'), t('lessons.lead')));
    var done = lessonsDone();
    var weak = UN.adapt.weakIds();
    var order = UN.lessons.slice().sort(function (a, b) {
      var ra = UN.resources.filter(function (r) { return r.id === (a.res || a.id); })[0], rb = UN.resources.filter(function (r) { return r.id === (b.res || b.id); })[0];
      var wa = ra ? ra.items.filter(function (x) { return weak.indexOf(x) !== -1; }).length : 0, wb = rb ? rb.items.filter(function (x) { return weak.indexOf(x) !== -1; }).length : 0;
      return wb - wa;
    });
    var grid = h('div', { class: 'grid2' });
    order.forEach(function (l) {
      var res = UN.resources.filter(function (r) { return r.id === (l.res || l.id); })[0];
      var isWeak = res && res.items.some(function (x) { return weak.indexOf(x) !== -1; });
      grid.appendChild(h('a', { class: 'card lcard', href: '#/lesson/' + l.id },
        ui.tile(l.icon, done[l.id] ? 'green' : 'blue'),
        h('div', { class: 'lbody' }, h('b', null, pick(l.title)), h('small', { class: 'muted' }, t('lessons.meta', { n: l.steps.length, m: l.minutes }))),
        isWeak ? h('span', { class: 'pill warn' }, t('lessons.recommended')) : null,
        done[l.id] ? h('span', { class: 'pill good' }, ic('check'), t('lessons.done')) : h('span', { class: 'link' }, t('lessons.start'), ic('chevron-right', 'flip'))));
    });
    page.appendChild(grid);
    return page;
  };

  /* ---------- step renderers ---------- */
  function stepSay(st) {
    return h('div', { class: 'lstep say' }, ui.tile(st.icon || 'lightbulb', 'blue'), h('div', { class: 'bubble-t' }, h('p', null, rich(st.text))));
  }

  function stepSplit(st) {
    var box = h('div', { class: 'lstep' });
    if (st.text) box.appendChild(h('p', { class: 'lcap' }, rich(st.text)));
    var list = h('div', { class: 'splits' });
    st.ids.forEach(function (id, i) {
      var parts = UN.parts[id], term = UN.itemsById[id], row = h('div', { class: 'split card', style: delay(i) });
      var pairs = h('div', { class: 'pairs', dir: 'ltr' });
      parts.forEach(function (p, j) {
        pairs.appendChild(h('div', { class: 'pair ' + TONES[j % 4] }, h('span', { class: 'pen', lang: 'en' }, p[0]), ic('chevron-right', 'down'), h('span', { class: 'par', lang: 'ar', dir: 'rtl' }, p[1])));
      });
      row.appendChild(h('div', { class: 'sline' }, pairs, ui.speakBtn(term.en)));
      row.appendChild(h('div', { class: 'sfull' }, h('small', { class: 'muted' }, t('lesson.together')), L(term.arShow, 'ar', 'bigar')));
      list.appendChild(row);
    });
    box.appendChild(list);
    return box;
  }

  function stepPairs(st) {
    var box = h('div', { class: 'lstep' }), list = h('div', { class: 'plist' });
    st.ids.forEach(function (id, i) {
      var it = UN.itemsById[id];
      list.appendChild(h('div', { class: 'prow card', style: delay(i) }, h('div', { class: 'pen' }, L(it.en, 'en'), ui.speakBtn(it.en)), ic('chevron-right', 'flip'), h('div', { class: 'par' }, L(it.arShow, 'ar')), it.help ? ui.defBox(it) : null));
    });
    return h('div', { class: 'lstep' }, h('p', { class: 'lcap' }, t('lesson.pairsHint')), list);
  }

  function stepDefs(st) {
    var list = h('div', { class: 'hooks' });
    st.ids.forEach(function (id, i) {
      var it = UN.itemsById[id];
      list.appendChild(h('div', { class: 'hook card', style: delay(i) }, ui.tile('lightbulb', TONES[i % 4]), h('div', null, h('b', null, L(it.en, 'en'), ' = ', L(it.arShow, 'ar')), ui.defBox(it))));
    });
    return h('div', { class: 'lstep' }, list);
  }

  function stepSubdefs(st) {
    var list = h('div', { class: 'hooks' });
    st.ids.forEach(function (id, i) {
      var it = UN.itemsById[id];
      list.appendChild(h('div', { class: 'hook card', style: delay(i) }, ui.tile('book', TONES[i % 4]), h('div', { class: 'vdef' }, h('b', null, L(it.name, 'en')), ui.defBox(it))));
    });
    return h('div', { class: 'lstep' }, list);
  }

  function stepHook(st) {
    var list = h('div', { class: 'hooks' });
    st.items.forEach(function (it, i) {
      list.appendChild(h('div', { class: 'hook card', style: delay(i) }, ui.tile(it.icon, TONES[i % 4]), h('div', null, h('b', null, rich(it.key)), h('div', { class: 'muted' }, rich(it.text)))));
    });
    return h('div', { class: 'lstep' }, list);
  }

  function stepCompare(st) {
    var cols = h('div', { class: 'cmp' });
    st.cols.forEach(function (c, i) {
      cols.appendChild(h('div', { class: 'card cmpcol tone-' + TONES[i % 4], style: delay(i) }, h('b', { class: 'cmptitle' }, rich(c.title)),
        h('ul', null, c.lines.map(function (ln) { return h('li', null, rich(ln)); }))));
    });
    return h('div', { class: 'lstep' }, cols, st.note ? h('div', { class: 'tip' }, ic('alert-triangle'), h('span', null, rich(st.note))) : null);
  }

  function stepLetters(st) {
    var list = h('div', { class: 'hooks' });
    st.items.forEach(function (it, i) {
      list.appendChild(h('div', { class: 'hook card', style: delay(i) }, h('span', { class: 'letterbadge ' + TONES[i % 4] }, it.k), h('div', null, h('b', null, rich(it.key)), h('div', { class: 'muted' }, rich(it.text)))));
    });
    return h('div', { class: 'lstep' }, h('div', { class: 'acro', dir: 'ltr' }, st.items.map(function (it, i) { return h('span', { class: 'letterbadge big ' + TONES[i % 4], style: delay(i) }, it.k); })), list);
  }

  function stepBlocks(st, ctl) {
    var shown = 0, q = UN.written.filter(function (w) { return w.id === st.q; })[0];
    var box = h('div', { class: 'lstep' }), stack = h('div', { class: 'blocks' }), more = h('button', { class: 'btn primary', type: 'button' }), model = h('div', { class: 'quote model hidden' });
    box.appendChild(h('div', { class: 'qprompt small' }, L(q.q, 'en')));
    box.appendChild(h('p', { class: 'muted' }, t('lesson.buildHint')));
    box.appendChild(stack); box.appendChild(h('div', { class: 'row' }, more)); box.appendChild(model);
    function draw() {
      if (shown < st.blocks.length) {
        var b = st.blocks[shown];
        stack.appendChild(h('div', { class: 'block card', style: 'animation-delay:0ms' }, h('span', { class: 'blabel ' + TONES[shown % 4] }, pick(b.label)),
          h('div', null, h('div', { class: 'ben' }, L(b.en, 'en')), h('div', { class: 'muted bar-hint' }, L(b.ar, 'ar')))));
        shown++;
      }
      if (shown >= st.blocks.length) { more.classList.add('hidden'); model.classList.remove('hidden'); ui.setText(model, ''); model.appendChild(h('small', { class: 'muted' }, t('res.model'))); model.appendChild(h('div', null, L(UN.keys.written[st.q].model, 'en'))); }
      else ui.setText(more, t('lesson.showNext', { i: shown + 1, n: st.blocks.length }));
    }
    draw(); more.addEventListener('click', draw);
    return box;
  }

  function stepCheck(st, ctl) {
    var box = h('div', { class: 'lstep' }), area = h('div');
    box.appendChild(h('p', { class: 'lcap' }, t('lesson.checkIntro')));
    box.appendChild(area);
    var ids = UN.gen.shuffle(st.ids.slice()), qs = [];
    while (qs.length < st.n) {
      var id = ids[qs.length % ids.length], fm = UN.gen.drillFormatsFor(id).filter(function (f) { return f !== 'recall'; });
      qs.push(UN.gen.make(id, UN.gen.pick(fm)));
    }
    var i = 0, right = 0, att = UN.store.nextId();
    function next() {
      area.textContent = '';
      if (i >= qs.length) {
        UN.store.save(); ctl.unlock();
        area.appendChild(h('div', { class: 'card result center' }, ic('check-circle', 'bigico'), h('h2', null, t('lesson.checkDone')), h('p', null, t('sum.score', { r: right, n: qs.length }))));
        return;
      }
      var q = qs[i];
      area.appendChild(h('div', { class: 'row between' }, h('b', null, t('exam.qof', { i: i + 1, n: qs.length })), ui.bar(i / qs.length, 'good')));
      var nxt = h('div', { class: 'row end' });
      area.appendChild(h('div', { class: 'card qarea' }, UN.qview.render(q, { mode: 'game', focus: true, onAnswer: function (v) {
        if (v >= 0.99) right++;
        UN.adapt.recordEvent(att, q.item, q.fmt, v, 'lesson'); UN.store.save();
        nxt.appendChild(h('button', { class: 'btn primary', type: 'button', onclick: function () { i++; next(); } }, i + 1 >= qs.length ? t('finish') : t('next'), ic('arrow-right', 'flip')));
      } })));
      area.appendChild(nxt);
    }
    next();
    return box;
  }

  var RENDER = { say: stepSay, pairs: stepPairs, defs: stepDefs, subdefs: stepSubdefs, split: stepSplit, hook: stepHook, compare: stepCompare, letters: stepLetters, blocks: stepBlocks, check: stepCheck };

  /* ---------- player ---------- */
  UN.routes.lesson = function (id) {
    var lesson = UN.lessons.filter(function (l) { return l.id === id; })[0] || UN.lessons.filter(function (l) { return l.res === id; })[0];
    if (!lesson) return UN.routes.lessons();
    var idx = 0, page = h('div', { class: 'page narrow lesson' });
    var head = h('div', { class: 'row between' }), progress = h('div'), area = h('div', { class: 'card lessonarea' }), ctrl = h('div', { class: 'row between' });
    page.appendChild(h('a', { class: 'link', href: '#/lessons' }, ic('arrow-left', 'flip'), t('lessons.title')));
    page.appendChild(head); page.appendChild(progress); page.appendChild(area); page.appendChild(ctrl);

    function show() {
      var st = lesson.steps[idx], locked = st.t === 'check', last = idx === lesson.steps.length - 1;
      head.textContent = ''; head.appendChild(h('h1', null, pick(lesson.title))); head.appendChild(h('span', { class: 'chip' }, t('lesson.step', { i: idx + 1, n: lesson.steps.length })));
      progress.textContent = ''; progress.appendChild(ui.bar((idx + 1) / lesson.steps.length));
      area.textContent = '';
      var nextBtn = h('button', { class: 'btn primary', type: 'button', disabled: locked }, last ? t('lesson.finish') : t('next'), ic('arrow-right', 'flip'));
      var ctl = { unlock: function () { nextBtn.disabled = false; } };
      var body = h('div', { class: 'stepin' }, RENDER[st.t](st, ctl));
      area.appendChild(body);
      ctrl.textContent = '';
      ctrl.appendChild(h('button', { class: 'btn ghost', type: 'button', disabled: idx === 0, onclick: function () { idx--; show(); } }, ic('arrow-left', 'flip'), t('prev')));
      nextBtn.addEventListener('click', function () { if (last) finish(); else { idx++; show(); window.scrollTo(0, 0); } });
      ctrl.appendChild(nextBtn);
    }
    function finish() {
      var d = lessonsDone(), first = !d[lesson.id]; d[lesson.id] = Date.now(); UN.store.save();
      if (first) UN.prog.addXP(25);
      if (UN.sfx) UN.sfx.play('done');
      ui.afterProgress(); ui.toast(t('lesson.complete', { xp: first ? 25 : 0 }));
      ui.go('#/lessons');
    }
    show();
    return page;
  };
})();
