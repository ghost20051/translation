/*
 * Renders one question. Two modes:
 *   exam: records the choice only (onChange), shows NO feedback, hints or translations.
 *   game: grades immediately (onAnswer(v, given)) and shows feedback.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, L = ui.L;

  function render(q, cfg) {
    cfg = cfg || {};
    var exam = cfg.mode === 'exam';
    var box = h('div', { class: 'qbox ' + q.type });
    var fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
    var locked = false, typo = null, typoKind = 'typo';

    var pinfo = !exam && UN.gen.partOf ? UN.gen.partOf(q) : null;
    if (pinfo) box.appendChild(h('div', { class: 'qlabel' }, ui.partText(pinfo)));
    box.appendChild(h('div', { class: 'qprompt' }, ui.promptNode(q)));

    function finish(v, given) {
      locked = true;
      fb.className = 'feedback show ' + (v >= 0.99 ? 'ok' : v > 0 ? 'part' : 'bad');
      fb.textContent = '';
      fb.appendChild(h('b', null, v >= 0.99 ? '✅ ' + t('fb.correct') : v > 0 ? '🟡 ' + t('fb.partly') : '❌ ' + t('fb.wrong')));
      if (v < 0.99 && q.type !== 'recall') fb.appendChild(h('div', null, t('fb.answer') + ' ', ui.smart(String(q.correctText))));
      var blank = !exam && q.extra && q.extra.ans ? box.querySelector('.gblank') : null;
      if (blank) blank.replaceWith(h('mark', { class: 'gans' }, q.extra.ans));   // fill the blank right where the student is looking
      if (q.extra && q.extra.q && !blank) fb.appendChild(h('div', { class: 'gapfull' }, ui.gapSentence(q.extra.q, q.extra.ans)));
      if (typo && !exam) fb.appendChild(h('div', { class: 'typo' }, '✏️ ' + t(typoKind === 'short' ? 'fb.short' : 'fb.typo') + ' ', h('b', null, ui.mixed(String(typo)))));
      if (q.extra && q.extra.note) fb.appendChild(h('div', { class: 'muted small' }, ui.smart(q.extra.note)));
      if (!exam && UN.fun) fb.appendChild(h('div', { class: 'quip' }, UN.fun.answer(v)));
      if (!exam && UN.sfx) UN.sfx.play(v >= 0.99 ? 'correct' : v > 0 ? 'partly' : 'wrong');
      if (!exam && UN.revise) UN.revise.note(q, v, given);
      if (cfg.onAnswer) cfg.onAnswer(v, given);
    }

    if (q.type === 'mcq') {
      var list = h('div', { class: 'opts' });
      q.options.forEach(function (o, i) {
        var b = h('button', { type: 'button', class: 'opt', 'data-id': o.id }, h('span', { class: 'letter' }, 'ABCD'.charAt(i)), L(o.text, o.lang));
        b.addEventListener('click', function () {
          if (locked) return;
          if (exam) {
            Array.prototype.forEach.call(list.children, function (c) { c.classList.remove('sel'); });
            b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
            cfg.onChange(o.id);
          } else {
            var v = UN.gen.grade(q, o.id);
            Array.prototype.forEach.call(list.children, function (c) {
              c.disabled = true;
              if (c.getAttribute('data-id') === q.answer) c.classList.add('right');
            });
            if (v < 1) b.classList.add('wrong');
            finish(v, o.id);
          }
        });
        if (exam && cfg.value === o.id) b.classList.add('sel');
        list.appendChild(b);
      });
      box.appendChild(list);
    } else if (q.type === 'tf') {
      var tf = h('div', { class: 'opts tf' });
      [[true, 'tf.true', '✔'], [false, 'tf.false', '✖']].forEach(function (x) {
        var b = h('button', { type: 'button', class: 'opt', 'data-v': String(x[0]) }, h('span', { class: 'letter' }, x[2]), t(x[1]));
        b.addEventListener('click', function () {
          if (locked) return;
          if (exam) {
            Array.prototype.forEach.call(tf.children, function (c) { c.classList.remove('sel'); });
            b.classList.add('sel'); cfg.onChange(x[0]);
          } else {
            var v = UN.gen.grade(q, x[0]);
            Array.prototype.forEach.call(tf.children, function (c) { c.disabled = true; if ((c.getAttribute('data-v') === 'true') === q.answer) c.classList.add('right'); });
            if (v < 1) b.classList.add('wrong');
            finish(v, x[0]);
          }
        });
        if (exam && cfg.value === x[0]) b.classList.add('sel');
        tf.appendChild(b);
      });
      box.appendChild(tf);
    } else if (q.type === 'type') {
      var rtl = q.answerLang === 'ar';
      var inp = h('input', { type: 'text', class: 'txt', dir: rtl ? 'rtl' : 'ltr', lang: q.answerLang, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
        placeholder: rtl ? t('q.typeAr') : t('q.typeEn'), 'aria-label': t('q.yourAnswer') });
      if (exam && cfg.value) inp.value = cfg.value;
      var go = h('button', { type: 'button', class: 'btn primary', onclick: function () {
        if (locked) return; var v = UN.gen.grade(q, inp.value); typo = v >= 0.99 ? UN.check.fuzzy() : null; typoKind = UN.check.fuzzyKind ? UN.check.fuzzyKind() : 'typo'; inp.disabled = true; go.disabled = true; finish(v, inp.value);
      } }, t('q.check'));
      if (exam) inp.addEventListener('input', function () { cfg.onChange(inp.value); });
      else inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go.click(); });
      box.appendChild(h('div', { class: 'row grow' }, inp, exam ? null : go));
      if (!exam && cfg.focus) setTimeout(function () { inp.focus(); }, 30);
    } else if (q.type === 'written') {
      var ta = h('textarea', { class: 'txt area', rows: '5', dir: 'ltr', lang: 'en', spellcheck: 'false', placeholder: t('q.writeAnswer'), 'aria-label': t('q.yourAnswer') });
      if (cfg.value) ta.value = cfg.value;
      ta.addEventListener('input', function () { cfg.onChange(ta.value); });
      box.appendChild(ta);
    } else if (q.type === 'recall') {
      var rev = h('div', { class: 'reveal hidden' }, h('div', { class: 'model' }, L(q.correctText, 'en')),
        h('p', { class: 'muted' }, t('q.selfGrade')),
        h('div', { class: 'row' }, [[1, 'sg.yes', 'ok'], [0.5, 'sg.part', 'part'], [0, 'sg.no', 'bad']].map(function (g) {
          return h('button', { type: 'button', class: 'btn ' + g[2], onclick: function () {
            if (locked) return; Array.prototype.forEach.call(rev.querySelectorAll('button'), function (b) { b.disabled = true; });
            finish(g[0], 'self'); } }, t(g[1]));
        })));
      var show = h('button', { type: 'button', class: 'btn primary', onclick: function () { rev.classList.remove('hidden'); show.classList.add('hidden'); } }, t('q.reveal'));
      box.appendChild(show); box.appendChild(rev);
    }
    if (!exam) box.appendChild(fb);
    return box;
  }

  UN.qview = { render: render };
})();
