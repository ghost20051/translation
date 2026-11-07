/*
 * Inline outline icons in the Lucide style (24x24 grid, 2px round strokes), drawn locally so no CDN is needed.
 * Shape syntax: p:<path d> | c:<cx,cy,r> | l:<x1,y1,x2,y2> | r:<x,y,w,h,rx> | pl:<points>
 */
(function () {
  var UN = window.UN = window.UN || {};
  var NS = 'http://www.w3.org/2000/svg';

  var S = {
    'layout-dashboard': 'r:3,3,7,9,1|r:14,3,7,5,1|r:14,12,7,9,1|r:3,16,7,5,1',
    'book-open': 'p:M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z|p:M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
    'gamepad': 'l:6,11,10,11|l:8,9,8,13|l:15,12,15.01,12|l:18,10,18.01,10|p:M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.55-.6-6.58-.69-7.26A4 4 0 0 0 17.32 5z',
    'file-text': 'p:M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z|p:M14 2v4a2 2 0 0 0 2 2h4|l:16,13,8,13|l:16,17,8,17|l:10,9,8,9',
    'bar-chart': 'p:M3 3v18h18|l:18,17,18,9|l:13,17,13,5|l:8,17,8,14',
    'play-circle': 'c:12,12,10|pl:10 8 16 12 10 16 10 8',
    'languages': 'p:m5 8 6 6|p:m4 14 6-6 2-3|l:2,5,14,5|l:7,2,8,2|p:m22 22-5-10-5 10|l:14,18,20,18',
    'trophy': 'p:M6 9H4.5a2.5 2.5 0 0 1 0-5H6|p:M18 9h1.5a2.5 2.5 0 0 0 0-5H18|l:4,22,20,22|p:M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22|p:M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22|p:M18 2H6v7a6 6 0 0 0 12 0V2z',
    'settings': 'p:M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z|c:12,12,3',
    'sun': 'c:12,12,4|l:12,2,12,4|l:12,20,12,22|l:4.93,4.93,6.34,6.34|l:17.66,17.66,19.07,19.07|l:2,12,4,12|l:20,12,22,12|l:6.34,17.66,4.93,19.07|l:19.07,4.93,17.66,6.34',
    'moon': 'p:M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z',
    'star': 'pl:12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
    'target': 'c:12,12,10|c:12,12,6|c:12,12,2',
    'flame': 'p:M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z',
    'zap': 'pl:13 2 3 14 12 14 11 22 21 10 12 10 13 2',
    'check': 'p:M20 6 9 17l-5-5',
    'check-circle': 'c:12,12,10|p:m9 12 2 2 4-4',
    'x': 'p:M18 6 6 18|p:m6 6 12 12',
    'x-circle': 'c:12,12,10|p:m15 9-6 6|p:m9 9 6 6',
    'search': 'c:11,11,8|p:m21 21-4.3-4.3',
    'menu': 'l:4,6,20,6|l:4,12,20,12|l:4,18,20,18',
    'more': 'c:5,12,1|c:12,12,1|c:19,12,1',
    'globe': 'c:12,12,10|p:M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20|l:2,12,22,12',
    'wrench': 'p:M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    'swords': 'p:M14.5 17.5 3 6V3h3l11.5 11.5|p:M13 19l6-6|p:M16 16l4 4|p:M19 21l2-2|p:M14.5 6.5 18 3h3v3l-3.5 3.5|p:M5 14l4 4|p:M7 17l-3 3|p:M3 19l2 2',
    'flag': 'p:M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z|l:4,22,4,15',
    'lightbulb': 'p:M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5|l:9,18,15,18|l:10,22,14,22',
    'trash': 'l:3,6,21,6|p:M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6|p:M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2',
    'lock': 'r:3,11,18,11,2|p:M7 11V7a5 5 0 0 1 10 0v4',
    'alert-circle': 'c:12,12,10|l:12,8,12,12|l:12,16,12.01,16',
    'alert-triangle': 'p:m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3|l:12,9,12,13|l:12,17,12.01,17',
    'info': 'c:12,12,10|l:12,16,12,12|l:12,8,12.01,8',
    'pencil': 'p:M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z|p:m15 5 4 4',
    'sparkles': 'p:M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z|p:M19 17v4|p:M17 19h4',
    'thumbs-up': 'p:M7 10v12|p:M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z',
    'layers': 'p:m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z|p:m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65|p:m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65',
    'link': 'p:M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|p:M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    'landmark': 'l:3,22,21,22|l:6,18,6,11|l:10,18,10,11|l:14,18,14,11|l:18,18,18,11|pl:12 2 20 7 4 7',
    'repeat': 'p:m17 2 4 4-4 4|p:M3 11v-1a4 4 0 0 1 4-4h14|p:m7 22-4-4 4-4|p:M21 13v1a4 4 0 0 1-4 4H3',
    'timer': 'l:10,2,14,2|l:12,14,15,11|c:12,14,8',
    'clock': 'c:12,12,10|p:M12 6v6l4 2',
    'skull': 'c:9,12,1|c:15,12,1|p:M8 20v2h8v-2|p:M12.5 17l-.5-1-.5 1h1z|p:M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20',
    'heart': 'p:M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z',
    'volume-x': 'pl:11 5 6 9 2 9 2 15 6 15 11 19 11 5|l:22,9,16,15|l:16,9,22,15',
    'volume': 'pl:11 5 6 9 2 9 2 15 6 15 11 19 11 5|p:M15.54 8.46a5 5 0 0 1 0 7.07|p:M19.07 4.93a10 10 0 0 1 0 14.14',
    'chevron-left': 'p:m15 18-6-6 6-6',
    'chevron-right': 'p:m9 18 6-6-6-6',
    'arrow-left': 'p:m12 19-7-7 7-7|l:19,12,5,12',
    'arrow-right': 'l:5,12,19,12|p:m12 5 7 7-7 7',
    'user': 'p:M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2|c:12,7,4',
    'video': 'p:m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5|r:2,6,14,12,2',
    'trending-up': 'p:M22 7l-8.5 8.5-5-5L2 17|p:M16 7h6v6',
    'headphones': 'p:M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
    'book': 'p:M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20',
    'calendar-check': 'r:3,4,18,18,2|l:16,2,16,6|l:8,2,8,6|l:3,10,21,10|p:m9 16 2 2 4-4',
    'quote': 'p:M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h4|p:M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h4'
  };

  // emoji (and symbols) the code base may still pass in text -> icon names
  var MAP = {
    '\u{1F3E0}': 'layout-dashboard', '\u{1F3AE}': 'gamepad', '\u{1F4DD}': 'file-text', '\u{1F4DA}': 'book-open', '\u{1F4CA}': 'bar-chart', '\u{1F310}': 'globe',
    '⭐': 'star', '⚙': 'settings', '\u{1F3C6}': 'trophy', '\u{1F527}': 'wrench', '⚔': 'swords', '\u{1F3C1}': 'flag', '✓': 'check', '✔': 'check',
    '\u{1F3AC}': 'video', '\u{1F4A1}': 'lightbulb', '\u{1F3AF}': 'target', '\u{1F5D1}': 'trash', '\u{1F512}': 'lock', '✅': 'check-circle', '\u{1F7E1}': 'alert-circle',
    '❌': 'x-circle', '✖': 'x', 'ℹ': 'info', '✍': 'pencil', '\u{1F389}': 'sparkles', '\u{1F44F}': 'thumbs-up', '\u{1F0CF}': 'layers', '\u{1F517}': 'link',
    '\u{1F4D6}': 'book-open', '⚡': 'zap', '✏': 'pencil', '\u{1F3DB}': 'landmark', '\u{1F501}': 'repeat', '⏱': 'timer', '\u{1F5C2}': 'layers', '\u{1F4D8}': 'book',
    '⚠': 'alert-triangle', '\u{1F479}': 'skull', '\u{1F409}': 'flame', '\u{1F494}': 'x-circle', '❤': 'heart', '\u{1F5A4}': 'heart-off', '\u{1F50A}': 'volume',
    '⏰': 'clock', '←': 'arrow-left', '→': 'arrow-right'
  };
  var RE = new RegExp('(' + Object.keys(MAP).map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')\\uFE0F?', 'u');

  function shape(el, spec) {
    var i = spec.indexOf(':'), k = spec.slice(0, i), v = spec.slice(i + 1), n;
    if (k === 'p') { n = document.createElementNS(NS, 'path'); n.setAttribute('d', v); }
    else if (k === 'pl') { n = document.createElementNS(NS, 'polygon'); n.setAttribute('points', v); }
    else if (k === 'c') { var c = v.split(','); n = document.createElementNS(NS, 'circle'); n.setAttribute('cx', c[0]); n.setAttribute('cy', c[1]); n.setAttribute('r', c[2]); }
    else if (k === 'l') { var l = v.split(','); n = document.createElementNS(NS, 'line'); n.setAttribute('x1', l[0]); n.setAttribute('y1', l[1]); n.setAttribute('x2', l[2]); n.setAttribute('y2', l[3]); }
    else { var r = v.split(','); n = document.createElementNS(NS, 'rect'); n.setAttribute('x', r[0]); n.setAttribute('y', r[1]); n.setAttribute('width', r[2]); n.setAttribute('height', r[3]); n.setAttribute('rx', r[4]); }
    el.appendChild(n);
  }

  function icon(name, cls) {
    var off = name === 'heart-off';
    var spec = S[off ? 'heart' : name] || S.info;
    var span = document.createElement('span');
    span.className = 'ico ico-' + name + (cls ? ' ' + cls : '') + (off ? ' off' : '');
    span.setAttribute('aria-hidden', 'true');
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    spec.split('|').forEach(function (s) { shape(svg, s); });
    span.appendChild(svg);
    if (name === 'arrow-left' || name === 'arrow-right' || name === 'chevron-left' || name === 'chevron-right') span.classList.add('flip');
    return span;
  }

  // Turn a string containing emoji into DOM nodes (text + icons).
  function nodes(str) {
    var out = [], rest = String(str), m;
    while ((m = RE.exec(rest))) {
      if (m.index) out.push(document.createTextNode(rest.slice(0, m.index)));
      out.push(icon(MAP[m[1]]));
      rest = rest.slice(m.index + m[0].length);
    }
    if (rest) out.push(document.createTextNode(rest));
    return out;
  }
  function hasIcon(str) { return RE.test(str); }

  UN.icons = { icon: icon, nodes: nodes, hasIcon: hasIcon };
})();
