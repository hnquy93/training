/* MY TRAINING service worker v4 — offline shell + auto-update */
const CACHE = 'mytraining-v4';
const SHELL = ['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-512-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url), host = url.hostname;
  // Never cache Google/Apps Script calls
  if (host === 'script.google.com' || host.endsWith('.googleusercontent.com') ||
      host === 'accounts.google.com' || host === 'apis.google.com' || host === 'www.google.com' ||
      (host.endsWith('googleapis.com') && host !== 'fonts.googleapis.com')) return;
  // version.json: always network-first (critical for auto-update)
  if (url.pathname.endsWith('version.json')) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  // App shell (same origin): cache-first, offline fallback
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; }).catch(() => caches.match('./index.html'))));
    return;
  }
  // Exercise images + fonts: cache after first load
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; }).catch(() => r)));
});
