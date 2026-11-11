/* Reading & Translation page (Tourist subject): lecture summaries and translation passages with their translations.
 * Reference material only: no questions are made from it. Not reachable during an exam. */
(function () {
  var UN = window.UN = window.UN || {};
  var ui = UN.ui, h = ui.h, t = ui.t, L = ui.L, ic = ui.ic;
  var S = function () { return UN.store.get(); };

  UN.routes.reading = function () {
    var R = UN.reading;
    if (!R) return UN.routes.home();
    var tab = (UN.cfg && UN.cfg.readingFirst) || 'sum', lang = S().lang;
    var view = 'pairs'; try { view = localStorage.getItem('unrev-readview') === 'whole' ? 'whole' : 'pairs'; } catch (e) {}
    var page = h('div', { class: 'page' }, ui.pageHead(t('reading.title'), t('reading.lead')));
    var tabs = h('div', { class: 'tabs', role: 'tablist' }), body = h('div', { class: 'stack' });
    page.appendChild(tabs); page.appendChild(body);

    function drawTabs() {
      tabs.textContent = '';
      var order = [['sum', 'reading.tabSum'], ['tr', 'reading.tabTr']];
      if (UN.cfg && UN.cfg.readingFirst === 'tr') order.reverse();
      order.forEach(function (x) {
        tabs.appendChild(h('button', { type: 'button', role: 'tab', 'aria-selected': String(tab === x[0]), class: 'tab' + (tab === x[0] ? ' on' : ''), onclick: function () { tab = x[0]; draw(); } }, t(x[1])));
      });
    }
    function draw() {
      drawTabs(); body.textContent = '';
      if (tab === 'sum') {
        R.summaries.forEach(function (sec) {
          var card = h('div', { class: 'card' }, h('h2', null, sec.title[lang]));
          sec.points.forEach(function (p) {
            card.appendChild(h('div', { class: 'rpoint' }, h('div', null, L(p.en, 'en')), h('div', { class: 'ar' }, L(p.ar, 'ar'))));
          });
          body.appendChild(card);
        });
        return;
      }
      body.appendChild(h('div', { class: 'note' }, ic('info'), ' ', t('reading.note')));
      if (R.passages.some(function (p) { return p.paras; })) body.appendChild(h('div', { class: 'seg wide readview', role: 'group' }, [['pairs', 'reading.byPara'], ['whole', 'reading.whole']].map(function (x) {
        return h('button', { type: 'button', class: view === x[0] ? 'on' : '', 'aria-pressed': String(view === x[0]), onclick: function () { view = x[0]; try { localStorage.setItem('unrev-readview', view); } catch (e) {} draw(); } }, t(x[1]));
      })));
      R.passages.forEach(function (p) {
        if (p.paras) return body.appendChild(pairCard(p));
        var srcLang = p.dir === 'en2ar' ? 'en' : 'ar', trgLang = p.dir === 'en2ar' ? 'ar' : 'en';
        var trans = h('div', { class: 'trans hidden' }, L(p.target, trgLang));
        var btn = h('button', { type: 'button', class: 'btn small ghost' }, ic('languages'), t('reading.show'));
        btn.addEventListener('click', function () {
          var hid = trans.classList.toggle('hidden');
          ui.setText(btn, ''); btn.appendChild(ic('languages')); btn.appendChild(document.createTextNode(t(hid ? 'reading.show' : 'reading.hide')));
        });
        body.appendChild(h('div', { class: 'card passage' },
          h('div', { class: 'row between' }, h('b', null, p.title[lang]), h('span', { class: 'pill' }, t(p.dir === 'en2ar' ? 'reading.enar' : 'reading.aren'))),
          h('div', { class: 'text' }, L(p.source, srcLang)), btn, trans));
      });
    }
    // a text with its translation: paragraph by paragraph (each paragraph, then its translation) or as a whole (the whole
    // text, then the whole translation). The translation is shown; one button hides it to test yourself.
    function pairCard(p) {
      var srcLang = p.dir === 'en2ar' ? 'en' : 'ar', trgLang = p.dir === 'en2ar' ? 'ar' : 'en', trans = [];
      var btn = h('button', { type: 'button', class: 'btn small ghost' }, ic('languages'), t('reading.hide'));
      btn.addEventListener('click', function () {
        var hid = !(trans[0] && trans[0].classList.contains('hidden'));
        trans.forEach(function (x) { x.classList.toggle('hidden', hid); });
        ui.setText(btn, ''); btn.appendChild(ic('languages')); btn.appendChild(document.createTextNode(t(hid ? 'reading.show' : 'reading.hide')));
      });
      var card = h('div', { class: 'card passage pairs' },
        h('div', { class: 'row between' }, h('b', null, p.title[lang]), h('span', { class: 'pill' }, t(p.dir === 'en2ar' ? 'reading.enar' : 'reading.aren'))),
        p.note ? h('p', { class: 'muted small' }, p.note[lang]) : null, btn);
      if (view === 'whole') {
        var src = h('div', { class: 'whole text' }), tr = h('div', { class: 'whole trans' });
        p.paras.forEach(function (pair, k) {
          src.appendChild(h('p', { class: k ? '' : 'ttl' }, L(pair[0], srcLang)));
          tr.appendChild(h('p', { class: k ? '' : 'ttl' }, L(pair[1], trgLang)));
        });
        trans.push(tr); card.appendChild(src); card.appendChild(tr);
        return card;
      }
      p.paras.forEach(function (pair, k) {
        var tr1 = h('div', { class: 'trans' + (k ? '' : ' ttl') }, L(pair[1], trgLang));
        trans.push(tr1);
        card.appendChild(h('div', { class: 'pair' }, h('div', { class: 'text' + (k ? '' : ' ttl') }, L(pair[0], srcLang)), tr1));
      });
      return card;
    }
    draw();
    return page;
  };
})();
