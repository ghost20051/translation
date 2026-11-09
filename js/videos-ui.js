/* Short explainer videos: a list page and a player. Every scene is drawn in code (no video files), the narration is read from
   an audio file when one exists (media/audio/si/<id>.mp3), otherwise by the device's own voice, otherwise it plays silently
   with captions. Learning only: not reachable during an exam. */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, ic = ui.ic;
  var S = function () { return UN.store.get(); };
  var NS = 'http://www.w3.org/2000/svg';
  var VOICE_KEY = 'unrev-vvoice';

  /* ---------- timing (pure, also used by the tests) ---------- */
  function words(s) { return String(s || '').split(/\s+/).filter(Boolean).length; }
  function sceneSeconds(sc) { return Math.max(3.5, words(sc.say) / 2.6 + 1); }
  function timeline(v, sayOf) {
    var t0 = 0;
    var parts = v.scenes.map(function (sc, i) { var d = sceneSeconds(sayOf ? { say: sayOf(i) } : sc); var p = { start: t0, dur: d, words: words(sc.say) }; t0 += d; return p; });
    return { parts: parts, total: t0 };
  }
  // where scene boundaries fall inside a recorded narration of a given length (shared out by word count)
  function boundaries(v, length, sayOf) {
    var w = v.scenes.map(function (sc, i) { return Math.max(4, words(sayOf ? sayOf(i) : sc.say)); }), sum = w.reduce(function (a, b) { return a + b; }, 0), t0 = 0;
    return w.map(function (x) { var d = length * x / sum, p = { start: t0, dur: d }; t0 += d; return p; });
  }
  // native emoji as a plain text node (strings go through the icon converter)
  function em(e) { return document.createTextNode(e); }
  function fmt(sec) { var s = Math.round(sec); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

  /* ---------- small helpers ---------- */
  function sv(tag, attrs, kids) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function stagger(i, extra) { return 'animation-delay: calc(var(--d) * ' + (0.1 + i * 0.11 + (extra || 0)).toFixed(3) + ')'; }
  function refsText(v) {
    var lang = S().lang, q = lang === 'ar' ? 'س' : 'Q', part = lang === 'ar' ? 'الجزء ' : 'Part ', out = [];
    var P = UN.cfg.parts || [];
    [['gaps', 1], ['mcq', 2], ['essay', 3]].forEach(function (x) {
      var list = v.refs[x[0]] || [];
      if (list.length) out.push(part + x[1] + ' · ' + (P[x[1] - 1] ? P[x[1] - 1].name[lang] : '') + ': ' + list.map(function (n) { return q + n; }).join(', '));
    });
    return out;
  }

  /* ---------- the conference hall used by the story scenes ---------- */
  function T(x, y, txt, attrs) { var a = { x: x, y: y }; Object.keys(attrs || {}).forEach(function (k) { a[k] = attrs[k]; }); return sv('text', a, [document.createTextNode(txt)]); }
  function wrap(txt, max) {
    var out = [], line = '';
    String(txt).split(' ').forEach(function (w) { if ((line + ' ' + w).trim().length > max && line) { out.push(line); line = w; } else line = (line + ' ' + w).trim(); });
    if (line) out.push(line); return out;
  }
  // a bubble anchored at (x, y) (its top-left corner); returns [group, width, height]
  function bubble(x, y, txt, tone, k, tail) {
    var lines = wrap(txt, 24), w = Math.max.apply(null, lines.map(function (l) { return l.length; })) * 5.9 + 18, hh = lines.length * 13 + 10;
    var g = sv('g', { class: 'vbub pop vbub-' + tone, style: stagger(k) }, [
      sv('rect', { x: x, y: y, width: w, height: hh, rx: 9 }),
      sv('path', { d: 'M' + (x + 14) + ' ' + (y + hh) + ' l6 9 l6 -9 z', transform: tail || '' })]);
    lines.forEach(function (l, i) { g.appendChild(T(x + w / 2, y + 15 + i * 13, l, { 'text-anchor': 'middle', class: 'vbub-t' })); });
    return g;
  }
  function person(cx, cy, body, hair, phones) {
    var kids = [sv('rect', { x: cx - 13, y: cy + 14, width: 26, height: 30, rx: 9, fill: body }), sv('circle', { cx: cx, cy: cy, r: 12, fill: '#f1c27d' }), sv('path', { d: 'M' + (cx - 12) + ' ' + (cy - 2) + ' a12 12 0 0 1 24 0 q-12 -8 -24 0z', fill: hair })];
    if (phones) kids.push(sv('path', { d: 'M' + (cx - 13) + ' ' + (cy + 2) + ' v-3 a13 13 0 0 1 26 0 v3', fill: 'none', stroke: '#fff', 'stroke-width': 3 }), sv('circle', { cx: cx - 13, cy: cy + 4, r: 4.5, fill: '#fff' }), sv('circle', { cx: cx + 13, cy: cy + 4, r: 4.5, fill: '#fff' }));
    return sv('g', null, kids);
  }
  function hall(sc) {
    var kids = [], beats = sc.beats || [], seat = ['#0ea5e9', '#f97316', '#84cc16'];
    // floor and podium
    kids.push(sv('rect', { x: 0, y: 206, width: 400, height: 24, fill: 'rgba(0,0,0,.22)' }));
    kids.push(sv('path', { d: 'M18 150 h56 l-6 56 h-44 z', fill: '#8b5a2b' }));
    kids.push(person(46, 110, '#1e3a8a', '#3b2f2f', false));
    kids.push(sv('rect', { x: 62, y: 128, width: 3, height: 22, fill: '#cbd5e1' }), sv('circle', { cx: 63.5, cy: 126, r: 4.5, fill: '#e2e8f0' }));
    // booth
    kids.push(sv('rect', { x: 196, y: 62, width: 132, height: 98, rx: 10, fill: 'rgba(186,230,253,.22)', stroke: '#bae6fd', 'stroke-width': 3 }));
    kids.push(T(262, 76, 'BOOTH', { 'text-anchor': 'middle', class: 'vtag' }));
    kids.push(person(262, 102, '#7c3aed', '#1f2937', true));
    kids.push(sv('rect', { x: 210, y: 140, width: 104, height: 8, rx: 3, fill: '#475569' }), sv('rect', { x: 256, y: 132, width: 3, height: 9, fill: '#cbd5e1' }), sv('circle', { cx: 257.5, cy: 130, r: 3.5, fill: '#e2e8f0' }));
    // audience
    [244, 286, 328].forEach(function (x, i) { kids.push(person(x, 184, seat[i], i === 1 ? '#7c2d12' : '#111827', true)); });
    kids.push(sv('rect', { x: 0, y: 206, width: 400, height: 24, fill: 'rgba(0,0,0,.18)' }));
    // sound flowing speaker -> booth -> audience
    kids.push(sv('path', { d: 'M76 104 C110 84 156 84 192 100', class: 'vflow', fill: 'none' }), sv('path', { d: 'M300 162 C306 172 316 176 322 178', class: 'vflow vflow2', fill: 'none' }));
    kids.push(sv('g', { class: 'vwaves' }, [sv('path', { d: 'M74 106 q7 8 0 16', fill: 'none' }), sv('path', { d: 'M82 100 q12 14 0 28', fill: 'none' })]));
    // bubbles and notes
    var pos = { speaker: [6, 6], interp: [190, 4], audience: [118, 150] }, k = 0;
    beats.forEach(function (b) {
      if (b.who === 'note') { var nw = Math.min(392, Math.max(150, b.text.length * 5.6 + 26)); kids.push(sv('g', { class: 'vnote pop', style: stagger(k * 1.4 + 0.2) }, [sv('rect', { x: 200 - nw / 2, y: 213, width: nw, height: 15, rx: 7.5 }), T(200, 224, b.text, { 'text-anchor': 'middle', class: 'vnote-t' })])); }
      else { var p = pos[b.who] || pos.speaker; kids.push(bubble(p[0], p[1], b.text, b.who, k * 1.4 + 0.2, b.who === 'audience' ? '' : '')); }
      if (b.badge) { var bx = b.who === 'interp' ? 330 : 84, by = b.who === 'interp' ? 80 : 86; kids.push(sv('g', { class: 'vbadge2 pop ' + b.badge.tone, style: stagger(k * 1.4 + 0.7) }, [sv('rect', { x: bx, y: by, width: 64, height: 16, rx: 8 }), T(bx + 32, by + 11.5, b.badge.text, { 'text-anchor': 'middle', class: 'vbadge2-t' })])); }
      k++;
    });
    return sv('svg', { viewBox: '0 0 400 232', class: 'vsvg vhall', role: 'img', 'aria-label': 'An interpreter in a booth, a speaker and an audience' }, kids);
  }

  /* ---------- scene renderers: each returns the scene element; --d is the scene length in seconds ---------- */
  function photoOf(id) { return id && UN.SI && UN.SI.photos ? UN.SI.photos[id] : null; }
  function coverOf(v) {
    if (v.cover) return v.cover;
    for (var i = 0; i < v.scenes.length; i++) if (v.scenes[i].photo) return v.scenes[i].photo;
    return null;
  }
  function photoImg(ph, onFail) {
    if (ph.clip) {
      // a short silent clip made from this photo; if it cannot play, the still photo is shown instead
      var vid = h('video', { src: 'media/video/si/' + ph.clip, poster: 'media/img/si/' + ph.file, preload: 'metadata', playsinline: '', 'aria-label': ph.title });
      vid.muted = true; vid.loop = true; vid.playsInline = true;
      vid.addEventListener('error', function () { if (vid.parentNode) vid.replaceWith(photoImg(Object.assign({}, ph, { clip: null }), onFail)); });
      return vid;
    }
    var img = h('img', { src: 'media/img/si/' + ph.file, alt: ph.title, loading: 'lazy' });
    if (onFail) img.addEventListener('error', onFail);
    return img;
  }
  function credit(ph) { return h('figcaption', null, (ph.by ? ph.by + ' · ' : '') + ph.license); }

  var R = {
    // a worked example: what was said, what the interpreter said, and what to notice
    example: function (sc) {
      var DEF = { src: t('vid.who.speaker'), tgt: t('vid.who.interp'), good: '✓', bad: '✗', note: '' };
      return h('div', { class: 'vs vs-example' }, h('span', { class: 'vchip pop', style: stagger(0) }, t('vid.example')),
        h('div', { class: 'vexrows' }, sc.rows.map(function (r, k) {
          var lbl = r.label || DEF[r.who];
          return h('div', { class: 'vex vex-' + r.who + ' pop', style: stagger(1 + k * 1.3) },
            (lbl || r.time) ? h('div', { class: 'vexhead' }, r.time ? h('b', { class: 'vextime' }, r.time) : null, lbl ? h('small', null, lbl) : null, r.tag ? h('em', null, r.tag) : null) : null,
            h('div', { class: 'vextext', dir: 'auto' }, r.text));
        })));
    },
    // a real photo of an interpreter at work, with what is said shown on top of it
    story: function (sc) {
      var ph = photoOf(sc.photo || 'conference');
      if (!ph) return h('div', { class: 'vs vs-story' }, hall(sc));
      var box = h('div', { class: 'vs vs-story' });
      var fig = h('figure', { class: 'vphoto vstoryph kb-' + (sc.kb || 'left') }, photoImg(ph, function () { box.textContent = ''; box.appendChild(hall(sc)); }));
      // a second photo can take over part-way through, when the narration moves on to something else
      var ph2 = photoOf(sc.photo2);
      if (ph2) fig.appendChild(h('div', { class: 'vswap', style: '--at:' + (sc.switchAt || 0.5) }, photoImg(ph2), credit(ph2)));
      var cr = credit(ph); if (ph2) cr.classList.add('vswapout'); cr.style.setProperty('--at', sc.switchAt || 0.5);
      fig.appendChild(cr);
      var lines = h('div', { class: 'vsbwrap' }, (sc.beats || []).map(function (b, k) {
        return h('div', { class: 'vsb vsb-' + b.who + ' pop', style: stagger(k * 1.4 + 0.2) },
          b.who === 'note' ? null : h('small', null, t('vid.who.' + b.who)), h('span', { dir: 'auto' }, b.text),
          b.badge ? h('em', { class: 'vsbadge ' + b.badge.tone }, b.badge.text) : null);
      }));
      fig.appendChild(lines);
      box.appendChild(fig);
      return box;
    },
    title: function (sc, v, idx, n) {
      var cov = photoOf(coverOf(v));
      return h('div', { class: 'vs vs-title' + (cov ? ' has-cover' : '') },
        cov ? h('figure', { class: 'vcover kb-in', 'aria-hidden': 'true' }, photoImg(cov, function (e) { e.target.parentNode.remove(); })) : null,
        h('div', { class: 'vnumbadge pop', style: stagger(0) }, String(n)),
        h('div', { class: 'vbigemoji pop', style: stagger(1) }, em(sc.emoji)),
        h('h2', { class: 'pop', style: stagger(2) }, v.title), (v.gist || sc.sub) ? h('p', { class: 'vsub pop', style: stagger(3) }, v.gist || sc.sub) : null,
        v.terms ? h('div', { class: 'vterms pop', style: stagger(4) }, v.terms.map(function (p) { return h('span', { class: 'vterm' }, h('b', { lang: 'ar', dir: 'rtl' }, p[1]), h('i', null, ' = '), h('span', { lang: 'en', dir: 'ltr' }, p[0])); })) : null);
    },
    def: function (sc) {
      var kids = [];
      var k = 0;
      sc.parts.forEach(function (p) { kids.push(typeof p === 'string' ? p : h('mark', { class: 'vm', style: stagger(2 + k++ * 2, 0.25) }, p.m)); });
      return h('div', { class: 'vs vs-def' }, h('span', { class: 'vchip pop', style: stagger(0) }, t('vid.means')), h('p', { class: 'vdeftext pop', style: stagger(1) }, kids));
    },
    lanes: function (sc) {
      var n = sc.bars || 5, lag = sc.lag == null ? 2 : sc.lag, kids = [];
      var X0 = 96, STEP = 56, W = 40;
      kids.push(sv('text', { x: 8, y: 44, class: 'vlane-l' }, [document.createTextNode('🎤 Speaker')]));
      kids.push(sv('text', { x: 8, y: 124, class: 'vlane-l' }, [document.createTextNode('🎧 Interpreter')]));
      for (var i = 0; i < n; i++) {
        kids.push(sv('rect', { x: X0 + i * STEP, y: 26, width: W, height: 24, rx: 7, class: 'vbar a', style: 'animation-delay: calc(var(--d) * ' + (0.1 + i * 0.1).toFixed(2) + ')' }));
        var off = lag * 22 + (sc.label && /changing/.test(sc.label) ? (i % 3) * 9 : 0);
        kids.push(sv('rect', { x: X0 + i * STEP + off, y: 106, width: W, height: 24, rx: 7, class: 'vbar b', style: 'animation-delay: calc(var(--d) * ' + (0.1 + i * 0.1 + lag * 0.07).toFixed(2) + ')' }));
      }
      var x1 = X0, x2 = X0 + lag * 22;
      kids.push(sv('g', { class: 'vbracket', style: 'animation-delay: calc(var(--d) * ' + (0.1 + n * 0.1 + 0.1).toFixed(2) + ')' }, [
        sv('path', { d: 'M' + x1 + ' 56 V70 H' + x2 + ' V100', fill: 'none' }),
        sv('text', { x: (x1 + x2) / 2 + 8, y: 86, class: 'vbracket-t' }, [document.createTextNode(sc.label || 'EVS')])]));
      return h('div', { class: 'vs vs-lanes' }, sv('svg', { viewBox: '0 0 420 160', class: 'vsvg', role: 'img', 'aria-label': sc.label || 'lanes' }, kids));
    },
    chunks: function (sc) {
      var kids = [], i = 0;
      var pauseAfter = {}; (sc.pauses || []).forEach(function (p) { pauseAfter[p.after] = p; });
      function word(w, k) { return h('span', { class: 'vw pop', style: stagger(k * 0.7) }, w); }
      function pauseMark(p, k) { return h('span', { class: 'vp ' + p.kind + ' pop', style: stagger(k * 0.7 + 0.5) }, '⏸', h('small', null, p.label)); }
      if (sc.groups && sc.groups.length) {
        sc.groups.forEach(function (g, gi) {
          var ws = [];
          for (var k = g.from; k <= g.to; k++) ws.push(word(sc.words[k], k));
          kids.push(h('div', { class: 'vg ' + g.cls + ' pop', style: stagger(g.from * 0.7 - 0.05) }, h('div', { class: 'vgw' }, ws), h('small', { class: 'vgl' }, g.label)));
        });
      } else {
        sc.words.forEach(function (w, k) { kids.push(word(w, k)); if (pauseAfter[k]) kids.push(pauseMark(pauseAfter[k], k)); });
      }
      return h('div', { class: 'vs vs-chunks' }, h('div', { class: 'vchunkrow' }, kids));
    },
    compare: function (sc) {
      function card(c, side, k) {
        return h('div', { class: 'vcard ' + side + ' pop', style: stagger(k * 2) }, h('div', { class: 'vcemoji' }, em(c.emoji)), h('h3', null, c.title),
          h('ul', null, c.items.map(function (it, j) { return h('li', { class: 'pop', style: stagger(k * 2 + 1 + j * 0.8) }, it); })));
      }
      return h('div', { class: 'vs vs-compare' }, card(sc.left, 'l', 0), h('span', { class: 'vvs' }, 'vs'), card(sc.right, 'r', 1.4));
    },
    steps: function (sc) {
      return h('ol', { class: 'vs vs-steps' }, sc.items.map(function (it, i) {
        return h('li', { class: 'pop', style: stagger(i * 1.2) }, h('span', { class: 'vstepn' }, String(i + 1)), h('span', { class: 'vstepe' }, em(it.emoji)), h('span', { class: 'vstept' }, it.text));
      }));
    },
    picture: function (sc) {
      var ph = sc.photo && UN.SI && UN.SI.photos ? UN.SI.photos[sc.photo] : null;
      if (ph) {
        // a real photo that slowly moves (pan and zoom); if the file is missing, fall back to the drawing
        var fallback = function () { var alt = R.picture(Object.assign({}, sc, { photo: null })); fig.replaceWith(alt.firstChild); };
        var img = photoImg(ph, fallback);
        var fig = h('figure', { class: 'vphoto pop kb-' + (sc.kb || 'in'), style: stagger(0) }, img, credit(ph));
        return h('div', { class: 'vs vs-picture' }, fig, h('p', { class: 'vcaption pop', style: stagger(1.5) }, sc.caption));
      }
      var artEl = sc.art && UN.art && UN.art.scene ? UN.art.scene(sc.art) : null;
      var meter = sc.meter ? h('div', { class: 'vmeter pop', style: stagger(2) }, h('small', null, sc.meter.label),
        h('div', { class: 'vmeterbar' }, h('div', { class: 'vmeterfill', style: '--to:' + sc.meter.to + '%' }))) : null;
      return h('div', { class: 'vs vs-picture' }, artEl ? h('div', { class: 'vart pop', style: stagger(0) }, artEl) : h('div', { class: 'vbigemoji anim-' + (sc.anim || 'bounce') }, em(sc.emoji)), h('p', { class: 'vcaption pop', style: stagger(1.5) }, sc.caption), meter);
    },
    recap: function (sc, v) {
      var refs = refsText(v);
      return h('div', { class: 'vs vs-recap' }, h('span', { class: 'vchip good pop', style: stagger(0) }, '✔ ' + t('vid.remember')),
        h('ul', null, sc.points.map(function (p, i) { return h('li', { class: 'pop', style: stagger(1 + i * 1.2) }, p); })),
        v.ar ? h('p', { class: 'vsar pop', lang: 'ar', dir: 'rtl', style: stagger(4) }, v.ar) : null,
        refs.length ? h('div', { class: 'vrefs pop', style: stagger(5) }, h('small', null, t('vid.where')), refs.map(function (r) { return h('span', { class: 'vref' }, r); })) : null);
    }
  };

  /* ---------- sound cues: when (as a share of the scene) each sound plays; they mirror the animation delays ---------- */
  function cuesFor(sc) {
    var c = [], f = function (i, x) { return 0.1 + i * 0.11 + (x || 0); }, k = 0;
    if (sc.t === 'title') c.push([0.02, 'whoosh'], [f(1), 'pop'], [f(2), 'sparkle']);
    else if (sc.t === 'def') { c.push([0.02, 'whoosh']); sc.parts.forEach(function (p) { if (typeof p !== 'string') c.push([f(2 + k++ * 2, 0.25) + 0.08, 'ding']); }); }
    else if (sc.t === 'lanes') { var n = sc.bars || 5, lag = sc.lag == null ? 2 : sc.lag; for (var i = 0; i < n; i++) { c.push([0.1 + i * 0.1, 'blip']); c.push([0.1 + i * 0.1 + lag * 0.07, 'blipLow']); } c.push([0.1 + n * 0.1 + 0.1, 'ding']); }
    else if (sc.t === 'chunks') {
      if (sc.groups && sc.groups.length) sc.groups.forEach(function (g) { c.push([f(g.from * 0.7 - 0.05), 'pop']); });
      else { sc.words.forEach(function (w, j) { c.push([f(j * 0.7), 'blip']); }); (sc.pauses || []).forEach(function (p) { c.push([f(p.after * 0.7 + 0.5), p.kind === 'ok' ? 'pair' : 'miss']); }); }
    }
    else if (sc.t === 'story') { c.push([0.02, 'whoosh']); (sc.beats || []).forEach(function (b, j) { c.push([f(j * 1.4 + 0.2) + 0.05, b.who === 'note' ? 'ding' : 'pop']); }); }
    else if (sc.t === 'example') { c.push([0.02, 'whoosh']); sc.rows.forEach(function (r, j) { c.push([f(1 + j * 1.3) + 0.04, r.who === 'bad' ? 'miss' : r.who === 'good' ? 'pair' : 'pop']); }); }
    else if (sc.t === 'compare') { c.push([f(0), 'pop'], [f(2.8), 'pop']); }
    else if (sc.t === 'steps') sc.items.forEach(function (it, j) { c.push([f(j * 1.2), 'coin']); });
    else if (sc.t === 'picture') c.push([0.05, 'boing'], [f(1.5), 'pop']);
    else if (sc.t === 'recap') sc.points.forEach(function (p, j) { c.push([f(1 + j * 1.2), 'pair']); });
    return c;
  }

  /* ---------- list page ---------- */
  UN.routes.videos = function () {
    var page = h('div', { class: 'page' }, ui.pageHead(t('vid.title'), t('vid.lead')));
    var grid = h('div', { class: 'vgrid' });
    UN.videos.forEach(function (v, i) {
      var tl = timeline(v), first = v.scenes[0];
      grid.appendChild(h('a', { class: 'card vcardlink tone-' + v.tone, href: '#/video/' + v.id },
        h('span', { class: 'vlnum' }, String(i + 1)), h('span', { class: 'vlemoji' }, em(first.emoji)),
        h('span', { class: 'vltxt' }, h('b', null, v.title), v.gist ? h('small', { class: 'vlgist' }, v.gist) : null, h('small', { class: 'muted' }, fmt(tl.total) + ' · ' + t('vid.scenes', { n: v.scenes.length }))),
        ic('play-circle', 'vlplay')));
    });
    page.appendChild(grid);
    page.appendChild(h('p', { class: 'muted' }, t('vid.note')));
    var P = (UN.SI && UN.SI.photos) || {};
    if (Object.keys(P).length) page.appendChild(h('details', { class: 'card vcredits' }, h('summary', null, t('vid.credits')),
      h('ul', null, Object.keys(P).map(function (k) { var p = P[k]; return h('li', null, h('a', { href: p.source, target: '_blank', rel: 'noopener noreferrer' }, p.title), ' · ' + p.by + ' · ' + p.license + ' · Wikimedia Commons' + (p.clip ? ' · moving clip made from this photo with Google Flow (AI)' : '')); }))));
    return page;
  };

  /* ---------- player ---------- */
  UN.routes.video = function (arg) {
    var idx0 = -1;
    UN.videos.forEach(function (v, i) { if (v.id === arg) idx0 = i; });
    if (idx0 < 0) return UN.routes.videos();
    var v = UN.videos[idx0], page = h('div', { class: 'page' });
    var nlang = S().lang === 'ar' ? 'ar' : 'en';
    function arOf(i) { var ar = UN.SI && UN.SI.videosAr && UN.SI.videosAr[v.id]; return ar && ar[i] ? ar[i] : ''; }
    function sayOf(i) { return nlang === 'ar' && arOf(i) ? arOf(i) : v.scenes[i].say; }
    var tl = timeline(v, sayOf);
    var cueTimers = [], clip = null, clipLen = {}, capTimer = null, capWords = [], capStart = 0, capSpoken = -1;
    var cur = -1, playing = false, finished = false, voiceOn = true, ccOn = true, mode = 'timer', audio = null, tts = null, boundsMs = null, timer = null, sceneT0 = 0;
    try { voiceOn = localStorage.getItem(VOICE_KEY) !== 'off'; } catch (e) { /* storage may be blocked */ }

    var stage = h('div', { class: 'vstage tone-' + v.tone + ' paused' });
    var sceneBox = h('div', { class: 'vscenebox' });
    var cap = h('div', { class: 'vcap', 'aria-live': 'polite' });
    var badge = h('div', { class: 'vbadge' }, h('b', null, String(idx0 + 1)), ' ', v.title);
    var big = h('button', { type: 'button', class: 'vbig', 'aria-label': t('vid.play') }, ic('play-circle'));
    var prog = h('div', { class: 'vprog' }, h('div', { class: 'vprogfill' }));
    stage.appendChild(badge); stage.appendChild(sceneBox); stage.appendChild(cap); stage.appendChild(prog); stage.appendChild(big);

    var bPlay = h('button', { type: 'button', class: 'btn primary', 'aria-label': t('vid.play') });
    var bPrev = h('button', { type: 'button', class: 'btn ghost small', 'aria-label': t('vid.prev') }, ic('arrow-left'));
    var bNext = h('button', { type: 'button', class: 'btn ghost small', 'aria-label': t('vid.next') }, ic('arrow-right'));
    var bRe = h('button', { type: 'button', class: 'btn ghost small', 'aria-label': t('vid.restart') }, ic('repeat'));
    var bCC = h('button', { type: 'button', class: 'btn ghost small', 'aria-pressed': 'true' }, 'CC');
    var bVoice = h('button', { type: 'button', class: 'btn ghost small', 'aria-pressed': String(voiceOn), 'aria-label': t('vid.voice') }, ic(voiceOn ? 'volume' : 'volume-x'));
    var dots = h('div', { class: 'vdots' }, v.scenes.map(function (sc, i) { return h('button', { type: 'button', class: 'vdot', 'aria-label': t('vid.scene', { n: i + 1 }), onclick: function () { goto(i, true); } }, ''); }));
    var modeNote = h('small', { class: 'muted vmode' });
    // narration language: English, or Arabic with the terms kept in English
    var langBox = h('div', { class: 'seg vlang', role: 'group', 'aria-label': t('vid.narr') });
    function drawLang() {
      langBox.textContent = '';
      [['en', 'English'], ['enar', 'English + ترجمة'], ['ar', 'عربي']].forEach(function (o) {
        langBox.appendChild(h('button', { type: 'button', lang: o[0], class: o[0] === nlang ? 'on' : '', 'aria-pressed': String(o[0] === nlang), onclick: function () {
          if (o[0] === nlang) return;
          var wasPlaying = playing; stopVoices(); playing = false;
          nlang = o[0]; tl = timeline(v, sayOf); audio = null; boundsMs = null; chooseMode(); drawLang(); drawArNote();
          if (wasPlaying) { playing = true; setPlayingUI(); playScene(cur < 0 ? 0 : cur); } else { show(cur < 0 ? 0 : cur); setPlayingUI(); }
        } }, o[1]));
      });
    }
    drawLang();
    var arNote = h('p', { class: 'vnote-ar', lang: 'ar', dir: 'rtl' });
    function drawArNote() { arNote.textContent = nlang === 'ar' ? t('vid.arNote') : ''; arNote.classList.toggle('hidden', nlang !== 'ar'); }
    var ctrl = h('div', { class: 'vctrl' }, bPrev, bPlay, bNext, bRe, bCC, bVoice, langBox);

    // floating sparkles in the background and a burst of confetti at the end
    var fx = h('div', { class: 'vfx', 'aria-hidden': 'true' });
    for (var s = 0; s < 12; s++) fx.appendChild(h('span', { class: 'vspark', style: 'left:' + (4 + s * 8) + '%;animation-delay:' + (-(s * 1.3)).toFixed(1) + 's;animation-duration:' + (9 + (s % 4) * 2) + 's;font-size:' + (0.7 + (s % 3) * 0.35) + 'em' }, document.createTextNode(s % 3 ? '✦' : '•')));
    stage.insertBefore(fx, stage.firstChild);
    function confetti() {
      var colors = ['#fde68a', '#86efac', '#93c5fd', '#fca5a5', '#f0abfc'], box = h('div', { class: 'vconfetti', 'aria-hidden': 'true' });
      for (var q = 0; q < 36; q++) box.appendChild(h('i', { style: 'left:' + Math.round(Math.random() * 100) + '%;background:' + colors[q % 5] + ';animation-delay:' + (Math.random() * 0.6).toFixed(2) + 's;animation-duration:' + (1.8 + Math.random() * 1.4).toFixed(2) + 's;transform:rotate(' + Math.round(Math.random() * 360) + 'deg)' }));
      stage.appendChild(box); setTimeout(function () { box.remove(); }, 3600);
    }
    // moving photo clips play only while the video plays
    function syncClips() {
      Array.prototype.forEach.call(stage.querySelectorAll('video'), function (m) {
        if (playing) { var p = m.play(); if (p && p.catch) p.catch(function () { /* blocked: the photo stays */ }); } else m.pause();
      });
    }
    function setPlayingUI() {
      syncClips();
      stage.classList.toggle('paused', !playing);
      big.classList.toggle('hidden', playing);
      bPlay.textContent = ''; bPlay.appendChild(ic(playing ? 'x-circle' : 'play-circle')); bPlay.appendChild(document.createTextNode(' ' + t(playing ? 'vid.pause' : (finished ? 'vid.replay' : 'vid.play'))));
    }
    function drawDots() { Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === cur); d.classList.toggle('past', i < cur); }); }
    function setProgress() {
      var part = (cur < 0 ? 0 : cur) / v.scenes.length;
      prog.firstChild.style.width = Math.min(100, Math.round(part * 100 + (playing ? 100 / v.scenes.length / 2 : 0))) + '%';
    }
    function clipUrl(i) { return 'media/audio/si/' + (nlang === 'ar' ? 'ar' : 'en') + '/' + v.id + '-' + ('0' + i).slice(-2) + '.mp3'; }
    // highlight word k and show only its group of words (about 7 at a time)
    function markWord(k) {
      if (!capWords.length) return;
      k = Math.max(0, Math.min(capWords.length - 1, k));
      if (k === capSpoken) return; capSpoken = k;
      var G = 7, g0 = Math.floor(k / G) * G;
      capWords.forEach(function (w, j) { w.classList.toggle('now', j === k); w.classList.toggle('done', j < k); w.style.display = (j >= g0 && j < g0 + G) ? '' : 'none'; });
    }
    // which word is being said now: from the clip's time, or the elapsed time of the scene
    function tickCaption() {
      if (!playing || cur < 0 || !capWords.length || capStart === -1) return;
      var len = sceneLength(cur), t;
      if (mode === 'clips' && clip && isFinite(clip.duration) && clip.duration > 0) { t = clip.currentTime; len = clip.duration; }
      else t = (Date.now() - capStart) / 1000;
      markWord(Math.floor(capWords.length * Math.min(0.999, t / Math.max(0.5, len))));
    }
    function sceneLength(i) {
      if (mode === 'clips' && clipLen[i]) return clipLen[i];
      if (mode === 'mp3' && boundsMs) return boundsMs[i].dur;
      return tl.parts[i].dur;
    }
    function show(i) {
      cur = i; var sc = v.scenes[i];
      stage.classList.toggle('idle', !playing);   // before play: show the finished picture instead of an empty stage
      var el = (R[sc.t] || R.title)(sc, v, i, idx0 + 1);
      el.style.setProperty('--d', sceneLength(i).toFixed(2) + 's');
      sceneBox.textContent = ''; sceneBox.appendChild(el);
      syncClips();
      cap.textContent = '';
      capWords = []; capSpoken = -1; capStart = Date.now();
      var spoken = nlang === 'ar' ? arOf(i) || v.scenes[i].say : v.scenes[i].say;
      var line = h('div', { class: 'vkline', dir: nlang === 'ar' ? 'rtl' : 'ltr' });
      spoken.split(/\s+/).filter(Boolean).forEach(function (w, k) { var s = h('span', { class: 'vkw' }, w); capWords.push(s); line.appendChild(s); line.appendChild(document.createTextNode(' ')); });
      cap.appendChild(line);
      if (nlang === 'enar' && arOf(i)) cap.appendChild(h('div', { class: 'vcap-ar', dir: 'rtl', lang: 'ar' }, arOf(i)));
      cap.setAttribute('dir', nlang === 'ar' ? 'rtl' : 'ltr');
      markWord(0);
      cap.classList.toggle('hidden', !ccOn);
      drawDots(); setProgress();
    }

    /* --- narration drivers --- */
    function stopVoices() {
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* optional */ }
      if (audio) { try { audio.pause(); } catch (e) { /* optional */ } }
      if (clip) { try { clip.pause(); clip.onended = null; } catch (e) { /* optional */ } }
      if (timer) { clearTimeout(timer); timer = null; }
      cueTimers.forEach(clearTimeout); cueTimers = [];
    }
    function speakScene(i) {
      if (!tts || !voiceOn) return false;
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(sayOf(i)); u.lang = nlang === 'ar' ? 'ar-EG' : 'en-US'; u.rate = 0.95;
        u.onend = function () { if (playing && cur === i) advance(i); };
        u.onboundary = function (e) { if (cur !== i || e.name === 'sentence') return; var before = sayOf(i).slice(0, e.charIndex).split(/\s+/).filter(Boolean).length; markWord(before); capStart = -1; };
        window.speechSynthesis.speak(u); return true;
      } catch (e) { return false; }
    }
    function advance(i) {
      if (!playing || cur !== i) return;
      if (i + 1 < v.scenes.length) goto(i + 1, false); else finish();
    }
    function armTimer(i) {
      if (timer) clearTimeout(timer);
      var ms = sceneLength(i) * 1000 + 400;
      timer = setTimeout(function () { advance(i); }, ms);
    }
    function playScene(i) {
      show(i);
      if (!playing) return;
      if (UN.sfx) cuesFor(v.scenes[i]).forEach(function (q) { cueTimers.push(setTimeout(function () { if (playing && cur === i) UN.sfx.play(q[1]); }, q[0] * sceneLength(i) * 1000)); });
      if (mode === 'clips') {
        clip = clip || new Audio();
        clip.onended = null; clip.muted = !voiceOn; clip.src = clipUrl(i);
        clip.onloadedmetadata = function () { if (isFinite(clip.duration) && clip.duration > 0 && cur === i) { clipLen[i] = clip.duration; var el = sceneBox.firstChild; if (el) el.style.setProperty('--d', clip.duration.toFixed(2) + 's'); } };
        clip.onended = function () { if (playing && cur === i) { timer && clearTimeout(timer); timer = setTimeout(function () { advance(i); }, 450); } };
        var cp = clip.play(); if (cp && cp.catch) cp.catch(function () { armTimer(i); });
        timer = setTimeout(function () { advance(i); }, (sceneLength(i) + 20) * 1000);   // safety net
      } else if (mode === 'mp3') {
        audio.muted = !voiceOn;
        audio.currentTime = boundsMs[i].start + 0.01;
        var p = audio.play(); if (p && p.catch) p.catch(function () { /* blocked: the play button starts it */ });
        armTimer(i);
      } else if (mode === 'tts' && voiceOn && speakScene(i)) {
        timer = setTimeout(function () { advance(i); }, sceneLength(i) * 1000 + 9000);   // safety net if the voice never ends
      } else armTimer(i);
    }
    function goto(i, manual) {
      i = Math.max(0, Math.min(v.scenes.length - 1, i));
      stopVoices(); finished = false;
      if (manual && !playing) { show(i); setPlayingUI(); return; }
      playScene(i);
    }
    function finish() {
      playing = false; finished = true; stopVoices(); setPlayingUI();
      prog.firstChild.style.width = '100%';
      nextCard.classList.remove('hidden');
      UN.prog && UN.prog.g && (function () { var g = UN.prog.g(); g.videos = g.videos || {}; g.videos[v.id] = Date.now(); UN.store.save(); })();
      if (UN.sfx) UN.sfx.play('win');
      confetti();
    }
    function play() {
      if (!capTimer) capTimer = setInterval(tickCaption, 120);
      if (finished) { cur = -1; finished = false; nextCard.classList.add('hidden'); }
      playing = true; setPlayingUI();
      playScene(cur < 0 ? 0 : cur);
    }
    function pause() { playing = false; stopVoices(); setPlayingUI(); }
    function toggle() { if (playing) pause(); else play(); }

    bPlay.onclick = toggle; big.onclick = function (e) { e.stopPropagation(); toggle(); };
    stage.addEventListener('click', function (e) { if (e.target.closest('a, button')) return; toggle(); });
    stage.setAttribute('tabindex', '0'); stage.setAttribute('role', 'button'); stage.setAttribute('aria-label', t('vid.play') + ' / ' + t('vid.pause'));
    stage.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
    bPrev.onclick = function () { goto(cur - 1, true); };
    bNext.onclick = function () { if (cur + 1 < v.scenes.length) goto(cur + 1, true); };
    bRe.onclick = function () { finished = false; nextCard.classList.add('hidden'); playing = true; setPlayingUI(); playScene(0); };
    bCC.onclick = function () { ccOn = !ccOn; bCC.setAttribute('aria-pressed', String(ccOn)); cap.classList.toggle('hidden', !ccOn); };
    bVoice.onclick = function () {
      voiceOn = !voiceOn; bVoice.setAttribute('aria-pressed', String(voiceOn)); bVoice.textContent = ''; bVoice.appendChild(ic(voiceOn ? 'volume' : 'volume-x'));
      try { localStorage.setItem(VOICE_KEY, voiceOn ? 'on' : 'off'); } catch (e) { /* ignore */ }
      if (audio) audio.muted = !voiceOn;
      if (clip) clip.muted = !voiceOn;
      if (!voiceOn && window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) { /* optional */ } }
      else if (playing && mode === 'tts') speakScene(cur);
    };

    /* choose how the narration is delivered: recorded file, device voice, or silent */
    function chooseMode() {
      tts = ('speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function') ? true : null;
      mode = tts ? 'tts' : 'timer';
      modeNote.textContent = t(tts ? 'vid.modeTts' : 'vid.modeSilent');
      var probe = new Audio(); probe.preload = 'metadata';
      probe.addEventListener('loadedmetadata', function () {
        if (!isFinite(probe.duration) || probe.duration < 0.5) return;
        mode = 'clips'; clipLen = {}; clipLen[0] = probe.duration; modeNote.textContent = t('vid.modeAudio');
      });
      probe.src = clipUrl(0);
      var src = nlang === 'ar' ? ('media/audio/si/ar/' + v.id + '.mp3') : (v.audio || ('media/audio/si/' + v.id + '.mp3'));
      try {
        var a = new Audio(); a.preload = 'metadata';
        a.addEventListener('loadedmetadata', function () {
          if (!isFinite(a.duration) || a.duration < 2 || mode === 'clips') return;
          audio = a; mode = 'mp3'; boundsMs = boundaries(v, a.duration, sayOf);
          modeNote.textContent = t('vid.modeAudio');
          a.addEventListener('ended', function () { if (playing && cur === v.scenes.length - 1) finish(); });
          if (cur >= 0) { var el = sceneBox.firstChild; if (el) el.style.setProperty('--d', sceneLength(cur).toFixed(2) + 's'); }
        });
        a.src = src;
      } catch (e) { /* no audio element: keep the device voice or silent mode */ }
    }

    var nextCard = h('div', { class: 'card vnext hidden' }, h('b', null, t('vid.done')),
      idx0 + 1 < UN.videos.length ? h('a', { class: 'btn primary', href: '#/video/' + UN.videos[idx0 + 1].id }, t('vid.nextVideo') + ': ' + UN.videos[idx0 + 1].title, ic('arrow-right', 'flip')) : null,
      h('a', { class: 'btn ghost', href: '#/videos' }, t('vid.all')));

    page.appendChild(h('div', { class: 'pagehead' }, h('h1', null, h('span', { class: 'vhn' }, (idx0 + 1) + '.'), ' ', v.title), h('a', { class: 'btn ghost small', href: '#/videos' }, [ic('arrow-left'), t('vid.all')])));
    page.appendChild(stage); page.appendChild(ctrl); page.appendChild(arNote); page.appendChild(dots); page.appendChild(modeNote); drawArNote(); page.appendChild(nextCard);

    function stopAll() { if (capTimer) { clearInterval(capTimer); capTimer = null; } playing = false; stopVoices(); window.removeEventListener('hashchange', stopAll); }
    window.addEventListener('hashchange', stopAll);
    chooseMode(); show(0); setPlayingUI();
    return page;
  };

  // which videos explain a question: kind is gaps (Part 1), mcq (Part 2) or essay (Part 3)
  UN.videoFor = function (kind, n) { return (UN.videos || []).filter(function (v) { return (v.refs[kind] || []).indexOf(n) !== -1; }); };
  UN.videoTools = { cuesFor: cuesFor, timeline: timeline, boundaries: boundaries, sceneSeconds: sceneSeconds, words: words, fmt: fmt, refsText: refsText };
})();
