/* Revise my mistakes: every question answered wrong in a game or an exam is kept, with the right answer, on one
   page, so students can read them again and practise just those. An answer that is later right leaves the list.
   Stored on this device only, per subject. */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, L = ui.L, ic = ui.ic;
  var S = function () { return UN.store.get(); };
  var MAX = 300;

  function book() { var s = S(); s.mistakes = s.mistakes || []; return s.mistakes; }
  function live(r) { return !!UN.itemsById[r.item]; }   // a question removed from the subject is not shown
  function txt(s) { s = String(s == null ? '' : s); return /[؀-ۿ]/.test(s) && !/[a-z]{3}/i.test(s) ? L(s, 'ar') : ui.mixed(s); }
  function givenText(q, given) {
    if (given == null || given === '' || given === 'self') return '';
    if (q.type === 'mcq') { var o = (q.options || []).filter(function (x) { return x.id === given; })[0]; return o ? o.text : ''; }
    if (q.type === 'tf') return given ? 'True' : 'False';
    return String(given);
  }
  // one answered question, in the same shape as an exam row
  function rowOf(q, v, given) {
    var p = UN.gen.partOf && UN.itemsById[q.item] ? UN.gen.partOf(q) : null;
    return { item: q.item, fmt: q.fmt, type: q.type, prompt: q.prompt, pl: q.promptLang, given: givenText(q, given), correct: String(q.correctText),
      note: q.extra && q.extra.note || null, gapQ: q.extra && q.extra.q || null, gapA: q.extra && q.extra.ans || null,
      part: q.part || (p && p.part) || null, pn: q.pn || (p && p.n) || null, v: v, at: Date.now() };
  }
  // a missed item without a question (the matching game)
  function rowOfItem(id, v) {
    var it = UN.itemsById[id]; if (!it) return null;
    var r = { item: id, fmt: 'item', type: 'item', prompt: '', pl: 'en', given: '', correct: '', note: null, gapQ: null, gapA: null, part: null, pn: null, v: v, at: Date.now() };
    if (it.kind === 'term') { r.prompt = it.en; r.correct = it.arShow; }
    else if (it.kind === 'sub') { r.prompt = it.def; r.correct = it.name; }
    else if (it.kind === 'gap') { r.gapQ = it.q; r.gapA = it.answer; r.correct = it.answer; r.note = it.note; r.part = 1; r.pn = it.n; }
    else { r.prompt = it.q; r.correct = UN.keys.written[id] ? UN.keys.written[id].model : ''; }
    return r;
  }
  // remember a wrong answer (newest first); a right answer takes the item off the list
  function keep(r) {
    var b = book(), key = r.item + '|' + r.fmt;
    if (r.v >= 0.99) { for (var i = b.length - 1; i >= 0; i--) if (b[i].item === r.item) b.splice(i, 1); return; }
    for (var j = b.length - 1; j >= 0; j--) if (b[j].item + '|' + b[j].fmt === key) b.splice(j, 1);
    b.unshift(r);
    if (b.length > MAX) b.length = MAX;
  }
  function note(q, v, given) { if (q && q.item && UN.itemsById[q.item] && q.type !== 'written') { keep(rowOf(q, v, given)); UN.store.save(); } }
  function noteItem(id, v) { var r = rowOfItem(id, v); if (r) { keep(r); UN.store.save(); } }
  function noteRows(rows, ts) {
    rows.forEach(function (r) { if (r.graded !== false && !r.skipped && r.type !== 'written' && UN.itemsById[r.item]) keep(Object.assign({}, r, { at: ts || Date.now() })); });
    UN.store.save();
  }
  // a game round starts: the mistakes made from now on are "this round"
  function start() { UN.state.reviseT0 = Date.now(); }
  function since(ts) { return book().filter(function (r) { return r.at >= ts && live(r); }); }
  function examRows(att) { return att.rows.filter(function (r) { return r.graded && r.v < 0.99 && !r.skipped && live(r); }); }

  // the button at the end of a game or an exam
  function button(att) {
    var n = att ? examRows(att).length : since(UN.state.reviseT0 || Date.now()).length;
    if (!n) return null;
    return h('a', { class: 'btn primary revbtn', href: att ? '#/revise/a' + att.id : '#/revise/s' + UN.state.reviseT0 }, '📝 ' + t('rev.button', { n: n }));
  }
  // the card on the Learn page
  function card() {
    var n = book().filter(live).length;
    if (!n) return null;
    return h('a', { class: 'card vbanner revcard', href: '#/revise' }, h('span', { class: 'revicon' }, '📝'),
      h('span', { class: 'vbt' }, h('b', null, t('rev.title')), h('small', { class: 'muted' }, t('rev.cardSub', { n: n }))), ic('chevron-right', 'flip'));
  }

  function videoFor(r) {
    var it = UN.itemsById[r.item]; if (!it || !ui.videoLink) return null;
    if (String(r.fmt).indexOf('bank:SM') === 0) return ui.videoLink('mcq', +String(r.fmt).replace('bank:SM', ''));
    if (it.kind === 'gap') return ui.videoLink('gaps', it.n);
    if (it.kind === 'wq') return ui.videoLink('essay', it.n);
    return null;
  }
  function rowCard(r, i, inBook, redraw) {
    var head = r.part ? ui.partText({ part: r.part, n: r.pn }, true) : '#' + (i + 1);
    var card = h('div', { class: 'card corr bad' },
      h('div', { class: 'row between' }, h('b', null, head + (r.type !== 'item' ? ' · ' + t('qt.' + r.type) : '')), h('span', { class: 'badge bad' }, r.v > 0 ? '🟡' : '❌')));
    if (r.prompt && !(r.gapQ && r.type === 'item')) card.appendChild(h('div', { class: 'qprompt' }, r.pl === 'ar' ? L(r.prompt, 'ar') : txt(r.prompt)));
    if (r.given) card.appendChild(h('div', { class: 'given' }, h('small', null, t('res.yours')), ' ', h('s', null, txt(r.given))));
    card.appendChild(h('div', { class: 'given right' }, h('small', null, t('fb.answer')), ' ', h('b', null, txt(r.correct))));
    if (r.gapQ) card.appendChild(h('div', { class: 'gapfull' }, ui.gapSentence(r.gapQ, r.gapA)));
    if (r.note) card.appendChild(h('div', { class: 'muted small' }, r.note));
    var vl = videoFor(r); if (vl) card.appendChild(vl);
    if (inBook) card.appendChild(h('div', { class: 'row end' }, h('button', { type: 'button', class: 'btn small ghost', onclick: function () {
      var b = book(), k = b.indexOf(r); if (k !== -1) b.splice(k, 1); UN.store.save(); redraw();
    } }, ic('check'), ' ' + t('rev.gotit'))));
    return card;
  }

  /* ---------- page: #/revise (all), #/revise/s<time> (this round of a game), #/revise/a<id> (an exam) ---------- */
  UN.routes.revise = function (arg) {
    var page = h('div', { class: 'page' }, ui.pageHead(t('rev.title'), t('rev.lead')));
    var box = h('div');
    page.appendChild(box);
    function rows() {
      arg = arg || '';
      if (arg.charAt(0) === 'a') { var att = S().attempts.filter(function (a) { return a.id === +arg.slice(1); })[0]; return att ? examRows(att) : []; }
      if (arg.charAt(0) === 's') return since(+arg.slice(1));
      return book().filter(live);
    }
    function draw() {
      box.textContent = '';
      var list = rows(), all = book().filter(live).length, inBook = !arg || arg.charAt(0) === 's';
      if (arg && all) box.appendChild(h('p', null, h('a', { href: '#/revise' }, '📚 ' + t('rev.all', { n: all }))));
      if (!list.length) { box.appendChild(h('div', { class: 'card center' }, h('div', { class: 'big-emoji' }, '🎉'), h('p', null, t('rev.none')))); return; }
      var practisable = list.filter(function (r) { return r.type !== 'written'; });
      box.appendChild(h('div', { class: 'row lpstatus' }, h('span', { class: 'pill' }, t('rev.count', { n: list.length })),
        practisable.length ? h('button', { type: 'button', class: 'btn primary', onclick: function () { practise(page, practisable); } }, '🔁 ' + t('rev.practise')) : null));
      var stack = h('div', { class: 'stack' });
      list.forEach(function (r, i) { stack.appendChild(rowCard(r, i, inBook, draw)); });
      box.appendChild(stack);
    }
    draw();
    return page;
  };

  // practise the listed questions again, one by one, with instant feedback
  function practise(page, list) {
    var att = UN.store.nextId(), i = 0, right = 0, box = h('div');
    page.textContent = '';
    page.appendChild(ui.pageHead(t('rev.practise'), t('rev.practiseNote')));
    page.appendChild(box);
    start();
    var qs = list.map(function (r) {
      try {
        if (r.fmt && r.fmt !== 'item') return UN.gen.make(r.item, r.fmt);
        return UN.gen.make(r.item, UN.gen.chooseFormat(r.item, UN.adapt.formatCounts(r.item), null, true, ['recall', 'written', 'define']));
      } catch (e) { return null; }
    }).filter(Boolean);
    function next() {
      box.textContent = '';
      if (i >= qs.length) {
        if (UN.sfx) UN.sfx.play(right === qs.length ? 'win' : 'done');
        box.appendChild(h('div', { class: 'card result center' }, h('div', { class: 'big-emoji' }, right === qs.length ? '🎉' : '👏'),
          h('h2', null, t('sum.done')), h('p', null, t('sum.score', { r: right, n: qs.length })),
          h('div', { class: 'row center' }, button(), h('a', { class: 'btn ghost', href: '#/revise' }, '📚 ' + t('rev.all', { n: book().length })))));
        return;
      }
      var q = qs[i], nxt = h('div', { class: 'row end' });
      box.appendChild(h('div', { class: 'row between' }, h('b', null, t('exam.qof', { i: i + 1, n: qs.length })), h('span', { class: 'chip' }, '⭐ ' + right)));
      box.appendChild(ui.bar(i / qs.length, 'good'));
      box.appendChild(h('div', { class: 'card qarea' }, UN.qview.render(q, { mode: 'game', focus: true, onAnswer: function (v) {
        if (v >= 0.99) right++;
        UN.adapt.recordEvent(att, q.item, q.fmt, v, 'revise'); UN.store.save();
        nxt.appendChild(h('button', { class: 'btn primary', onclick: function () { i++; next(); } }, [(i + 1 >= qs.length ? t('finish') : t('next')), ic('arrow-right')]));
      } })));
      box.appendChild(nxt);
    }
    next();
  }

  UN.revise = { note: note, noteItem: noteItem, noteRows: noteRows, start: start, since: since, button: button, card: card, rowOf: rowOf, rowOfItem: rowOfItem, book: book };
})();
