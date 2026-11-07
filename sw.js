/* Offline cache. Only caches this site's own files; no network calls to anywhere else. */
var CACHE = 'unrev-v10';
var FILES = [
  './', 'index.html', 'manifest.webmanifest', 'icon.svg', 'css/style.css',
  'js/data/terms.js', 'js/data/questions.js', 'js/data/answer-keys.js', 'js/data/resources.js', 'js/data/lessons.js', 'js/data/tourist/terms.js', 'js/data/tourist/content.js', 'js/data/tourist/reading.js', 'js/data/tourist/definitions.js', 'js/data/tourist/help.js', 'js/subjects.js', 'js/i18n.js', 'js/i18n-ui.js', 'js/icons.js', 'js/check.js', 'js/storage.js',
  'js/generator.js', 'js/adaptive.js', 'js/progress.js', 'js/exam.js', 'js/sfx.js', 'js/ui.js', 'js/qview.js', 'js/exam-ui.js', 'js/games.js', 'js/lessons-ui.js', 'js/reading-ui.js', 'js/main.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// Network first (so updates reach students), cache as the offline fallback. Same-origin only.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return res;
  }).catch(function () { return caches.match(e.request); }));
});
