/* Illustrated emblems: the app logo and one emblem per subject. Plain SVG built with the DOM (no innerHTML),
   drawn with gradients and soft highlights so they read as proper app icons. */
(function () {
  var UN = window.UN = window.UN || {};
  var NS = 'http://www.w3.org/2000/svg', seq = 0;

  function el(tag, attrs, kids) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function grad(id, x2, y2, stops, radial) {
    var g = el(radial ? 'radialGradient' : 'linearGradient', radial ? { id: id, cx: '.35', cy: '.3', r: '.85' } : { id: id, x1: '0', y1: '0', x2: x2, y2: y2 },
      stops.map(function (s) { return el('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] == null ? '1' : s[2] }); }));
    return g;
  }

  // each design: function (id) -> [defs array, shapes array], drawn on a 64 x 64 canvas
  var DESIGN = {
    // app logo: a rounded tile with a sun-lit globe above an open book
    brand: function (id) {
      return [[
        grad(id('bg'), '1', '1', [['0', '#1e3a8a'], ['.55', '#2563eb'], ['1', '#38bdf8']]),
        grad(id('gloss'), '0', '1', [['0', '#ffffff', '.38'], ['1', '#ffffff', '0']]),
        grad(id('page'), '0', '1', [['0', '#ffffff'], ['1', '#c7dbfb']]),
        grad(id('sun'), '', '', [['0', '#fff7c2'], ['.6', '#fbbf24'], ['1', '#f59e0b']], true)
      ], [
        el('rect', { width: '64', height: '64', rx: '15', fill: 'url(#' + id('bg') + ')' }),
        el('rect', { width: '64', height: '31', rx: '15', fill: 'url(#' + id('gloss') + ')' }),
        el('ellipse', { cx: '32', cy: '56.5', rx: '21', ry: '3', fill: '#0b1b4d', opacity: '.28' }),
        el('circle', { cx: '32', cy: '21', r: '11', fill: 'url(#' + id('sun') + ')' }),
        el('g', { fill: 'none', stroke: '#b45309', 'stroke-opacity': '.55', 'stroke-width': '1.2' }, [
          el('ellipse', { cx: '32', cy: '21', rx: '4.6', ry: '11' }), el('path', { d: 'M21.4 18h21.2M21.4 24h21.2' })]),
        el('path', { d: 'M9 35c8-3 16-2 22 2.6V54c-6-4-14-5-22-2.4z', fill: 'url(#' + id('page') + ')' }),
        el('path', { d: 'M55 35c-8-3-16-2-22 2.6V54c6-4 14-5 22-2.4z', fill: 'url(#' + id('page') + ')' }),
        el('g', { stroke: '#7aa2e8', 'stroke-width': '1.4', 'stroke-linecap': 'round', fill: 'none' }, [
          el('path', { d: 'M13 39.6c4-1.2 8-.8 12 1M13 44c4-1.2 8-.8 12 1'}), el('path', { d: 'M51 39.6c-4-1.2-8-.8-12 1M51 44c-4-1.2-8-.8-12 1' })])
      ]];
    },
    // UN Translation: an institution with columns in front of a globe grid
    un: function (id) {
      return [[
        grad(id('bg'), '1', '1', [['0', '#1e3a8a'], ['1', '#3b82f6']]),
        grad(id('gloss'), '0', '1', [['0', '#ffffff', '.3'], ['1', '#ffffff', '0']])
      ], [
        el('circle', { cx: '32', cy: '32', r: '31', fill: 'url(#' + id('bg') + ')' }),
        el('path', { d: 'M32 1a31 31 0 0 1 31 31H1A31 31 0 0 1 32 1z', fill: 'url(#' + id('gloss') + ')' }),
        el('g', { fill: 'none', stroke: '#ffffff', 'stroke-opacity': '.3', 'stroke-width': '1.4' }, [
          el('circle', { cx: '32', cy: '32', r: '23' }), el('ellipse', { cx: '32', cy: '32', rx: '9.5', ry: '23' }), el('path', { d: 'M9 32h46M12 22h40M12 42h40' })]),
        el('path', { d: 'M32 13.5L51 24.5H13z', fill: '#ffffff' }),
        el('rect', { x: '15', y: '25.5', width: '34', height: '3', rx: '.8', fill: '#dbe5ff' }),
        el('g', { fill: '#ffffff' }, [17.5, 26, 34.5, 43].map(function (x) { return el('rect', { x: String(x), y: '29.5', width: '3.6', height: '16', rx: '.8' }); })),
        el('rect', { x: '13', y: '46', width: '38', height: '3.6', rx: '1', fill: '#dbe5ff' }),
        el('rect', { x: '10', y: '49.6', width: '44', height: '3.2', rx: '1', fill: '#b9c8f5' })
      ]];
    },
    // Tourist Translation: an aeroplane over a dotted route and a cloud
    tour: function (id) {
      return [[
        grad(id('bg'), '1', '1', [['0', '#0e7490'], ['1', '#10b981']]),
        grad(id('gloss'), '0', '1', [['0', '#ffffff', '.3'], ['1', '#ffffff', '0']])
      ], [
        el('circle', { cx: '32', cy: '32', r: '31', fill: 'url(#' + id('bg') + ')' }),
        el('path', { d: 'M32 1a31 31 0 0 1 31 31H1A31 31 0 0 1 32 1z', fill: 'url(#' + id('gloss') + ')' }),
        el('path', { d: 'M11 47Q22 21 50 19', fill: 'none', stroke: '#ffffff', 'stroke-opacity': '.8', 'stroke-width': '2.2', 'stroke-dasharray': '.5 5', 'stroke-linecap': 'round' }),
        el('g', { fill: '#ffffff', opacity: '.92' }, [el('circle', { cx: '18', cy: '49', r: '5' }), el('circle', { cx: '25', cy: '47.5', r: '6.5' }), el('circle', { cx: '32', cy: '50', r: '4.5' }), el('rect', { x: '13', y: '49.5', width: '24', height: '4.5', rx: '2.2' })]),
        el('g', { transform: 'translate(37 27) rotate(40)' }, [
          el('path', { d: 'M0-16C3.2-16 4.4-12 4.4-7.5V5c0 4-2 8-4.4 11C-2.4 13-4.4 9-4.4 5V-7.5C-4.4-12-3.2-16 0-16z', fill: '#ffffff' }),
          el('path', { d: 'M-4-2L-21 9v3.4L-4 7z', fill: '#e6fffa' }), el('path', { d: 'M4-2L21 9v3.4L4 7z', fill: '#e6fffa' }),
          el('path', { d: 'M-3 10.5L-9.5 16v2.2L-3 15z', fill: '#e6fffa' }), el('path', { d: 'M3 10.5L9.5 16v2.2L3 15z', fill: '#e6fffa' }),
          el('ellipse', { cx: '0', cy: '-9', rx: '1.5', ry: '2.6', fill: '#0e7490', opacity: '.55' })])
      ]];
    },
    // Simultaneous Interpretation: headphones with a microphone and sound bars
    si: function (id) {
      return [[
        grad(id('bg'), '1', '1', [['0', '#4338ca'], ['1', '#a855f7']]),
        grad(id('gloss'), '0', '1', [['0', '#ffffff', '.3'], ['1', '#ffffff', '0']])
      ], [
        el('circle', { cx: '32', cy: '32', r: '31', fill: 'url(#' + id('bg') + ')' }),
        el('path', { d: 'M32 1a31 31 0 0 1 31 31H1A31 31 0 0 1 32 1z', fill: 'url(#' + id('gloss') + ')' }),
        el('path', { d: 'M15.5 37v-5a16.5 16.5 0 0 1 33 0v5', fill: 'none', stroke: '#ffffff', 'stroke-width': '4.6', 'stroke-linecap': 'round' }),
        el('rect', { x: '10.5', y: '34', width: '11', height: '17', rx: '5.5', fill: '#ffffff' }),
        el('rect', { x: '42.5', y: '34', width: '11', height: '17', rx: '5.5', fill: '#ffffff' }),
        el('rect', { x: '13.6', y: '37.4', width: '4.8', height: '10.2', rx: '2.4', fill: '#c4b5fd' }),
        el('rect', { x: '45.6', y: '37.4', width: '4.8', height: '10.2', rx: '2.4', fill: '#c4b5fd' }),
        el('g', { stroke: '#ffffff', 'stroke-opacity': '.85', 'stroke-width': '2.6', 'stroke-linecap': 'round' }, [
          el('path', { d: 'M27 31v9' }), el('path', { d: 'M32 26.5v18' }), el('path', { d: 'M37 30v11' })]),
        el('path', { d: 'M48 51c0 5-5 7.5-12 7.5', fill: 'none', stroke: '#fde68a', 'stroke-width': '2.4', 'stroke-linecap': 'round' }),
        el('circle', { cx: '34.5', cy: '58.5', r: '3', fill: '#fde68a' })
      ]];
    }
,
    // Discourse Analysis: two speech bubbles joined by a chain link (sentences tied together)
    disc: function (id) {
      return [[
        grad(id('bg'), '1', '1', [['0', '#b45309'], ['1', '#f59e0b']]),
        grad(id('gloss'), '0', '1', [['0', '#ffffff', '.3'], ['1', '#ffffff', '0']])
      ], [
        el('circle', { cx: '32', cy: '32', r: '31', fill: 'url(#' + id('bg') + ')' }),
        el('path', { d: 'M32 1a31 31 0 0 1 31 31H1A31 31 0 0 1 32 1z', fill: 'url(#' + id('gloss') + ')' }),
        el('path', { d: 'M9 16h22a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5H19l-6 5v-5h-4a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5z', fill: '#ffffff' }),
        el('path', { d: 'M55 28H35a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5h11l6 5v-5h3a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5z', fill: '#fff7e6' }),
        el('g', { stroke: '#d97706', 'stroke-width': '2.2', 'stroke-linecap': 'round' }, [el('path', { d: 'M11 23h18M11 28h12' }), el('path', { d: 'M36 35h17M36 40h11' })]),
        el('g', { fill: 'none', stroke: '#7c2d12', 'stroke-width': '2.6' }, [el('rect', { x: '25', y: '29', width: '9', height: '6', rx: '3' }), el('rect', { x: '30', y: '31', width: '9', height: '6', rx: '3' })])
      ]];
    },
    // Internet Research Skills: a magnifying glass over a globe (searching the web)
    web: function (id) {
      return [[
        grad(id('bg'), '1', '1', [['0', '#0f766e'], ['1', '#14b8a6']]),
        grad(id('gloss'), '0', '1', [['0', '#ffffff', '.3'], ['1', '#ffffff', '0']])
      ], [
        el('circle', { cx: '32', cy: '32', r: '31', fill: 'url(#' + id('bg') + ')' }),
        el('path', { d: 'M32 1a31 31 0 0 1 31 31H1A31 31 0 0 1 32 1z', fill: 'url(#' + id('gloss') + ')' }),
        el('g', { fill: 'none', stroke: '#ffffff', 'stroke-width': '2' }, [el('circle', { cx: '27', cy: '27', r: '13' }), el('ellipse', { cx: '27', cy: '27', rx: '5.5', ry: '13' }), el('path', { d: 'M14 27h26M16 20.5h22M16 33.5h22' })]),
        el('circle', { cx: '27', cy: '27', r: '16.5', fill: 'none', stroke: '#fde68a', 'stroke-width': '4' }),
        el('path', { d: 'M39 39l11.5 11.5', stroke: '#fde68a', 'stroke-width': '6.5', 'stroke-linecap': 'round' })
      ]];
    }
  };

  // name: brand | un | tour | si | disc | web (anything else falls back to the logo)
  function make(name, size) {
    var d = DESIGN[name] || DESIGN.brand, uid = ++seq;
    var id = function (k) { return 'art' + uid + k; };
    var parts = d(id);
    var svg = el('svg', { viewBox: '0 0 64 64', width: String(size || 32), height: String(size || 32), role: 'img', 'aria-hidden': 'true', focusable: 'false', class: 'art art-' + name });
    svg.appendChild(el('defs', {}, parts[0]));
    parts[1].forEach(function (n) { svg.appendChild(n); });
    return svg;
  }

  /* Illustrations for the explainer videos, drawn on a 220 x 160 canvas. Animated with the CSS classes in style.css. */
  function P(d, fill, extra) { var a = { d: d, fill: fill || 'none' }; Object.keys(extra || {}).forEach(function (k) { a[k] = extra[k]; }); return el('path', a); }
  var SCENE = {
    // a pizza cut into slices: one slice lifts out
    pizza: function () {
      var cx = 110, cy = 82, r = 62, kids = [el('ellipse', { cx: cx, cy: 150, rx: 66, ry: 7, fill: '#000', opacity: '.2' })];
      for (var k = 0; k < 8; k++) {
        var a1 = (k * 45 - 90) * Math.PI / 180, a2 = ((k + 1) * 45 - 90) * Math.PI / 180, am = (a1 + a2) / 2;
        var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
        var g = el('g', { class: k === 1 ? 'vslice-out' : '' }, [
          P('M' + cx + ' ' + cy + ' L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + ' Z', '#fcd34d', { stroke: '#d97706', 'stroke-width': '4', 'stroke-linejoin': 'round' }),
          el('circle', { cx: (cx + 38 * Math.cos(am)).toFixed(1), cy: (cy + 38 * Math.sin(am)).toFixed(1), r: '6.5', fill: '#dc2626' }),
          el('circle', { cx: (cx + 22 * Math.cos(am + .25)).toFixed(1), cy: (cy + 22 * Math.sin(am + .25)).toFixed(1), r: '3', fill: '#16a34a' })]);
        kids.push(g);
      }
      return kids;
    },
    // traffic lights that cycle red, yellow, green
    traffic: function () {
      return [el('rect', { x: '104', y: '120', width: '12', height: '32', fill: '#475569' }), el('rect', { x: '78', y: '8', width: '64', height: '118', rx: '16', fill: '#1f2937', stroke: '#0f172a', 'stroke-width': '3' }),
        el('circle', { cx: '110', cy: '38', r: '16', fill: '#ef4444', class: 'vtl vtl-r' }), el('circle', { cx: '110', cy: '67', r: '16', fill: '#facc15', class: 'vtl vtl-y' }), el('circle', { cx: '110', cy: '96', r: '16', fill: '#22c55e', class: 'vtl vtl-g' }),
        el('ellipse', { cx: '110', cy: '154', rx: '34', ry: '5', fill: '#000', opacity: '.2' })];
    },
    // a shout whose echo comes back after a moment
    echo: function () {
      return [P('M0 150 L55 70 L95 120 L140 45 L220 150 Z', '#475569'), P('M0 150 L40 100 L80 150 Z', '#64748b'), P('M140 45 L128 62 L140 58 L150 66 Z', '#e2e8f0'),
        el('circle', { cx: '30', cy: '112', r: '9', fill: '#fcd34d' }), el('rect', { x: '23', y: '120', width: '14', height: '26', rx: '6', fill: '#f97316' }),
        el('g', { class: 'vecho vecho-out' }, [P('M44 100 Q54 112 44 124', 'none', { stroke: '#fff', 'stroke-width': '3', 'stroke-linecap': 'round' }), P('M54 92 Q70 112 54 132', 'none', { stroke: '#fff', 'stroke-width': '3', 'stroke-linecap': 'round' })]),
        el('g', { class: 'vecho vecho-back' }, [P('M170 86 Q160 98 170 110', 'none', { stroke: '#fde68a', 'stroke-width': '3', 'stroke-linecap': 'round' }), P('M180 78 Q164 98 180 118', 'none', { stroke: '#fde68a', 'stroke-width': '3', 'stroke-linecap': 'round' })]),
        el('text', { x: '12', y: '30', fill: '#fff', 'font-size': '16', 'font-weight': '800' }, [document.createTextNode('Hello!')]), el('text', { x: '150', y: '30', fill: '#fde68a', 'font-size': '16', 'font-weight': '800', class: 'vecho-text' }, [document.createTextNode('hello...')])];
    },
    // a backpack that sags as tasks are added
    backpack: function () {
      return [el('ellipse', { cx: '110', cy: '152', rx: '56', ry: '7', fill: '#000', opacity: '.2' }), el('g', { class: 'vsag' }, [
        P('M72 52 Q110 20 148 52 L154 134 Q110 148 66 134 Z', '#f59e0b', { stroke: '#b45309', 'stroke-width': '4', 'stroke-linejoin': 'round' }),
        P('M86 50 Q110 30 134 50', 'none', { stroke: '#b45309', 'stroke-width': '5', 'stroke-linecap': 'round' }),
        el('rect', { x: '88', y: '92', width: '44', height: '32', rx: '10', fill: '#fbbf24', stroke: '#b45309', 'stroke-width': '3' }),
        el('rect', { x: '98', y: '102', width: '24', height: '5', rx: '2.5', fill: '#b45309' }),
        el('rect', { x: '84', y: '36', width: '14', height: '20', rx: '3', fill: '#3b82f6', class: 'vbook b1' }), el('rect', { x: '100', y: '30', width: '14', height: '26', rx: '3', fill: '#ef4444', class: 'vbook b2' }), el('rect', { x: '116', y: '34', width: '14', height: '22', rx: '3', fill: '#22c55e', class: 'vbook b3' })]),
        el('text', { x: '178', y: '88', fill: '#fff', 'font-size': '18', 'font-weight': '800', class: 'vsag-t' }, [document.createTextNode('😓')])];
    },
    // scales that settle level
    scales: function () {
      return [el('ellipse', { cx: '110', cy: '152', rx: '46', ry: '6', fill: '#000', opacity: '.2' }), el('rect', { x: '104', y: '40', width: '12', height: '106', rx: '4', fill: '#94a3b8' }), el('rect', { x: '78', y: '140', width: '64', height: '10', rx: '5', fill: '#64748b' }),
        el('g', { transform: 'translate(110 0) scale(.86) translate(-110 0)' }, [el('g', { class: 'vbeam' }, [el('rect', { x: '30', y: '36', width: '160', height: '8', rx: '4', fill: '#e2e8f0' }),
          el('path', { d: 'M36 44 L18 92 H70 Z', fill: 'none', stroke: '#e2e8f0', 'stroke-width': '2' }), el('path', { d: 'M184 44 L166 92 H218 Z', fill: 'none', stroke: '#e2e8f0', 'stroke-width': '2' }),
          P('M14 92 H74 Q44 118 14 92 Z', '#fcd34d'), P('M162 92 H222 Q192 118 162 92 Z', '#fcd34d'),
          el('circle', { cx: '44', cy: '86', r: '9', fill: '#3b82f6' }), el('circle', { cx: '192', cy: '86', r: '9', fill: '#22c55e' })])]),
        el('circle', { cx: '110', cy: '40', r: '9', fill: '#f8fafc', stroke: '#94a3b8', 'stroke-width': '3' })];
    },
    // a parrot that repeats everything
    parrot: function () {
      return [el('rect', { x: '30', y: '136', width: '120', height: '8', rx: '4', fill: '#92400e' }),
        P('M70 128 Q50 156 38 150 Q56 138 66 120 Z', '#ef4444'), P('M76 128 Q66 160 54 158 Q70 142 74 120 Z', '#3b82f6'),
        el('ellipse', { cx: '88', cy: '96', rx: '30', ry: '42', fill: '#22c55e' }), P('M76 88 Q50 100 70 132 Q92 118 90 92 Z', '#15803d'),
        el('g', { class: 'vhead' }, [el('circle', { cx: '96', cy: '52', r: '24', fill: '#4ade80' }), el('circle', { cx: '104', cy: '48', r: '6', fill: '#fff' }), el('circle', { cx: '106', cy: '48', r: '3', fill: '#111' }), P('M114 52 Q140 54 128 74 Q116 70 112 60 Z', '#f59e0b')]),
        el('g', { class: 'vbubble' }, [el('rect', { x: '124', y: '6', width: '90', height: '34', rx: '12', fill: '#fff' }), P('M132 40 L128 52 L144 40 Z', '#fff'),
          el('text', { x: '134', y: '28', fill: '#0f172a', 'font-size': '13', 'font-weight': '800' }, [document.createTextNode('Hello, hello!')])])];
    },
    // two puzzle pieces that click together
    puzzle: function () {
      return [el('ellipse', { cx: '110', cy: '146', rx: '70', ry: '6', fill: '#000', opacity: '.2' }),
        el('g', { class: 'vpz-a' }, [P('M30 50 H88 V68 A13 13 0 1 1 88 94 V112 H30 Z', '#60a5fa', { stroke: '#1d4ed8', 'stroke-width': '4', 'stroke-linejoin': 'round' }), el('text', { x: '42', y: '88', fill: '#fff', 'font-size': '15', 'font-weight': '800' }, [document.createTextNode('who')])]),
        el('g', { class: 'vpz-b' }, [P('M90 50 H150 V112 H90 V94 A13 13 0 1 0 90 68 Z', '#34d399', { stroke: '#047857', 'stroke-width': '4', 'stroke-linejoin': 'round' }), el('text', { x: '104', y: '88', fill: '#fff', 'font-size': '13', 'font-weight': '800' }, [document.createTextNode('does')])])];
    },
    // a plant that grows with sun and water
    plant: function () {
      var drops = [0, 1, 2].map(function (i) { return P('M' + (146 + i * 14) + ' 20 q-5 9 0 12 q5 -3 0 -12 Z', '#38bdf8', { class: 'vdrop d' + i }); });
      return [el('circle', { cx: '40', cy: '36', r: '16', fill: '#fde047' }), el('g', { stroke: '#fde047', 'stroke-width': '3', 'stroke-linecap': 'round', class: 'vrays' }, [P('M40 8V2M40 70v-6M12 36H6M74 36h-6M20 16l-4-4M60 56l4 4M60 16l4-4M20 56l-4 4')]),
        P('M78 118 H142 L134 152 H86 Z', '#c2410c', { stroke: '#7c2d12', 'stroke-width': '3', 'stroke-linejoin': 'round' }), el('rect', { x: '74', y: '110', width: '72', height: '12', rx: '5', fill: '#9a3412' }),
        el('g', { class: 'vplant' }, [P('M110 112 Q108 80 112 56', 'none', { stroke: '#15803d', 'stroke-width': '5', 'stroke-linecap': 'round' }),
          el('ellipse', { cx: '92', cy: '78', rx: '20', ry: '9', transform: 'rotate(-28 92 78)', fill: '#4ade80' }), el('ellipse', { cx: '132', cy: '66', rx: '20', ry: '9', transform: 'rotate(28 132 66)', fill: '#22c55e' }), el('ellipse', { cx: '112', cy: '48', rx: '10', ry: '18', fill: '#86efac' })])].concat(drops);
    }
  };
  function scene(name) {
    var d = SCENE[name]; if (!d) return null;
    var svg = el('svg', { viewBox: '0 0 220 160', class: 'vartsvg art-' + name, role: 'img', 'aria-hidden': 'true', focusable: 'false' });
    d().forEach(function (n) { svg.appendChild(n); });
    return svg;
  }

  UN.art = { make: make, scene: scene, sceneNames: Object.keys(SCENE), names: Object.keys(DESIGN) };
})();
