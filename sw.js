/* Argo · Obiettivi & Note — service worker (app-shell offline-first).
   Bump CACHE per forzare l'aggiornamento dello shell. */
const CACHE = 'argo-v1.0.0';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()).catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navigazioni: network-first (così vedi gli aggiornamenti online), fallback allo shell in cache offline.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }

  // Altre GET: stale-while-revalidate per same-origin + Google Fonts; il resto (Firebase/XLSX CDN) passa dalla rete.
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200 &&
            (url.origin === self.location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.host))) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
