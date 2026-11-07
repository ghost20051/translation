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

  function normEn(s) {
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[\-–—_\/]/g, ' ')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ').trim()
      .replace(/^the /, '');
  }

  function matchTerm(input, term, lang) {
    if (!input || !String(input).trim()) return false;
    var cand = lang === 'ar'
      ? term.ar.map(normAr).concat(normAr(term.arShow || term.ar.join(' / ')))
      : [term.en].concat(term.enAlt || []).map(normEn);
    var given = lang === 'ar' ? normAr(input) : normEn(input);
    return cand.indexOf(given) !== -1;
  }

  function matchName(input, name) { return !!input && normEn(input) === normEn(name); }

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

  UN.check = { normAr: normAr, normEn: normEn, matchTerm: matchTerm, matchName: matchName, estimateWritten: estimateWritten, estimateBy: estimateBy, estimateLabel: estimateLabel };
})();
