/*
 * Question generator. Every question belongs to an item id (T1..T20, W1..W5, W3-xxx).
 * A question: { id, item, fmt, type, prompt, promptLang, options?, answer, extra }
 *   type: mcq | tf | type | written | recall
 * options: [{ id, text, lang }]; answer: option id (mcq), true/false (tf), or accepted-answer info.
 */
(function () {
  var UN = window.UN = window.UN || {};

  var STOP = { of: 1, the: 1, for: 1, and: 1, to: 1, a: 1 };

  // (Re)build the item index for the subject currently in use.
  function rebuildIndex() {
    UN.itemsById = {};
    UN.terms.forEach(function (t) { t.kind = 'term'; UN.itemsById[t.id] = t; });
    UN.written.forEach(function (w) { w.kind = 'wq'; UN.itemsById[w.id] = w; });
    UN.subs.forEach(function (s) { s.kind = 'sub'; UN.itemsById[s.id] = s; });
    (UN.gaps || []).forEach(function (g) { g.kind = 'gap'; UN.itemsById[g.id] = g; });
    UN.itemIds = Object.keys(UN.itemsById);
    // terms that share an Arabic form (e.g. "tour" and "trip" are both رحلة) must not be used as each other's distractors
    var byAr = {};
    UN.terms.forEach(function (t) { t.same = []; t.ar.forEach(function (a) { var k = UN.check.normAr(a); (byAr[k] = byAr[k] || []).push(t.id); }); });
    UN.terms.forEach(function (t) {
      var seen = {};
      t.ar.forEach(function (a) { byAr[UN.check.normAr(a)].forEach(function (id) { if (id !== t.id && !seen[id]) { seen[id] = 1; t.same.push(id); } }); });
    });
  }
  rebuildIndex();

  function rnd(rng) { return (rng || Math.random)(); }
  function shuffle(a, rng) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd(rng) * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pick(a, rng) { return a[Math.floor(rnd(rng) * a.length)]; }

  function setOf(id) {
    for (var i = 0; i < UN.confusable.length; i++) if (UN.confusable[i].indexOf(id) !== -1) return UN.confusable[i];
    return [];
  }
  // n distractor terms: same confusable set first, then others.
  function distractTerms(id, n, rng) {
    var it = UN.itemsById[id], bad = {};
    bad[id] = 1; (it.same || []).forEach(function (x) { bad[x] = 1; });
    var set = setOf(id).filter(function (x) { return !bad[x]; });
    var grp = UN.terms.filter(function (t) { return t.group === it.group && !bad[t.id] && set.indexOf(t.id) === -1; }).map(function (t) { return t.id; });
    var near = shuffle(set, rng).concat(shuffle(grp, rng));
    var far = shuffle(UN.terms.map(function (t) { return t.id; }).filter(function (x) { return !bad[x] && near.indexOf(x) === -1; }), rng);
    // pick n distractors that differ from each other in Arabic too (e.g. street and track are both سكة)
    var used = {}, out = [];
    it.ar.forEach(function (x) { used[UN.check.normAr(x)] = 1; });
    near.concat(far).forEach(function (x) {
      if (out.length >= n) return;
      var c = UN.itemsById[x], keys = c.ar.map(UN.check.normAr);
      if (keys.some(function (k) { return used[k]; })) return;
      keys.forEach(function (k) { used[k] = 1; });
      out.push(c);
    });
    return out;
  }

  // Distractors for a fill-in-the-gap question: other questions' answers that cannot also fit this blank.
  function gapKey(a) { return UN.check.normEn(a).replace(/s$/, ''); }
  function clashes(a, b) {
    var x = UN.check.normEn(a), y = UN.check.normEn(b);
    return (UN.cfg.clash || []).some(function (set) { return set.indexOf(x) !== -1 && set.indexOf(y) !== -1; });
  }
  function distractGaps(id, n, rng) {
    var it = UN.itemsById[id], num = /^\d/.test(it.answer), art = /\ba __/.test(it.q) ? 'a' : /\ban __/.test(it.q) ? 'an' : '';
    var plural = /s$/i.test(it.answer) && it.answer.length > 3;
    var pool = shuffle(UN.gaps.filter(function (g) {
      if (g.id === id || gapKey(g.answer) === gapKey(it.answer) || clashes(g.answer, it.answer)) return false;
      if (/^\d/.test(g.answer) && !num) return false;
      if (art) { var vowel = /^[aeiou]/i.test(g.answer); if ((art === 'an') !== vowel) return false; }
      return true;
    }), rng);
    pool.sort(function (a, b) {
      var s = function (g) { return (num && /^\d/.test(g.answer) ? -4 : 0) + (g.group === it.group ? 0 : 2) + ((/s$/i.test(g.answer) && g.answer.length > 3) === plural ? 0 : 1); };
      return s(a) - s(b);
    });
    var out = [], seen = {}; seen[gapKey(it.answer)] = 1;
    pool.forEach(function (g) {
      var k = gapKey(g.answer);
      if (out.length >= n || seen[k] || out.some(function (o) { return clashes(o.answer, g.answer); })) return;
      seen[k] = 1; out.push(g);
    });
    return out;
  }
  function gapPrompt(it) { return it.q.replace('__', '______'); }

  function mcq(item, fmt, prompt, promptLang, correct, wrongs, optLang, rng, extra) {
    var opts = shuffle([{ id: 'c', text: correct }].concat(wrongs.map(function (w, i) { return { id: 'w' + i, text: w }; })), rng);
    opts.forEach(function (o) { o.lang = optLang; });
    return { id: item + ':' + fmt, item: item, fmt: fmt, type: 'mcq', prompt: prompt, promptLang: promptLang, options: opts, answer: 'c', correctText: correct, extra: extra || null };
  }

  function contentWords(en) {
    return en.split(' ').filter(function (w) { return w.length > 2 && !STOP[w.toLowerCase()]; });
  }

  // formats available for each item
  function formatsFor(id) {
    var it = UN.itemsById[id];
    if (it.kind === 'gap') {
      var gf = ['mcq-gap', 'type-gap'];
      UN.bank.mcq.forEach(function (b) { if (b.item === id) gf.push('bank:' + b.id); });
      return gf;
    }
    if (it.kind === 'term') {
      var f = ['mcq-en2ar', 'mcq-ar2en', 'type-ar', 'type-en', 'tf-term'];
      if (it.en.split(' ').length > 1 && contentWords(it.en).length) f.push('fill');
      UN.bank.tf.forEach(function (b) { if (b.item === id) f.push('bank:' + b.id); });
      return f;
    }
    if (it.kind === 'sub') {
      var s = ['mcq-def', 'mcq-name', 'type-name'];
      if (it.orig) s.push('define');
      UN.bank.mcq.concat(UN.bank.tf).forEach(function (b) { if (b.item === id) s.push('bank:' + b.id); });
      return s;
    }
    var w = ['written'];
    UN.bank.mcq.concat(UN.bank.tf, UN.bank.cloze).forEach(function (b) { if (b.item === id) w.push('bank:' + b.id); });
    return w;
  }

  // formats usable in games/drills (nothing that needs free writing, plus self-check recall for written items)
  function drillFormatsFor(id) {
    var it = UN.itemsById[id];
    var f = formatsFor(id).filter(function (x) { return x !== 'written' && x !== 'define'; });
    if (it.kind === 'wq') {
      f.push('recall');
      if (id === 'W3') f = ['mcq-def', 'mcq-name', 'recall'];
    }
    return f;
  }

  function make(id, fmt, rng) {
    var it = UN.itemsById[id];
    if (id === 'W3' && (fmt === 'mcq-def' || fmt === 'mcq-name' || fmt === 'type-name')) {
      var sub = pick(UN.subs, rng);
      return make(sub.id, fmt, rng); // tracked under the specific characteristic
    }
    var m, i;
    switch (fmt) {
      case 'mcq-gap': {
        var gd = distractGaps(id, 3, rng);
        return mcq(id, fmt, gapPrompt(it), 'en', it.answer, gd.map(function (x) { return x.answer; }), 'en', rng, { note: it.note, q: it.q, ans: it.answer });
      }
      case 'type-gap':
        return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'type', answerLang: 'en', answerKind: 'gap', prompt: gapPrompt(it), promptLang: 'en', correctText: it.answer, extra: { note: it.note, q: it.q, ans: it.answer } };
      case 'mcq-en2ar': {
        var d = distractTerms(id, 3, rng);
        return mcq(id, fmt, it.en, 'en', it.arShow, d.map(function (x) { return x.arShow; }), 'ar', rng);
      }
      case 'mcq-ar2en': {
        var d2 = distractTerms(id, 3, rng);
        return mcq(id, fmt, it.arShow, 'ar', it.en, d2.map(function (x) { return x.en; }), 'en', rng);
      }
      case 'type-ar': return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'type', answerLang: 'ar', prompt: it.en, promptLang: 'en', correctText: it.arShow };
      case 'type-en': return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'type', answerLang: 'en', prompt: it.arShow, promptLang: 'ar', correctText: it.en };
      case 'tf-term': {
        var truth = rnd(rng) < 0.5;
        var other = distractTerms(id, 1, rng)[0];
        var claimAr = truth ? it.arShow : other.arShow;
        return { id: id + ':' + fmt + ':' + (truth ? 1 : 0), item: id, fmt: fmt, type: 'tf', promptLang: 'en',
          prompt: 'The Arabic for "' + it.en + '" is ' + claimAr + '.', answer: truth,
          correctText: it.en + ' = ' + it.arShow };
      }
      case 'fill': {
        var words = contentWords(it.en);
        var w = pick(words, rng);
        var blanked = it.en.replace(new RegExp('\\b' + w + '\\b'), '____');
        var pool = [];
        UN.terms.forEach(function (t) { if (t.id !== id) contentWords(t.en).forEach(function (x) { if (x.toLowerCase() !== w.toLowerCase() && pool.indexOf(x) === -1 && it.en.indexOf(x) === -1) pool.push(x); }); });
        return mcq(id, fmt, blanked, 'en', w, shuffle(pool, rng).slice(0, 3), 'en', rng, { hint: it.arShow });
      }
      case 'mcq-def': {
        var others = shuffle(UN.subs.filter(function (s) { return s.id !== id; }), rng).slice(0, 3);
        return mcq(id, fmt, 'Which ' + (UN.cfg.subNoun || 'term') + ' means: "' + it.def + '"?', 'en', it.name, others.map(function (s) { return s.name; }), 'en', rng);
      }
      case 'mcq-name': {
        var others2 = shuffle(UN.subs.filter(function (s) { return s.id !== id; }), rng).slice(0, 3);
        return mcq(id, fmt, it.name + ' means…', 'en', it.def, others2.map(function (s) { return s.def; }), 'en', rng);
      }
      case 'type-name':
        return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'type', answerLang: 'en', answerKind: 'name', prompt: 'Which ' + (UN.cfg.subNoun || 'term') + ' means: "' + it.def + '"?', promptLang: 'en', correctText: it.name, accepted: [it.name] };
      case 'define':
        return { id: id + ':define', item: id, fmt: fmt, type: 'written', prompt: 'Define: ' + it.name, promptLang: 'en', correctText: it.def, extra: { orig: it.orig } };
      case 'written':
        return { id: id + ':written', item: id, fmt: fmt, type: 'written', prompt: it.q, promptLang: 'en', correctText: UN.keys.written[id].model };
      case 'recall':
        return { id: id + ':recall', item: id, fmt: fmt, type: 'recall', prompt: it.q, promptLang: 'en', correctText: UN.keys.written[id].model };
    }
    if (fmt.indexOf('bank:') === 0) {
      var bid = fmt.slice(5);
      var b;
      for (i = 0; i < UN.bank.mcq.length; i++) if (UN.bank.mcq[i].id === bid) {
        b = UN.bank.mcq[i];
        var key = UN.keys.mcq[bid];
        var ids = shuffle(Object.keys(b.opts), rng);
        return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'mcq', prompt: b.text, promptLang: 'en',
          options: ids.map(function (k) { return { id: k, text: b.opts[k], lang: 'en' }; }), answer: key, correctText: b.opts[key],
          extra: it.kind === 'gap' ? { note: it.note, q: it.q, ans: it.answer } : null };
      }
      for (i = 0; i < UN.bank.cloze.length; i++) if (UN.bank.cloze[i].id === bid) {
        b = UN.bank.cloze[i];
        var ck = UN.keys.cloze[bid];
        var cids = shuffle(Object.keys(b.opts), rng);
        return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'mcq', prompt: b.text, promptLang: 'en',
          options: cids.map(function (k) { return { id: k, text: b.opts[k], lang: 'en' }; }), answer: ck, correctText: b.opts[ck] };
      }
      for (i = 0; i < UN.bank.tf.length; i++) if (UN.bank.tf[i].id === bid) {
        b = UN.bank.tf[i];
        return { id: id + ':' + fmt, item: id, fmt: fmt, type: 'tf', prompt: b.text, promptLang: 'en', answer: UN.keys.tf[bid], correctText: UN.keys.tf[bid] ? 'True' : 'False' };
      }
    }
    throw new Error('Unknown format ' + fmt + ' for ' + id);
  }

  // Choose a format the student has seen least for this item. counts = { fmt: n }
  function chooseFormat(id, counts, rng, drill, avoid) {
    var all = drill ? drillFormatsFor(id) : formatsFor(id);
    counts = counts || {};
    var pool = all.filter(function (f) { return !avoid || avoid.indexOf(f) === -1; });
    if (!pool.length) pool = all;
    var min = Infinity;
    pool.forEach(function (f) { min = Math.min(min, counts[f] || 0); });
    return pick(pool.filter(function (f) { return (counts[f] || 0) === min; }), rng);
  }

  // Grade an answer. given: option id | boolean | string. Returns 0..1 (written/recall handled by self-grade).
  function grade(q, given) {
    if (q.type === 'mcq') return given === q.answer ? 1 : 0;
    if (q.type === 'tf') return given === q.answer ? 1 : 0;
    if (q.type === 'type') {
      if (q.answerKind === 'name') return UN.check.matchName(given, q.correctText) ? 1 : 0;
      if (q.answerKind === 'gap') return UN.check.matchGap(given, UN.itemsById[q.item]) ? 1 : 0;
      var tm = UN.itemsById[q.item];
      if (UN.check.matchTerm(given, tm, q.answerLang)) return 1;
      if (q.answerLang === 'en' && (tm.same || []).some(function (id) { return UN.check.matchTerm(given, UN.itemsById[id], 'en'); })) return 1;
      return 0;
    }
    return 0;
  }

  // Parts of the Simultaneous Interpretation material: 1 fill in the gap, 2 multiple choice, 3 written, 4 key concepts.
  function partOf(q) {
    if (!UN.cfg.parts) return null;
    var it = UN.itemsById[q.item];
    if (it.kind === 'wq') return { part: 3, n: it.n };
    if (it.kind === 'sub') return { part: 4, n: +String(it.id).replace('SK', '') };
    if (String(q.fmt).indexOf('bank:') === 0) return { part: 2, n: +String(q.fmt).replace('bank:SM', '') };
    return { part: 1, n: it.n };
  }

  UN.gen = { partOf: partOf, rebuildIndex: rebuildIndex, shuffle: shuffle, pick: pick, formatsFor: formatsFor, drillFormatsFor: drillFormatsFor, make: make, chooseFormat: chooseFormat, grade: grade, distractTerms: distractTerms };
})();
