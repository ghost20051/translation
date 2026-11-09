/*
 * The three games. Each has a different mechanic:
 *   Game 1  Term Quest   - mini-games over the whole material (cards, matching, speed round, missing word, body ID)
 *   Game 2  Fix-It Lab   - lesson + "repair meter" loop on weak items (untimed)
 *   Game 3  Boss Battle  - hearts + timer, one boss per category, missed questions return in a final boss
 * Games give instant feedback and may show Arabic (they are learning activities, not exams).
 */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, L = ui.L;
  var S = function () { return UN.store.get(); };
  var G = function () { return UN.gen; };
  var shuffle = function (a) { return UN.gen.shuffle(a); };

  function rec(att, q, v, src) { UN.adapt.recordEvent(att, q.item, q.fmt, v, src); }
  function gm() { return UN.prog.g(); }
  function reward(xp) { UN.prog.addXP(xp); ui.afterProgress(); }

  function backBar(title, href) {
    return h('div', { class: 'pagehead' }, h('h1', null, title), h('a', { class: 'btn ghost small', href: href || '#/games' }, [ui.ic('arrow-left'), t('back')]));
  }

  /* ---------- hub ---------- */
  UN.routes.games = function () {
    var page = h('div', { class: 'page' }, h('h1', null, t('games.title')), h('p', { class: 'lead' }, t('games.lead')));
    var grid = h('div', { class: 'grid3' });
    [[1, '🎮', 'game1'], [2, '🔧', 'game2'], [3, '⚔️', 'game3']].forEach(function (g) {
      var played = g[0] === 1 ? UN.prog.actsDone() + '/' + (UN.cfg.acts ? UN.cfg.acts.length : 5) : (gm()['g' + g[0]] || 0) + '×';
      grid.appendChild(h('div', { class: 'card game-card g' + g[0] }, h('div', { class: 'big-emoji' }, g[1]), h('h2', null, t(g[2] + '.name')), h('p', null, t(g[2] + '.desc')),
        h('div', { class: 'muted' }, t('games.played') + ': ' + played), h('a', { class: 'btn primary', href: '#/game/' + g[0] }, '▶ ' + t('games.play'))));
    });
    page.appendChild(grid);
    page.appendChild(h('p', { class: 'muted' }, t('games.free')));
    return page;
  };

  UN.routes.game = function (arg) {
    if (arg === '2') return game2();
    if (arg === '3') return game3();
    return game1();
  };

  /* ---------- shared: run a list of questions with instant feedback ---------- */
  function quiz(box, qs, o) {
    var att = UN.store.nextId(), i = 0, results = [];
    if (UN.revise) UN.revise.start();
    function next() {
      if (i >= qs.length) { UN.store.save(); return o.onDone(results); }
      var q = qs[i];
      box.textContent = '';
      box.appendChild(h('div', { class: 'row between' }, h('b', null, t('exam.qof', { i: i + 1, n: qs.length })), h('span', { class: 'chip' }, '⭐ ' + results.reduce(function (a, r) { return a + (r.v >= 0.99 ? 1 : 0); }, 0))));
      box.appendChild(ui.bar(i / qs.length, 'good'));
      var holder = h('div', { class: 'card qarea' });
      var nxt = h('div', { class: 'row end' });
      holder.appendChild(UN.qview.render(q, { mode: 'game', focus: true, onAnswer: function (v) {
        results.push({ q: q, v: v }); rec(att, q, v, o.src); UN.store.save();
        nxt.appendChild(h('button', { class: 'btn primary', autofocus: true, onclick: function () { i++; next(); } }, [(i + 1 >= qs.length ? t('finish') : t('next')), ui.ic('arrow-right')]));
      } }));
      box.appendChild(holder); box.appendChild(nxt);
    }
    next();
  }

  function summary(box, results, xp, again, backHref, onBack) {
    var right = results.filter(function (r) { return r.v >= 0.99; }).length;
    var missed = results.filter(function (r) { return r.v < 0.75; }).map(function (r) { return r.q.item; });
    box.textContent = '';
    if (UN.sfx) UN.sfx.play(right === results.length ? 'win' : right * 2 >= results.length ? 'done' : 'lose');
    box.appendChild(h('div', { class: 'card result center' },
      h('div', { class: 'big-emoji' }, right === results.length ? '🎉' : '👏'),
      h('h2', null, t('sum.done')), h('p', null, t('sum.score', { r: right, n: results.length }) + ' · +' + xp + ' XP'),
      UN.fun ? h('p', { class: 'quip' }, UN.fun.band(Math.round(100 * right / Math.max(1, results.length)))) : null,
      UN.revise && UN.revise.button() ? h('div', { class: 'row center' }, UN.revise.button()) : missed.length ? h('div', null, h('p', null, t('sum.review')), h('ul', { class: 'list' }, missed.filter(function (x, k) { return missed.indexOf(x) === k; }).map(function (id) { return h('li', null, ui.termLabel(id)); }))) : null,
      h('div', { class: 'row center' }, h('button', { class: 'btn primary', onclick: again }, '🔁 ' + t('sum.again')), (onBack ? h('button', { class: 'btn ghost', onclick: onBack }, t('back')) : h('a', { class: 'btn ghost', href: backHref }, t('back'))))));
  }

  /* =====================  GAME 1  ===================== */
  function game1() {
    var page = h('div', { class: 'page' }), box = h('div');
    page.appendChild(backBar(t('game1.name')));
    page.appendChild(box);
    var acts = (gm().g1 = gm().g1 || { acts: {} }).acts;

    function mark(name) { acts[name] = 1; UN.store.save(); }
    function menu() {
      box.textContent = '';
      box.appendChild(h('p', { class: 'lead' }, t('game1.lead')));
      var gapMode = UN.cfg.flipKind === 'gap';
      var list = [
        ['flip', '🃏', gapMode ? 'g1.gflip' : 'g1.flip', flip], ['match1', '🔗', 'g1.matchEnAr', function () { match('en2ar'); }], ['match2', '🔗', 'g1.matchArEn', function () { match('ar2en'); }],
        ['match3', '📖', 'g1.matchDef', function () { match('def'); }], ['speed', '⚡', 'g1.speed', speed], ['fill', '✏️', 'g1.fill', fill], ['body', '🏛️', UN.cfg.bodyKey, body], ['type', '🎯', 'g1.gtype', gapType]];
      if (!gapMode) list = list.filter(function (a) { return a[0] !== 'type'; });
      if (UN.cfg.acts) list = list.filter(function (a) { return UN.cfg.acts.indexOf(a[0]) !== -1; });
      var grid = h('div', { class: 'grid3' });
      list.forEach(function (a) {
        var key = a[0].replace(/\d/, ''); var done = acts[key];
        grid.appendChild(h('button', { class: 'card act', onclick: a[3] }, h('div', { class: 'big-emoji' }, a[1]), h('b', null, t(a[2])), h('span', { class: 'muted small' }, t(a[2] + '.d')), done ? h('span', { class: 'pill good' }, '✓') : null));
      });
      box.appendChild(grid);
      box.appendChild(h('p', { class: 'muted' }, UN.cfg.acts ? t('game1.progress2', { n: UN.prog.actsDone(), m: UN.cfg.acts.length }) : t('game1.progress', { n: UN.prog.actsDone() })));
    }
    function finishAct(name, results, xp, again) {
      mark(name); reward(xp);
      summary(box, results, xp, again, '#/game/1', menu);
    }

    // --- flip cards
    function flip() {
      var gapMode = UN.cfg.flipKind === 'gap';
      var deck = shuffle((gapMode ? UN.gaps : UN.terms).slice()).slice(0, UN.cfg.flipDeck), known = 0, total = deck.length, flipped = false;
      function show() {
        box.textContent = '';
        if (!deck.length) { mark('flip'); reward(total * 2); return summary(box, new Array(total).fill({ v: 1, q: { item: 'T1' } }), total * 2, flip, '#/game/1', menu); }
        var it = deck[0];
        S().flipped[it.id] = 1; UN.store.save();
        var front = gapMode ? h('div', { class: 'face front' }, h('small', null, ui.partText({ part: 1, n: it.n }) + ' · ' + t('flip.tap')), h('div', { class: 'gapsent' }, ui.gapSentence(it.q)))
          : h('div', { class: 'face front' }, h('small', null, t('flip.tap')), h('div', { class: 'big-term' }, L(it.en, 'en')), ui.speakBtn(it.en));
        var back = gapMode ? h('div', { class: 'face back' }, h('small', null, UN.groups[it.group][S().lang]), h('div', { class: 'big-term' }, L(it.answer, 'en')), h('div', { class: 'gapsent small' }, ui.mixed(it.note)))
          : h('div', { class: 'face back' }, h('small', null, UN.groups[it.group][S().lang]), h('div', { class: 'big-term' }, L(it.arShow, 'ar')));
        var card = h('div', { class: 'flipcard', role: 'button', tabindex: '0', onclick: function () { card.classList.toggle('flipped'); if (UN.sfx) UN.sfx.play('flip'); } }, h('div', { class: 'inner' }, front, back));
        card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); } });
        box.appendChild(h('div', { class: 'row between' }, h('b', null, t('flip.left', { n: deck.length })), ui.bar((total - deck.length) / total, 'good')));
        box.appendChild(card);
        box.appendChild(h('div', { class: 'row center' },
          h('button', { class: 'btn warn', onclick: function () { deck.push(deck.shift()); show(); } }, '🔁 ' + t('flip.again')),
          h('button', { class: 'btn ok', onclick: function () { deck.shift(); known++; show(); } }, '✔ ' + t('flip.know'))));
      }
      show();
    }

    // terms whose Arabic differs from each other, so every pair has exactly one answer
    function distinctTerms(n) {
      var out = [], used = {};
      shuffle(UN.terms.slice()).forEach(function (x) {
        if (out.length >= n) return;
        var ks = x.ar.map(UN.check.normAr);
        if (ks.some(function (k) { return used[k]; })) return;
        ks.forEach(function (k) { used[k] = 1; }); out.push(x);
      });
      return out;
    }

    // --- matching race
    function match(kind) {
      var pairs;
      if (kind === 'def') pairs = shuffle(UN.subs.slice()).slice(0, 6).map(function (s) { return { id: s.id, l: s.name, r: s.def, ll: 'en', rl: 'en' }; });
      else pairs = distinctTerms(6).map(function (x) {
        return kind === 'en2ar' ? { id: x.id, l: x.en, r: x.arShow, ll: 'en', rl: 'ar' } : { id: x.id, l: x.arShow, r: x.en, ll: 'ar', rl: 'en' };
      });
      var selL = null, done = 0, mistakes = 0, missed = {}, t0 = Date.now(), att = UN.store.nextId();
      var clock = h('span', { class: 'chip' }, '⏱ 0s');
      var lc = h('div', { class: 'col' }), rc = h('div', { class: 'col' });
      var lbtn = {}, rbtn = {};
      box.textContent = '';
      box.appendChild(h('div', { class: 'row between' }, h('b', null, t('match.hint')), clock));
      box.appendChild(h('div', { class: 'matchgrid' }, lc, rc));
      ui.every(function () { ui.setText(clock, '⏱ ' + Math.floor((Date.now() - t0) / 1000) + 's'); }, 500);
      pairs.forEach(function (p) {
        var b = h('button', { class: 'mbtn', type: 'button', onclick: function () {
          if (b.classList.contains('done')) return;
          Object.keys(lbtn).forEach(function (k) { lbtn[k].classList.remove('sel'); });
          selL = p.id; b.classList.add('sel');
        } }, L(p.l, p.ll));
        lbtn[p.id] = b; lc.appendChild(b);
      });
      shuffle(pairs).forEach(function (p) {
        var b = h('button', { class: 'mbtn', type: 'button', onclick: function () {
          if (b.classList.contains('done') || selL == null) return;
          if (selL === p.id) {
            lbtn[p.id].classList.remove('sel'); lbtn[p.id].classList.add('done'); b.classList.add('done'); selL = null; done++;
            if (UN.sfx && done < pairs.length) UN.sfx.play('pair');
            if (done === pairs.length) end();
          } else {
            if (UN.sfx) UN.sfx.play('miss');
            mistakes++; missed[selL] = 1; b.classList.add('shake'); lbtn[selL].classList.add('shake');
            var lb = lbtn[selL]; setTimeout(function () { b.classList.remove('shake'); lb.classList.remove('shake'); }, 450);
          }
        } }, L(p.r, p.rl));
        rbtn[p.id] = b; rc.appendChild(b);
      });
      function end() {
        var secs = Math.round((Date.now() - t0) / 1000), results = [];
        pairs.forEach(function (p) {
          var v = missed[p.id] ? 0 : 1; var item = kind === 'def' ? p.id : p.id;
          UN.adapt.recordEvent(att, item, 'match-' + kind, v, 'game1'); results.push({ v: v, q: { item: item } });
          if (UN.revise) UN.revise.noteItem(item, v);
        });
        UN.store.save();
        var xp = 10 * pairs.length - mistakes * 3 + Math.max(0, 40 - secs); xp = Math.max(10, xp);
        finishAct('match', results, xp, function () { match(kind); });
      }
    }

    // --- speed round
    function speed() {
      var att = UN.store.nextId(), secs = 60, started = Date.now(), score = 0, combo = 0, maxCombo = 0, results = [], over = false, ended = false;
      if (UN.revise) UN.revise.start();
      var pool = UN.itemIds.filter(function (id) { return G().drillFormatsFor(id).some(function (f) { return f !== 'recall' && f.indexOf('type') !== 0; }); });
      var timer = h('span', { class: 'chip big' }, '⏱ 60'), cmb = h('span', { class: 'chip' }, 'x0'), scoreEl = h('span', { class: 'chip' }, '⭐ 0'), area = h('div', { class: 'card qarea' });
      box.textContent = '';
      box.appendChild(h('div', { class: 'row between' }, timer, cmb, scoreEl));
      box.appendChild(area);
      function nextQ() {
        if (over || ended) return;
        var id = G().pick(pool), fmts = G().drillFormatsFor(id).filter(function (f) { return f.indexOf('type') !== 0 && f !== 'recall'; });
        var q = G().make(id, G().pick(fmts));
        area.textContent = '';
        area.appendChild(UN.qview.render(q, { mode: 'game', onAnswer: function (v) {
          results.push({ q: q, v: v }); rec(att, q, v, 'game1');
          if (v >= 0.99) { combo++; score += 3 + Math.min(combo, 5); maxCombo = Math.max(maxCombo, combo); } else combo = 0;
          cmb.textContent = 'x' + combo; ui.setText(scoreEl, '⭐ ' + score);
          ui.later(function () { if (over) endIt(); else nextQ(); }, v >= 0.99 ? 500 : 1400);
        } }));
      }
      function endIt() {
        if (ended) return; ended = true;
        UN.store.save();
        if (maxCombo > (gm().maxCombo || 0)) gm().maxCombo = maxCombo;
        finishAct('speed', results.length ? results : [{ v: 0, q: { item: 'T1' } }], score, speed);
        box.appendChild(h('p', { class: 'muted center' }, t('speed.best', { n: maxCombo })));
      }
      ui.every(function () {
        if (ended) return;
        secs = 60 - Math.floor((Date.now() - started) / 1000); ui.setText(timer, '⏱ ' + Math.max(0, secs)); timer.classList.toggle('low', secs <= 10);
        if (secs <= 0) { over = true; endIt(); }
      }, 1000);
      nextQ();
    }

    // --- missing word
    function gapQuiz(fmt, name, again) {
      var qs = shuffle(UN.gaps.slice()).slice(0, 8).map(function (x) { return G().make(x.id, fmt); });
      quiz(box, qs, { src: 'game1', onDone: function (res) { finishAct(name, res, res.length * 6, again); } });
    }
    function gapType() { gapQuiz('type-gap', 'type', gapType); }
    function fill() {
      if (UN.cfg.flipKind === 'gap') return gapQuiz('mcq-gap', 'fill', fill);
      var terms = shuffle(UN.terms.filter(function (x) { return G().formatsFor(x.id).indexOf('fill') !== -1; })).slice(0, 8 - UN.bank.cloze.length).map(function (x) { return G().make(x.id, 'fill'); });
      var cl = UN.bank.cloze.map(function (c) { return G().make(c.item, 'bank:' + c.id); });
      var qs = shuffle(terms.concat(cl));
      quiz(box, qs, { src: 'game1', onDone: function (res) { finishAct('fill', res, res.length * 6, fill); } });
    }

    // --- UN body identification
    function body() {
      var ids = UN.terms.filter(function (x) { return UN.cfg.bodyGroups.indexOf(x.group) !== -1; }).map(function (x) { return x.id; });
      var qs = shuffle(ids).slice(0, 8).map(function (id) { return G().make(id, G().pick(['mcq-ar2en', 'mcq-en2ar'])); });
      quiz(box, qs, { src: 'game1', onDone: function (res) { finishAct('body', res, res.length * 6, body); } });
    }

    menu();
    return page;
  }

  /* =====================  GAME 2  ===================== */
  function modeChooser(page, box, name, onPick) {
    var data = UN.adapt.hasData();
    box.textContent = '';
    box.appendChild(h('p', { class: 'lead' }, t(name + '.lead')));
    box.appendChild(h('div', { class: 'grid2' },
      h('div', { class: 'card mode' }, h('div', { class: 'big-emoji' }, '🎯'), h('h2', null, t('mode.rec')), h('p', null, data ? t('mode.recDesc') : t('mode.noData')),
        h('button', { class: 'btn primary', onclick: function () { onPick(data ? 'rec' : 'full'); } }, '▶ ' + t('mode.recGo'))),
      h('div', { class: 'card mode' }, h('div', { class: 'big-emoji' }, '🗂️'), h('h2', null, t('mode.full')), h('p', null, t('mode.fullDesc')),
        h('button', { class: 'btn ghost', onclick: function () { onPick('full'); } }, '▶ ' + t('mode.fullGo')))));
  }

  function lessonCard(id) {
    var it = UN.itemsById[id], card = h('div', { class: 'card lesson' });
    card.appendChild(h('div', { class: 'qtype' }, '📘 ' + t('lab.lesson')));
    if (it.kind === 'term') {
      var near = (UN.confusable.filter(function (s) { return s.indexOf(id) !== -1; })[0] || []).filter(function (x) { return x !== id; });
      card.appendChild(h('div', { class: 'big-term' }, L(it.en, 'en'), ui.speakBtn(it.en)));
      card.appendChild(h('div', { class: 'big-term ar' }, L(it.arShow, 'ar')));
      card.appendChild(h('p', { class: 'muted' }, UN.groups[it.group][S().lang]));
      if (near.length) card.appendChild(h('div', { class: 'tip' }, '⚠️ ' + t('lab.confused') + ' ', near.map(function (x) { return h('span', { class: 'pill' }, L(UN.itemsById[x].en, 'en'), ' = ', L(UN.itemsById[x].arShow, 'ar')); })));
    } else if (it.kind === 'gap') {
      card.appendChild(h('div', { class: 'gapsent' }, ui.gapSentence(it.q)));
      card.appendChild(h('div', { class: 'big-term' }, L(it.answer, 'en')));
      card.appendChild(h('p', { class: 'muted' }, it.note));
    } else if (it.kind === 'sub') {
      card.appendChild(h('div', { class: 'big-term' }, L(it.name, 'en'))); card.appendChild(h('p', null, L(it.def, 'en')));
    } else {
      card.appendChild(h('p', null, h('b', null, L(it.q, 'en')))); card.appendChild(h('div', { class: 'quote model' }, L(UN.keys.written[id].model, 'en')));
    }
    var res = UN.resources.filter(function (r) { return r.items.indexOf(id) !== -1; })[0];
    if (res) card.appendChild(h('div', { class: 'tip' }, '💡 ', res.tip[S().lang]));
    return card;
  }

  function game2() {
    var page = h('div', { class: 'page' }), box = h('div');
    page.appendChild(backBar(t('game2.name'))); page.appendChild(box);

    function run(mode) {
      var ids = mode === 'rec' ? UN.adapt.targeted(8) : shuffle(UN.itemIds.slice());
      var need = mode === 'rec' ? 2 : 1;
      var queue = ids.slice(), idx = 0, fixed = [], stuck = [], xp = 0;
      if (UN.revise) UN.revise.start();
      var att = UN.store.nextId();

      function nextItem() {
        if (idx >= queue.length) return end();
        var id = queue[idx], meter = 0, tries = 0, lastFmt = null, seenFmts = {};
        function stage() {
          box.textContent = '';
          box.appendChild(h('div', { class: 'row between' }, h('b', null, t('lab.item', { i: idx + 1, n: queue.length })), ui.bar(idx / queue.length, 'good')));
          box.appendChild(lessonCard(id));
          box.appendChild(h('div', { class: 'row end' }, h('button', { class: 'btn primary', onclick: drill }, '🔧 ' + t('lab.start'))));
        }
        function drill() {
          if (meter >= need) { fixed.push(id); gm().repaired = (gm().repaired || 0) + 1; xp += 15; return pass(); }
          if (tries >= 6) { stuck.push(id); return pass(); }
          var counts = Object.assign({}, UN.adapt.formatCounts(id)); Object.keys(seenFmts).forEach(function (k) { counts[k] = (counts[k] || 0) + seenFmts[k] * 5; });
          var fmt = G().chooseFormat(id, counts, null, true, lastFmt ? [lastFmt] : null);
          lastFmt = fmt; seenFmts[fmt] = (seenFmts[fmt] || 0) + 1;
          var q = G().make(id, fmt);
          box.textContent = '';
          var meterEl = h('div', { class: 'meter' }, '🔧 ' + t('lab.meter') + ' ', new Array(need).fill(0).map(function (x, i) { return h('span', { class: 'blk' + (i < meter ? ' on' : '') }, ''); }));
          var holder = h('div', { class: 'card qarea' }), nxt = h('div', { class: 'row between' });
          box.appendChild(h('div', { class: 'row between' }, h('b', null, t('lab.item', { i: idx + 1, n: queue.length })), meterEl));
          holder.appendChild(UN.qview.render(q, { mode: 'game', focus: true, onAnswer: function (v) {
            tries++; rec(att, q, v, 'game2'); UN.store.save();
            if (v >= 0.99) meter++; else meter = 0;
            nxt.appendChild(h('button', { class: 'btn ghost', onclick: stage }, '📘 ' + t('lab.again')));
            nxt.appendChild(h('button', { class: 'btn primary', onclick: drill }, [t('next'), ui.ic('arrow-right')]));
          } }));
          box.appendChild(holder); box.appendChild(nxt);
        }
        function pass() { idx++; nextItem(); }
        stage();
      }
      function end() {
        gm().g2 = (gm().g2 || 0) + 1; UN.store.save(); reward(xp + 20);
        box.textContent = '';
        box.appendChild(h('div', { class: 'card result center' }, h('div', { class: 'big-emoji' }, '🔧'), h('h2', null, t('lab.done')),
          h('p', null, t('lab.fixed', { r: fixed.length, n: queue.length }) + ' · +' + (xp + 20) + ' XP'),
          stuck.length ? h('div', null, h('p', null, t('lab.stuck')), h('ul', { class: 'list' }, stuck.map(function (id) { return h('li', null, ui.termLabel(id)); }))) : null,
          UN.revise && UN.revise.button() ? h('div', { class: 'row center' }, UN.revise.button()) : null,
          h('div', { class: 'row center' }, h('button', { class: 'btn primary', onclick: function () { UN.ui.render(); } }, '🔁 ' + t('sum.again')),
            h('a', { class: 'btn ghost', href: '#/exam/2' }, '📝 ' + t('exam2.name')), h('a', { class: 'btn ghost', href: '#/learn' }, '📚 ' + t('nav.learn')))));
      }
      nextItem();
    }
    modeChooser(page, box, 'game2', run);
    return page;
  }

  /* =====================  GAME 3  ===================== */
  function game3() {
    var page = h('div', { class: 'page' }), box = h('div');
    page.appendChild(backBar(t('game3.name'))); page.appendChild(box);

    function bossFmt(id) { return G().drillFormatsFor(id).filter(function (f) { return f !== 'recall'; }); }

    function run(mode) {
      var cats = UN.adapt.categoryStats(), rank = UN.adapt.rank().ids, st = UN.adapt.rebuild();
      var groups = Object.keys(UN.groups).filter(function (g) { return cats[g]; });
      var waves;
      if (mode === 'rec') {
        groups.sort(function (a, b) { return (cats[a].avg == null ? 0.5 : cats[a].avg) - (cats[b].avg == null ? 0.5 : cats[b].avg); });
        waves = groups.slice(0, 3).map(function (g) { return { g: g, ids: rank.filter(function (id) { return UN.itemsById[id].group === g && bossFmt(id).length; }).slice(0, 5) }; });
      } else {
        waves = groups.map(function (g) { return { g: g, ids: shuffle(UN.itemIds.filter(function (id) { return UN.itemsById[id].group === g && bossFmt(id).length; })).slice(0, UN.cfg.waveCap || 7) }; });
      }
      waves = waves.filter(function (w) { return w.ids.length; });
      var hearts = 3, wi = 0, missed = [], att = UN.store.nextId(), correct = 0, asked = 0, xp = 0;
      if (UN.revise) UN.revise.start();

      function heartsEl() { return h('span', { class: 'hearts', 'aria-label': hearts + ' ' + t('boss.lives') }, new Array(3).fill(0).map(function (x, i) { return i < hearts ? '❤️' : '🖤'; }).join('')); }

      function playQs(title, qs, onEnd) {
        var i = 0;
        function nextQ() {
          if (hearts <= 0) return lose();
          if (i >= qs.length) return onEnd();
          var q = qs[i], secs = q.type === 'type' ? 30 : 20, left = secs, answered = false, started = Date.now();
          box.textContent = '';
          var tbar = h('div', { class: 'bar timebar' }, h('div', { class: 'fill' }));
          var holder = h('div', { class: 'card qarea' }), nxt = h('div', { class: 'row end' });
          box.appendChild(h('div', { class: 'row between' }, h('b', null, title + ' · ' + (i + 1) + '/' + qs.length), heartsEl()));
          box.appendChild(tbar);
          function done(v) {
            if (answered) return; answered = true; asked++;
            rec(att, q, v, 'game3'); UN.store.save();
            if (v >= 0.99) { correct++; xp += 8; } else { hearts--; missed.push(q.item); }
            box.firstChild.lastChild.replaceWith(heartsEl());
            nxt.appendChild(h('button', { class: 'btn primary', onclick: function () { i++; nextQ(); } }, [(hearts <= 0 ? t('boss.fall') : t('next')), ui.ic('arrow-right')]));
          }
          holder.appendChild(UN.qview.render(q, { mode: 'game', focus: true, onAnswer: function (v) { done(v); } }));
          box.appendChild(holder); box.appendChild(nxt);
          var lastLeft = null;
          var tick = ui.every(function () {
            if (answered) { clearInterval(tick); return; }
            left = secs - Math.floor((Date.now() - started) / 1000); tbar.firstChild.style.width = (100 * left / secs) + '%'; tbar.classList.toggle('low', left <= 5);
            if (left <= 5 && left > 0 && left !== lastLeft && UN.sfx) UN.sfx.play('time'); lastLeft = left;
            if (left <= 0) {
              clearInterval(tick);
              Array.prototype.forEach.call(holder.querySelectorAll('button,input,textarea'), function (b) { b.disabled = true; });
              holder.appendChild(h('div', { class: 'feedback show bad' }, h('b', null, '⏰ ' + t('boss.timeup')), h('div', null, t('fb.answer') + ' ', UN.ui.mixed(String(q.correctText)))));
              if (UN.revise) UN.revise.note(q, 0, '');
              done(0);
            }
          }, 1000);
          tbar.firstChild.style.width = '100%';
        }
        nextQ();
      }

      function waveIntro() {
        if (wi >= waves.length) return finalBoss();
        var w = waves[wi];
        box.textContent = '';
        box.appendChild(h('div', { class: 'card result center boss' }, h('div', { class: 'big-emoji' }, '👹'),
          h('h2', null, t('boss.wave', { i: wi + 1, n: waves.length })), h('p', { class: 'lead' }, UN.groups[w.g][S().lang]),
          heartsEl(), h('p', { class: 'muted' }, t('boss.rules')),
          h('button', { class: 'btn primary big', onclick: function () {
            var counts = function (id) { return UN.adapt.formatCounts(id); };
            var qs = w.ids.map(function (id) { return G().make(id, G().chooseFormat(id, counts(id), null, true, ['recall'])); });
            playQs(UN.groups[w.g][S().lang], qs, function () { wi++; waveIntro(); });
          } }, '⚔️ ' + t('boss.fight'))));
      }
      function finalBoss() {
        var uniq = missed.filter(function (x, k) { return missed.indexOf(x) === k; });
        missed = [];
        if (!uniq.length) return win();
        box.textContent = '';
        box.appendChild(h('div', { class: 'card result center boss' }, h('div', { class: 'big-emoji' }, '🐉'), h('h2', null, t('boss.final')), h('p', null, t('boss.finalDesc', { n: uniq.length })), heartsEl(),
          h('button', { class: 'btn primary big', onclick: function () {
            var qs = uniq.map(function (id) { var base = id; return G().make(base, G().chooseFormat(base, UN.adapt.formatCounts(base), null, true, ['recall'])); });
            playQs(t('boss.final'), qs, win);
          } }, '⚔️ ' + t('boss.fight'))));
      }
      function end(victory) {
        gm().g3 = (gm().g3 || 0) + 1; if (victory) gm().bossWins = (gm().bossWins || 0) + 1;
        var bonus = victory ? 50 : 0; UN.store.save(); reward(xp + bonus);
        if (UN.sfx) UN.sfx.play(victory ? 'win' : 'lose');
        box.textContent = '';
        box.appendChild(h('div', { class: 'card result center' }, h('div', { class: 'big-emoji' }, victory ? '🏆' : '💔'), h('h2', null, victory ? t('boss.win') : t('boss.lose')),
          h('p', null, t('sum.score', { r: correct, n: asked }) + ' · +' + (xp + bonus) + ' XP'),
          UN.revise && UN.revise.button() ? h('div', { class: 'row center' }, UN.revise.button()) : null,
          h('div', { class: 'row center' }, h('button', { class: 'btn primary', onclick: function () { UN.ui.render(); } }, '🔁 ' + t('sum.again')),
            h('a', { class: 'btn ghost', href: '#/exam/3' }, '🏁 ' + t('exam3.name')), h('a', { class: 'btn ghost', href: '#/dashboard' }, t('nav.progress')))));
      }
      function win() { end(true); }
      function lose() { end(false); }
      waveIntro();
    }
    modeChooser(page, box, 'game3', run);
    return page;
  }
})();
