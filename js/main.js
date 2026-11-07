/* Bootstrap. Everything runs locally; the only optional extra is an offline cache on https/localhost. */
(function () {
  var UN = window.UN;
  UN.ui.applyLang();
  UN.ui.applyTheme();
  UN.ui.render();

  // Offline cache: service workers only run on https:// or localhost (not file://).
  try {
    var ok = 'serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1');
    if (ok) navigator.serviceWorker.register('sw.js').catch(function () { /* offline cache is optional */ });
  } catch (e) { /* ignore */ }
})();
