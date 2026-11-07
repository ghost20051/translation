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
    return String(s == null ? '' : s).toLowerCase()
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

  function estimateLabel(pct) { return pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low'; }

  UN.check = { normAr: normAr, normEn: normEn, matchTerm: matchTerm, matchName: matchName, estimateWritten: estimateWritten, estimateLabel: estimateLabel };
})();
