
const CACHE_NAME = 'acos-vital-v7';
const IMAGE_CACHE_NAME = 'acos-vital-images-v7';

const STATIC_DOMAINS = [
  'mxbsygruslepfcyhtmqr.supabase.co',
  'rsms.me',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter(n => n !== CACHE_NAME && n !== IMAGE_CACHE_NAME).map(n => caches.delete(n))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isStaticDomain = STATIC_DOMAINS.some(domain => url.hostname.includes(domain));
  const isImage = event.request.destination === 'image';

  // Estratégia Network-First para imagens durante depuração, ou Cache-First estável
  if (isImage || event.request.destination === 'font' || isStaticDomain) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;

        const cacheToOpen = isImage ? IMAGE_CACHE_NAME : CACHE_NAME;
        caches.open(cacheToOpen).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Stale-While-Revalidate para o restante (JS, CSS, HTML)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networked = fetch(event.request).then((res) => {
        if (res && res.status === 200) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => null);
      return cached || networked;
    })
  );
});
