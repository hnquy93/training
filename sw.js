/* MY TRAINING service worker — offline app shell + exercise-image cache */
const CACHE = 'mytraining-v3';
const SHELL = ['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-512-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                 // POST to Apps Script: leave to network
  const url = new URL(req.url), host = url.hostname;
  // Never cache Apps Script / Google endpoints.
  if (host === 'script.google.com' || host.endsWith('.googleusercontent.com') ||
      host === 'accounts.google.com' || host === 'apis.google.com' ||
      (host.endsWith('googleapis.com') && host !== 'fonts.googleapis.com')) return;
  // App shell (same origin): cache-first, offline fallback to index.html.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; }).catch(() => caches.match('./index.html'))));
    return;
  }
  // Exercise images + fonts: cache after first load.
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; }).catch(() => r)));
});
