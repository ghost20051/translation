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
  };

  // name: brand | un | tour | si (anything else falls back to the logo)
  function make(name, size) {
    var d = DESIGN[name] || DESIGN.brand, uid = ++seq;
    var id = function (k) { return 'art' + uid + k; };
    var parts = d(id);
    var svg = el('svg', { viewBox: '0 0 64 64', width: String(size || 32), height: String(size || 32), role: 'img', 'aria-hidden': 'true', focusable: 'false', class: 'art art-' + name });
    svg.appendChild(el('defs', {}, parts[0]));
    parts[1].forEach(function (n) { svg.appendChild(n); });
    return svg;
  }

  UN.art = { make: make, names: Object.keys(DESIGN) };
})();
