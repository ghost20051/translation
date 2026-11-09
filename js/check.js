/* Local answer checking. Pure functions, no network, no AI. */
(function () {
  var UN = window.UN = window.UN || {};

  function normAr(s) {
    return String(s == null ? '' : s)
      .replace(/[ً-ٰٟـ]/g, '')   // diacritics + tatweel
      .replace(/[أإآٱ]/g, 'ا') // alef variants
      .replace(/ة/g, 'ه')                   // ta marbuta -> ha
      .replace(/ى/g, 'ي')                   // alef maqsura -> ya
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[^؀-ۿa-z0-9\s]/gi, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function normWords(s) {
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[\-–—_\/]/g, ' ')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ').trim();
  }
  function normEn(s) { return normWords(s).replace(/^the /, ''); }

  /* Typos: a typed answer that is one or two letters off still counts. Short answers must be exact, so a different
     short word is never accepted by accident (land / hand). lastFuzzy holds the correct spelling when a typo was forgiven
     (lastKind 'typo'), or the full term when a short form of it was accepted (lastKind 'short'). */
  var lastFuzzy = null, lastKind = 'typo';
  function editDistance(a, b) {
    if (a === b) return 0;
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  function allowedTypos(len, ar) { return ar ? (len <= 5 ? 0 : len <= 10 ? 1 : 2) : (len <= 4 ? 0 : len <= 8 ? 1 : 2); }
  // true when given is within the allowed number of typos of cand (both already normalised)
  function nearMiss(given, cand, ar) {
    if (!given || !cand || given === cand) return given === cand;
    if (/\d/.test(given) || /\d/.test(cand)) return false;   // numbers must be exact (2 seconds is not 6 seconds)
    return Math.abs(given.length - cand.length) <= 2 && editDistance(given, cand) <= allowedTypos(cand.length, ar);
  }

  function matchTerm(input, term, lang) {
    lastFuzzy = null; lastKind = 'typo';
    if (!input || !String(input).trim()) return false;
    var ar = lang === 'ar';
    var raw = ar ? term.ar.concat([term.arShow || term.ar.join(' / ')]) : [term.en].concat(term.enAlt || []);
    var cand = raw.map(ar ? normAr : normEn);
    var given = ar ? normAr(input) : normEn(input);
    if (cand.indexOf(given) !== -1) return true;
    for (var i = 0; i < cand.length; i++) if (nearMiss(given, cand[i], ar)) { lastFuzzy = raw[i]; return true; }
    return false;
  }

  // Fill-in-the-gap answers: the answer or any listed alternative; a plural "s" or a leading "the" does not matter.
  function gapStem(s) { return normEn(s).replace(/s$/, ''); }
  // Words the sentence already has right next to the blank may be typed too: "early sequential" for "an __ sequential bilingual".
  function dropContext(g, q) {
    var parts = String(q || '').split('__');
    if (parts.length < 2) return g;
    var before = normWords(parts[0]).split(' '), after = normWords(parts[1]).split(' '), w = g.split(' '), k;
    for (k = Math.min(before.length, w.length - 1); k > 0; k--) if (w.slice(0, k).join(' ') === before.slice(before.length - k).join(' ')) { w = w.slice(k); break; }
    for (k = Math.min(after.length, w.length - 1); k > 0; k--) if (w.slice(w.length - k).join(' ') === after.slice(0, k).join(' ')) { w = w.slice(0, w.length - k); break; }
    return w.join(' ');
  }
  function matchGap(input, it) {
    lastFuzzy = null; lastKind = 'typo';
    var g = normEn(input); if (!g) return false;
    var all = [it.answer].concat(it.alt || []), tries = [g], i, j, core = dropContext(g, it.q);
    if (core && core !== g) tries.push(core);
    for (j = 0; j < tries.length; j++) for (i = 0; i < all.length; i++) { var n = normEn(all[i]); if (n === tries[j] || gapStem(all[i]) === gapStem(tries[j])) return true; }
    for (j = 0; j < tries.length; j++) for (i = 0; i < all.length; i++) if (nearMiss(tries[j], normEn(all[i]), false) || nearMiss(gapStem(tries[j]), gapStem(all[i]), false)) { lastFuzzy = all[i]; return true; }
    return false;
  }

  /* Concept names: the full name, a listed alternative, or a short form that keeps the key word: "dominant" for
     "Dominant bilingual", "interference" for "Language interference", "pilgrimage" for "Pilgrimage and spiritual tourism".
     Little words and words that several answers share ("bilingual", "tourism") may be left out. A word that tells the
     concepts apart may not ("bilingual" alone is not enough), and the full name of a different answer is never
     accepted ("etiquette" is not "business etiquette"). pool = all the names the question could be about.
     A short form counts as correct, and the full name is then shown (lastKind 'short') so it can be learnt. */
  var LITTLE = { a: 1, an: 1, the: 1, of: 1, and: 1, or: 1, in: 1, to: 1, for: 1 }, GENERIC = { language: 1, languages: 1 };
  function nameForms(name) {
    var out = [String(name)], m = out[0].match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (m) out.push(m[1], m[2]);   // "Ear-voice span (EVS)" -> "Ear-voice span", "EVS"
    out.slice().forEach(function (f) {   // "Pilgrimage and spiritual tourism" -> "pilgrimage tourism", "spiritual tourism"
      var w = normWords(f).split(' '), k = w.indexOf('and') > 0 ? w.indexOf('and') : w.indexOf('or');
      if (k > 0 && k < w.length - 1) out.push(w.slice(0, k).concat(w.slice(k + 2)).join(' '), w.slice(k + 1).join(' '));
    });
    return out;
  }
  function sameWord(a, b) { return a === b || a.replace(/s$/, '') === b.replace(/s$/, '') || nearMiss(a, b, false); }
  function sharedWords(pool) {
    var count = {}, out = {};
    (pool || []).forEach(function (n) { var seen = {}; normWords(n).split(' ').forEach(function (w) { if (w && !seen[w]) { seen[w] = 1; count[w] = (count[w] || 0) + 1; } }); });
    Object.keys(count).forEach(function (w) { if (count[w] > 1) out[w] = 1; });
    return out;
  }
  function shortFormOf(given, form, shared) {
    var g = normWords(given).split(' ').filter(function (w) { return w && !LITTLE[w]; }), f = normWords(form).split(' '), i, j = 0;
    if (!g.length || g.length >= f.length) return false;
    for (i = 0; i < g.length; i++) { while (j < f.length && !sameWord(g[i], f[j])) j++; if (j === f.length) return false; j++; }   // only words of the name, in order
    var key = f.filter(function (w) { return !LITTLE[w] && !GENERIC[w] && !shared[w]; });
    return key.length > 0 && key.every(function (w) { return g.some(function (x) { return sameWord(x, w); }); });
  }
  function matchName(input, name, pool, alts) {
    lastFuzzy = null; lastKind = 'typo';
    if (!input) return false;
    var g = normEn(input), forms = nameForms(name).concat(alts || []), nw = normEn(name).split(' ').length, i;
    for (i = 0; i < forms.length; i++) if (g === normEn(forms[i])) { if (g.split(' ').length < nw) { lastFuzzy = name; lastKind = 'short'; } return true; }
    for (i = 0; i < forms.length; i++) if (nearMiss(g, normEn(forms[i]), false)) { lastFuzzy = forms[i]; return true; }
    if ((pool || []).some(function (n) { return normEn(n) === g; })) return false;   // the full name of a different answer
    var shared = sharedWords(pool);
    for (i = 0; i < forms.length; i++) if (shortFormOf(g, forms[i], shared)) { lastFuzzy = name; lastKind = 'short'; return true; }
    return false;
  }

  // Estimate only: share of key-phrase groups found in the student's text.
  function estimateWritten(input, phrases) {
    var text = ' ' + normEn(input).replace(/^ /, '') + ' ';
    var hit = 0;
    phrases.forEach(function (alts) {
      if (alts.some(function (a) { return text.indexOf(a.charAt(0) === ' ' ? a : a) !== -1; })) hit++;
    });
    return { pct: phrases.length ? Math.round(100 * hit / phrases.length) : 0, hit: hit, total: phrases.length };
  }

  // Estimate for a definition: how many of the key words of ANY acceptable wording (easy or original) appear. Estimate only.
  var STOP = { the:1, and:1, for:1, with:1, that:1, this:1, from:1, are:1, you:1, your:1, not:1, can:1, have:1, has:1, its:1, who:1, which:1, their:1, them:1, they:1, into:1, such:1, when:1, where:1, what:1, like:1, been:1, being:1, more:1, than:1, also:1, some:1, any:1, other:1, one:1, all:1, but:1, how:1, was:1, were:1, will:1, etc:1 };
  var AR = /[؀-ۿ]/;
  function arStem(w) { w = w.replace(/^(وال|بال|لل|ال|و)/, ''); return w.length < 3 ? '' : w.slice(0, 4); }
  function keyStems(text) {
    var seen = {}, out = [];
    if (AR.test(text)) {
      normAr(text).split(' ').forEach(function (w) { var st = arStem(w); if (st && !seen[st]) { seen[st] = 1; out.push(st); } });
      return out;
    }
    normEn(text).split(' ').forEach(function (w) {
      if (w.length < 4 || STOP[w]) return;
      var st = w.slice(0, 5); if (!seen[st]) { seen[st] = 1; out.push(st); }
    });
    return out;
  }
  function estimateBy(input, texts) {
    var best = 0;
    texts.forEach(function (tx) {
      if (!tx) return;
      var ks = keyStems(tx); if (!ks.length) return;
      var given = AR.test(tx) ? ' ' + normAr(input).split(' ').map(arStem).join(' ') + ' ' : normEn(input);
      var hit = ks.filter(function (k) { return given.indexOf(k) !== -1; }).length;
      best = Math.max(best, Math.round(100 * hit / ks.length));
    });
    return best;
  }

  function estimateLabel(pct) { return pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low'; }

  UN.check = { normAr: normAr, normEn: normEn, matchTerm: matchTerm, matchName: matchName, matchGap: matchGap, nearMiss: nearMiss, editDistance: editDistance, fuzzy: function () { return lastFuzzy; }, fuzzyKind: function () { return lastKind; }, estimateWritten: estimateWritten, estimateBy: estimateBy, estimateLabel: estimateLabel };
})();
