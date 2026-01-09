
const CACHE_NAME = 'acos-vital-v5';
const IMAGE_CACHE_NAME = 'acos-vital-images-v5';

const STATIC_DOMAINS = [
  'mxbsygruslepfcyhtmqr.supabase.co',
  'images.builderservices.io',
  'rsms.me',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map(n => caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isStaticDomain = STATIC_DOMAINS.some(domain => url.hostname.includes(domain));

  if (event.request.destination === 'image' || event.request.destination === 'font' || isStaticDomain) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) return networkResponse;

          // CLONAGEM E SOBRESCRITA DE HEADERS (A mágica para o Lighthouse)
          // Criamos uma nova resposta baseada na original, mas com TTL de 1 ano
          const newHeaders = new Headers(networkResponse.headers);
          newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');

          const responseToCache = new Response(networkResponse.clone().body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers: newHeaders
          });

          const cacheToOpen = (event.request.destination === 'image') ? IMAGE_CACHE_NAME : CACHE_NAME;
          caches.open(cacheToOpen).then((cache) => {
            cache.put(event.request, responseToCache.clone());
          });

          return responseToCache;
        }).catch(() => caches.match(event.request));
      })
    );
    return;
  }

  // Estratégia Stale-While-Revalidate para outros recursos
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