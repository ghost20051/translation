/* Visit counter: GoatCounter (https://ghost20051.goatcounter.com) counts page views so the site owner can see how many
   people use the site and which parts. No cookies, no names, nothing from the student's progress or answers: only the
   subject and the part of the site, for example "/si/learn" or "/si/video/v05". Exam numbers stay, but result ids and
   other private details are dropped. If the counter is blocked or the device is offline, nothing happens and the site
   works the same. GoatCounter itself never counts on localhost or file://. */
(function () {
  window.goatcounter = window.goatcounter || {};
  window.goatcounter.no_onload = true;   // this file sends the first count itself, with the page name
  var last = null;
  function path() {
    var m = location.hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?/) || [];
    var name = m[1] || 'home', arg = /^(video|lesson|game|exam)$/.test(name) && m[2] ? '/' + m[2] : '';
    var subj = window.UN && UN.store && UN.store.getSubject ? UN.store.getSubject() : '';
    return '/' + (subj ? subj + '/' : '') + name + arg;
  }
  function count() {
    var gc = window.goatcounter, p = path();
    if (!gc || typeof gc.count !== 'function' || p === last) return;
    last = p;
    try { gc.count({ path: p }); } catch (e) { /* counting is optional */ }
  }
  window.addEventListener('hashchange', count);
  // the counter script is loaded after this file (see index.html): count the first page once it is ready
  document.addEventListener('DOMContentLoaded', function () {
    var tag = document.querySelector('script[data-goatcounter]');
    if (window.goatcounter && typeof window.goatcounter.count === 'function') count();
    else if (tag) tag.addEventListener('load', count);
  });
})();
